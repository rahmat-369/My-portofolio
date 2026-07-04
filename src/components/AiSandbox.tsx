import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, RefreshCw, AlertCircle, Zap, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

// Interactive markdown and URL parser
function parseMarkdownToReact(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  
  return lines.map((line, lineIdx) => {
    let elements: React.ReactNode[] = [];
    let currentText = line;
    let keyIndex = 0;

    // Tokenize: markdown links, bold text, and raw URLs
    const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(https?:\/\/[^\s)]+)/g;
    
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(currentText)) !== null) {
      const matchIndex = match.index;
      
      // Append preceding plain text
      if (matchIndex > lastIndex) {
        elements.push(currentText.substring(lastIndex, matchIndex));
      }

      if (match[1]) {
        // Markdown Link [Label](url)
        const label = match[2];
        const url = match[3];
        elements.push(
          <a
            key={`link-${lineIdx}-${keyIndex++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer break-all"
          >
            {label}
          </a>
        );
      } else if (match[4]) {
        // Bold text **text**
        const boldText = match[5];
        elements.push(
          <strong key={`bold-${lineIdx}-${keyIndex++}`} className="font-bold text-white tracking-wide">
            {boldText}
          </strong>
        );
      } else if (match[6]) {
        // Raw URL https://...
        const rawUrl = match[6];
        let cleanUrl = rawUrl;
        let trailing = "";
        if (cleanUrl.endsWith(".") || cleanUrl.endsWith(",")) {
          trailing = cleanUrl.slice(-1);
          cleanUrl = cleanUrl.slice(0, -1);
        }
        elements.push(
          <a
            key={`rawlink-${lineIdx}-${keyIndex++}`}
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer break-all"
          >
            {cleanUrl}
          </a>
        );
        if (trailing) {
          elements.push(trailing);
        }
      }

      lastIndex = regex.lastIndex;
    }

    // Append remaining text
    if (lastIndex < currentText.length) {
      elements.push(currentText.substring(lastIndex));
    }

    return (
      <div key={lineIdx} className="min-h-[1.25rem] leading-relaxed mb-1">
        {elements.length > 0 ? elements : " "}
      </div>
    );
  });
}

export default function AiSandbox() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { 
      role: "assistant", 
      text: "Halo! Saya adalah Digital Twin dari R_HMT, dijalankan dengan Gemini AI. Saya dapat membantu menjawab pertanyaan tentang:\n\n- Eksplorasi teknologi R_HMT\n- Produk & project yang dibuat (TugasKu Pro, HD Upscaler, dll)\n- Filosofi coding & approach dalam building\n- Tech stack & ecosystem tools\n- Learning journey & pengalaman\n\nTanyakan apapun! Apa yang ingin kamu ketahui?" 
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [thinkingProcess, setThinkingProcess] = useState<string[]>([]);
  const [avatarError, setAvatarError] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, thinkingProcess]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsgText = chatInput;
    setChatInput("");
    const updatedHistory: Message[] = [...chatHistory, { role: "user", text: userMsgText }];
    setChatHistory(updatedHistory);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory })
      });

      if (!res.ok) throw new Error("Thinking engine encountered an error");
      const data = await res.json();
      
      setChatHistory(prev => [...prev, { role: "assistant", text: data.text || "Maaf, saya tidak dapat memberikan response saat ini." }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: "assistant", text: `Error: ${err.message || "Gagal menghubungi Gemini API"}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([{ 
      role: "assistant", 
      text: "Chat di-reset. Silakan mulai pertanyaan baru!"
    }]);
  };

  return (
    <div id="ai-chat-sandbox" className="w-full font-sans">
      {/* Premium Glass Container */}
      <div className="bg-zinc-950/65 border border-zinc-900 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
        
        {/* Futuristic Top Glowing Border line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#03080e]/95 to-[#09030e]/95 border-b border-zinc-900/60 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.2)] select-none">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-display font-medium text-white tracking-wider flex items-center gap-2">
                R_HMT COGNITIVE TWIN
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h3>
              <p className="text-[10px] font-mono text-cyan-500/80 mt-0.5 uppercase tracking-widest font-sans">
                Asisten AI • Didukung Google Gemini LLM
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-2 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/80 rounded-xl transition-all cursor-pointer hover:border-cyan-500/20 active:scale-95"
            title="Clear chat history"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400 hover:text-cyan-400 transition-colors" />
          </button>
        </div>

        {/* Messages Content Panel */}
        <div className="flex flex-col min-h-[520px] bg-zinc-950/10">
          
          {/* Central Scroll List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 max-h-[500px] scrollbar-thin">
            <AnimatePresence>
              {chatHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Assistant Avatar Left */}
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0 overflow-hidden relative select-none">
                      {!avatarError ? (
                        <img 
                          src="/gambar/pp-dev.png" 
                          alt="R" 
                          className="w-full h-full object-cover"
                          onError={() => setAvatarError(true)} 
                        />
                      ) : (
                        <span className="font-display font-bold text-xs text-cyan-400">R</span>
                      )}
                      <div className="absolute inset-0 border border-cyan-500/10 rounded-full"></div>
                    </div>
                  )}

                  {/* Chat bubble */}
                  <div
                    className={`max-w-[82%] sm:max-w-[75%] px-4.5 py-3 rounded-2xl text-[13px] sm:text-sm font-sans relative shadow-xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-tr from-cyan-950/25 to-cyan-500/10 border border-cyan-500/30 text-zinc-100 rounded-tr-none font-sans"
                        : "bg-zinc-900/60 border border-zinc-850 text-zinc-300 rounded-tl-none font-sans"
                    }`}
                  >
                    {/* Background visual detail */}
                    <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-tr ${msg.role === "user" ? "from-cyan-500/5 to-transparent" : "from-transparent to-zinc-800/5"} pointer-events-none`}></div>
                    
                    <div className="relative z-10">
                      {parseMarkdownToReact(msg.text)}
                    </div>
                  </div>

                  {/* User Avatar Right */}
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full border border-cyan-500/20 bg-cyan-950/20 flex items-center justify-center shrink-0 overflow-hidden relative select-none shadow-[0_0_10px_rgba(0,242,254,0.1)]">
                      <User className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Simulated AI Thinking Steps */}
            {thinkingProcess.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 items-start justify-start"
              >
                <div className="w-8 h-8 rounded-full border border-cyan-500/20 bg-[#03080e] flex items-center justify-center shrink-0 overflow-hidden relative select-none">
                  <span className="font-display font-bold text-xs text-cyan-400 animate-pulse">R</span>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-850 rounded-2xl rounded-tl-none px-4.5 py-3.5 max-w-[82%] sm:max-w-[75%] w-full shadow-inner relative overflow-hidden">
                  <div className="text-[11px] font-mono text-zinc-500 space-y-1.5 relative z-10">
                    {thinkingProcess.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="animate-ping w-1.5 h-1.5 rounded-full bg-cyan-500 block shrink-0"></span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Typing Loader fallback */}
            {isChatLoading && !thinkingProcess.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 items-start justify-start"
              >
                <div className="w-8 h-8 rounded-full border border-zinc-850 bg-zinc-900 flex items-center justify-center shrink-0 overflow-hidden relative select-none">
                  <span className="font-display font-bold text-xs text-zinc-500">R</span>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Form Input Bar */}
          <form 
            onSubmit={handleSendChat} 
            className="border-t border-zinc-900/80 p-4 bg-gradient-to-t from-black/60 to-[#020204]/20"
          >
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanyakan sesuatu tentang R_hmt..."
                disabled={isChatLoading}
                className="flex-1 px-4 py-3.5 bg-zinc-950/70 border border-zinc-900 rounded-xl text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="px-5 py-3.5 bg-gradient-to-tr from-cyan-950/40 to-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 hover:from-cyan-950/60 hover:to-cyan-400/20 rounded-xl text-cyan-400 font-mono text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.05)] hover:shadow-[0_0_20px_rgba(0,242,254,0.15)] active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline tracking-wider uppercase">SEND</span>
              </button>
            </div>
            <p className="text-[9px] text-zinc-600 mt-2.5 flex items-center gap-1.5 font-mono select-none">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-700" />
              Tekan Enter atau klik tombol SEND untuk memulai pengiriman kognitif ke Digital Twin
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
