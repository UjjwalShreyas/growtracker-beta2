"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { type Lang } from "@/lib/i18n/translations";

const LANG_OPTIONS: { code: Lang; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
];

interface UiverseLanguageButtonProps {
  className?: string;
}

export function UiverseLanguageButton({ className = "" }: UiverseLanguageButtonProps) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANG_OPTIONS.find((opt) => opt.code === lang) || LANG_OPTIONS[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (code: Lang) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <style jsx global>{`
        .uiverse-lang-btn {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: filter 250ms;
          user-select: none;
          touch-action: manipulation;
          font-family: inherit;
        }

        .uiverse-lang-btn .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: hsl(0deg 0% 0% / 0.25);
          will-change: transform;
          transform: translateY(2px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }

        .uiverse-lang-btn .edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: linear-gradient(
            to left,
            hsl(340deg 100% 16%) 0%,
            hsl(340deg 100% 32%) 8%,
            hsl(340deg 100% 32%) 92%,
            hsl(340deg 100% 16%) 100%
          );
        }

        .uiverse-lang-btn .front {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          padding: 8px 18px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 800;
          color: white;
          background: hsl(345deg 100% 47%);
          will-change: transform;
          transform: translateY(-4px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
          white-space: nowrap;
        }

        .uiverse-lang-btn:hover {
          filter: brightness(110%);
        }

        .uiverse-lang-btn:hover .front {
          transform: translateY(-6px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .uiverse-lang-btn:active .front {
          transform: translateY(-2px);
          transition: transform 34ms;
        }

        .uiverse-lang-btn:hover .shadow {
          transform: translateY(4px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .uiverse-lang-btn:active .shadow {
          transform: translateY(1px);
          transition: transform 34ms;
        }

        .uiverse-lang-btn:focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>

      {/* 3D Push Button */}
      <button
        type="button"
        className="uiverse-lang-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front text">
          {/* Globe Icon */}
          <svg className="w-4 h-4 shrink-0 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span>{currentOption.nativeLabel}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Language Options Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-44 rounded-xl shadow-2xl z-50 overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2"
          style={{
            background: "#FAF8F5",
            border: "2px solid #1A1118",
            boxShadow: "4px 4px 0px #1A1118",
          }}
        >
          <div className="p-1.5 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border-b pb-1 mb-1" style={{ color: "#7A6070", borderColor: "rgba(26,17,24,0.1)" }}>
              Select Language
            </div>
            {LANG_OPTIONS.map((opt) => {
              const isSelected = lang === opt.code;
              return (
                <button
                  key={opt.code}
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-all duration-150 ${
                    isSelected ? "shadow-sm" : ""
                  }`}
                  style={{
                    backgroundColor: isSelected ? "#7C3048" : "transparent",
                    color: isSelected ? "#FFFFFF" : "#1A1118",
                  }}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-extrabold leading-tight">{opt.nativeLabel}</span>
                    {opt.label !== opt.nativeLabel && (
                      <span className={`text-[10px] ${isSelected ? "text-pink-100" : "text-gray-500"}`}>
                        {opt.label}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="text-white text-xs font-black">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
