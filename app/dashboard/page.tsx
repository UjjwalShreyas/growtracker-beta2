"use client";

// Dashboard — pantry view. Clean, minimal, brutalist-lite.
// Shows pantry items + smart recipe suggestions with servings estimates.

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePantry } from "@/lib/hooks/usePantry";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { translateCategory, translateItemName } from "@/lib/i18n/translations";
import { mockRecipes } from "@/lib/data/mockData";
import { estimateServings, formatServingsLabel } from "@/lib/utils/servingsEstimator";
import PantryItemCard from "@/components/pantry/PantryItemCard";
import LoadingState from "@/components/ui/LoadingState";
import { UiverseAllRecipesButton } from "@/components/ui/UiverseAllRecipesButton";
import { UiverseScanButton } from "@/components/ui/UiverseScanButton";
import { useAuth } from "@/lib/hooks/useAuth";
import { CategoryIcon } from "@/components/pantry/CategoryIcon";
import PantryReminders from "@/components/pantry/PantryReminders";

type MainCategoryKey = "all" | "groceries" | "vegetables";

export default function DashboardPage() {
  const { items, loaded, removeItem } = usePantry();
  const { t } = useLanguage();
  const router = useRouter();
  const { isAuthenticated, setShowAuthModal, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategoryKey>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFeatureClick = (href: string) => {
    if (isAuthenticated) {
      router.push(href);
    } else {
      setShowAuthModal(true);
    }
  };

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    const translatedName = translateItemName(item.item_name, t).toLowerCase();
    return item.item_name.toLowerCase().includes(q) || translatedName.includes(q);
  });

  // Classify each item into Groceries vs Vegetables & Produce, and into subcategories
  const classified = useMemo(() => {
    const groceriesSubcats: Record<string, { title: string; icon: string; items: typeof items }> = {
      grain: { title: "Grains & Bakery", icon: "grain", items: [] },
      dairy: { title: "Dairy & Refrigerated", icon: "dairy", items: [] },
      spice: { title: "Spices & Seasonings", icon: "spice", items: [] },
      other: { title: "Oils & Pantry Essentials", icon: "other", items: [] },
    };

    const vegetablesSubcats: Record<string, { title: string; icon: string; items: typeof items }> = {
      vegetable: { title: "Fresh Vegetables", icon: "vegetable", items: [] },
      leafy:     { title: "Leafy Greens & Herbs", icon: "leafy", items: [] },
    };

    filtered.forEach((item) => {
      const cat = item.category?.toLowerCase() || "other";
      const name = item.item_name.toLowerCase();

      const isVegOrProduce =
        cat === "vegetable" ||
        cat === "leafy" ||
        cat === "fruit" ||
        cat === "produce" ||
        name.includes("spinach") ||
        name.includes("coriander") ||
        name.includes("tomato") ||
        name.includes("garlic") ||
        name.includes("onion");

      if (isVegOrProduce) {
        if (cat === "leafy" || name.includes("spinach") || name.includes("coriander") || name.includes("herb")) {
          vegetablesSubcats.leafy.items.push(item);
        } else {
          vegetablesSubcats.vegetable.items.push(item);
        }
      } else {
        if (cat === "grain") {
          groceriesSubcats.grain.items.push(item);
        } else if (cat === "dairy") {
          groceriesSubcats.dairy.items.push(item);
        } else if (cat === "spice") {
          groceriesSubcats.spice.items.push(item);
        } else {
          groceriesSubcats.other.items.push(item);
        }
      }
    });

    const groceriesGroups = Object.values(groceriesSubcats).filter((s) => s.items.length > 0);
    const vegetablesGroups = Object.values(vegetablesSubcats).filter((s) => s.items.length > 0);
    const totalGroceries = groceriesGroups.reduce((acc, g) => acc + g.items.length, 0);
    const totalVegetables = vegetablesGroups.reduce((acc, g) => acc + g.items.length, 0);

    return {
      groceries: groceriesGroups,
      vegetables: vegetablesGroups,
      totalGroceries,
      totalVegetables,
    };
  }, [filtered]);

  // Smart recipe suggestions: rank by servings possible + pantry coverage
  const suggestions = useMemo(() => {
    return mockRecipes
      .map((r) => {
        const servings = estimateServings(r, items);
        const label = formatServingsLabel(servings);
        const missing = r.ingredients.filter((i) => !i.in_pantry).length;
        return { recipe: r, servings, label, missing };
      })
      .filter((s) => s.servings !== null && s.servings! > 0)
      .sort((a, b) => (b.servings ?? 0) - (a.servings ?? 0))
      .slice(0, 3);
  }, [items]);

  // Category display names with emojis
  const categoryDisplay: Record<string, { label: string; emoji: string }> = {
    grain: { label: "Grain", emoji: "🌾" },
    dairy: { label: "Dairy", emoji: "🥛" },
    vegetable: { label: "Vegetable", emoji: "🥦" },
    spice: { label: "Spice", emoji: "🌶️" },
    other: { label: "Other", emoji: "📦" },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* ── Top bar: title + scan button + menu ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight" style={{ color: "#1A1118", letterSpacing: "-0.04em" }}>
            {t.dashTitle}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#7A6070" }}>
            {loaded
              ? items.length === 0
                ? t.dashSubtitleEmpty
                : t.dashSubtitleCount(items.length)
              : t.dashSubtitleLoading}
          </p>
        </div>

        {/* Scaled down scan button & Hamburger Dropdown */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="scale-[0.7] origin-left sm:origin-right w-fit">
            <UiverseScanButton onClick={() => handleFeatureClick("/dashboard/scan")} />
          </div>
          
          {/* Dropdown Hamburger Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all focus:outline-none"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF8F5",
                borderRadius: "8px",
                boxShadow: "2.5px 2.5px 0px #1A1118",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translate(-1px, -1px)";
                e.currentTarget.style.boxShadow = "3.5px 3.5px 0px #1A1118";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "2.5px 2.5px 0px #1A1118";
              }}
              aria-label="Toggle menu"
            >
              <span
                className="w-5 h-0.5 bg-[#1A1118] transition-all duration-300"
                style={{
                  transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                }}
              />
              <span
                className="w-5 h-0.5 bg-[#1A1118] transition-all duration-300"
                style={{
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="w-5 h-0.5 bg-[#1A1118] transition-all duration-300"
                style={{
                  transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                }}
              />
            </button>

            {menuOpen && (
              <>
                {/* Click outside overlay */}
                <div
                  className="fixed inset-0 z-40 bg-black/5"
                  onClick={() => setMenuOpen(false)}
                />

                {/* Dropdown Menu Panel */}
                <div
                  className="absolute right-0 mt-2 z-50 w-52 py-2 flex flex-col transition-all duration-200"
                  style={{
                    background: "rgba(250, 248, 245, 0.98)",
                    backdropFilter: "blur(8px)",
                    border: "2px solid #1A1118",
                    borderRadius: "12px",
                    boxShadow: "4px 4px 0px #1A1118",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      if (window.location.pathname === "/dashboard") {
                        document.getElementById("my-cart")?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        router.push("/dashboard#my-cart");
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-[#1A1118] hover:bg-[#E8D5F5] transition-all w-full cursor-pointer"
                  >
                    <span>🛒</span> {t.navPantry || "My Cart"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      document.getElementById("pantry-reminders-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-[#1A1118] hover:bg-[#F9D4DD] transition-all w-full cursor-pointer"
                  >
                    <span>🔔</span> {t.dashRemindersTitle || "Alerts"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleFeatureClick("/dashboard/recipes");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-[#1A1118] hover:bg-[#E8D5F5] transition-all w-full cursor-pointer"
                  >
                    <span>🍽️</span> {t.navRecipes || "Recipes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleFeatureClick("/dashboard/scan");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-[#1A1118] hover:bg-[#F9D4DD] transition-all w-full cursor-pointer"
                  >
                    <span>📷</span> {t.navScan || "Scan Items"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleFeatureClick("/dashboard/chatbot");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-[#1A1118] hover:bg-[#E8D5F5] transition-all w-full cursor-pointer"
                  >
                    <span>💬</span> {t.navChat || "Kitchen Helper"}
                  </button>

                  <div className="h-[1px] bg-[#1A1118]/15 my-1" />

                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                        router.push("/");
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-red-600 hover:bg-red-50 transition-all w-full cursor-pointer"
                    >
                      <span>🚪</span> Sign Out
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        setShowAuthModal(true);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-black text-green-600 hover:bg-green-50 transition-all w-full cursor-pointer"
                    >
                      <span>🔑</span> Sign In
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Reminders & Alerts Feed (Top of page) ────────────────── */}
      {loaded && items.length > 0 && (
        <div id="pantry-reminders-section">
          <PantryReminders items={items} />
        </div>
      )}

      {/* ── Search + Main Category Selector Tabs ───────────────────── */}
      {loaded && items.length > 0 && (
        <div id="my-cart" className="flex flex-col gap-3 mb-6">
          {/* My Cart Header */}
          <div className="mt-4 mb-2">
            <h2 className="text-xl font-black tracking-tight" style={{ color: "#1A1118" }}>
              {t.navPantry || "My Cart"}
            </h2>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs select-none pointer-events-none" style={{ color: "#A89098" }}>
              🔍
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.dashSearch}
              aria-label={t.dashSearch}
              className="w-full pl-8 pr-3 py-2.5 text-sm font-medium outline-none transition-all"
              style={{
                border: "2px solid #1A1118",
                background: "#FAF8F5",
                color: "#1A1118",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Icon-Based Main Category Switcher */}
          <div
            className="flex flex-wrap gap-1.5 p-1.5"
            style={{
              borderRadius: "10px",
              background: "#EEE",
              border: "1.5px solid #1A1118",
            }}
          >
            {/* All Option */}
            <button
              type="button"
              onClick={() => setActiveMainCategory("all")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                activeMainCategory === "all"
                  ? "bg-white shadow-sm border border-black"
                  : "text-gray-600 hover:bg-white/50"
              }`}
              style={{ color: activeMainCategory === "all" ? "#1A1118" : "#475569" }}
            >
              <span>{t.dashFilterAll}</span>
              <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full font-black">
                {classified.totalGroceries + classified.totalVegetables}
              </span>
            </button>

            {/* Groceries Main Category Tab */}
            <button
              type="button"
              onClick={() => setActiveMainCategory("groceries")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                activeMainCategory === "groceries"
                  ? "bg-white shadow-sm border border-black"
                  : "text-gray-600 hover:bg-white/50"
              }`}
              style={{ color: activeMainCategory === "groceries" ? "#1A1118" : "#475569" }}
            >
              <CategoryIcon category="groceries" size={14} color="currentColor" />
              <span>{translateCategory("Groceries", t)}</span>
              <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full font-black">
                {classified.totalGroceries}
              </span>
            </button>

            {/* Vegetables & Produce Main Category Tab */}
            <button
              type="button"
              onClick={() => setActiveMainCategory("vegetables")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                activeMainCategory === "vegetables"
                  ? "bg-white shadow-sm border border-black"
                  : "text-gray-600 hover:bg-white/50"
              }`}
              style={{ color: activeMainCategory === "vegetables" ? "#1A1118" : "#475569" }}
            >
              <CategoryIcon category="vegetables" size={14} color="currentColor" />
              <span>{translateCategory("Vegetables & Produce", t)}</span>
              <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full font-black">
                {classified.totalVegetables}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ── Main Categorized Content ─────────────────────────────────── */}
      {!loaded ? (
        <LoadingState message={t.dashSubtitleLoading} />
      ) : items.length === 0 ? (
        <div className="py-16 text-center">
          <div className="flex justify-center mb-4">
            <CategoryIcon category="groceries" size={48} color="#1A1118" />
          </div>
          <h2 className="font-black text-lg mb-1" style={{ color: "#1A1118" }}>
            {t.dashEmptyTitle}
          </h2>
          <p className="text-sm mb-5" style={{ color: "#7A6070" }}>
            {t.dashEmptyDesc}
          </p>
          <div className="flex justify-center">
            <UiverseScanButton onClick={() => handleFeatureClick("/dashboard/scan")} />
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-black mb-2" style={{ color: "#1A1118" }}>
            {t.dashNoResults(search)}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveMainCategory("all");
            }}
            className="text-xs underline"
            style={{ color: "#7A6070" }}
          >
            {t.dashClearFilters}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* ── Main Category 1: Groceries ───────────────────────── */}
          {(activeMainCategory === "all" || activeMainCategory === "groceries") &&
            classified.groceries.length > 0 && (
              <div className="flex flex-col gap-4">
                {/* Main Header */}
                <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#1A1118]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "#fef9c3", border: "1.5px solid #1A1118" }}
                    >
                      <CategoryIcon category="groceries" size={18} color="#1A1118" />
                    </div>
                    <h2 className="text-base font-black uppercase tracking-wide text-[#1A1118]">
                      {translateCategory("Groceries", t)}
                    </h2>
                  </div>
                  <span
                    className="text-xs font-black px-2.5 py-0.5 rounded-full"
                    style={{ background: "#E8D5F5", border: "1.5px solid #1A1118", color: "#1A1118" }}
                  >
                    {t.dashSubtitleCount(classified.totalGroceries)}
                  </span>
                </div>

                {/* Subcategories under Groceries */}
                <div className="flex flex-col gap-5 pl-1">
                  {classified.groceries.map((sub) => (
                    <div key={sub.title} className="flex flex-col gap-2.5">
                      {/* Subcategory mini header */}
                      <div className="flex items-center gap-2">
                        <CategoryIcon category={sub.icon} size={15} color="#7A6070" />
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#7A6070]">
                          {translateCategory(sub.title, t)}
                        </h3>
                        <span className="text-[11px] font-bold text-[#A89098]">
                          ({sub.items.length})
                        </span>
                      </div>

                      {/* Item Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sub.items.map((item) => (
                          <PantryItemCard
                            key={item.id}
                            item={item}
                            onDelete={removeItem}
                            subcategoryLabel={translateCategory(sub.title, t)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* ── Main Category 2: Vegetables & Produce ────────────── */}
          {(activeMainCategory === "all" || activeMainCategory === "vegetables") &&
            classified.vegetables.length > 0 && (
              <div className="flex flex-col gap-4">
                {/* Main Header */}
                <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#1A1118]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "#dcfce7", border: "1.5px solid #1A1118" }}
                    >
                      <CategoryIcon category="vegetables" size={18} color="#1A1118" />
                    </div>
                    <h2 className="text-base font-black uppercase tracking-wide text-[#1A1118]">
                      {translateCategory("Vegetables & Produce", t)}
                    </h2>
                  </div>
                  <span
                    className="text-xs font-black px-2.5 py-0.5 rounded-full"
                    style={{ background: "#dcfce7", border: "1.5px solid #1A1118", color: "#1A1118" }}
                  >
                    {t.dashSubtitleCount(classified.totalVegetables)}
                  </span>
                </div>

                {/* Subcategories under Vegetables & Produce */}
                <div className="flex flex-col gap-5 pl-1">
                  {classified.vegetables.map((sub) => (
                    <div key={sub.title} className="flex flex-col gap-2.5">
                      {/* Subcategory mini header */}
                      <div className="flex items-center gap-2">
                        <CategoryIcon category={sub.icon} size={15} color="#7A6070" />
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#7A6070]">
                          {translateCategory(sub.title, t)}
                        </h3>
                        <span className="text-[11px] font-bold text-[#A89098]">
                          ({sub.items.length})
                        </span>
                      </div>

                      {/* Item Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sub.items.map((item) => (
                          <PantryItemCard
                            key={item.id}
                            item={item}
                            onDelete={removeItem}
                            subcategoryLabel={sub.title}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* ── Smart suggestions strip (Bottom of page) ───────────────── */}
      {loaded && suggestions.length > 0 && (
        <div className="mt-12 pt-8 border-t-2 border-[#1A1118]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <p className="text-xs font-black tracking-[0.1em] uppercase" style={{ color: "var(--burgundy)" }}>
              {t.dashCookNow}
            </p>
            <div className="flex items-center gap-3">
              <UiverseAllRecipesButton onClick={() => handleFeatureClick("/dashboard/recipes")} label={t.dashAllRecipes} />
            </div>
          </div>

          {/* Recipe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map(({ recipe, label, missing }) => {
              const statusColor = missing === 0 ? "#166534" : "#d97706";
              const statusBg = missing === 0 ? "#dcfce7" : "#fef3c7";
              const statusText = missing === 0 ? t.recipeReadyToCook : t.recipeMissingItems(missing);

              return (
                <button
                  key={recipe.id}
                  onClick={() => handleFeatureClick(`/dashboard/recipes/${recipe.id}`)}
                  className="group text-left transition-all hover:translate-y-[-4px] active:translate-y-0 w-full"
                  style={{
                    border: "2px solid #1A1118",
                    borderRadius: "12px",
                    background: "#FAF8F5",
                    boxShadow: "4px 4px 0px #1A1118",
                    overflow: "hidden",
                  }}
                >
                  {/* Recipe Image */}
                  <div className="relative overflow-hidden" style={{ height: "140px", background: "#e5e7eb" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Status badge overlay */}
                    <div
                      className="absolute top-2 right-2 px-2.5 py-1 text-[10px] font-black rounded-full"
                      style={{
                        background: statusBg,
                        color: statusColor,
                        border: "1.5px solid #1A1118",
                      }}
                    >
                      {statusText}
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="font-black text-sm leading-tight group-hover:underline" style={{ color: "#1A1118" }}>
                      {recipe.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold" style={{ color: "#7C3048" }}>
                        {label}
                      </span>
                      <span className="text-[10px]" style={{ color: "#7A6070" }}>
                        ⏱ {recipe.prep_time_minutes} {t.recipeMin}
                      </span>
                    </div>
                    {/* Progress bar showing pantry coverage */}
                    <div className="mt-1">
                      <div className="w-full h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${((recipe.ingredients.filter((i) => i.in_pantry).length / recipe.ingredients.length) * 100)}%`,
                            background: missing === 0 ? "#166534" : "#d97706",
                          }}
                        />
                      </div>
                      <p className="text-[9px] mt-0.5" style={{ color: "#7A6070" }}>
                        {t.recipeIngredientsInCart(recipe.ingredients.filter((i) => i.in_pantry).length, recipe.ingredients.length)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}