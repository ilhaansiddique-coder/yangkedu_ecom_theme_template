import Link from "next/link";
import { Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { money, soldLabel } from "@/lib/format";
import FavoriteButton from "./FavoriteButton";

/** Tags that read as a reassurance (rendered green with a check) vs a deal (red). */
const GREEN_WORDS = ["Shipping", "Return", "Guarantee", "Safe", "Direct", "Fresh", "Ships", "Pay later"];
const isGreen = (t: string) => GREEN_WORDS.some((w) => t.includes(w));

/**
 * PDD-style waterfall card: image with a "Super Deal" corner ribbon, 2-line
 * title, reassurance/deal tags, a big red price with the struck solo price,
 * and a sold count. Tapping the whole card opens the product (no button).
 */
export default function ProductCard({ product }: { product: Product }) {
  const tags = product.tags.filter((t) => t !== "Super Deal").slice(0, 2);

  return (
    <Link href={`/product/${product.id}`} className="flex flex-col overflow-hidden rounded-[10px] bg-white">
      <div className="relative aspect-square w-full overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        <FavoriteButton id={product.id} />
        {product.tags.includes("Super Deal") && (
          <span className="absolute left-0 top-0 bg-gradient-to-r from-[#ff7a00] to-[#e8290b] px-1.5 py-0.5 text-[10px] font-bold text-white">
            Super Deal
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2">
        <p className="line-clamp-2 text-[13px] leading-snug text-ink">{product.name}</p>

        <div className="flex flex-wrap gap-1">
          {tags.map((t) =>
            isGreen(t) ? (
              <span
                key={t}
                className="inline-flex items-center gap-0.5 rounded-sm border border-[#1f9d55]/40 bg-[#1f9d55]/10 px-1 py-px text-[10px] text-[#1f9d55]"
              >
                <Check size={10} strokeWidth={3} />
                {t}
              </span>
            ) : (
              <span key={t} className="rounded-sm border border-brand/40 bg-pill px-1 py-px text-[10px] text-brand">
                {t}
              </span>
            ),
          )}
        </div>

        <div className="mt-auto flex items-baseline gap-1 pt-1">
          <span className="font-display text-[19px] font-bold leading-none text-price">{money(product.price)}</span>
          <span className="text-[11px] text-muted line-through">{money(product.singlePrice)}</span>
        </div>

        <span className="text-[11px] text-muted">{soldLabel(product.sold)}</span>
      </div>
    </Link>
  );
}
