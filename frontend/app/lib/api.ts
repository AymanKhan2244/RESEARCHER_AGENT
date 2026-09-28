/* ─────────────────────────────────────────
   API Client — Researcher AI Agent
───────────────────────────────────────── */

import { API_BASE } from "./constants";
import { generateId } from "./utils";
import type { Chat, ApiChatResponse } from "./types";

/** Normalise a backend chat payload — adds client-side IDs to messages. */
function normaliseChat(raw: Record<string, unknown>): Chat {
  const messages = Array.isArray(raw.messages) ? raw.messages : [];
  return {
    id: raw.id as string,
    title: raw.title as string,
    created_at: (raw.created_at ?? 0) as number,
    messages: messages.map((m: Record<string, string>) => ({
      id: generateId(),
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  };
}

/** Fetch all chats from the backend. */
export async function fetchChats(): Promise<Chat[]> {
  const res = await fetch(`${API_BASE}/chats`);
  if (!res.ok) throw new Error(`Failed to fetch chats: ${res.status}`);
  const data: Record<string, unknown>[] = await res.json();
  return data.map(normaliseChat);
}

/** Create a new empty chat. */
export async function createChat(): Promise<Chat> {
  const res = await fetch(`${API_BASE}/chats`, { method: "POST" });
  if (!res.ok) throw new Error(`Failed to create chat: ${res.status}`);
  return normaliseChat(await res.json());
}

/** Delete a chat by ID. */
export async function deleteChat(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/chats/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete chat: ${res.status}`);
}

/** Rename a chat. */
export async function renameChat(id: string, title: string): Promise<void> {
  const res = await fetch(`${API_BASE}/chats/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error(`Failed to rename chat: ${res.status}`);
}

/** Send a message and get the AI response. Supports AbortController. */
export async function sendMessage(
  chatId: string,
  message: string,
  signal?: AbortSignal
): Promise<ApiChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, chat_id: chatId }),
    signal,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
