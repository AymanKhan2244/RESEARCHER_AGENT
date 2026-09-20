import re

def update_page():
    with open("c:\\PROJECTS\\RESEARCHER_AGENT\\ResearcherAIAgent\\frontend\\app\\page.tsx", "r", encoding="utf-8") as f:
        content = f.read()

    # Find where the return statement starts
    return_index = content.find("  return (\n    <div className=\"min-h-screen bg-surface")
    
    if return_index == -1:
        print("Could not find the return statement")
        return
        
    top_content = content[:return_index]
    
    # The new JSX structure
    new_jsx = """  return (
    <div className="bg-background font-body-md text-on-surface relative min-h-screen selection:bg-primary-container selection:text-on-primary-container flex">
      
      {/* ── Ambient glow orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-secondary-container/20 blur-[130px]"></div>
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-tertiary-container/10 blur-[140px]"></div>
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-surface-container/40 blur-[120px]"></div>
      </div>

      {/* ── Drawer backdrop (Mobile) ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-container-lowest/80 backdrop-blur-sm xl:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-surface-bright/40 z-50 flex flex-col justify-between shadow-[0_8px_32px_rgba(12,12,32,0.8)] transition-transform duration-300 ease-out xl:translate-x-0 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="h-16 px-space-md flex items-center justify-between border-b border-surface-bright/20">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">ResearchAI</span>
            </div>
            <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container-high text-secondary border border-outline-variant/40 uppercase">v2.4 Pro</span>
          </div>
          
          <div className="p-space-md">
            <button
              onClick={() => { handleNewChat(); setDrawerOpen(false); }}
              className="w-full flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-xl bg-gradient-to-r from-primary-container/20 via-tertiary-container/20 to-secondary-container/20 border border-primary-container/50 text-primary font-title-md text-title-md shadow-[0_0_20px_rgba(192,193,255,0.2)] hover:border-primary hover:shadow-[0_0_25px_rgba(192,193,255,0.35)] transition-all active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              <span>New Research</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-space-md space-y-space-md">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between px-space-xs py-space-xs">
                <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Recent Investigations</span>
                <span className="material-symbols-outlined text-outline text-[16px]">history</span>
              </div>
              <nav className="space-y-space-xs">
                {filteredChats.length === 0 && (
                  <p className="text-center text-outline text-[12px] py-4">No sessions found</p>
                )}
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => { handleSelectChat(chat.id); setDrawerOpen(false); }}
                    className={`group flex items-center justify-between px-space-sm py-space-sm rounded-lg transition-colors cursor-pointer ${
                      chat.id === currentChatId
                        ? "bg-surface-container-high text-primary font-title-md"
                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-space-sm truncate flex-1 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${chat.id === currentChatId ? 'bg-primary-container shadow-[0_0_8px_#c0c1ff]' : 'bg-surface-bright'}`}></span>
                      {editingChatId === chat.id ? (
                        <input
                          autoFocus
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onBlur={commitRename}
                          onKeyDown={(e) => e.key === "Enter" && commitRename()}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-surface-container-highest text-on-surface text-body-md rounded px-1 py-0.5 focus:outline-none min-w-0"
                        />
                      ) : (
                        <span className="font-body-md text-body-md truncate">{chat.title}</span>
                      )}
                    </div>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-0.5 shrink-0 ml-2">
                      <button
                        onClick={(e) => startRename(chat.id, chat.title, e)}
                        className="p-0.5 text-outline hover:text-on-surface"
                        title="Rename"
                      >
                        <span className="material-symbols-outlined text-[15px]">edit</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className="p-0.5 text-outline hover:text-error"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        <div className="p-space-md border-t border-surface-bright/30 space-y-space-md bg-surface-container-lowest/50">
          <div className="flex items-center justify-between px-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-container border-2 border-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm font-title-md text-on-surface truncate">Lead Investigator</span>
                <span className="font-label-sm text-label-sm text-outline truncate">Session Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Layout Workspace ── */}
      <div className="xl:pl-72 flex-1 flex flex-col min-h-screen relative w-full">
        <header className="fixed top-0 xl:left-72 left-0 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-bright/40 z-40 flex items-center justify-between px-space-md xl:px-space-lg shadow-[0_4px_24px_rgba(12,12,32,0.4)]">
          <div className="flex items-center gap-space-md flex-1 max-w-xl">
            <button
              onClick={() => setDrawerOpen(true)}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <button className="flex items-center justify-between w-full max-w-md px-space-md py-1.5 rounded-full bg-surface-container/60 border border-surface-bright text-on-surface-variant hover:border-primary-container/40 hover:text-on-surface transition-all" type="button">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-outline">search</span>
                <span className="font-body-sm text-body-sm text-outline">Quick jump to node, paper, or query...</span>
              </div>
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-variant font-label-sm text-label-sm text-secondary border border-outline-variant/50">⌘K</kbd>
            </button>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            {currentChat && currentChat.messages.length > 0 && (
              <div className="hidden lg:flex items-center gap-space-sm px-space-sm py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-md text-label-md text-secondary">Node Alpha-7 · Crawl Active</span>
              </div>
            )}
            <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded-lg bg-surface-container-low border border-surface-bright/50">
              <span className="font-label-sm text-label-sm text-outline">Depth:</span>
              <span className="px-1.5 py-0.5 rounded font-label-sm text-label-sm bg-primary-container text-on-primary-container font-title-md">L3 Deep</span>
            </div>
          </div>
        </header>

        {/* ── Guardrail toast ── */}
        {guardrailMsg && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md animate-slide-down">
            <div className="bg-error-container text-on-error-container rounded-xl p-space-sm shadow-2xl flex items-center justify-between gap-space-xs border border-error/20">
              <div className="flex items-center gap-space-xs min-w-0">
                <span className="material-symbols-outlined text-error text-[20px] shrink-0">warning</span>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-error tracking-tight">Guardrail Active</p>
                  <p className="text-[11px] text-on-error-container/80 line-clamp-2">{guardrailMsg}</p>
                </div>
              </div>
              <button
                onClick={() => setGuardrailMsg(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-error/20 text-on-error-container transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        <main className="relative pt-16 flex-1 w-full px-space-md sm:px-space-lg bg-surface/20 z-10">
          <div className="flex flex-col w-full h-[calc(100vh-64px)] relative">
            
            {/* Ambient Glow Canvas Accents */}
            <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute top-1/2 right-12 w-[32rem] h-[32rem] bg-secondary-container/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
            
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto pb-32 pt-space-lg no-scrollbar"
            >
              {isClient && currentChat ? (
                currentChat.messages.length === 0 ? (
                  <EmptyHero onSuggestion={handleSuggestion} />
                ) : (
                  <div className="flex flex-col gap-space-xl w-full max-w-6xl mx-auto">
                    {/* Header title for active chat */}
                    <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-space-md py-space-md mb-space-sm">
                      <div className="flex flex-col gap-space-xs">
                        <div className="flex items-center gap-2 text-outline">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Investigations</span>
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant truncate">Session #{currentChat.id.substring(0,6).toUpperCase()}</span>
                        </div>
                        <h1 className="font-headline-md text-headline-md text-primary tracking-tight">{currentChat.title}</h1>
                      </div>
                      <div className="flex flex-wrap items-center gap-space-sm">
                        <div className="flex items-center gap-2 px-space-sm py-1.5 rounded-full bg-surface-container-low/80 backdrop-blur-md shadow-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface">14 Crawlers Active</span>
                        </div>
                      </div>
                    </div>

                    {currentChat.messages.map((msg, i) =>
                      msg.role === "user" ? (
                        /* User Query Row */
                        <div key={i} className="flex justify-end w-full pl-8 md:pl-24 animate-slide-up mb-6">
                          <div className="relative max-w-2xl group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container/30 to-tertiary-container/30 rounded-2xl blur-sm group-hover:blur opacity-75 transition duration-500"></div>
                            <div className="relative flex flex-col gap-space-xs p-space-lg rounded-2xl bg-surface-container-high/90 backdrop-blur-xl shadow-xl">
                              <div className="flex items-center justify-between gap-4">
                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-1.5">
                                  <span className="material-symbols-outlined text-[14px]">psychology</span> Lead Query
                                </span>
                              </div>
                              <p className="font-body-lg text-body-lg text-on-background leading-relaxed whitespace-pre-wrap">
                                {msg.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <AssistantCard
                          key={i}
                          content={msg.content}
                          onCopy={() => {}}
                        />
                      )
                    )}

                    {loading && <ResearchingLoader />}
                  </div>
                )
              ) : (
                !isClient && <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary typing-dot"></span>
                    <span className="w-2 h-2 rounded-full bg-primary typing-dot"></span>
                    <span className="w-2 h-2 rounded-full bg-primary typing-dot"></span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sticky Bottom Command Bar Overlay ── */}
            <div className="absolute bottom-4 left-0 right-0 px-space-md sm:px-space-lg pointer-events-none z-40 flex flex-col items-center">
              <div className="w-full max-w-4xl pointer-events-auto flex flex-col gap-space-xs">
                
                {/* Main Input Capsule */}
                <div className="relative w-full rounded-2xl bg-surface-container-high/90 backdrop-blur-2xl shadow-2xl p-space-sm flex flex-col gap-2 border border-white/5 transition-all hover:border-white/10 focus-within:border-primary-container/50">
                  <div className="flex items-end gap-space-sm px-space-xs">
                    <button className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container-lowest transition-colors mb-1" title="Attach Document / Dataset" type="button">
                      <span className="material-symbols-outlined text-[20px]">attach_file</span>
                    </button>
                    
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      value={message}
                      onChange={handleTextareaChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Direct your next inquiry, request simulation code, or query cross-citations..."
                      disabled={loading}
                      className="flex-1 bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none py-2 resize-none max-h-32 disabled:opacity-50"
                    />
                    
                    <div className="flex items-center gap-space-xs mb-1">
                      {/* Deep Web Toggle */}
                      <button className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-container/40 text-secondary hover:bg-secondary-container/60 transition-all font-label-sm text-label-sm" type="button">
                        <span className="material-symbols-outlined text-[15px]">radar</span>
                        <span className="hidden md:inline">Deep Web</span>
                      </button>
                      
                      {/* Send Button */}
                      <button
                        onClick={handleSend}
                        disabled={!message.trim() || loading}
                        className={`flex items-center gap-1.5 px-space-md py-2 rounded-xl font-title-md text-title-md transition-all ${
                          message.trim() && !loading
                            ? "bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(192,193,255,0.45)] cursor-pointer active:scale-95"
                            : "bg-surface-container-highest text-outline cursor-not-allowed opacity-50"
                        }`}
                      >
                        {loading ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-current typing-dot"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-current typing-dot"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-current typing-dot"></span>
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">Investigate</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
"""

    with open("c:\\PROJECTS\\RESEARCHER_AGENT\\ResearcherAIAgent\\frontend\\app\\page.tsx", "w", encoding="utf-8") as f:
        f.write(top_content + new_jsx)

    print("Successfully patched page.tsx")

if __name__ == "__main__":
    update_page()
