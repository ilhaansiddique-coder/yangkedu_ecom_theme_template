import { notFound } from "next/navigation";
import BackHeader from "@/components/BackHeader";
import AddToCartBar from "@/components/AddToCartBar";
import ProductGallery from "@/components/ProductGallery";
import ProductPanel from "@/components/ProductPanel";
import ProductTabs from "@/components/ProductTabs";
import ProductReviews from "@/components/ProductReviews";
import GroupBuyTicker from "@/components/GroupBuyTicker";
import { ProductBuyProvider } from "@/lib/product-buy";
import { getProduct, productVariants } from "@/lib/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const variants = productVariants(product);

  return (
    <ProductBuyProvider variants={variants}>
      <div className="bg-canvas pb-20 lg:bg-transparent lg:pb-0">
        <BackHeader title="Product Details" />

        {/* ── Section 1: above-the-fold split screen ── */}
        <div className="bg-white lg:flex lg:gap-8 lg:rounded-lg lg:p-6">
          <ProductGallery images={product.gallery} alt={product.name} />
          <div className="px-4 py-4 lg:flex-1 lg:px-0 lg:py-0">
            <ProductPanel product={product} />
            <div className="mt-4 lg:mt-5">
              <GroupBuyTicker />
            </div>
          </div>
        </div>

        {/* ── Section 3: description / specifications ── */}
        <div className="mt-2 lg:mt-4">
          <ProductTabs product={product} />
        </div>

        {/* ── Section 4: reviews ── */}
        <div className="mt-2 lg:mt-4">
          <ProductReviews product={product} />
        </div>

        {/* mobile sticky footer bar */}
        <AddToCartBar product={product} />
      </div>
    </ProductBuyProvider>
  );
}
