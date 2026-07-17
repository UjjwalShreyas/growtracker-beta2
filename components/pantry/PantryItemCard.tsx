// PantryItemCard — brutalist minimal style with blush/lavender/paper category accents and crisp SVG icons.

import { PantryItem } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { translateCategory, translateItemName } from "@/lib/i18n/translations";
import { CategoryIcon } from "@/components/pantry/CategoryIcon";

const CATEGORY_BG: Record<string, string> = {
  grain:     "#fef9c3",
  dairy:     "#e0f2fe",
  vegetable: "#dcfce7",
  spice:     "#fee2e2",
  leafy:     "#d1fae5",
  other:     "#f3f4f6",
};

interface PantryItemCardProps {
  item: PantryItem;
  onDelete?: (id: string) => void;
  subcategoryLabel?: string;
}

export default function PantryItemCard({ item, onDelete, subcategoryLabel }: PantryItemCardProps) {
  const { t } = useLanguage();
  const bg = CATEGORY_BG[item.category] ?? CATEGORY_BG.other;
  const displayName = translateItemName(item.item_name, t);
  const displayCategory = translateCategory(subcategoryLabel || item.category, t);

  const isExpiring = (() => {
    if (!item.expiry_date) return false;
    const today = new Date("2026-07-14");
    const exp = new Date(item.expiry_date);
    const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 4;
  })();

  const isLowStock = 
    item.quantity.includes("1 L") ||
    item.quantity.includes("200 g") ||
    item.quantity.includes("1 bunch") ||
    item.quantity.includes("6 pieces") ||
    item.quantity.includes("250 g");

  const needsAttention = isExpiring || isLowStock;

  return (
    <div
      className="flex items-center gap-3 p-3.5 group transition-all rounded-xl"
      style={{
        border: needsAttention ? "2px solid #EF4444" : "1.5px solid #1A1118",
        background: needsAttention ? "#FEF2F2" : "#FAF8F5",
        boxShadow: needsAttention ? "3px 3px 0px #EF4444" : "3px 3px 0px rgba(26,17,24,0.15)",
      }}
    >
      {/* Crisp SVG Icon bubble */}
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0 rounded-lg"
        style={{
          background: bg,
          border: needsAttention ? "1.5px solid #EF4444" : "1.5px solid #1A1118"
        }}
      >
        <CategoryIcon category={item.category} size={20} color={needsAttention ? "#EF4444" : "#1A1118"} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="font-bold text-[0.875rem] truncate leading-tight" style={{ color: needsAttention ? "#B91C1C" : "#1A1118" }}>
            {displayName}
          </p>
          {isExpiring && (
            <span
              className="text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded text-white shrink-0"
              style={{ background: "#EF4444" }}
            >
              {t.alertBadgeExpiringSoon || "Expiring"}
            </span>
          )}
          {!isExpiring && isLowStock && (
            <span
              className="text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded text-white shrink-0"
              style={{ background: "#F97316" }}
            >
              {t.alertBadgeRunningLow || "Low Stock"}
            </span>
          )}
        </div>
        <p className="text-[11px] font-medium mt-0.5" style={{ color: needsAttention ? "#B91C1C" : "#7A6070" }}>
          {item.quantity}
        </p>
        <span
          className="inline-block text-[10px] font-black uppercase tracking-wider mt-1 px-2 py-0.5 rounded"
          style={{
            border: needsAttention ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(26,17,24,0.2)",
            background: needsAttention ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.6)",
            color: needsAttention ? "#B91C1C" : "#7A6070",
          }}
        >
          {displayCategory}
        </span>
      </div>

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          aria-label={`Remove ${displayName}`}
          className="w-7 h-7 flex items-center justify-center text-base shrink-0 rounded-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
          style={{ border: "1.5px solid #7A6070", color: "#7A6070" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fee2e2";
            e.currentTarget.style.borderColor = "#ef4444";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#7A6070";
            e.currentTarget.style.color = "#7A6070";
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
