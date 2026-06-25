import type { Metadata } from "next";
import Link from "next/link";
import { PackageCheck, RefreshCw, ShieldCheck, Headphones } from "lucide-react";
import ContentPage, { H2, P } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Buyer Protection — Yangkedu",
  description: "Shop worry-free: refund guarantees, safe payments, and support on every order.",
};

const GUARANTEES: { icon: typeof ShieldCheck; title: string; body: string }[] = [
  { icon: PackageCheck, title: "Item as described", body: "Get what you ordered, or your money back if it arrives damaged, faulty, or not as described." },
  { icon: RefreshCw, title: "Easy refunds", body: "Return eligible items within 7 days. Group buys that don't fill are refunded automatically." },
  { icon: ShieldCheck, title: "Secure payments", body: "Encrypted checkout through trusted, PCI-compliant payment providers." },
  { icon: Headphones, title: "Real support", body: "Our team helps resolve any issue with your order, every step of the way." },
];

export default function BuyerProtectionPage() {
  return (
    <ContentPage
      icon={ShieldCheck}
      title="Buyer Protection"
      subtitle="Every order on Yangkedu is covered, end to end."
      crumbs={[{ label: "Payment & Security" }, { label: "Buyer Protection" }]}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {GUARANTEES.map((g) => (
          <div key={g.title} className="rounded-lg border border-line p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pill text-brand">
              <g.icon size={20} />
            </span>
            <p className="mt-3 text-[14px] font-semibold text-ink">{g.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{g.body}</p>
          </div>
        ))}
      </div>

      <H2>How a claim works</H2>
      <P>
        If something&apos;s wrong, open the order under My Account → My Orders and tap “Request refund.” Share a quick
        description (and a photo if it&apos;s damaged), and we&apos;ll review it fast — most claims are resolved within
        48 hours.
      </P>

      <H2>What&apos;s covered</H2>
      <P>
        Non-delivery, items significantly different from their description, and damaged or defective goods are all
        covered. See <Link href="/returns" className="text-brand hover:underline">Returns &amp; Refunds</Link> for full
        eligibility and timelines.
      </P>

      <div className="mt-6 rounded-lg bg-canvas p-4 text-center">
        <p className="text-[14px] font-semibold text-ink">Need help with an order?</p>
        <Link
          href="/contact"
          className="mt-3 inline-block rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white"
        >
          Contact support
        </Link>
      </div>
    </ContentPage>
  );
}
