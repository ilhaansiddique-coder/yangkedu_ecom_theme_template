import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { H2, P } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Help Center — Yangkedu",
  description: "Answers to common questions about ordering, group buys, payments, and delivery.",
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I place an order?",
    a: "Browse the shop, open a product, and tap “Start group buy” or “Buy now.” Add items to your cart, then check out and confirm your delivery address and payment.",
  },
  {
    q: "What is a group buy?",
    a: "A group buy lets several shoppers team up to unlock a lower price. Once enough people join your group, the discounted price is locked in for everyone and orders ship out.",
  },
  {
    q: "What happens if my group doesn't fill?",
    a: "If a group doesn't reach the required number of members in time, your order is cancelled automatically and you receive a full refund — no action needed.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept major credit and debit cards as well as PayPal. Payment is taken securely when you place your order.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery is 3–6 business days once your group locks in. Express and cold-chain options are available at checkout. See Shipping & Returns for details.",
  },
  {
    q: "How do I return an item?",
    a: "Go to My Orders → Refunds within 7 days of delivery to start a return. We'll provide a prepaid label where eligible and refund your original payment method.",
  },
];

export default function HelpPage() {
  return (
    <ContentPage
      title="Help Center"
      subtitle="Quick answers to the questions we hear most."
      crumbs={[{ label: "Help Center" }]}
    >
      {FAQS.map((f) => (
        <div key={f.q} className="border-b border-line py-4 first:pt-0 last:border-0">
          <H2>{f.q}</H2>
          <P>{f.a}</P>
        </div>
      ))}

      <div className="mt-6 rounded-lg bg-canvas p-4 text-center">
        <p className="text-[14px] font-semibold text-ink">Still need help?</p>
        <p className="mt-1 text-[13px] text-muted">Our support team is here for you.</p>
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
