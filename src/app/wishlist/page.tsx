"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import BackHeader from "@/components/BackHeader";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/lib/favorites";
import { getProduct } from "@/lib/products";

export default function WishlistPage() {
  const { ids } = useFavorites();
  const items = ids.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      <BackHeader title="Favorites" />
      <h1 className="hidden pb-3 text-[22px] font-bold text-ink lg:block">My Favorites</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <Heart size={56} strokeWidth={1.3} className="text-line" />
          <p className="text-[14px] text-muted">No favorites yet</p>
          <p className="text-[12px] text-muted">Tap the heart on any product to save it here.</p>
          <Link href="/shop" className="mt-1 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 px-2 pb-6 sm:grid-cols-3 lg:grid-cols-5 lg:px-0">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
