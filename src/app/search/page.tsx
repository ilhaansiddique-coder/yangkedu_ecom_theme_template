"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { searchProducts, hotKeywords } from "@/lib/products";

function SearchView() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q")?.trim() ?? "";
  const results = searchProducts(q);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = (new FormData(e.currentTarget).get("q") as string)?.trim();
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="bg-canvas lg:bg-transparent">
      {/* mobile search bar */}
      <form onSubmit={submit} className="sticky top-0 z-30 flex items-center gap-2 bg-brand px-3 py-2 lg:hidden">
        <button type="button" onClick={() => router.back()} aria-label="Back" className="flex items-center text-white">
          <ChevronLeft size={24} />
        </button>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-white px-3">
          <Search size={16} className="text-muted" />
          <input
            key={q}
            name="q"
            defaultValue={q}
            autoFocus={!q}
            placeholder="Search for products"
            className="flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          />
        </div>
        <button type="submit" className="text-[13px] font-semibold text-white">
          Search
        </button>
      </form>

      {/* desktop heading + form */}
      <form onSubmit={submit} className="hidden items-center gap-3 pb-3 lg:flex">
        <div className="flex h-10 w-[420px] items-center gap-2 rounded-full border-2 border-brand bg-white px-4">
          <Search size={18} className="text-muted" />
          <input
            key={`d-${q}`}
            name="q"
            defaultValue={q}
            placeholder="Search for products"
            className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
          />
        </div>
        <button type="submit" className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[14px] font-semibold text-white">
          Search
        </button>
      </form>

      {q === "" ? (
        // no query yet → hot keywords
        <div className="p-4">
          <p className="mb-3 text-[13px] font-semibold text-ink">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {hotKeywords.map((k) => (
              <Link
                key={k}
                href={`/search?q=${encodeURIComponent(k)}`}
                className="rounded-full bg-white px-4 py-1.5 text-[13px] text-ink lg:bg-pill"
              >
                {k}
              </Link>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        // no matches
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Search size={52} strokeWidth={1.4} className="text-line" />
          <p className="text-[14px] text-muted">No results for “{q}”</p>
          <p className="text-[12px] text-muted">Try another keyword:</p>
          <div className="flex flex-wrap justify-center gap-2 px-6">
            {hotKeywords.slice(0, 5).map((k) => (
              <Link key={k} href={`/search?q=${encodeURIComponent(k)}`} className="rounded-full bg-white px-3 py-1 text-[12px] text-brand lg:bg-pill">
                {k}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p className="px-3 py-2 text-[13px] text-muted lg:px-0">
            {results.length} result{results.length > 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-ink">“{q}”</span>
          </p>
          <div className="grid grid-cols-2 gap-2 px-2 pb-4 sm:grid-cols-3 lg:grid-cols-5 lg:px-0">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted">Loading…</div>}>
      <SearchView />
    </Suspense>
  );
}
