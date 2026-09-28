"use client";

/* ─────────────────────────────────────────
   Empty Hero — shown when a chat has no messages
───────────────────────────────────────── */

import { SUGGESTIONS } from "../lib/constants";

export default function EmptyHero({
  onSuggestion,
}: {
  onSuggestion: (q: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-gutter-sm text-center relative z-10">
      {/* Glow icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-2xl scale-150 animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="relative w-24 h-24 rounded-3xl bg-surface-container-high border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl">
          <span className="material-symbols-outlined text-primary text-[48px]">
            travel_explore
          </span>
        </div>
      </div>

      <h1 className="font-display-md text-display-md font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary">
        What do you want to research?
      </h1>

      <p className="text-on-surface-variant font-body-lg text-body-lg mb-10 max-w-md mx-auto">
        Deep web synthesis, real-time autonomous crawling, and multi-source
        correlation — powered by LangGraph &amp; Tavily.
      </p>

      {/* Suggestion pills */}
      <div
        className="flex flex-wrap gap-3 justify-center max-w-2xl"
        role="list"
        aria-label="Suggested research topics"
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s.query}
            onClick={() => onSuggestion(s.query)}
            className="px-space-md py-2.5 rounded-full bg-surface-container-high/80 backdrop-blur-md border border-white/5 text-on-surface-variant hover:text-primary hover:bg-surface-bright hover:border-white/10 transition-all font-label-md text-label-md shadow-md hover:shadow-lg active:scale-95"
            role="listitem"
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
