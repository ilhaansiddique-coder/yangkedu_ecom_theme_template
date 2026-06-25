import Link from "next/link";
import { Check, Star } from "lucide-react";
import {
  type Product,
  productRating,
  productReviewCount,
  productStock,
  isLowStock,
} from "@/lib/products";
import { money, soldLabel } from "@/lib/format";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";

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
  const off = Math.round((1 - product.price / product.singlePrice) * 100);
  const rating = productRating(product);
  const reviewCount = productReviewCount(product);
  const stock = productStock(product);
  const soldOut = stock === 0;
  const lowStock = isLowStock(stock);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-line/60 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            soldOut ? "grayscale" : ""
          }`}
        />
        <FavoriteButton id={product.id} />
        {product.tags.includes("Super Deal") && !soldOut && (
          <span className="absolute left-0 top-0 bg-gradient-to-r from-[#ff7a00] to-[#e8290b] px-1.5 py-0.5 text-[10px] font-bold text-white">
            Super Deal
          </span>
        )}
        {off > 0 && (
          <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
            -{off}%
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/45">
            <span className="rounded-md bg-black/70 px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2">
        <p className="line-clamp-2 text-[13px] leading-snug text-ink lg:text-[14px]">{product.name}</p>

        {/* rating */}
        <div className="flex items-center gap-1 text-[11px] text-muted">
          <Star size={12} className="fill-[#ffb400] text-[#ffb400]" />
          <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
          <span>({reviewCount.toLocaleString()})</span>
        </div>

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

        <div className="mt-auto pt-1">
          {/* price + cart button aligned on the same row */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex min-w-0 items-baseline gap-1">
              <span className="font-display text-[20px] font-bold leading-none text-price">{money(product.price)}</span>
              <span className="truncate text-[11px] text-muted line-through">{money(product.singlePrice)}</span>
            </div>
            <AddToCartButton product={product} disabled={soldOut} />
          </div>
          {lowStock ? (
            <span className="mt-0.5 block text-[11px] font-semibold text-brand-orange">Only {stock} left</span>
          ) : (
            <span className="mt-0.5 block text-[11px] text-muted">{soldLabel(product.sold)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
