/* ─────────────────────────────────────────
   Types — Researcher AI Agent
───────────────────────────────────────── */

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  created_at: number;
};

export type ApiChatResponse = {
  response: string;
  is_guardrail?: boolean;
};
