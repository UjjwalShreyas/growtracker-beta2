import React from "react";

export type CategoryIconType =
  | "grain"
  | "dairy"
  | "vegetable"
  | "spice"
  | "other"
  | "groceries"
  | "vegetables"
  | "leafy"
  | string;

interface CategoryIconProps {
  category: CategoryIconType;
  className?: string;
  size?: number;
  color?: string;
}

export function CategoryIcon({
  category,
  className = "",
  size = 20,
  color = "currentColor",
}: CategoryIconProps) {
  const key = category?.toLowerCase() || "other";

  // Groceries Main Category Icon (Shopping Bag / Basket)
  if (key === "groceries") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }

  // Vegetables Main Category Icon (Fresh Produce / Leaf & Sprout)
  if (key === "vegetables" || key === "vegetable" || key === "produce") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }

  // Leafy Greens & Herbs Icon
  if (key === "leafy" || key === "herbs") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 22v-9" />
        <path d="M12 13C12 7 6 5 4 5c0 6 3.5 8 8 8Z" />
        <path d="M12 13c0-6 6-8 8-8 0 6-3.5 8-8 8Z" />
      </svg>
    );
  }

  // Grains & Bakery Icon (Wheat Stalk)
  if (key === "grain" || key === "grains") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
      </svg>
    );
  }

  // Dairy & Refrigerated Icon (Milk Bottle / Pitcher)
  if (key === "dairy") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M8 2h8" />
        <path d="M9 2v3.17a2 2 0 0 1-.59 1.41L7 8h10l-1.41-1.42A2 2 0 0 1 15 5.17V2" />
        <path d="M7 8v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8" />
        <path d="M7 14h10" />
      </svg>
    );
  }

  // Spice & Seasonings Icon (Mortar & Pestle / Jar)
  if (key === "spice" || key === "spices") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M14 4 9.5 8.5" />
        <path d="M5 12h14a6 6 0 0 1-14 0Z" />
        <path d="M4 18h16" />
        <path d="M6 21h12" />
      </svg>
    );
  }

  // Default / Pantry / Other Icon (Box / Container)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
