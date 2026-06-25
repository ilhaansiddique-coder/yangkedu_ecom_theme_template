import type { Metadata } from "next";
import Link from "next/link";
import { ListChecks } from "lucide-react";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "How to Order — Yangkedu",
  description: "A step-by-step guide to placing an order and starting a group buy on Yangkedu.",
};

const STEPS: { t: string; d: string }[] = [
  { t: "1. Find a product", d: "Browse the home feed, categories, or search for what you want. Tap any card to open the product details." },
  { t: "2. Choose to buy solo or group", d: "Tap “Buy now” to purchase at the solo price, or “Start group buy” to unlock the lower group price by teaming up with other shoppers." },
  { t: "3. Add to cart & review", d: "Open the cart drawer to review your items, adjust quantities, and see your total savings before checkout." },
  { t: "4. Check out", d: "Confirm your shipping address, pick a payment method, and place your order. Payment is taken securely at this step." },
  { t: "5. Track your order", d: "Follow your order status under My Account → My Orders, from “Group buying” through to “To receive.”" },
];

export default function HowToOrderPage() {
  return (
    <ContentPage
      icon={ListChecks}
      title="How to Order"
      subtitle="From browsing to doorstep in five simple steps."
      crumbs={[{ label: "Customer Service" }, { label: "How to Order" }]}
    >
      {STEPS.map((s) => (
        <div key={s.t} className="border-b border-line py-4 first:pt-0 last:border-0">
          <H2>{s.t}</H2>
          <P>{s.d}</P>
        </div>
      ))}

      <H2>Tips for a smooth group buy</H2>
      <UL>
        <li>Share your group link with friends to fill it faster.</li>
        <li>If a group doesn&apos;t fill in time, your order auto-cancels with a full refund.</li>
        <li>Watch for the “Super Deal” and “Lightning Deals” badges for the deepest discounts.</li>
      </UL>

      <div className="mt-6 rounded-lg bg-canvas p-4 text-center">
        <p className="text-[14px] font-semibold text-ink">Ready to start?</p>
        <Link
          href="/shop"
          className="mt-3 inline-block rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white"
        >
          Shop all products
        </Link>
      </div>
    </ContentPage>
  );
}
