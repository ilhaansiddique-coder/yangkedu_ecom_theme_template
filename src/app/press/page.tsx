import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import ContentPage, { H2, P } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Press — Yangkedu",
  description: "Press resources, brand assets, and media contact for Yangkedu.",
};

const NEWS: { date: string; title: string }[] = [
  { date: "Jun 2026", title: "Yangkedu surpasses 10 million group buys completed" },
  { date: "Apr 2026", title: "New “Lightning Deals” launch brings hourly flash sales to shoppers" },
  { date: "Feb 2026", title: "Yangkedu expands fresh-food category with farm-direct partners" },
];

export default function PressPage() {
  return (
    <ContentPage
      icon={Newspaper}
      title="Press"
      subtitle="News, media resources, and brand assets."
      crumbs={[{ label: "About Yangkedu" }, { label: "Press" }]}
    >
      <P>
        For interviews, data requests, or brand assets, reach our communications team and we&apos;ll get back to you
        within two business days.
      </P>

      <H2>In the news</H2>
      <div className="divide-y divide-line">
        {NEWS.map((n) => (
          <div key={n.title} className="py-3">
            <p className="text-[12px] text-muted">{n.date}</p>
            <p className="text-[14px] font-medium text-ink">{n.title}</p>
          </div>
        ))}
      </div>

      <H2>Media kit</H2>
      <P>
        Logos, product screenshots, and founder bios are available on request. Please credit “Yangkedu” and avoid
        altering the logo&apos;s colors or proportions.
      </P>

      <div className="mt-6 rounded-lg bg-canvas p-4 text-center">
        <p className="text-[14px] font-semibold text-ink">Media enquiries</p>
        <p className="mt-1 text-[13px] text-muted">press@yangkedu.example</p>
        <Link
          href="/contact"
          className="mt-3 inline-block rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white"
        >
          Contact us
        </Link>
      </div>
    </ContentPage>
  );
}
