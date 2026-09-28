"use client";

/* ─────────────────────────────────────────
   Sidebar — chat history + navigation
───────────────────────────────────────── */

import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { groupChatsByDate } from "../lib/utils";

export default function Sidebar() {
  const {
    chats,
    currentChatId,
    searchQuery,
    setSearchQuery,
    createNewChat,
    selectChat,
    deleteChat,
    renameChat,
    drawerOpen,
    setDrawerOpen,
  } = useChatContext();

  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);

  /* Filtering + grouping */
  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const groups = groupChatsByDate(filtered);

  /* Handlers */
  const startRename = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(id);
    setEditingTitle(title);
  };

  const commitRename = async () => {
    if (!editingChatId) return;
    const id = editingChatId;
    const title = editingTitle;
    setEditingChatId(null);
    await renameChat(id, title);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deletingChatId === id) {
      await deleteChat(id);
      setDeletingChatId(null);
    } else {
      setDeletingChatId(id);
      setTimeout(() => setDeletingChatId(null), 2000);
    }
  };

  return (
    <>
      {/* Backdrop (mobile) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-container-lowest/80 backdrop-blur-sm xl:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-surface-bright/40 z-50 flex flex-col shadow-[0_8px_32px_rgba(12,12,32,0.8)] transition-transform duration-300 ease-out xl:translate-x-0 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="navigation"
        aria-label="Chat history sidebar"
      >
        {/* ── Brand header ── */}
        <div className="h-16 px-space-md flex items-center justify-between border-b border-surface-bright/20 shrink-0">
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
            ResearchAI
          </span>
          <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container-high text-secondary border border-outline-variant/40 uppercase">
            v2.4
          </span>
        </div>

        {/* ── New chat button ── */}
        <div className="p-space-md shrink-0">
          <button
            onClick={() => {
              createNewChat();
              setDrawerOpen(false);
            }}
            className="w-full flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-xl bg-gradient-to-r from-primary-container/20 via-tertiary-container/20 to-secondary-container/20 border border-primary-container/50 text-primary font-title-md text-title-md shadow-[0_0_20px_rgba(192,193,255,0.2)] hover:border-primary hover:shadow-[0_0_25px_rgba(192,193,255,0.35)] transition-all active:scale-95"
            type="button"
            aria-label="Start new research chat"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              auto_awesome
            </span>
            <span>New Research</span>
          </button>
        </div>

        {/* ── Search input ── */}
        <div className="px-space-md pb-space-sm shrink-0">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-outline pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats…"
              className="w-full bg-surface-container/60 border border-surface-bright/50 rounded-lg pl-9 pr-3 py-1.5 text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/30 transition-all"
              aria-label="Search chat history"
            />
          </div>
        </div>

        {/* ── Chat list ── */}
        <div className="flex-1 overflow-y-auto px-space-md pb-space-md scrollbar-thin">
          {groups.length === 0 && (
            <p className="text-center text-outline text-[12px] py-8">
              {searchQuery ? "No matching chats" : "No sessions yet"}
            </p>
          )}
          {groups.map((group) => (
            <div key={group.label} className="mb-space-md">
              <div className="flex items-center gap-space-xs px-space-xs py-space-xs mb-space-xs">
                <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">
                  {group.label}
                </span>
              </div>
              <nav className="space-y-space-xs" aria-label={`${group.label} chats`}>
                {group.chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      selectChat(chat.id);
                      setDrawerOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectChat(chat.id);
                        setDrawerOpen(false);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-current={chat.id === currentChatId ? "page" : undefined}
                    className={`group flex items-center justify-between px-space-sm py-space-sm rounded-lg transition-colors cursor-pointer ${
                      chat.id === currentChatId
                        ? "bg-surface-container-high text-primary font-title-md"
                        : "text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-space-sm truncate flex-1 min-w-0">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          chat.id === currentChatId
                            ? "bg-primary-container shadow-[0_0_8px_#c0c1ff]"
                            : "bg-surface-bright"
                        }`}
                      />
                      {editingChatId === chat.id ? (
                        <input
                          autoFocus
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onBlur={commitRename}
                          onKeyDown={(e) => e.key === "Enter" && commitRename()}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-surface-container-highest text-on-surface text-body-md rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary-container/50 min-w-0"
                          aria-label="Rename chat"
                        />
                      ) : (
                        <span className="font-body-md text-body-md truncate">
                          {chat.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity gap-0.5 shrink-0 ml-2">
                      <button
                        onClick={(e) => startRename(chat.id, chat.title, e)}
                        className="p-0.5 text-outline hover:text-on-surface rounded transition-colors"
                        title="Rename"
                        aria-label={`Rename "${chat.title}"`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={(e) => handleDelete(chat.id, e)}
                        className={`p-0.5 rounded transition-colors ${
                          deletingChatId === chat.id
                            ? "text-error"
                            : "text-outline hover:text-error"
                        }`}
                        title={
                          deletingChatId === chat.id
                            ? "Click again to confirm"
                            : "Delete"
                        }
                        aria-label={
                          deletingChatId === chat.id
                            ? `Confirm delete "${chat.title}"`
                            : `Delete "${chat.title}"`
                        }
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {deletingChatId === chat.id
                            ? "delete_forever"
                            : "delete"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* ── User badge ── */}
        <div className="p-space-md border-t border-surface-bright/30 bg-surface-container-lowest/50 shrink-0">
          <div className="flex items-center gap-space-sm px-space-xs">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container border-2 border-surface-container-lowest" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-body-sm text-body-sm text-on-surface truncate">
                Lead Investigator
              </span>
              <span className="font-label-sm text-label-sm text-outline truncate">
                Session Active
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
