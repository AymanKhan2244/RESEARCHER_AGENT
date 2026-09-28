"use client";

/* ─────────────────────────────────────────
   Copy Toast — brief success notification
───────────────────────────────────────── */

import { useChatContext } from "../context/ChatContext";

export default function CopyToast() {
  const { toastMsg } = useChatContext();

  if (!toastMsg) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-full bg-surface-container-highest/95 backdrop-blur-xl border border-white/10 shadow-2xl">
        <span className="material-symbols-outlined text-secondary text-[18px]">
          check_circle
        </span>
        <span className="font-label-md text-label-md text-on-surface">
          {toastMsg}
        </span>
      </div>
    </div>
  );
}
