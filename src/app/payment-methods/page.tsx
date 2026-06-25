import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Wallet, ShieldCheck, Lock } from "lucide-react";
import ContentPage, { H2, P } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Payment Methods — Yangkedu",
  description: "Accepted payment methods and how we keep your payments secure.",
};

const METHODS: { icon: typeof CreditCard; label: string; note: string }[] = [
  { icon: CreditCard, label: "Credit & Debit Cards", note: "Visa, Mastercard, American Express" },
  { icon: Wallet, label: "PayPal", note: "Pay with your PayPal balance or linked account" },
];

export default function PaymentMethodsPage() {
  return (
    <ContentPage
      icon={CreditCard}
      title="Payment Methods"
      subtitle="Flexible, secure ways to pay for your group buys."
      crumbs={[{ label: "Payment & Security" }, { label: "Payment Methods" }]}
    >
      <H2>Accepted methods</H2>
      <div className="grid gap-3 sm:grid-cols-2">
        {METHODS.map((m) => (
          <div key={m.label} className="flex items-center gap-3 rounded-lg border border-line p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pill text-brand">
              <m.icon size={20} />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-ink">{m.label}</p>
              <p className="text-[12px] text-muted">{m.note}</p>
            </div>
          </div>
        ))}
      </div>

      <H2>When you&apos;re charged</H2>
      <P>
        Payment is taken securely when you place your order. If you start a group buy that doesn&apos;t fill in time, the
        order is cancelled and your payment is refunded in full automatically.
      </P>

      <H2>Your security</H2>
      <P>
        <span className="inline-flex items-center gap-1 align-middle text-ink"><Lock size={14} /> </span>
        All payments are encrypted in transit and processed by PCI-DSS compliant providers. We never store your full
        card number on our servers.
      </P>

      <div className="mt-6 flex items-center gap-2 rounded-lg bg-canvas p-4 text-[13px] text-ink">
        <ShieldCheck size={18} className="shrink-0 text-brand" />
        Every order is covered by{" "}
        <Link href="/buyer-protection" className="font-semibold text-brand hover:underline">
          Buyer Protection
        </Link>
        .
      </div>
    </ContentPage>
  );
}
