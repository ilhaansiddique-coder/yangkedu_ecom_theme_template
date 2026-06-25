import Link from "next/link";
import { categories } from "@/lib/products";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Customer Service",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "How to Order", href: "/how-to-order" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "About Yangkedu",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Shop All", href: "/shop" },
    ],
  },
  {
    title: "Payment & Security",
    links: [
      { label: "Payment Methods", href: "/payment-methods" },
      { label: "Buyer Protection", href: "/buyer-protection" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/** Website footer — only visible on desktop (lg+). */
export default function DesktopFooter() {
  return (
    <footer className="mt-6 hidden border-t border-line bg-white lg:block">
      <div className="mx-auto grid w-full max-w-[1450px] grid-cols-4 gap-8 px-4 py-10">
        <div>
          <span className="font-display text-[22px] font-extrabold text-brand">Yangkedu</span>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Team up, buy together, and pay less. Group-buy deals on everything from electronics to fresh food.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-[14px] font-semibold text-ink">{col.title}</h4>
            <ul className="space-y-2 text-[13px] text-muted lg:text-[14px]">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1450px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-[12px] text-muted">
          {categories
            .filter((c) => c.id !== "more")
            .map((c) => (
              <Link key={c.id} href={`/category?cat=${c.id}`} className="hover:text-brand">
                {c.name}
              </Link>
            ))}
        </div>
      </div>

      <div className="border-t border-line bg-canvas py-4 text-center text-[12px] text-muted">
        © 2026 Yangkedu Demo · Pinduoduo-style storefront · Built with Next.js
      </div>
    </footer>
  );
}
