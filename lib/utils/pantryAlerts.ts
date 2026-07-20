// Shared, real logic for pantry alerts — used by both PantryItemCard
// and PantryReminders so the two never drift out of sync again.

import { PantryItem } from "@/lib/data/mockData";

/** Parses a quantity string like "500 g" or "2 pieces" into a number + unit. */
function parseQuantity(qty: string): { value: number; unit: string } | null {
  const match = qty.match(/^(\d+(?:\.\d+)?)\s*(.*)/);
  if (!match) return null;
  return { value: parseFloat(match[1]), unit: match[2].trim().toLowerCase() };
}

/**
 * Reasonable "low stock" absolute floors by unit, used as a fallback
 * when we don't have an initial_quantity baseline to compare against
 * (e.g. items added before this feature existed).
 */
const ABSOLUTE_LOW_THRESHOLDS: Record<string, number> = {
  g: 100,
  kg: 0.2,
  ml: 200,
  l: 0.3,
  bunch: 1,
  bunches: 1,
  piece: 2,
  pieces: 2,
  unit: 2,
  units: 2,
};

const LOW_STOCK_PERCENT = 0.2; // flag when 20% or less of original remains

export function isExpiringSoon(item: PantryItem): boolean {
  if (!item.expiry_date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(item.expiry_date);
  const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 3600 * 24));
  return diffDays <= 4;
}

export function isExpired(item: PantryItem): boolean {
  if (!item.expiry_date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(item.expiry_date);
  const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 3600 * 24));
  return diffDays <= 0;
}

export function daysUntilExpiry(item: PantryItem): number | null {
  if (!item.expiry_date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(item.expiry_date);
  return Math.ceil((exp.getTime() - today.getTime()) / (1000 * 3600 * 24));
}

export function isLowStock(item: PantryItem): boolean {
  const current = parseQuantity(item.quantity);
  if (!current) return false;

  const initial = item.initial_quantity ? parseQuantity(item.initial_quantity) : null;

  // Preferred path: real percentage-remaining, when we have a baseline
  // and the units match (e.g. both "g", not "g" vs "kg").
  if (initial && initial.unit === current.unit && initial.value > 0) {
    return current.value / initial.value <= LOW_STOCK_PERCENT;
  }

  // Fallback path: no baseline available (older items) — use a
  // reasonable absolute floor per unit instead of a hardcoded string list.
  const threshold = ABSOLUTE_LOW_THRESHOLDS[current.unit];
  if (threshold !== undefined) {
    return current.value <= threshold;
  }

  return false;
}