import { DetectedItem } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { getExpiryInfo } from "@/lib/utils/pantryAlerts";

const CATEGORY_EMOJI: Record<string, string> = {
  medicine: "💊",
  pill: "💊",
  syrup: "🧪",
  firstaid: "🩺",
  grocery: "🛒",
  grain: "🌾",
  dairy: "🥛",
  vegetable: "🥦",
  spice: "🌶️",
  fruit: "🍎",
  bakery: "🍞",
  meat: "🥩",
};

interface DetectedItemRowProps {
  item: DetectedItem;
  onChange: (id: string, field: "item_name" | "quantity" | "expiry_date", value: string) => void;
  onDelete: (id: string) => void;
}

export default function DetectedItemRow({ item, onChange, onDelete }: DetectedItemRowProps) {
  const { t } = useLanguage();

  const icon = CATEGORY_EMOJI[item.category?.toLowerCase() || ""] || "💊";
  const expiryInfo = getExpiryInfo(item.expiry_date);

  return (
    <div
      className="flex flex-col gap-2.5 bg-white rounded-xl border-2 p-3.5 shadow-[3px_3px_0px_#1A1118] transition-all"
      style={{
        borderColor: expiryInfo?.isExpired ? "#EF4444" : "#1A1118",
        background: expiryInfo?.isExpired ? "#FEF2F2" : "#FFFFFF",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl shrink-0 p-2 rounded-lg bg-gray-50 border border-[#1A1118]">{icon}</span>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          {/* Editable item name */}
          <input
            type="text"
            value={item.item_name}
            onChange={(e) => onChange(item.id, "item_name", e.target.value)}
            aria-label={t.scanItemNameAriaLabel}
            placeholder={t.scanItemNamePlaceholder}
            className="w-full text-sm font-black text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1 focus:border-green-500 focus:outline-none transition-colors"
          />

          <div className="flex gap-2 items-center">
            {/* Editable quantity */}
            <input
              type="text"
              value={item.quantity}
              onChange={(e) => onChange(item.id, "quantity", e.target.value)}
              aria-label={t.scanQuantityAriaLabel}
              placeholder={t.scanQuantityPlaceholder}
              className="w-1/2 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 focus:border-green-400 focus:outline-none transition-colors"
            />

            {/* Editable Expiry Date Input */}
            <div className="w-1/2 flex items-center gap-1">
              <input
                type="date"
                value={item.expiry_date || ""}
                onChange={(e) => onChange(item.id, "expiry_date", e.target.value)}
                aria-label={t.scanExpiryAriaLabel}
                className="w-full text-xs font-bold bg-white border border-gray-300 rounded-lg px-2 py-1 text-gray-800 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(item.id)}
          aria-label={t.scanRemoveAriaLabel(item.item_name)}
          className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors font-black text-lg"
        >
          ×
        </button>
      </div>

      {/* Prominent Expiry Status & Time Remaining Badge */}
      {expiryInfo && (
        <div
          className="flex flex-wrap items-center justify-between gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border"
          style={{
            background: expiryInfo.badgeBg,
            color: expiryInfo.badgeColor,
            borderColor: expiryInfo.badgeBorder,
          }}
        >
          <span className="font-black text-[11px] uppercase tracking-wider">{expiryInfo.badgeText}</span>
          <span className="text-[11px]">{expiryInfo.timeRemainingText}</span>
        </div>
      )}
    </div>
  );
}
