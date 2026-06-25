import type { Metadata } from "next";
import { Info } from "lucide-react";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "About Us — Yangkedu",
  description: "How Yangkedu uses group buying to bring you the lowest prices on everything.",
};

const STATS = [
  { value: "300M+", label: "Orders shipped" },
  { value: "180k+", label: "Group deals daily" },
  { value: "50%", label: "Average savings" },
  { value: "4.8★", label: "Buyer rating" },
];

export default function AboutPage() {
  return (
    <ContentPage
      icon={Info}
      title="About Yangkedu"
      subtitle="Team up, buy together, and pay less."
      crumbs={[{ label: "About Us" }]}
    >
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg bg-canvas p-3 text-center">
            <p className="font-display text-[20px] font-extrabold text-brand">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <H2>Our story</H2>
      <P>
        Yangkedu started with a simple idea: shopping is cheaper when you do it together. By letting buyers team up
        into group buys, we negotiate factory-direct prices and pass the savings straight to you — no middlemen, no
        markup.
      </P>

      <H2>How group buying works</H2>
      <UL>
        <li>Pick any product and choose the group price instead of the solo price.</li>
        <li>Share the deal with friends — once enough people join, the group locks in.</li>
        <li>Everyone in the group pays the lower price and their order ships out.</li>
      </UL>

      <H2>What we stand for</H2>
      <P>
        Every item is 100% authentic and backed by buyer protection. If something isn&apos;t right, our 7-day no-hassle
        returns and freshness guarantees have you covered. We work directly with manufacturers and farms so quality
        stays high while prices stay low.
      </P>

      <H2>Sustainability</H2>
      <P>
        Aggregating orders means fewer, fuller shipments and less waste. We&apos;re committed to greener logistics and
        responsible sourcing across our partner network.
      </P>
    </ContentPage>
  );
}
