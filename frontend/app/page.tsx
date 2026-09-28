"use client";

/* ─────────────────────────────────────────
   Home — page orchestrator
   ≈60 lines vs the original 806-line monolith
───────────────────────────────────────── */

import { useState, useEffect, useCallback } from "react";
import { ChatProvider, useChatContext } from "./context/ChatContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatArea from "./components/ChatArea";
import InputBar from "./components/InputBar";
import GuardrailToast from "./components/GuardrailToast";
import CopyToast from "./components/CopyToast";
import CommandPalette from "./components/CommandPalette";

/* ── Inner layout (needs context) ── */
function AppShell() {
  const { sendMessage } = useChatContext();
  const [message, setMessage] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);

  /* ⌘K / Ctrl+K global shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSuggestion = useCallback(
    (q: string) => {
      setMessage(q);
    },
    []
  );

  return (
    <div className="bg-background font-body-md text-on-surface relative min-h-screen selection:bg-primary-container selection:text-on-primary-container flex">
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-secondary-container/20 blur-[130px]" />
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-tertiary-container/10 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-surface-container/40 blur-[120px]" />
      </div>

      <Sidebar />

      {/* Main workspace */}
      <div className="xl:pl-72 flex-1 flex flex-col min-h-screen relative w-full">
        <ChatHeader onOpenCommandPalette={() => setPaletteOpen(true)} />
        <GuardrailToast />
        <CopyToast />

        <main className="relative pt-16 flex-1 w-full px-space-md sm:px-space-lg bg-surface/20 z-10">
          <div className="flex flex-col w-full h-[calc(100vh-64px)] relative">
            {/* Ambient accents */}
            <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-1/2 right-12 w-[32rem] h-[32rem] bg-secondary-container/15 rounded-full blur-[140px] pointer-events-none -z-10" />

            <ChatArea onSuggestion={handleSuggestion} />
            <InputBar message={message} setMessage={setMessage} />
          </div>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}

/* ── Export ── */
export default function Home() {
  return (
    <ErrorBoundary>
      <ChatProvider>
        <AppShell />
      </ChatProvider>
    </ErrorBoundary>
  );
}
