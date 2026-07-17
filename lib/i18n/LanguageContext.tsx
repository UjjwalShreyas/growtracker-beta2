"use client";

// LanguageContext — manages the currently selected language globally.
// Reads from localStorage on mount, writes on change.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { type Lang, translations } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load persisted language on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gt_lang") as Lang | null;
      if (stored && ["en", "hi", "te"].includes(stored)) {
        setLangState(stored);
      }
    } catch {
      // localStorage may be unavailable in SSR / private browsing
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("gt_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}