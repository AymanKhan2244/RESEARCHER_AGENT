"use client";

/* ─────────────────────────────────────────
   Chat Context — single source of truth
───────────────────────────────────────── */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import * as api from "../lib/api";
import { API_BASE } from "../lib/constants";
import { generateId } from "../lib/utils";
import type { Chat, Message } from "../lib/types";

/* ── Context Shape ── */
type ChatContextType = {
  // State
  chats: Chat[];
  currentChatId: string | null;
  currentChat: Chat | null;
  loading: boolean;
  initialLoading: boolean;
  guardrailMsg: string | null;
  drawerOpen: boolean;
  searchQuery: string;
  toastMsg: string | null;

  // Actions
  createNewChat: () => Promise<void>;
  selectChat: (id: string) => void;
  deleteChat: (id: string) => Promise<void>;
  renameChat: (id: string, title: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  cancelRequest: () => void;
  setDrawerOpen: (open: boolean) => void;
  dismissGuardrail: () => void;
  setSearchQuery: (q: string) => void;
  showToast: (msg: string) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

/* ── Provider ── */
export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [guardrailMsg, setGuardrailMsg] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const currentChat = chats.find((c) => c.id === currentChatId) ?? null;

  /* ── Initial load ── */
  useEffect(() => {
    api
      .fetchChats()
      .then((data) => {
        setChats(data);
        if (data.length > 0) {
          setCurrentChatId(data[0].id);
        } else {
          return api.createChat().then((nc) => {
            setChats([nc]);
            setCurrentChatId(nc.id);
          });
        }
      })
      .catch((err) => console.error("Failed to load chats:", err))
      .finally(() => setInitialLoading(false));
  }, []);

  /* ── Auto-dismiss guardrail toast after 6s ── */
  useEffect(() => {
    if (!guardrailMsg) return;
    const t = setTimeout(() => setGuardrailMsg(null), 6000);
    return () => clearTimeout(t);
  }, [guardrailMsg]);

  /* ── Auto-dismiss generic toast after 2.5s ── */
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 2500);
    return () => clearTimeout(t);
  }, [toastMsg]);

  /* ── Actions ── */
  const createNewChat = useCallback(async () => {
    try {
      const nc = await api.createChat();
      setChats((prev) => [nc, ...prev]);
      setCurrentChatId(nc.id);
      setDrawerOpen(false);
    } catch (e) {
      console.error("Failed to create chat:", e);
    }
  }, []);

  const selectChat = useCallback((id: string) => {
    setCurrentChatId(id);
    setDrawerOpen(false);
  }, []);

  const deleteChatAction = useCallback(
    async (id: string) => {
      try {
        await api.deleteChat(id);
        setChats((prev) => {
          const updated = prev.filter((c) => c.id !== id);
          if (currentChatId === id) {
            if (updated.length > 0) {
              setCurrentChatId(updated[0].id);
            } else {
              // Create a fresh chat if we deleted the last one
              api.createChat().then((nc) => {
                setChats([nc]);
                setCurrentChatId(nc.id);
              });
              return [];
            }
          }
          return updated;
        });
      } catch (e) {
        console.error("Failed to delete chat:", e);
      }
    },
    [currentChatId]
  );

  const renameChatAction = useCallback(
    async (id: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      try {
        await api.renameChat(id, trimmed);
        setChats((prev) =>
          prev.map((c) => (c.id === id ? { ...c, title: trimmed } : c))
        );
      } catch (e) {
        console.error("Failed to rename chat:", e);
      }
    },
    []
  );

  const sendMessageAction = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || loading) return;

      // Ensure we have a valid chat
      let chatId = currentChatId;
      if (!chatId || !chats.find((c) => c.id === chatId)) {
        try {
          const nc = await api.createChat();
          setChats((prev) => [nc, ...prev]);
          chatId = nc.id;
          setCurrentChatId(chatId);
        } catch (e) {
          console.error("Failed to create chat for send:", e);
          return;
        }
      }

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
      };

      // Optimistically add user message + auto-title
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          const isFirst = c.messages.length === 0;
          return {
            ...c,
            title: isFirst
              ? trimmed.slice(0, 40) + (trimmed.length > 40 ? "…" : "")
              : c.title,
            messages: [...c.messages, userMsg],
          };
        })
      );

      setLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const data = await api.sendMessage(chatId, trimmed, controller.signal);
        const responseText = data.response ?? "No response received.";

        // Backend now returns `is_guardrail`; fall back to heuristic
        const isGuardrail =
          data.is_guardrail ??
          (!responseText.includes("###") &&
            /\b(cannot|unable|not able|off-topic|inappropriate|restricted)\b/i.test(
              responseText
            ));

        if (isGuardrail) {
          setGuardrailMsg(responseText);
        }

        const assistantMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: responseText,
        };

        setChats((prev) =>
          prev.map((c) =>
            c.id === chatId
              ? { ...c, messages: [...c.messages, assistantMsg] }
              : c
          )
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          const cancelMsg: Message = {
            id: generateId(),
            role: "assistant",
            content:
              "🛑 **Research Cancelled**\n\nThe investigation was stopped by the user.",
          };
          setChats((prev) =>
            prev.map((c) =>
              c.id === chatId
                ? { ...c, messages: [...c.messages, cancelMsg] }
                : c
            )
          );
        } else {
          const errorMsg: Message = {
            id: generateId(),
            role: "assistant",
            content: `⚠️ **Connection Error**\n\nCould not reach the research backend. Make sure the FastAPI server is running at \`${API_BASE}\`.\n\n\`\`\`\nuvicorn main:app --reload\n\`\`\``,
          };
          setChats((prev) =>
            prev.map((c) =>
              c.id === chatId
                ? { ...c, messages: [...c.messages, errorMsg] }
                : c
            )
          );
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, currentChatId, chats]
  );

  const cancelRequest = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const dismissGuardrail = useCallback(() => setGuardrailMsg(null), []);
  const showToast = useCallback((msg: string) => setToastMsg(msg), []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        currentChat,
        loading,
        initialLoading,
        guardrailMsg,
        drawerOpen,
        searchQuery,
        toastMsg,
        createNewChat,
        selectChat,
        deleteChat: deleteChatAction,
        renameChat: renameChatAction,
        sendMessage: sendMessageAction,
        cancelRequest,
        setDrawerOpen,
        dismissGuardrail,
        setSearchQuery,
        showToast,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
