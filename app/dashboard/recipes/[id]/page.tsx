"use client";

// Recipe detail page — brutalist theme. Servings scaler + quantity math.

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockRecipes } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { usePantry } from "@/lib/hooks/usePantry";
import { estimateServings, formatServingsLabel } from "@/lib/utils/servingsEstimator";
import { BackButton } from "@/components/layout/BackButton";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { v4 as uuidv4 } from "uuid";

function parseQuantity(qty: string): { num: number; unit: string } | null {
  const normalized = qty
    .replace("½", "0.5").replace("¼", "0.25").replace("¾", "0.75")
    .replace("⅓", "0.333").replace("⅔", "0.667").trim();
  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*(.*)/);
  if (!match) return null;
  return { num: parseFloat(match[1]), unit: match[2] ? ` ${match[2].trim()}` : "" };
}

function formatNum(n: number): string {
  if (n === Math.floor(n)) return n.toString();
  const rounded = Math.round(n * 10) / 10;
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
}

function scaleQuantity(qty: string, ratio: number): string {
  const parsed = parseQuantity(qty);
  if (!parsed) return qty;
  return `${formatNum(parsed.num * ratio)}${parsed.unit}`;
}

export default function RecipeDetailPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const { t }   = useLanguage();
  const { items, addItems, removeItem } = usePantry();

  const recipe          = mockRecipes.find((r) => r.id === id);
  const originalServings = recipe?.servings ?? 4;
  const [servings, setServings] = useState(originalServings);
  const ratio = servings / originalServings;

  const pantryServings = recipe ? estimateServings(recipe, items) : null;
  const pantryLabel    = formatServingsLabel(pantryServings);

  if (!recipe) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🤔</p>
        <h1 className="text-xl font-black mb-2" style={{ color: "#1A1118" }}>{t.errorNotFound}</h1>
        <p className="text-sm mb-6" style={{ color: "#7A6070" }}>{t.errorNotFoundDesc}</p>
        <button
          onClick={() => router.push("/dashboard/recipes")}
          className="px-6 py-2.5 text-sm font-black transition-all"
          style={{ border: "2px solid #1A1118", background: "#F9D4DD", boxShadow: "3px 3px 0px #1A1118" }}
        >
          {t.goBack}
        </button>
      </div>
    );
  }

  const inPantry    = recipe.ingredients.filter((i) => i.in_pantry);
  const missing     = recipe.ingredients.filter((i) => !i.in_pantry);
  const readyToCook = missing.length === 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-4">
        <BackButton />
      </div>

      {/* ── Hero image ───────────────────────────────────────────── */}
      <div
        className="overflow-hidden mb-5 relative"
        style={{ border: "2px solid #1A1118", boxShadow: "4px 4px 0px #1A1118" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={recipe.image_url} alt={recipe.name} className="w-full h-52 sm:h-60 object-cover" />
        <div className="absolute top-3 right-3">
          <span
            className="text-[11px] font-black px-2.5 py-1"
            style={{
              background: readyToCook ? "#F9D4DD" : "#E8D5F5",
              border: "1.5px solid #1A1118",
              color: "#1A1118",
            }}
          >
            {readyToCook ? t.recipeReadyToCook : t.recipeMissing(missing.length)}
          </span>
        </div>
      </div>

      {/* ── Title ────────────────────────────────────────────────── */}
      <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: "#1A1118", letterSpacing: "-0.04em" }}>
        {recipe.name}
      </h1>
      <div className="flex items-center gap-3 text-xs mb-1" style={{ color: "#7A6070" }}>
        <span>⏱ {recipe.prep_time_minutes} min</span>
        <span>·</span>
        <span>{recipe.ingredients.length} ingredients</span>
        <span>·</span>
        <span>{recipe.steps.length} steps</span>
      </div>

      {/* Pantry servings estimate */}
      {pantryLabel && (
        <div className="mb-4">
          <span
            className="inline-block text-xs font-black px-2.5 py-1"
            style={{ background: "#7C3048", color: "#F9D4DD", border: "1.5px solid #7C3048" }}
          >
            🍽️ {pantryLabel} from your current cart
          </span>
        </div>
      )}

      {/* ── Servings scaler ──────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 mb-5 p-3"
        style={{ border: "1.5px solid #1A1118", background: "#E8D5F5" }}
      >
        <span className="text-sm font-bold" style={{ color: "#1A1118" }}>{t.recipeServings}</span>
        <button
          onClick={() => setServings((s) => Math.max(1, s - 1))}
          aria-label="Decrease servings"
          className="w-7 h-7 flex items-center justify-center text-sm font-black transition-all"
          style={{ border: "1.5px solid #1A1118", background: "#FAF8F5" }}
        >−</button>
        <input
          type="number" min={1} max={20} value={servings}
          onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= 20) setServings(v); }}
          aria-label={t.recipeServings}
          className="w-12 text-center font-black text-base outline-none"
          style={{ border: "1.5px solid #1A1118", background: "#FAF8F5", color: "#1A1118" }}
        />
        <button
          onClick={() => setServings((s) => Math.min(20, s + 1))}
          aria-label="Increase servings"
          className="w-7 h-7 flex items-center justify-center text-sm font-black transition-all"
          style={{ border: "1.5px solid #1A1118", background: "#FAF8F5" }}
        >+</button>
        {ratio !== 1 && (
          <span className="ml-auto text-xs font-bold" style={{ color: "#7C3048" }}>
            ×{formatNum(ratio)} scaled
          </span>
        )}
      </div>

      {/* ── Ingredients ──────────────────────────────────────────── */}
      <section className="mb-6">
        <h2 className="text-sm font-black uppercase tracking-wide mb-2" style={{ color: "#1A1118" }}>
          {t.recipeIngredients}
          <span className="ml-2 text-[11px] font-normal normal-case tracking-normal" style={{ color: "#7A6070" }}>
            {t.recipeInPantry(inPantry.length, recipe.ingredients.length)}
          </span>
        </h2>

        <div style={{ border: "1.5px solid #1A1118" }}>
          {[...inPantry, ...missing].map((ing, i) => {
            const scaledQty = ing.quantity ? scaleQuantity(ing.quantity, ratio) : null;
            // Check if this item is currently in the cart
            const pantryItem = items.find((item) => item.item_name.toLowerCase() === ing.name.toLowerCase());
            const isAdded = !!pantryItem || ing.in_pantry;

            const handleToggleCart = () => {
              if (ing.in_pantry) return;
              if (pantryItem) {
                removeItem(pantryItem.id);
              } else {
                addItems([
                  {
                    id: uuidv4(),
                    item_name: ing.name,
                    quantity: scaledQty || "1",
                    category: ing.category || "groceries",
                    added_at: new Date().toISOString(),
                  }
                ]);
              }
            };

            return (
              <div
                key={ing.name}
                className="flex items-center gap-3 px-3 py-2.5"
                style={{
                  borderBottom: i < recipe.ingredients.length - 1 ? "1px solid rgba(26,17,24,0.1)" : "none",
                  background: ing.in_pantry ? "#FAF8F5" : "#fff",
                }}
              >
                <span style={{ color: ing.in_pantry ? "#166534" : "#d97706" }} className="text-sm w-4">
                  {ing.in_pantry ? "✓" : "✗"}
                </span>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: ing.in_pantry ? "#1A1118" : "#7A6070" }}>
                    {ing.name}
                  </span>
                  {scaledQty && (
                    <span
                      className="ml-2 text-xs font-bold"
                      style={{ color: ratio !== 1 ? "#7C3048" : "#7A6070" }}
                    >
                      {scaledQty}
                    </span>
                  )}
                </div>
                {ing.in_pantry ? (
                  <span
                    className="text-[10px] font-black px-2 py-0.5"
                    style={{
                      background: "#F9D4DD",
                      border: "1px solid rgba(26,17,24,0.15)",
                      color: "#1A1118",
                    }}
                  >
                    {t.recipeInPantryLabel}
                  </span>
                ) : (
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-black px-2 py-0.5"
                      style={{
                        background: isAdded ? "#dcfce7" : "#fef3c7",
                        border: isAdded ? "1px solid #16a34a" : "1px solid rgba(26,17,24,0.15)",
                        color: isAdded ? "#166534" : "#1A1118",
                      }}
                    >
                      {isAdded ? t.recipeInPantryLabel : t.recipeMissingLabel}
                    </span>
                    <AddToCartButton isAdded={!!pantryItem} onClick={handleToggleCart} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Steps ────────────────────────────────────────────────── */}
      <section className="mb-6">
        <h2 className="text-sm font-black uppercase tracking-wide mb-3" style={{ color: "#1A1118" }}>
          {t.recipeHowToMake}
        </h2>
        <ol className="flex flex-col gap-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-black mt-0.5"
                style={{ background: "#7C3048", color: "#F9D4DD", border: "1px solid #1A1118" }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-[1.7]" style={{ color: "#3D2A38" }}>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Missing items ─────────────────────────────────────────── */}
      {missing.length > 0 && (
        <div className="p-4" style={{ background: "#E8D5F5", border: "1.5px solid #1A1118" }}>
          <p className="text-sm font-black mb-1" style={{ color: "#1A1118" }}>
            {t.recipeStillNeed(missing.length)}
          </p>
          <p className="text-xs" style={{ color: "#7A6070" }}>
            {missing.map((i) => i.name).join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}