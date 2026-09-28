"use client";

/* ─────────────────────────────────────────
   Command Palette — ⌘K / Ctrl+K quick nav
───────────────────────────────────────── */

import { useState, useEffect, useRef, useMemo } from "react";
import { useChatContext } from "../context/ChatContext";
import { SUGGESTIONS } from "../lib/constants";
import { getModKey } from "../lib/utils";

type PaletteItem = {
  type: "chat" | "suggestion" | "action";
  id: string;
  label: string;
  emoji?: string;
  icon?: string;
};

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { chats, selectChat, sendMessage, createNewChat } = useChatContext();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modKey = getModKey();

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Small delay to ensure the input is rendered
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Build filtered results */
  const results = useMemo(() => {
    const items: PaletteItem[] = [];
    const q = query.toLowerCase();

    // Actions
    if (!q || "new research".includes(q)) {
      items.push({
        type: "action",
        id: "new-chat",
        label: "New Research",
        icon: "auto_awesome",
      });
    }

    // Recent chats
    chats
      .filter((c) => c.title.toLowerCase().includes(q))
      .slice(0, 6)
      .forEach((c) =>
        items.push({
          type: "chat",
          id: c.id,
          label: c.title,
          icon: "chat_bubble",
        })
      );

    // Suggestions
    SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(q)).forEach((s) =>
      items.push({
        type: "suggestion",
        id: s.query,
        label: s.label,
        emoji: s.emoji,
      })
    );

    return items;
  }, [query, chats]);

  /* Clamp selection when results change */
  useEffect(() => {
    setSelectedIndex((i) => Math.min(i, Math.max(0, results.length - 1)));
  }, [results]);

  /* Handle selection */
  const handleSelect = async (item: PaletteItem) => {
    onClose();
    switch (item.type) {
      case "chat":
        selectChat(item.id);
        break;
      case "suggestion":
        await sendMessage(item.id);
        break;
      case "action":
        if (item.id === "new-chat") await createNewChat();
        break;
    }
  };

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-surface-container-lowest/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette */}
      <div
        className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[70] w-[92vw] max-w-lg animate-slide-down"
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
      >
        <div className="rounded-2xl bg-surface-container-high/95 backdrop-blur-2xl border border-white/10 shadow-[0_16px_64px_rgba(12,12,32,0.8)] overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-space-sm px-space-lg py-space-md border-b border-surface-bright/30">
            <span className="material-symbols-outlined text-outline text-[20px]">
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search chats, queries, or run a command…"
              className="flex-1 bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none"
              aria-label="Command palette search"
              autoComplete="off"
            />
            <kbd className="px-1.5 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-outline border border-outline-variant/50">
              Esc
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto py-space-sm scrollbar-thin">
            {results.length === 0 && (
              <p className="px-space-lg py-space-md text-outline font-body-sm text-body-sm text-center">
                No results found
              </p>
            )}

            {results.map((item, i) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-space-sm px-space-lg py-space-sm text-left transition-colors ${
                  i === selectedIndex
                    ? "bg-primary-container/15 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-highest/50"
                }`}
                role="option"
                aria-selected={i === selectedIndex}
              >
                {item.emoji ? (
                  <span className="text-[16px] w-6 text-center shrink-0">
                    {item.emoji}
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[18px] w-6 text-center shrink-0 text-outline">
                    {item.icon}
                  </span>
                )}
                <span className="font-body-md text-body-md truncate flex-1">
                  {item.label}
                </span>
                <span className="font-label-sm text-label-sm text-outline capitalize shrink-0">
                  {item.type === "chat"
                    ? "Open"
                    : item.type === "suggestion"
                    ? "Research"
                    : "Action"}
                </span>
              </button>
            ))}
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-space-lg py-space-sm border-t border-surface-bright/20 text-outline">
            <div className="flex items-center gap-space-md font-label-sm text-label-sm">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-surface-variant border border-outline-variant/40 text-[9px]">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-surface-variant border border-outline-variant/40 text-[9px]">
                  ↵
                </kbd>
                Select
              </span>
            </div>
            <span className="font-label-sm text-label-sm">
              {modKey}+K to toggle
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
