"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import ContentPage, { H2, P } from "@/components/ContentPage";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "support@yangkedu.demo" },
  { icon: Phone, label: "Phone", value: "+1 (555) 018-8888" },
  { icon: MessageSquare, label: "Live chat", value: "In-app, 24/7" },
  { icon: Clock, label: "Hours", value: "Mon–Sun, 8am–10pm" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <ContentPage
      icon={Mail}
      title="Contact Us"
      subtitle="We usually reply within a few hours."
      crumbs={[{ label: "Contact Us" }]}
    >
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CHANNELS.map((c) => (
          <div key={c.label} className="rounded-lg bg-canvas p-3 text-center">
            <c.icon size={20} className="mx-auto text-brand" />
            <p className="mt-1.5 text-[12px] font-semibold text-ink">{c.label}</p>
            <p className="mt-0.5 text-[11px] text-muted">{c.value}</p>
          </div>
        ))}
      </div>

      <H2>Send us a message</H2>

      {sent ? (
        <div className="flex items-center gap-3 rounded-lg bg-canvas p-4">
          <CheckCircle2 size={22} className="shrink-0 text-brand" />
          <p className="text-[14px] text-ink">
            Thanks — your message has been sent. Our team will get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Your name"
              className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
            />
            <input
              required
              type="email"
              placeholder="Email address"
              className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
            />
          </div>
          <input
            placeholder="Order number (optional)"
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
          />
          <textarea
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-[14px] text-ink outline-none focus:border-brand"
          />
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-8 py-2.5 text-[14px] font-semibold text-white"
          >
            Send message
          </button>
        </form>
      )}

      <div className="mt-6">
        <H2>Visit us</H2>
        <P>Yangkedu HQ · 2500 Market Street, Suite 1001, San Francisco, CA 94114</P>
      </div>
    </ContentPage>
  );
}
