"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { type Product, productHighlights, productSpecs } from "@/lib/products";

/** Section 3: two-tab toggle — Product Description vs Specifications. */
export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<"desc" | "specs">("desc");
  const highlights = productHighlights(product);
  const specs = productSpecs(product);

  const tabCls = (on: boolean) =>
    `relative px-4 py-3 text-[14px] font-medium lg:text-[16px] ${on ? "text-brand" : "text-muted"}`;

  return (
    <div className="bg-white lg:rounded-lg">
      {/* tabs */}
      <div className="flex border-b border-line">
        <button type="button" onClick={() => setTab("desc")} className={tabCls(tab === "desc")}>
          Product Description
          {tab === "desc" && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
        </button>
        <button type="button" onClick={() => setTab("specs")} className={tabCls(tab === "specs")}>
          Specifications
          {tab === "specs" && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
        </button>
      </div>

      <div className="px-4 py-5 lg:px-6">
        {tab === "desc" ? (
          <div>
            <p className="mb-4 text-[14px] leading-relaxed text-muted lg:text-[15px]">{product.desc}</p>
            <h3 className="mb-2 text-[14px] font-semibold text-ink lg:text-[16px]">Key benefits</h3>
            <ul className="space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[14px] text-ink lg:text-[15px]">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand" />
                  <span className="capitalize">{h}</span>
                </li>
              ))}
            </ul>

            {/* gallery imagery — horizontal scroll row */}
            <div className="mt-5 flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {product.gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={g}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-[240px] shrink-0 rounded-lg object-cover lg:w-[300px]"
                />
              ))}
            </div>
          </div>
        ) : (
          <dl className="divide-y divide-line">
            {specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-2.5 text-[14px] lg:text-[15px]">
                <dt className="text-muted">{s.label}</dt>
                <dd className="text-right font-medium text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
