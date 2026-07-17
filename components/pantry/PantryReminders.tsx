"use client";

import React, { useState, useMemo } from "react";
import { PantryItem } from "@/lib/data/mockData";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { translateItemName } from "@/lib/i18n/translations";

interface AlertItem {
  id: string;
  type: "expiry" | "low_stock" | "instant";
  title: string;
  message: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface PantryRemindersProps {
  items: PantryItem[];
}

export default function PantryReminders({ items }: PantryRemindersProps) {
  const { t } = useLanguage();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "expiry" | "low_stock">("all");

  const alerts = useMemo<AlertItem[]>(() => {
    const list: AlertItem[] = [];

    // 1. Expiring soon or expired items
    items.forEach((item) => {
      const displayName = translateItemName(item.item_name, t);
      if (item.expiry_date) {
        const today = new Date("2026-07-14");
        const exp = new Date(item.expiry_date);
        const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 3600 * 24));

        if (diffDays <= 4) {
          list.push({
            id: `exp-${item.id}`,
            type: "expiry",
            title: displayName,
            message:
              diffDays <= 0
                ? t.dashAlertExpired(displayName)
                : t.dashAlertExpiringSoon(displayName, diffDays),
            badge: diffDays <= 1 ? t.alertBadgeUrgent : t.alertBadgeExpiringSoon,
            color: "#B91C1C",
            bgColor: "#FEF2F2",
            borderColor: "#EF4444",
          });
        }
      }
    });

    // 2. Low stock / Running out items
    const lowStockItems = items.filter(
      (item) =>
        item.quantity.includes("1 L") ||
        item.quantity.includes("200 g") ||
        item.quantity.includes("1 bunch") ||
        item.quantity.includes("6 pieces") ||
        item.quantity.includes("250 g")
    );

    lowStockItems.slice(0, 3).forEach((item) => {
      const displayName = translateItemName(item.item_name, t);
      list.push({
        id: `low-${item.id}`,
        type: "low_stock",
        title: displayName,
        message: t.dashAlertLowStock(displayName, item.quantity),
        badge: t.alertBadgeRunningLow,
        color: "#C2410C",
        bgColor: "#FFF7ED",
        borderColor: "#F97316",
      });
    });

    // 3. Instant update / System notification
    list.push({
      id: "instant-update-1",
      type: "instant",
      title: t.alertInstantTitle,
      message: t.alertInstantBody,
      badge: t.alertBadgeNewUpdate,
      color: "#4338CA",
      bgColor: "#EEF2FF",
      borderColor: "#6366F1",
    });

    return list;
  }, [items, t]);

  const activeAlerts = alerts.filter(
    (a) => !dismissedIds.includes(a.id) && (filter === "all" || a.type === filter)
  );

  if (activeAlerts.length === 0 && dismissedIds.length === alerts.length) {
    return null;
  }

  return (
    <div
      className="mb-6 rounded-2xl transition-all p-4"
      style={{
        background: "#FAF8F5",
        border: "2px solid #1A1118",
        boxShadow: "3px 3px 0px rgba(26,17,24,0.15)",
      }}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b-2 border-[#1A1118]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#FEE2E2] border-1.5 border-[#1A1118] flex items-center justify-center text-base">
            🔔
          </span>
          <div>
            <h3 className="font-black text-sm uppercase tracking-wide text-[#1A1118]">
              {t.dashRemindersTitle}
            </h3>
            <p className="text-[11px] font-medium text-[#7A6070]">{t.dashRemindersSub}</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md border transition-all ${
              filter === "all" ? "bg-[#1A1118] text-white border-[#1A1118]" : "bg-white text-[#7A6070] border-[#7A6070]"
            }`}
          >
            {t.alertFilterAll(alerts.filter((a) => !dismissedIds.includes(a.id)).length)}
          </button>
          <button
            type="button"
            onClick={() => setFilter("expiry")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md border transition-all ${
              filter === "expiry"
                ? "bg-[#EF4444] text-white border-[#EF4444]"
                : "bg-white text-[#EF4444] border-[#EF4444]"
            }`}
          >
            {t.alertFilterExpiry}
          </button>
          <button
            type="button"
            onClick={() => setFilter("low_stock")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md border transition-all ${
              filter === "low_stock"
                ? "bg-[#F97316] text-white border-[#F97316]"
                : "bg-white text-[#F97316] border-[#F97316]"
            }`}
          >
            {t.alertFilterLowStock}
          </button>
        </div>
      </div>

      {/* Alerts feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between gap-3 p-3 rounded-xl transition-all"
            style={{
              background: alert.bgColor,
              border: `1.5px solid ${alert.borderColor}`,
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase rounded"
                  style={{
                    background: alert.color,
                    color: "#FFFFFF",
                  }}
                >
                  {alert.badge}
                </span>
                <span className="text-xs font-bold truncate" style={{ color: alert.color }}>
                  {alert.title}
                </span>
              </div>
              <p className="text-xs font-medium leading-snug" style={{ color: "#1A1118" }}>
                {alert.message}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => setDismissedIds((prev) => [...prev, alert.id])}
              title={t.dashDismissAlert}
              className="w-6 h-6 flex items-center justify-center text-sm font-bold rounded shrink-0 hover:bg-black/10 transition-colors"
              style={{ color: alert.color }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
