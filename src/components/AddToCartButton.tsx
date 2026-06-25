"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import type { Product } from "@/lib/products";

/**
 * Compact add-to-cart button used on product cards. Lives inside the card's
 * <Link>, so it stops the click from navigating and adds the item at the
 * group price. On add it briefly flips to a green check for confirmation,
 * then reverts. It does NOT open the cart drawer.
 */
export default function AddToCartButton({ product, disabled = false }: { product: Product; disabled?: boolean }) {
  const { add } = useCart();
  const toast = useToast();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${product.name} is sold out`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="flex h-8 w-11 shrink-0 items-center justify-center rounded-md bg-line text-muted lg:h-9 lg:w-12"
      >
        <ShoppingCart size={15} />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={added ? "Added to cart" : `Add ${product.name} to cart`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add({ id: product.id, name: product.name, image: product.image, price: product.price }, 1);
        toast("Added to cart");
        setAdded(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1400);
      }}
      className={`flex h-8 w-11 shrink-0 items-center justify-center rounded-md text-white shadow-sm transition active:scale-90 lg:h-9 lg:w-12 ${
        added ? "bg-[#1f9d55]" : "bg-gradient-to-r from-[#fb5621] to-[#e8290b] active:brightness-95"
      }`}
    >
      {added ? <Check size={16} strokeWidth={3} /> : <ShoppingCart size={15} />}
    </button>
  );
}
