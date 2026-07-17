"use client";

// BottomNav — mobile-only fixed tab bar. Brutalist theme.
// 4 tabs: Pantry, Scan (primary), Recipes, Chat.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/hooks/useAuth";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t }    = useLanguage();
  const { isAuthenticated, setShowAuthModal } = useAuth();

  const TABS = [
    { href: "/dashboard#my-cart",         icon: "🏠", label: t.navPantry  },
    { href: "/dashboard/scan",    icon: "📷", label: t.navScan,   primary: true },
    { href: "/dashboard/recipes", icon: "🍽️", label: t.navRecipes },
    { href: "/dashboard/chatbot", icon: "💬", label: t.navChat    },
  ];

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a feature route and user is not authenticated, block it
    if ((href === "/dashboard/scan" || href === "/dashboard/recipes" || href === "/dashboard/chatbot") && !isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 md:hidden"
      style={{
        background: "#FAF8F5",
        borderTop: "2px solid #1A1118",
      }}
    >
      <div className="flex items-stretch h-14">
        {TABS.map(({ href, icon, label, primary }) => {
          const basePath = href.split("#")[0];
          const active = pathname === basePath;
          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleTabClick(e, href)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active:opacity-60"
              style={{
                background: active
                  ? primary ? "#7C3048" : "#1A1118"
                  : "transparent",
                borderRight: "1px solid rgba(26,17,24,0.15)",
                color: active ? "#FAF8F5" : "#7A6070",
              }}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-[9px] font-black uppercase tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
