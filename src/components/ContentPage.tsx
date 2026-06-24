import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BackHeader from "./BackHeader";

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Shared shell for static content pages (About, Terms, Privacy, Help, …).
 * Mobile gets the back header; desktop gets a breadcrumb + title in a white card.
 */
export default function ContentPage({
  title,
  subtitle,
  crumbs = [],
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      <BackHeader title={title} />

      <div className="mx-auto w-full max-w-[860px] px-3 py-4 lg:px-0 lg:py-2">
        {/* desktop breadcrumb */}
        <nav className="hidden items-center gap-1 pb-3 text-[12px] text-muted lg:flex">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight size={13} />
              {c.href ? (
                <Link href={c.href} className="hover:text-brand">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="rounded-lg bg-white p-4 lg:p-9">
          <h1 className="font-display text-[22px] font-extrabold leading-tight text-ink lg:text-[30px]">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[13px] text-muted lg:text-[15px]">{subtitle}</p>}
          <div className="mt-5 lg:mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── prose primitives — consistent typography across content pages ── */

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 mt-7 text-[16px] font-semibold text-ink first:mt-0 lg:text-[19px]">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[14px] leading-relaxed text-muted lg:text-[15px]">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="mb-3 ml-5 list-disc space-y-1.5 text-[14px] leading-relaxed text-muted lg:text-[15px]">{children}</ul>;
}
