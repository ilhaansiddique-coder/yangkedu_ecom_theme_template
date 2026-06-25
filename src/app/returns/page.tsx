import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Returns & Refunds — Yangkedu",
  description: "Our 7-day return policy, how to start a return, and when to expect your refund.",
};

export default function ReturnsPage() {
  return (
    <ContentPage
      icon={RotateCcw}
      title="Returns & Refunds"
      subtitle="Shop with confidence — easy returns within 7 days of delivery."
      crumbs={[{ label: "Customer Service" }, { label: "Returns & Refunds" }]}
    >
      <H2>7-day no-hassle returns</H2>
      <P>
        Changed your mind? You can request a return within 7 days of delivery for most items. The product should be
        unused and in its original packaging where possible.
      </P>

      <H2>How to start a return</H2>
      <UL>
        <li>Go to My Account → My Orders and open the order.</li>
        <li>Select the item and tap “Request return / refund.”</li>
        <li>Choose a reason and submit — we&apos;ll email a prepaid label where eligible.</li>
        <li>Drop off the parcel and track the refund from the same screen.</li>
      </UL>

      <H2>When you&apos;ll get your refund</H2>
      <P>
        Once we receive and inspect your return, refunds are issued to your original payment method within 3–5 business
        days. Group-buy orders that don&apos;t fill are refunded automatically — no return needed.
      </P>

      <H2>Items that can&apos;t be returned</H2>
      <UL>
        <li>Perishable food and fresh produce (unless damaged or spoiled on arrival).</li>
        <li>Personal care items that have been opened or used.</li>
        <li>Final-sale or clearance items marked non-returnable.</li>
      </UL>

      <P>
        Damaged or wrong item? It&apos;s covered by <Link href="/buyer-protection" className="text-brand hover:underline">Buyer Protection</Link> — we&apos;ll make it right.
      </P>
    </ContentPage>
  );
}
