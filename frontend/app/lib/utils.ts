/* ─────────────────────────────────────────
   Utilities — Researcher AI Agent
───────────────────────────────────────── */

import type { Chat } from "./types";

/** Generate a unique ID (used for client-side message IDs). */
export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Detect the user's OS for keyboard shortcut display. */
export function getOS(): "mac" | "windows" | "linux" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

/** Return the correct modifier key label for the user's OS. */
export function getModKey(): string {
  return getOS() === "mac" ? "⌘" : "Ctrl";
}

/** Group chats by recency for the sidebar. */
export function groupChatsByDate(
  chats: Chat[]
): { label: string; chats: Chat[] }[] {
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const today = todayStart.getTime();
  const yesterday = today - 86_400_000;
  const lastWeek = today - 7 * 86_400_000;

  const groups: Record<string, Chat[]> = {
    Today: [],
    Yesterday: [],
    "Previous 7 Days": [],
    Older: [],
  };

  for (const chat of chats) {
    const ts = chat.created_at;
    if (ts >= today) groups["Today"].push(chat);
    else if (ts >= yesterday) groups["Yesterday"].push(chat);
    else if (ts >= lastWeek) groups["Previous 7 Days"].push(chat);
    else groups["Older"].push(chat);
  }

  // Only return non-empty groups
  return Object.entries(groups)
    .filter(([, list]) => list.length > 0)
    .map(([label, list]) => ({ label, chats: list }));
}

/** Download a string as a Markdown file. */
export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/** Format an entire chat as a Markdown document for export. */
export function chatToMarkdown(chat: Chat): string {
  const lines: string[] = [
    `# ${chat.title}`,
    ``,
    `*Exported from ResearchAI — ${new Date().toLocaleString()}*`,
    ``,
    `---`,
    ``,
  ];

  for (const msg of chat.messages) {
    if (msg.role === "user") {
      lines.push(`## 🔍 Query`);
      lines.push(``);
      lines.push(msg.content);
    } else {
      lines.push(`## 🧪 Research Summary`);
      lines.push(``);
      lines.push(msg.content);
    }
    lines.push(``);
    lines.push(`---`);
    lines.push(``);
  }

  return lines.join("\n");
}

/** Format elapsed seconds into a human string like "12s" or "1m 04s". */
export function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec.toString().padStart(2, "0")}s`;
}
