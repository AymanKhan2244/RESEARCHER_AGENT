"use client";

/* ─────────────────────────────────────────
   Input Bar — sticky bottom command input
───────────────────────────────────────── */

import { useRef } from "react";
import { useChatContext } from "../context/ChatContext";

export default function InputBar({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (v: string) => void;
}) {
  const { loading, sendMessage } = useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 px-space-md sm:px-space-lg pointer-events-none z-40 flex flex-col items-center">
      <div className="w-full max-w-4xl pointer-events-auto flex flex-col gap-space-xs">
        {/* Main input capsule */}
        <div className="relative w-full rounded-2xl bg-surface-container-high/90 backdrop-blur-2xl shadow-2xl p-space-sm flex flex-col gap-2 border border-white/5 transition-all hover:border-white/10 focus-within:border-primary-container/50">
          <div className="flex items-end gap-space-sm px-space-xs">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your research query…"
              disabled={loading}
              className="flex-1 bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none py-2 resize-none max-h-32 disabled:opacity-50"
              aria-label="Research query input"
            />

            <div className="flex items-center gap-space-xs mb-1">
              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!message.trim() || loading}
                className={`flex items-center gap-1.5 px-space-md py-2 rounded-xl font-title-md text-title-md transition-all ${
                  message.trim() && !loading
                    ? "bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(192,193,255,0.45)] cursor-pointer active:scale-95"
                    : "bg-surface-container-highest text-outline cursor-not-allowed opacity-50"
                }`}
                aria-label={loading ? "Research in progress" : "Send query"}
              >
                {loading ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-current typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current typing-dot" />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Investigate</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_upward
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hint text */}
        <p className="text-center font-label-sm text-label-sm text-outline/60 px-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
