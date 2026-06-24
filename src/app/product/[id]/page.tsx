import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import BackHeader from "@/components/BackHeader";
import AddToCartBar from "@/components/AddToCartBar";
import BuyButtons from "@/components/BuyButtons";
import Gallery from "@/components/Gallery";
import GroupBuyTicker from "@/components/GroupBuyTicker";
import VariantPicker from "@/components/VariantPicker";
import ProductReviews from "@/components/ProductReviews";
import FavoriteButton from "@/components/FavoriteButton";
import { ProductBuyProvider } from "@/lib/product-buy";
import { getProduct, productVariants, productRating, productReviewCount } from "@/lib/products";
import { money, soldLabel } from "@/lib/format";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const variants = productVariants(product);
  const rating = productRating(product);
  const reviewCount = productReviewCount(product);

  return (
    <ProductBuyProvider variants={variants}>
      <div className="bg-canvas pb-16 lg:bg-transparent lg:pb-0">
        <BackHeader title="Product Details" />

        {/* top: image + (desktop) info column */}
        <div className="lg:flex lg:gap-8 lg:rounded-lg lg:bg-white lg:p-6">
          <Gallery images={product.gallery} alt={product.name} />

          {/* desktop info column */}
          <div className="hidden flex-1 flex-col gap-4 lg:flex">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-[22px] font-semibold leading-snug text-ink">{product.name}</h1>
              <FavoriteButton id={product.id} variant="plain" size={22} />
            </div>
            <div className="flex items-center gap-2 text-[13px] text-muted">
              <span className="inline-flex items-center gap-0.5 text-[#ffb400]">
                <Star size={15} className="fill-[#ffb400]" />
                <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
              </span>
              <span>·</span>
              <span>{reviewCount.toLocaleString()} reviews</span>
              <span>·</span>
              <span>{soldLabel(product.sold)}</span>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-5 py-4 text-white">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[34px] font-extrabold leading-none">{money(product.price)}</span>
                <span className="text-[15px] opacity-80 line-through">{money(product.singlePrice)}</span>
                <span className="rounded bg-white/20 px-2 py-0.5 text-[12px]">Group price</span>
              </div>
              <p className="mt-2 text-[13px] opacity-90">{soldLabel(product.sold)} · trending bestseller</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span key={t} className="rounded-sm bg-pill px-2 py-0.5 text-[12px] text-brand">
                  {t}
                </span>
              ))}
            </div>
            {variants.length > 0 && <VariantPicker />}
            <GroupBuyTicker />
            <BuyButtons product={product} />
          </div>
        </div>

        {/* mobile price block */}
        <div className="bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-4 py-3 text-white lg:hidden">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[28px] font-extrabold leading-none">{money(product.price)}</span>
            <span className="text-sm opacity-80 line-through">{money(product.singlePrice)}</span>
            <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px]">Group price</span>
          </div>
          <p className="mt-1 text-[12px] opacity-90">{soldLabel(product.sold)} · trending bestseller</p>
        </div>

        {/* mobile title + tags */}
        <div className="mt-2 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-[16px] font-semibold leading-snug text-ink">{product.name}</h1>
            <FavoriteButton id={product.id} variant="plain" size={20} />
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[12px] text-muted">
            <span className="inline-flex items-center gap-0.5 text-[#ffb400]">
              <Star size={13} className="fill-[#ffb400]" />
              <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
            </span>
            <span>·</span>
            <span>{reviewCount.toLocaleString()} reviews</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="rounded-sm bg-pill px-1.5 py-0.5 text-[11px] text-brand">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <GroupBuyTicker />
          </div>
        </div>

        {/* mobile variant picker */}
        {variants.length > 0 && (
          <div className="mt-2 bg-white px-4 py-4 lg:hidden">
            <VariantPicker />
          </div>
        )}

        {/* description — shared */}
        <div className="mt-2 bg-white px-4 py-3 lg:mt-4 lg:rounded-lg lg:px-6 lg:py-5">
          <h2 className="mb-2 text-[14px] font-semibold text-ink lg:text-[18px]">Product Details</h2>
          <p className="text-[13px] leading-relaxed text-muted lg:text-[15px]">{product.desc}</p>
          <div className="mt-3 space-y-2 lg:mx-auto lg:max-w-[760px]">
            {product.gallery.map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={g} alt="" className="w-full rounded-lg" loading="lazy" />
            ))}
          </div>
        </div>

        <ProductReviews product={product} />

        <AddToCartBar product={product} />
      </div>
    </ProductBuyProvider>
  );
}
