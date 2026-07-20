// DetectedItemRow — an editable row for a single AI-detected grocery item.
// The user can correct the name/quantity/expiry or delete the item before confirming.
// Props:
//   item: DetectedItem                                          — item to render
//   onChange: (id, field, value) => void                       — fires on every edit
//   onDelete: (id: string) => void                             — fires when ✕ is clicked

import { useState } from "react";
import { DetectedItem } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface DetectedItemRowProps {
  item: DetectedItem;
  onChange: (id: string, field: "item_name" | "quantity" | "expiry_date", value: string) => void;
  onDelete: (id: string) => void;
}

export default function DetectedItemRow({ item, onChange, onDelete }: DetectedItemRowProps) {
  const { t } = useLanguage();
  const [expiryEditing, setExpiryEditing] = useState(false);

  // Show expiry section for any item that has a predicted date OR is a fast-expiring category
  const isFastExpiring =
    item.expiry_predicted ||
    ["dairy", "bakery", "vegetable", "fruit", "meat"].includes(item.category?.toLowerCase() || "") ||
    item.item_name.toLowerCase().includes("bread") ||
    item.item_name.toLowerCase().includes("milk");

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
      <span className="text-lg shrink-0">🛒</span>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Editable item name */}
        <input
          type="text"
          value={item.item_name}
          onChange={(e) => onChange(item.id, "item_name", e.target.value)}
          aria-label={t.scanItemNameAriaLabel}
          placeholder={t.scanItemNamePlaceholder}
          className="w-full text-sm font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:border-green-400 focus:outline-none transition-colors"
        />

        <div className="flex gap-2 items-start">
          {/* Editable quantity */}
          <input
            type="text"
            value={item.quantity}
            onChange={(e) => onChange(item.id, "quantity", e.target.value)}
            aria-label={t.scanQuantityAriaLabel}
            placeholder={t.scanQuantityPlaceholder}
            className="w-1/2 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:border-green-300 focus:outline-none transition-colors"
          />

          {/* Expiry date — for fast-expiring items */}
          {isFastExpiring && (
            <div className="w-1/2 flex flex-col gap-0.5">
              {/* If AI predicted and not yet being edited, show pill badge */}
              {item.expiry_predicted && !expiryEditing ? (
                <button
                  type="button"
                  onClick={() => setExpiryEditing(true)}
                  aria-label={t.scanExpiryAriaLabel}
                  className="w-full flex items-center justify-between gap-1 text-xs font-medium bg-violet-50 border border-violet-200 text-violet-700 rounded px-2 py-1 hover:bg-violet-100 transition-colors group"
                >
                  <span className="truncate">
                    🤖 {item.expiry_date
                      ? new Date(item.expiry_date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
                      : "—"}
                  </span>
                  <span className="text-[10px] text-violet-400 group-hover:text-violet-600 shrink-0">✏️</span>
                </button>
              ) : (
                /* Editable date input */
                <input
                  type="date"
                  autoFocus={expiryEditing}
                  value={item.expiry_date || ""}
                  onChange={(e) => {
                    onChange(item.id, "expiry_date", e.target.value);
                  }}
                  onBlur={() => setExpiryEditing(false)}
                  aria-label={t.scanExpiryAriaLabel}
                  className="w-full text-xs text-red-600 font-medium bg-red-50 border border-red-200 rounded px-2 py-1 focus:border-red-400 focus:outline-none transition-colors"
                />
              )}
              {/* Sub-label */}
              <span className="text-[10px] text-violet-400 px-0.5">
                {item.expiry_predicted && !expiryEditing ? t.scanExpiryAIPredicted : t.scanExpiryAriaLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(item.id)}
        aria-label={t.scanRemoveAriaLabel(item.item_name)}
        className="shrink-0 w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
