"use client";

// ChatBot — mock chatbot UI with keyword-based response matching.
// No real AI — responses come from chatbotResponses in mockData.ts.
// Real AI integration would just swap the getResponse() function.

import { useState, useRef, useEffect, FormEvent } from "react";
import { chatbotResponses } from "@/lib/data/mockData";
import { Lang } from "@/lib/i18n/translations";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

/** Find the first matching keyword in the user's message. */
function getResponse(input: string, lang: Lang): string {
  const lower = input.toLowerCase();
  const responses = chatbotResponses[lang];
  
  for (const [keyword, reply] of Object.entries(responses)) {
    if (keyword !== "default" && lower.includes(keyword)) {
      return reply;
    }
  }
  return responses["default"] ?? "I'm here to help!";
}

export default function ChatBot() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "welcome", 
      role: "bot", 
      text: t.chatWelcome, 
      timestamp: new Date() 
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate bot "thinking" delay
    setTimeout(() => {
      const botText = getResponse(text, lang);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: botText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] md:max-h-[calc(100vh-14rem)]">

      {/* ── Message area ──────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,160,23,0.3) transparent" }}
      >
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex gap-2 anim-fade-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            {/* Bot avatar */}
            {msg.role === "bot" && (
              <div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base mt-1"
                style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}
              >
                🌿
              </div>
            )}

            {/* Bubble */}
            <div
              className="max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm"
              style={
                msg.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #D4A017, #F4A100)",
                      color: "#fff",
                      borderBottomRightRadius: "6px",
                    }
                  : {
                      background: "#fff",
                      color: "#1A1118",
                      border: "1px solid rgba(212,160,23,0.18)",
                      borderBottomLeftRadius: "6px",
                    }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-2 items-center anim-fade-in">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
              style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}
            >
              🌿
            </div>
            <div
              className="px-4 py-3 rounded-2xl"
              style={{ background: "#fff", border: "1px solid rgba(212,160,23,0.18)", borderBottomLeftRadius: "6px" }}
            >
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block w-2 h-2 rounded-full"
                    style={{
                      background: "#D4A017",
                      animation: "bounce-dot 1.2s infinite ease-in-out",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Suggested prompts ─────────────────────────────────────── */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs mb-2 font-medium" style={{ color: "#7A6070" }}>
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "How long does milk last?",
              "What recipe can I make?",
              "How to store dal?",
              "Suggest a dinner recipe",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(212,160,23,0.12)",
                  color: "#8D6E63",
                  border: "1px solid rgba(212,160,23,0.3)",
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input bar ─────────────────────────────────────────────── */}
      <form
        onSubmit={sendMessage}
        className="px-4 pb-4 pt-3 flex gap-2 border-t"
        style={{ borderColor: "rgba(212,160,23,0.18)", background: "#FFFAF0" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatPlaceholder}
          disabled={typing}
          className="flex-1 px-4 py-2.5 text-sm rounded-xl outline-none transition-all"
          style={{
            border: "1.5px solid rgba(212,160,23,0.35)",
            background: "#fff",
            color: "#1A1118",
          }}
          aria-label={t.chatPlaceholder}
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="px-5 py-2.5 text-sm font-black rounded-xl transition-all disabled:opacity-40"
          style={{
            background: input.trim() && !typing ? "linear-gradient(135deg, #D4A017, #F4A100)" : "#e5e7eb",
            color: input.trim() && !typing ? "#fff" : "#9ca3af",
            border: "1.5px solid #1A1118",
            boxShadow: input.trim() && !typing ? "3px 3px 0px #1A1118" : "none",
          }}
        >
          {t.chatSend}
        </button>
      </form>

      <style jsx global>{`
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40%            { transform: scale(1.1); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}