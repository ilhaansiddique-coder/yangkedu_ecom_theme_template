import ProductCard from "./ProductCard";
import { relatedProducts } from "@/lib/products";

/** "You may also like" rail shown at the bottom of the product page. */
export default function RelatedProducts({ id }: { id: string }) {
  const items = relatedProducts(id, 6);
  if (items.length === 0) return null;

  return (
    <section className="mt-2 rounded-lg bg-white p-3 lg:mt-4 lg:p-6">
      <h2 className="mb-3 text-[16px] font-bold text-ink lg:mb-4 lg:text-[20px]">You may also like</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
