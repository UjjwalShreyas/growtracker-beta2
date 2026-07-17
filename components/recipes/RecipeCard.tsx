// RecipeCard — recipe thumbnail, name, prep time, and missing-ingredients badge.
// Full card is a button so the whole surface is tappable — important on mobile.

import { Recipe } from "@/lib/data/mockData";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const missing = recipe.ingredients.filter((i) => !i.in_pantry).length;
  const readyToCook = missing === 0;

  return (
    <button
      onClick={onClick}
      className="card card-lift rounded-[20px] overflow-hidden text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 group"
    >
      {/* Thumbnail with overlay on hover */}
      <div className="relative overflow-hidden h-44">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image_url}
          alt={recipe.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status pill over the image */}
        <div className="absolute top-3 right-3">
          {readyToCook ? (
            <span className="badge badge-green shadow-sm">✓ Ready</span>
          ) : (
            <span className="badge badge-amber shadow-sm">{missing} missing</span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-[0.95rem] leading-snug">{recipe.name}</h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span aria-hidden>⏱</span> {recipe.prep_time_minutes} min
          </span>
          <span className="text-gray-200 text-xs">·</span>
          <span className="text-xs text-gray-400">
            {recipe.ingredients.length} ingredients
          </span>
        </div>
      </div>
    </button>
  );
}
