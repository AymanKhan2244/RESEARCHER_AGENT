"use client";

/* ─────────────────────────────────────────
   Researching Loader — animated skeleton
   with real stage progression
───────────────────────────────────────── */

import { useState, useEffect, useRef } from "react";
import { RESEARCH_STAGES } from "../lib/constants";
import { formatElapsed } from "../lib/utils";
import { useChatContext } from "../context/ChatContext";

export default function ResearchingLoader() {
  const { cancelRequest } = useChatContext();
  const [stageIndex, setStageIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());

  /* Cycle through stages on a timer */
  useEffect(() => {
    const stage = RESEARCH_STAGES[stageIndex];
    if (!stage || stageIndex >= RESEARCH_STAGES.length - 1) return;

    const timer = setTimeout(() => {
      setStageIndex((i) => Math.min(i + 1, RESEARCH_STAGES.length - 1));
    }, stage.durationMs);

    return () => clearTimeout(timer);
  }, [stageIndex]);

  /* Elapsed timer */
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime.current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentStage = RESEARCH_STAGES[stageIndex];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-surface-container-low/60 backdrop-blur-xl p-space-lg shadow-xl mb-4"
      role="status"
      aria-live="polite"
      aria-label="Research in progress"
    >
      {/* Neon scan line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer_2s_infinite] shadow-[0_0_12px_#c0c1ff]" />

      <div className="flex flex-col gap-space-md">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-space-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-container" />
            </span>
            <span className="font-title-md text-title-md text-primary font-semibold">
              {currentStage?.label ?? "Processing…"}
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-label-md text-label-md text-secondary font-mono">
              Stage {stageIndex + 1} of {RESEARCH_STAGES.length}
            </span>
            <span className="font-label-md text-label-md text-outline font-mono">
              {formatElapsed(elapsed)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-surface-container-highest/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-container to-secondary transition-all duration-700 ease-out"
            style={{
              width: `${((stageIndex + 1) / RESEARCH_STAGES.length) * 100}%`,
            }}
          />
        </div>

        {/* Skeleton lines */}
        <div className="flex flex-col gap-3 py-1">
          <div className="w-full h-3 rounded-full bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container animate-pulse" />
          <div
            className="w-4/5 h-3 rounded-full bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2/3 h-3 rounded-full bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Stage indicators + cancel */}
        <div className="flex flex-wrap items-center justify-between gap-space-md mt-2">
          <div className="flex flex-wrap items-center gap-space-md text-outline font-label-sm text-label-sm">
            {RESEARCH_STAGES.map((stage, i) => (
              <span
                key={stage.label}
                className={`flex items-center gap-1 transition-colors ${
                  i < stageIndex
                    ? "text-secondary"
                    : i === stageIndex
                    ? "text-primary animate-pulse"
                    : "text-outline/50"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {i < stageIndex
                    ? "check_circle"
                    : i === stageIndex
                    ? "sync"
                    : "radio_button_unchecked"}
                </span>
                <span className="hidden sm:inline">
                  {stage.label.split(" ").slice(0, 2).join(" ")}
                </span>
              </span>
            ))}
          </div>

          <button
            onClick={cancelRequest}
            className="flex items-center gap-1 px-space-sm py-1 rounded-lg bg-error-container/20 text-error hover:bg-error-container/40 transition-all font-label-sm text-label-sm active:scale-95"
            type="button"
            aria-label="Cancel research"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
