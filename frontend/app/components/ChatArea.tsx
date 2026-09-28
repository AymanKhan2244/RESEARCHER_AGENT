"use client";

/* ─────────────────────────────────────────
   Chat Area — message list + empty state
───────────────────────────────────────── */

import { useEffect, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
import EmptyHero from "./EmptyHero";
import UserMessage from "./UserMessage";
import AssistantCard from "./AssistantCard";
import ResearchingLoader from "./ResearchingLoader";

export default function ChatArea({
  onSuggestion,
}: {
  onSuggestion: (q: string) => void;
}) {
  const { currentChat, loading, initialLoading } = useChatContext();
  const containerRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom when messages change */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentChat?.messages.length, loading]);

  /* Initial loading state */
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-space-md">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary typing-dot" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary typing-dot" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary typing-dot" />
          </div>
          <span className="font-label-sm text-label-sm text-outline">
            Loading sessions…
          </span>
        </div>
      </div>
    );
  }

  if (!currentChat) return null;

  /* Empty state */
  if (currentChat.messages.length === 0) {
    return <EmptyHero onSuggestion={onSuggestion} />;
  }

  /* Message list */
  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto pb-32 pt-space-lg scrollbar-thin"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="flex flex-col gap-space-xl w-full max-w-6xl mx-auto">
        {/* Chat header */}
        <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-space-md py-space-md mb-space-sm">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Investigations
              </span>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Session #{currentChat.id.substring(0, 6).toUpperCase()}
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">
              {currentChat.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-2 px-space-sm py-1.5 rounded-full bg-surface-container-low/80 backdrop-blur-md shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-secondary">
                forum
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                {currentChat.messages.length} messages
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        {currentChat.messages.map((msg) =>
          msg.role === "user" ? (
            <UserMessage key={msg.id} content={msg.content} />
          ) : (
            <AssistantCard key={msg.id} content={msg.content} />
          )
        )}

        {loading && <ResearchingLoader />}
      </div>
    </div>
  );
}
