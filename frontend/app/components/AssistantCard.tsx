"use client";

/* ─────────────────────────────────────────
   Assistant Card — AI response with markdown
───────────────────────────────────────── */

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatContext } from "../context/ChatContext";
import { downloadMarkdown } from "../lib/utils";

export default function AssistantCard({ content }: { content: string }) {
  const { showToast } = useChatContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      showToast("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExport = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadMarkdown(content, `research-${timestamp}.md`);
    showToast("Exported as Markdown");
  };

  return (
    <div className="flex flex-col gap-space-md w-full animate-slide-up mb-6">
      <div className="relative rounded-2xl bg-surface-container/80 backdrop-blur-2xl shadow-2xl p-space-lg md:p-8 flex flex-col gap-space-lg border border-white/5">
        {/* Agent header */}
        <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-md bg-surface-container-low/40 rounded-xl px-space-md py-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary-container/20">
              <span className="material-symbols-outlined text-on-primary text-[20px]">
                science
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-title-md text-title-md text-primary font-semibold">
                  Research Summary
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-outline">
                Cross-referenced against web sources &amp; live data
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-space-sm py-1 rounded-lg bg-surface-bright/50 text-on-surface hover:text-primary transition-all font-label-md text-label-md"
              title="Copy raw Markdown"
              type="button"
              aria-label="Copy response to clipboard"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? "check" : "content_copy"}
              </span>
              <span className="hidden sm:inline">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-space-sm py-1 rounded-lg bg-surface-bright/50 text-on-surface hover:text-primary transition-all font-label-md text-label-md"
              title="Export as Markdown file"
              type="button"
              aria-label="Export response as Markdown file"
            >
              <span className="material-symbols-outlined text-[16px]">
                download
              </span>
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Markdown content */}
        <div className="prose-research">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || "Research image"}
                  className="w-full max-h-64 object-cover rounded-xl border border-white/10 my-4 shadow-lg"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ),
              h2: ({ children }) => (
                <div className="flex items-center gap-2 mt-6 mb-3">
                  <span className="text-xl">🔬</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-semibold m-0">
                    {children}
                  </h2>
                </div>
              ),
              h3: ({ children }) => (
                <h3 className="flex items-center gap-2 text-base font-semibold text-primary-fixed-dim mt-5 mb-2 p-2.5 pl-3 bg-primary/5 border-l-[3px] border-primary-container rounded-r-lg font-headline-sm">
                  <span>{children}</span>
                </h3>
              ),
              pre: ({ children }) => (
                <div className="rounded-xl bg-surface-container-lowest shadow-2xl overflow-hidden my-4 border border-white/5">
                  <div className="flex items-center justify-between px-space-md py-space-sm bg-surface-container-low/90 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-error-container/90" />
                        <div className="w-3 h-3 rounded-full bg-tertiary-container/80" />
                        <div className="w-3 h-3 rounded-full bg-secondary-container" />
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant ml-2 font-mono">
                        snippet
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md overflow-x-auto text-[13px] font-mono leading-relaxed bg-surface-container-lowest text-on-surface">
                    {children}
                  </div>
                </div>
              ),
              code: ({ className, children }) => {
                if (className)
                  return <code className={className}>{children}</code>;
                return (
                  <code className="bg-surface-container-highest/60 text-secondary-fixed px-1.5 py-0.5 rounded-md font-mono text-[13px]">
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
