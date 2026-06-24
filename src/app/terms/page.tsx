import type { Metadata } from "next";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Terms of Service — Yangkedu",
  description: "The terms that govern your use of the Yangkedu storefront.",
};

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of Service"
      subtitle="Last updated: June 24, 2026"
      crumbs={[{ label: "Terms of Service" }]}
    >
      <P>
        Welcome to Yangkedu. By accessing or using our website and services, you agree to be bound by these Terms of
        Service. Please read them carefully. This is a demo storefront; the terms below are illustrative.
      </P>

      <H2>1. Using our service</H2>
      <P>
        You must be at least 18 years old, or have the consent of a parent or guardian, to place an order. You agree to
        provide accurate account and delivery information and to keep your login credentials secure.
      </P>

      <H2>2. Group buys</H2>
      <UL>
        <li>A group-buy price applies only once the required number of participants has joined the group.</li>
        <li>If a group fails to fill within its window, your order may be cancelled and fully refunded.</li>
        <li>Group-buy pricing cannot be combined with certain coupons unless stated otherwise.</li>
      </UL>

      <H2>3. Orders and pricing</H2>
      <P>
        All prices are shown in US dollars and may change without notice. We reserve the right to cancel orders
        resulting from pricing errors, fraud, or stock shortages. A confirmed order does not guarantee availability
        until payment is captured.
      </P>

      <H2>4. Payments</H2>
      <P>
        Payment is processed at the time you place an order. By submitting payment details you confirm you are
        authorized to use the chosen payment method.
      </P>

      <H2>5. Returns and refunds</H2>
      <P>
        Eligible items may be returned within 7 days of delivery in their original condition. Refunds are issued to the
        original payment method. See our Shipping &amp; Returns page for full details.
      </P>

      <H2>6. Acceptable use</H2>
      <P>
        You agree not to misuse the service, including attempting to disrupt the platform, scrape data at scale, or
        engage in fraudulent activity. We may suspend accounts that violate these terms.
      </P>

      <H2>7. Limitation of liability</H2>
      <P>
        The service is provided &quot;as is.&quot; To the maximum extent permitted by law, Yangkedu is not liable for
        any indirect or consequential damages arising from your use of the service.
      </P>

      <H2>8. Contact</H2>
      <P>Questions about these terms? Reach us through the Contact page and we&apos;ll be happy to help.</P>
    </ContentPage>
  );
}
