"use client";

// PageHeader — consistent header for inner pages.
// Back button left, optional centered title, optional right slot.
// Brutalist theme: sharp corners, ink border.

import { BackButton } from "@/components/layout/BackButton";

interface PageHeaderProps {
  title?: string;
  right?: React.ReactNode;
}

export function PageHeader({ title, right }: PageHeaderProps) {
  return (
    <div
      className="flex items-center justify-between mb-5 gap-3 pb-3"
      style={{ borderBottom: "1.5px solid rgba(26,17,24,0.12)" }}
    >
      {/* Left: Back Button */}
      <div className="shrink-0 w-[60px] flex items-center justify-start">
        <BackButton />
      </div>

      {/* Center: Title */}
      {title && (
        <h1
          className="text-sm font-black text-center truncate px-2"
          style={{ color: "#1A1118", letterSpacing: "0.05em" }}
        >
          {title}
        </h1>
      )}

      {/* Right: Optional slot */}
      <div className="shrink-0 w-[60px] flex justify-end">
        {right ?? null}
      </div>
    </div>
  );
}