import Link from "next/link";
import { categories } from "@/lib/products";
import { categoryIcons } from "@/lib/icons";

/** Two-row quick-entry icon grid (PDD home shortcuts). */
export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-5 gap-y-3 rounded-lg bg-white px-2 py-3 lg:grid-cols-10">
      {categories.map((c) => {
        const Icon = categoryIcons[c.id];
        return (
          <Link key={c.id} href={`/category?cat=${c.id}`} className="flex flex-col items-center gap-1.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pill text-brand lg:h-12 lg:w-12">
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span className="text-[12px] text-ink lg:text-[13px]">{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
