"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import Navbar from "@/components/layout/Navbar";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function HomePage() {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen" style={{ background: "#FDF8F0" }}>

      <Navbar />

      {/* ─── HERO SECTION (Mobile-First App Screen Layout) ──────────────── */}
      <section id="home" className="pt-2 sm:pt-4 pb-14 sm:pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">

            {/* Left Column: Text & Mobile-App CTAs (Col 7) */}
            <div className="text-left order-1 md:order-1 md:col-span-7">
              <div className="flex items-center gap-8 mb-4 -mt-2 sm:-mt-4">
                <img src="/otbi.jpeg" alt="OTBI logo" className="h-24 sm:h-28 w-auto object-contain" />
                <img src="/ou.jpeg" alt="OU logo" className="h-24 sm:h-28 w-auto object-contain" />
              </div>
              <span
                className="inline-block px-5 py-2.5 text-base font-black rounded-full mb-7"
                style={{ background: "#E8D5F5", color: "#1A1118", border: "2px solid #1A1118" }}
              >
                {t.heroBadge}
              </span>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.08]"
                style={{ color: "#1A1118", letterSpacing: "-0.04em" }}
              >
                {t.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl mb-10 max-w-lg leading-relaxed" style={{ color: "#5a4a3a" }}>
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
                <Link href="/signup" className="block w-full sm:w-auto">
                  <ArrowButton className="!py-4 !px-9 !text-base !rounded-xl">
                    {t.heroGetStarted}
                  </ArrowButton>
                </Link>
              </div>
            </div>

            {/* Right Column: App Illustration Image v2 (/v2.jpg) (Col 5) */}
            <div className="flex justify-center md:justify-end order-2 md:order-2 md:col-span-5 mt-2 md:mt-0">
              <div
                className="relative overflow-hidden rounded-3xl w-64 sm:w-72 md:w-full max-w-[340px] transition-all hover:translate-y-[-4px]"
                style={{
                  border: "2.5px solid #1A1118",
                  background: "#FAF6EE",
                  boxShadow: "6px 6px 0px #1A1118",
                }}
              >
                <img
                  src="/v2.jpg"
                  alt="Smart Kitchen Helper Illustration"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ───────────────────────────────────────────── */}
      <section id="features" className="py-16 sm:py-24 px-4" style={{ background: "#FDF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3" style={{ color: "#1A1118" }}>
              {t.featuresTitle}
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#5a4a3a" }}>
              {t.featuresSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-2xl transition-all hover:translate-y-[-4px]"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF6EE",
                boxShadow: "3px 3px 0px #1A1118",
              }}
            >
              <div className="text-4xl mb-4">📸</div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#1A1118" }}>
                {t.featureScanTitle}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a4a3a" }}>
                {t.featureScanDesc}
              </p>
            </div>
            <div
              className="p-6 rounded-2xl transition-all hover:translate-y-[-4px]"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF6EE",
                boxShadow: "3px 3px 0px #1A1118",
              }}
            >
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#1A1118" }}>
                {t.featureRecipesTitle}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a4a3a" }}>
                {t.featureRecipesDesc}
              </p>
            </div>
            <div
              className="p-6 rounded-2xl transition-all hover:translate-y-[-4px]"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF6EE",
                boxShadow: "3px 3px 0px #1A1118",
              }}
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#1A1118" }}>
                {t.featureChatTitle}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a4a3a" }}>
                {t.featureChatDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4" style={{ background: "#FDF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3" style={{ color: "#1A1118" }}>
              {t.howTitle}
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#5a4a3a" }}>
              {t.howSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: "#E8D5F5", border: "2px solid #1A1118" }}
              >
                1
              </div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#1A1118" }}>
                {t.howStep1Title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#5a4a3a" }}>
                {t.howStep1Desc}
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: "#F9D4DD", border: "2px solid #1A1118" }}
              >
                2
              </div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#1A1118" }}>
                {t.howStep2Title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#5a4a3a" }}>
                {t.howStep2Desc}
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: "#dcfce7", border: "2px solid #1A1118" }}
              >
                3
              </div>
              <h3 className="font-black text-lg mb-2" style={{ color: "#1A1118" }}>
                {t.howStep3Title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#5a4a3a" }}>
                {t.howStep3Desc}
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-block px-8 py-3.5 text-sm font-black rounded-xl transition-all hover:translate-y-[-2px]"
              style={{
                background: "#1A1118",
                color: "white",
                border: "2px solid #1A1118",
                boxShadow: "3px 3px 0px #1A1118",
              }}
            >
              {t.howCta}
            </Link>
          </div>
        </div>
      </section>



      <footer className="py-8 px-4" style={{ borderTop: "1px solid #e5dcc8", background: "#FDF8F0" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="growtracker logo" className="w-6 h-6 object-contain rounded-full" />
            <span className="font-black text-sm" style={{ color: "#1A1118" }}>growtracker</span>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: "#a89098" }}>
            <Link href="/privacy" className="hover:text-gray-600 transition">{t.footerPrivacy}</Link>
            <Link href="/terms" className="hover:text-gray-600 transition">{t.footerTerms}</Link>
            <Link href="#" className="hover:text-gray-600 transition">{t.footerContact}</Link>
            <span>© 2026 growtracker</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}