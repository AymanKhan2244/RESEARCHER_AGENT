"use client";

/* ─────────────────────────────────────────
   Chat Header — top bar with controls
───────────────────────────────────────── */

import { useChatContext } from "../context/ChatContext";
import { getModKey } from "../lib/utils";

export default function ChatHeader({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette: () => void;
}) {
  const { currentChat, loading, setDrawerOpen } = useChatContext();
  const modKey = getModKey();

  return (
    <header
      className="fixed top-0 xl:left-72 left-0 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-bright/40 z-40 flex items-center justify-between px-space-md xl:px-space-lg shadow-[0_4px_24px_rgba(12,12,32,0.4)]"
      role="banner"
    >
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        {/* Mobile hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors shrink-0"
          aria-label="Open sidebar"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Command palette trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center justify-between w-full max-w-md px-space-md py-1.5 rounded-full bg-surface-container/60 border border-surface-bright text-on-surface-variant hover:border-primary-container/40 hover:text-on-surface transition-all"
          type="button"
          aria-label={`Open command palette (${modKey}+K)`}
        >
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[18px] text-outline">
              search
            </span>
            <span className="font-body-sm text-body-sm text-outline">
              Search chats, run a query…
            </span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-secondary border border-outline-variant/50">
            {modKey}+K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-space-md shrink-0">
        {/* Live status — only shown during active research */}
        {loading && (
          <div className="hidden lg:flex items-center gap-space-sm px-space-sm py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-label-md text-label-md text-secondary">
              Researching…
            </span>
          </div>
        )}

        {/* Message count */}
        {currentChat && currentChat.messages.length > 0 && (
          <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded-lg bg-surface-container-low border border-surface-bright/50">
            <span className="font-label-sm text-label-sm text-outline">
              Messages:
            </span>
            <span className="px-1.5 py-0.5 rounded font-label-sm text-label-sm bg-primary-container text-on-primary-container font-title-md">
              {currentChat.messages.length}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
