import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import BackHeader from "./BackHeader";

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Shared shell for static content pages (About, Terms, Privacy, Help, …).
 * Renders a themed brand-gradient hero banner (with a relevant icon) above a
 * white content card. Mobile keeps the back header for navigation.
 */
export default function ContentPage({
  title,
  subtitle,
  crumbs = [],
  icon: Icon,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      <BackHeader title={title} />

      <div className="mx-auto w-full max-w-[860px] px-3 py-4 lg:px-0 lg:py-2">
        {/* ── hero banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-5 py-6 text-white shadow-sm lg:px-9 lg:py-9">
          {/* decorative bokeh */}
          <span className="pointer-events-none absolute -right-8 -top-12 h-44 w-44 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -bottom-14 right-24 h-32 w-32 rounded-full bg-white/10" />
          {/* oversized echo icon */}
          {Icon && (
            <Icon size={170} strokeWidth={1} className="pointer-events-none absolute -bottom-8 right-2 hidden text-white/10 lg:block lg:right-6" />
          )}

          {/* desktop breadcrumb */}
          <nav className="relative mb-3 hidden items-center gap-1 text-[12px] text-white/80 lg:flex">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1">
                <ChevronRight size={13} />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="relative flex items-center gap-3.5 lg:gap-4">
            {Icon && (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 lg:h-16 lg:w-16">
                <Icon size={26} strokeWidth={1.8} className="lg:hidden" />
                <Icon size={32} strokeWidth={1.8} className="hidden lg:block" />
              </span>
            )}
            <div className="min-w-0">
              <h1 className="font-display text-[24px] font-extrabold leading-tight lg:text-[34px]">{title}</h1>
              {subtitle && <p className="mt-1 text-[13px] text-white/90 lg:text-[16px]">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* ── content card ── */}
        <div className="mt-3 rounded-lg bg-white p-4 lg:mt-4 lg:p-9">{children}</div>
      </div>
    </div>
  );
}

/* ── prose primitives — consistent typography across content pages ── */

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mb-2 mt-7 text-[16px] font-semibold text-ink first:mt-0 lg:text-[20px]">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[14px] leading-relaxed text-muted lg:text-[15px]">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="mb-3 ml-5 list-disc space-y-1.5 text-[14px] leading-relaxed text-muted lg:text-[15px]">{children}</ul>;
}
