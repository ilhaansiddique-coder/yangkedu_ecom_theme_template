import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Sustainability — Yangkedu",
  description: "How Yangkedu works to reduce waste and ship more responsibly.",
};

export default function SustainabilityPage() {
  return (
    <ContentPage
      icon={Leaf}
      title="Sustainability"
      subtitle="Smarter buying that&apos;s lighter on the planet."
      crumbs={[{ label: "About Yangkedu" }, { label: "Sustainability" }]}
    >
      <P>
        Group buying isn&apos;t just cheaper — done right, it&apos;s greener. By pooling demand we ship more efficiently,
        cut overproduction, and reduce the number of trips it takes to get goods to your door.
      </P>

      <H2>Consolidated shipping</H2>
      <P>
        When a group fills, orders are batched and routed together. Fewer, fuller shipments mean lower emissions per
        item compared with one-off deliveries.
      </P>

      <H2>Less overproduction</H2>
      <P>
        Demand-led group buys help our partners produce closer to what&apos;s actually needed, reducing surplus stock
        and the waste that comes with it.
      </P>

      <H2>Our commitments</H2>
      <UL>
        <li>Plastic-reduced packaging, with recyclable materials as the default.</li>
        <li>Carbon-aware delivery routing on consolidated shipments.</li>
        <li>Partner standards that favor responsible sourcing.</li>
        <li>Clear reporting on our progress as we grow.</li>
      </UL>

      <P>
        We&apos;re early in this journey and improving every quarter. Sustainability is a direction, not a finish line —
        and we&apos;ll keep raising the bar.
      </P>
    </ContentPage>
  );
}
