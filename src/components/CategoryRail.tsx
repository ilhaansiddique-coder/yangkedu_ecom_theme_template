import Link from "next/link";
import { categories } from "@/lib/products";
import { categoryIcons } from "@/lib/icons";

/**
 * Vertical list of categories. Shared by the desktop docked rail and the
 * mobile category drawer. `onSelect` lets the drawer close itself on tap.
 */
export default function CategoryRail({ active, onSelect }: { active: string; onSelect?: () => void }) {
  return (
    <nav>
      {categories
        .filter((c) => c.id !== "more")
        .map((c) => {
          const on = c.id === active;
          const Icon = categoryIcons[c.id];
          return (
            <Link
              key={c.id}
              href={`/category?cat=${c.id}`}
              onClick={onSelect}
              className={`flex items-center gap-2.5 border-l-[3px] px-4 py-3 text-[14px] ${
                on ? "border-brand bg-pill font-semibold text-brand" : "border-transparent text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {c.name}
            </Link>
          );
        })}
    </nav>
  );
}
