"use client";

// Navbar — horizontal menu with underline only on active page/section.
// Light beige theme throughout. All labels use translation keys.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { type Lang, type Translations } from "@/lib/i18n/translations";
import { useState, useEffect } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";

type NavKey = "navHome" | "navFeatures" | "navHowItWorks" | "navReviews";

const NAV_ITEMS: { href: string; tKey: NavKey; section: string }[] = [
  { href: "/", tKey: "navHome", section: "home" },
  { href: "/#features", tKey: "navFeatures", section: "features" },
  { href: "/#how-it-works", tKey: "navHowItWorks", section: "how-it-works" },
];

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  // Check which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "how-it-works"];
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string, section: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(section);
      }
    } else {
      router.push(href);
      setActiveSection(section);
    }
  };

  const isActive = (section: string) => {
    if (pathname === "/") {
      return activeSection === section;
    }
    return pathname === section;
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div
      className="sticky top-0 z-40"
      style={{
        background: "#FDF8F0",
        borderBottom: "1px solid #e5dcc8"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.jpg" alt="growtracker logo" className="w-10 h-10 object-contain rounded-full" />
          <span className="font-black text-lg tracking-tight" style={{ color: "#1A1118" }}>
            growtracker
          </span>
        </Link>

        {/* Center: Horizontal Navigation Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ href, tKey, section }) => {
            const active = isActive(section);
            return (
              <button
                key={href}
                onClick={() => handleNav(href, section)}
                className="relative py-2 text-sm font-medium transition-all"
                style={{
                  color: active ? "#1A1118" : "#7A6070",
                  fontWeight: active ? "700" : "500",
                }}
              >
                {t[tKey]}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[3px] rounded-full"
                    style={{ background: "#7C3048" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Auth Buttons + Language */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="radio-inputs relative flex flex-wrap rounded-lg p-1 box-border"
            style={{
              backgroundColor: "#EEE",
              border: "2px solid #1A1118",
              boxShadow: "2px 2px 0px #1A1118",
            }}
          >
            {LANG_OPTIONS.map(({ code, label }) => {
              const isChecked = lang === code;
              return (
                <label key={code} className="radio flex-1 text-center cursor-pointer m-0">
                  <input
                    type="radio"
                    name="language-radio"
                    checked={isChecked}
                    onChange={() => setLang(code)}
                    className="hidden"
                  />
                  <span
                    className="name flex items-center justify-center rounded-md px-2.5 py-1 text-xs transition-all duration-150 select-none whitespace-nowrap"
                    style={{
                      backgroundColor: isChecked ? "#fff" : "transparent",
                      color: "#1A1118",
                      fontWeight: isChecked ? 800 : 600,
                      boxShadow: isChecked ? "0 1px 3px rgba(0, 0, 0, 0.15)" : "none",
                      border: isChecked ? "1.5px solid #1A1118" : "1.5px solid transparent",
                    }}
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>

          <ArrowButton
            fullWidth={false}
            onClick={handleSignIn}
            className="!py-1.5 !px-3 !text-xs !rounded-lg"
          >
            {t.navSignIn}
          </ArrowButton>
          <ArrowButton
            fullWidth={false}
            onClick={handleSignUp}
            className="!py-1.5 !px-3 !text-xs !rounded-lg"
          >
            {t.navSignUp}
          </ArrowButton>
        </div>

        <button className="md:hidden text-2xl" onClick={() => { }}>
          ☰
        </button>
      </div>
    </div>
  );
}