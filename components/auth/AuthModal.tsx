"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthModal() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const { t, lang } = useLanguage();
  const router = useRouter();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAuthModal(false);
    };
    if (showAuthModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [showAuthModal, setShowAuthModal]);

  if (!showAuthModal) return null;

  const titles = {
    en: { title: "Sign In Required", desc: "Please sign in to use this feature." },
    hi: { title: "साइन इन आवश्यक", desc: "कृपया इस सुविधा का उपयोग करने के लिए साइन इन करें।" },
    te: { title: "సైన్ ఇన్ అవసరం", desc: "దయచేసి ఈ ఫీచర్‌ను ఉపయోగించడానికి సైన్ ఇన్ చేయండి." },
  };

  const text = titles[lang as keyof typeof titles] || titles.en;

  const goToLogin = () => {
    setShowAuthModal(false);
    router.push("/login");
  };

  const goToSignup = () => {
    setShowAuthModal(false);
    router.push("/signup");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={() => setShowAuthModal(false)}
    >
      <div
        className="relative w-full max-w-sm p-6 rounded-xl animate-pop-in"
        style={{
          border: "2px solid #1A1118",
          boxShadow: "8px 8px 0px #1A1118",
          maxWidth: "400px",
          background: "#FAF6EE",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-3 right-4 text-2xl font-bold hover:opacity-60 transition-opacity"
          style={{ color: "#1A1118" }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Content */}
        <div className="text-center mb-6 mt-2">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-black tracking-tight" style={{ color: "#1A1118" }}>
            {text.title}
          </h2>
          <p className="text-sm mt-2" style={{ color: "#7A6070" }}>
            {text.desc}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={goToLogin}
            className="w-full py-3.5 text-sm font-black rounded-lg transition-all hover:translate-y-[-2px] active:translate-y-0"
            style={{
              border: "2px solid #1A1118",
              background: "#F9D4DD",
              color: "#1A1118",
              boxShadow: "3px 3px 0px #1A1118",
            }}
          >
            {t.navSignIn}
          </button>

          <button
            onClick={goToSignup}
            className="w-full py-3.5 text-sm font-black rounded-lg transition-all hover:bg-gray-50"
            style={{
              border: "2px solid #1A1118",
              background: "transparent",
              color: "#1A1118",
            }}
          >
            {t.navSignUp}
          </button>
        </div>
      </div>
    </div>
  );
}