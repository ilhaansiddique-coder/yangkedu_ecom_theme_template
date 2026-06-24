import type { Metadata } from "next";
import ContentPage, { H2, P, UL } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Yangkedu",
  description: "How Yangkedu collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      subtitle="Last updated: June 24, 2026"
      crumbs={[{ label: "Privacy Policy" }]}
    >
      <P>
        Your privacy matters to us. This policy explains what information we collect and how we use it. This is a demo
        storefront; the policy below is illustrative.
      </P>

      <H2>Information we collect</H2>
      <UL>
        <li>Account details you provide, such as your name and email address.</li>
        <li>Order and delivery information needed to fulfill your purchases.</li>
        <li>Usage data such as pages viewed and items added to your cart.</li>
      </UL>

      <H2>How we use your information</H2>
      <UL>
        <li>To process orders, form group buys, and deliver your products.</li>
        <li>To personalize recommendations and improve our service.</li>
        <li>To send order updates and, with your consent, promotional offers.</li>
      </UL>

      <H2>Cookies</H2>
      <P>
        We use cookies and similar technologies to keep you signed in, remember your cart, and understand how the site
        is used. You can control cookies through your browser settings.
      </P>

      <H2>Sharing</H2>
      <P>
        We share data only with the partners needed to operate the service — such as payment processors and logistics
        providers — and never sell your personal information.
      </P>

      <H2>Your rights</H2>
      <P>
        You can access, correct, or delete your personal data at any time from your account, or by contacting us. You
        may also opt out of marketing communications.
      </P>

      <H2>Contact</H2>
      <P>For privacy questions or data requests, reach out through our Contact page.</P>
    </ContentPage>
  );
}
