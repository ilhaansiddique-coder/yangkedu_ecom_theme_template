import type { Metadata } from "next";
import { Truck } from "lucide-react";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Shipping & Returns — Yangkedu",
  description: "Delivery times, shipping costs, and our hassle-free returns policy.",
};

const TABLE = [
  { method: "Standard", time: "3–6 business days", cost: "Free" },
  { method: "Express", time: "1–3 business days", cost: "$4.99" },
  { method: "Fresh / Cold-chain", time: "1–2 business days", cost: "Free over $20" },
];

export default function ShippingPage() {
  return (
    <ContentPage
      icon={Truck}
      title="Shipping & Returns"
      subtitle="Fast delivery and worry-free returns on every order."
      crumbs={[{ label: "Shipping & Returns" }]}
    >
      <H2>Delivery options</H2>
      <div className="mb-4 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-left text-[13px] lg:text-[14px]">
          <thead className="bg-canvas text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Method</th>
              <th className="px-3 py-2 font-medium">Estimated time</th>
              <th className="px-3 py-2 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody className="text-ink">
            {TABLE.map((r) => (
              <tr key={r.method} className="border-t border-line">
                <td className="px-3 py-2 font-medium">{r.method}</td>
                <td className="px-3 py-2 text-muted">{r.time}</td>
                <td className="px-3 py-2">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        Group-buy orders ship once the group is complete. Delivery estimates start from the moment your group locks in,
        not from when you place the order.
      </P>

      <H2>Tracking your order</H2>
      <P>
        Once your order ships you&apos;ll receive a tracking number by email, and you can follow its status any time from
        your account under My Orders.
      </P>

      <H2>Returns</H2>
      <UL>
        <li>Most items can be returned within 7 days of delivery in their original condition.</li>
        <li>Fresh food and personal-care items are covered by a freshness / quality guarantee instead of returns.</li>
        <li>Start a return from My Orders → Refunds, and we&apos;ll send a prepaid label where eligible.</li>
      </UL>

      <H2>Refunds</H2>
      <P>
        Approved refunds are issued to your original payment method, typically within 3–5 business days after we receive
        the returned item.
      </P>
    </ContentPage>
  );
}
