"use client";

/* ─────────────────────────────────────────
   User Message — right-aligned query card
───────────────────────────────────────── */

export default function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end w-full pl-8 md:pl-24 animate-slide-up mb-6">
      <div className="relative max-w-2xl group">
        {/* Gradient border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container/30 to-tertiary-container/30 rounded-2xl blur-sm group-hover:blur opacity-75 transition duration-500" />
        <div className="relative flex flex-col gap-space-xs p-space-lg rounded-2xl bg-surface-container-high/90 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-4">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">
                psychology
              </span>
              Query
            </span>
          </div>
          <p className="font-body-lg text-body-lg text-on-background leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
