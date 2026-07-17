// lib/servingsEstimator.ts
// Estimates how many servings of a recipe can be made from current pantry quantities.
// Logic: parse pantry quantity, compare against scaled recipe ingredient quantity.
// Returns the number of servings you can feed, or null if undetermined.

import { PantryItem, Recipe } from "../data/mockData";

// ─── Unit conversion to grams / ml / pieces ──────────────────────────────────

type Parsed = { value: number; unit: string };

function parsePantryQty(raw: string): Parsed | null {
  const s = raw.toLowerCase().trim();

  // Handle "2 kg" → 2000g
  const kg = s.match(/^(\d+(?:\.\d+)?)\s*kg/);
  if (kg) return { value: parseFloat(kg[1]) * 1000, unit: "g" };

  // Handle "500g" or "500 g"
  const g = s.match(/^(\d+(?:\.\d+)?)\s*g\b/);
  if (g) return { value: parseFloat(g[1]), unit: "g" };

  // Handle "500ml" or "0.5 l"
  const ml = s.match(/^(\d+(?:\.\d+)?)\s*ml/);
  if (ml) return { value: parseFloat(ml[1]), unit: "ml" };
  const l = s.match(/^(\d+(?:\.\d+)?)\s*l\b/);
  if (l) return { value: parseFloat(l[1]) * 1000, unit: "ml" };

  // Handle "6 pieces" / "4 bulbs" / "2 medium" etc
  const pieces = s.match(/^(\d+(?:\.\d+)?)\s*(piece|bulb|bunch|medium|large|small|no|nos|count)/);
  if (pieces) return { value: parseFloat(pieces[1]), unit: "pieces" };

  // Handle plain number
  const plain = s.match(/^(\d+(?:\.\d+)?)\s*$/);
  if (plain) return { value: parseFloat(plain[1]), unit: "pieces" };

  return null;
}

// Maps recipe ingredient quantity strings (e.g. "1 cup", "2 tbsp") to grams/ml
const MEASURE_TO_G: Record<string, number> = {
  "cup":   240,
  "cups":  240,
  "tbsp":  15,
  "tsp":   5,
  "ml":    1,
  "l":     1000,
  "g":     1,
  "kg":    1000,
  "oz":    28,
};

function parseIngredientQty(raw: string): Parsed | null {
  const s = raw
    .replace("½", "0.5").replace("¼", "0.25").replace("¾", "0.75")
    .replace("⅓", "0.333").replace("⅔", "0.667")
    .toLowerCase().trim();

  const m = s.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)?/);
  if (!m) return null;

  const value = parseFloat(m[1]);
  const unit  = (m[2] ?? "pieces").trim();

  // Try to convert to grams/ml
  const factor = MEASURE_TO_G[unit];
  if (factor) return { value: value * factor, unit: unit === "ml" || unit === "l" ? "ml" : "g" };

  // Countable: inch, clove, piece, medium, large, leaf, etc.
  return { value, unit: "pieces" };
}

// ─── Main estimator ───────────────────────────────────────────────────────────

/**
 * Given a recipe and current pantry, returns the estimated number of full servings
 * that can be made from pantry quantities.
 * Returns null when insufficient data to determine.
 */
export function estimateServings(recipe: Recipe, pantry: PantryItem[]): number | null {
  const { servings: baseServings = 4, ingredients } = recipe;

  const ratios: number[] = [];

  for (const ing of ingredients) {
    // Skip items not in pantry — caller decides whether to show or block
    if (!ing.in_pantry || !ing.quantity) continue;

    // Find matching pantry item (case-insensitive substring match)
    const pantryItem = pantry.find((p) =>
      p.item_name.toLowerCase().includes(ing.name.toLowerCase().split(" ")[0]) ||
      ing.name.toLowerCase().includes(p.item_name.toLowerCase().split(" ")[0])
    );
    if (!pantryItem) continue;

    const pantryParsed = parsePantryQty(pantryItem.quantity);
    const ingParsed    = parseIngredientQty(ing.quantity);

    if (!pantryParsed || !ingParsed) continue;

    // Only compare if units are compatible
    const sameUnit =
      (pantryParsed.unit === "g"      && ingParsed.unit === "g")  ||
      (pantryParsed.unit === "ml"     && ingParsed.unit === "ml") ||
      (pantryParsed.unit === "pieces" && ingParsed.unit === "pieces");

    if (!sameUnit) continue;

    // How many times can this ingredient cover one recipe's worth?
    // ingParsed.value is for baseServings people
    const servingsFromThis = (pantryParsed.value / ingParsed.value) * baseServings;
    ratios.push(servingsFromThis);
  }

  if (ratios.length === 0) return null;

  // Bottleneck: you can only make as many servings as your scarcest ingredient allows
  return Math.floor(Math.min(...ratios));
}

/**
 * Formats the estimated servings as a human-readable label.
 */
export function formatServingsLabel(n: number | null): string {
  if (n === null) return "";
  if (n === 0) return "Not enough ingredients";
  if (n === 1) return "Feeds 1 person";
  return `Feeds ~${n} people`;
}
