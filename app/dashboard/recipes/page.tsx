"use client";

// Recipes page — grid with servings estimate per recipe.
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { mockRecipes, Recipe } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { usePantry } from "@/lib/hooks/usePantry";
import { estimateServings, formatServingsLabel } from "@/lib/utils/servingsEstimator";
import { PageHeader } from "@/components/layout/PageHeader";
import LoadingState from "@/components/ui/LoadingState";

export default function RecipesPage() {
  const router          = useRouter();
  const { t }           = useLanguage();
  const { items, loaded: pantryLoaded } = usePantry();
  const [recipes, setRecipes]   = useState<Recipe[]>([]);
  const [loading, setLoading]   = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = ["main", "side", "soup", "dessert"];

  useEffect(() => {
    const timer = setTimeout(() => { setRecipes(mockRecipes); setLoading(false); }, 900);
    return () => clearTimeout(timer);
  }, []);

  const recipesWithServings = useMemo(() => {
    // Filter by search query
    let filtered = recipes;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r => r.name.toLowerCase().includes(q));
    }

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(r => r.category === activeCategory);
    }

    return filtered.map((r) => ({
      recipe: r,
      servings: pantryLoaded ? estimateServings(r, items) : null,
      label:    pantryLoaded ? formatServingsLabel(estimateServings(r, items)) : "",
      missing:  r.ingredients.filter((i) => !i.in_pantry).length,
    }))
    .sort((a, b) => (b.servings ?? -1) - (a.servings ?? -1));
  }, [recipes, items, pantryLoaded, searchQuery, activeCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <PageHeader title={t.recipesTitle} />

      <p className="text-xs -mt-3 mb-5" style={{ color: "#7A6070" }}>{t.recipesSubtitle}</p>

      {/* Filters (Search & Categories) */}
      <div className="mb-6 space-y-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 bg-white"
          style={{ border: "2px solid #1A1118", boxShadow: "2px 2px 0px rgba(26,17,24,0.15)" }}
        >
          <span className="text-lg leading-none" style={{ color: "#7A6070" }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.recipesSearchPlaceholder}
            className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal"
            style={{ color: "#1A1118" }}
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 flex-wrap">
          {[null, ...categories].map((cat) => {
            const catLabel: Record<string, string> = {
              all: t.recipesCatAll,
              main: t.recipesCatMain,
              side: t.recipesCatSide,
              soup: t.recipesCatSoup,
              dessert: t.recipesCatDessert,
            };
            return (
            <button
              key={cat ?? "all"}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 text-xs font-bold capitalize transition-all"
              style={{
                border: "1.5px solid #1A1118",
                background: activeCategory === cat ? "#1A1118" : "#FAF8F5",
                color: activeCategory === cat ? "#FAF8F5" : "#1A1118",
              }}
            >
              {catLabel[cat ?? "all"]}
            </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <LoadingState message={t.recipesLoading} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipesWithServings.map(({ recipe, label, missing }, i) => {
            const CARD_BG = ["#F9D4DD", "#E8D5F5", "#FAF8F5", "#E8D5F5"][i % 4];
            return (
              <button
                key={recipe.id}
                onClick={() => router.push(`/dashboard/recipes/${recipe.id}`)}
                className="text-left group transition-all"
                style={{
                  border: "2px solid #1A1118",
                  background: CARD_BG,
                  boxShadow: "3px 3px 0px #1A1118",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translate(-1px,-1px)", e.currentTarget.style.boxShadow = "4px 4px 0px #1A1118")}
                onMouseLeave={e => (e.currentTarget.style.transform = "none", e.currentTarget.style.boxShadow = "3px 3px 0px #1A1118")}
              >
                {/* Image */}
                <div className="overflow-hidden" style={{ height: "160px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-sm leading-snug group-hover:underline" style={{ color: "#1A1118" }}>
                      {recipe.name}
                    </h3>
                    {label && (
                      <span
                        className="text-[10px] font-black px-2 py-0.5 shrink-0"
                        style={{ background: "#7C3048", color: "#F9D4DD", border: "1px solid #7C3048" }}
                      >
                        {label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px]" style={{ color: "#7A6070" }}>
                    <span>⏱ {recipe.prep_time_minutes} min</span>
                    <span>·</span>
                    <span>{missing === 0 ? t.recipesReady : t.recipeMissing(missing)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}