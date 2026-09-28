"use client";

/* ─────────────────────────────────────────
   Guardrail Toast — policy-violation alert
───────────────────────────────────────── */

import { useChatContext } from "../context/ChatContext";

export default function GuardrailToast() {
  const { guardrailMsg, dismissGuardrail } = useChatContext();

  if (!guardrailMsg) return null;

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md animate-slide-down"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-error-container text-on-error-container rounded-xl p-space-sm shadow-2xl flex items-center justify-between gap-space-xs border border-error/20">
        <div className="flex items-center gap-space-xs min-w-0">
          <span className="material-symbols-outlined text-error text-[20px] shrink-0">
            warning
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-error tracking-tight">
              Guardrail Active
            </p>
            <p className="text-[11px] text-on-error-container/80 line-clamp-2">
              {guardrailMsg}
            </p>
          </div>
        </div>
        <button
          onClick={dismissGuardrail}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-error/20 text-on-error-container transition-colors shrink-0"
          aria-label="Dismiss guardrail notification"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
