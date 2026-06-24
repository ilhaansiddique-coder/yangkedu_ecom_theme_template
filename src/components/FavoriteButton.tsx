"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";

/**
 * Heart toggle. Two variants:
 *  - "overlay" → floating circle on a product card image (stops Link navigation).
 *  - "plain"   → inline icon button for the product detail page.
 */
export default function FavoriteButton({
  id,
  variant = "overlay",
  size = 18,
}: {
  id: string;
  variant?: "overlay" | "plain";
  size?: number;
}) {
  const { has, toggle } = useFavorites();
  const active = has(id);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  }

  if (variant === "plain") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={active ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={active}
        className="flex flex-col items-center gap-0.5 text-muted"
      >
        <Heart size={size} className={active ? "fill-brand text-brand" : "text-muted"} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className="absolute right-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm"
    >
      <Heart size={size} className={active ? "fill-brand text-brand" : "text-muted"} />
    </button>
  );
}
