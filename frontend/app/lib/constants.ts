/* ─────────────────────────────────────────
   Constants — Researcher AI Agent
───────────────────────────────────────── */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const API_CHAT_URL = `${API_BASE}/chat`;

export const SUGGESTIONS = [
  {
    emoji: "✨",
    label: "Latest AI breakthroughs 2026",
    query: "Latest AI breakthroughs 2026",
  },
  {
    emoji: "🌱",
    label: "Climate carbon capture updates",
    query: "Climate carbon capture research updates",
  },
  {
    emoji: "🔬",
    label: "Quantum computing synthesis",
    query: "Quantum computing synthesis latest research",
  },
  {
    emoji: "🧠",
    label: "Neural interface research",
    query: "Neural interface brain computer interface research 2026",
  },
];

/**
 * Research pipeline stages — matches the real LangGraph workflow:
 * guardrail → llm (tool-calling) → tools (Tavily search) → image_search → final_llm
 */
export const RESEARCH_STAGES = [
  { label: "Validating query through guardrails", icon: "verified_user", durationMs: 3000 },
  { label: "Calling search tools via Tavily", icon: "travel_explore", durationMs: 8000 },
  { label: "Fetching related images & media", icon: "image_search", durationMs: 5000 },
  { label: "Synthesizing executive summary", icon: "auto_awesome", durationMs: 12000 },
];
