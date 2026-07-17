"use client";

// Chatbot page — /dashboard/chatbot
// Renders the ChatBot component with a clean header.

import ChatBot from "@/components/chatbot/ChatBot";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { BackButton } from "@/components/layout/BackButton";

export default function ChatbotPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header with back button and title */}
      <div className="flex items-center justify-between mb-4">
        <BackButton />
        <div className="text-center flex-1">
          <h1 
            className="text-xl font-black tracking-tight"
            style={{ color: "#1A1118", letterSpacing: "-0.04em" }}
          >
            {t.chatTitle}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#7A6070" }}>
            {t.chatSubtitle}
          </p>
        </div>
        <div className="w-9" /> {/* Spacer to balance BackButton for centering */}
      </div>

      {/* Chat component fills remaining height */}
      <div
        className="flex-1 rounded-2xl overflow-hidden"
        style={{
          background: "#FFFAF0",
          border: "1px solid rgba(212,160,23,0.2)",
          boxShadow: "0 4px 24px rgba(212,160,23,0.08)",
        }}
      >
        <ChatBot />
      </div>
    </div>
  );
}