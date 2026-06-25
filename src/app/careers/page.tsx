import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import ContentPage, { H2, P } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Careers — Yangkedu",
  description: "Join the Yangkedu team and help make great deals accessible to everyone.",
};

const ROLES: { title: string; team: string; location: string }[] = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote" },
  { title: "Product Designer", team: "Design", location: "Remote / Hybrid" },
  { title: "Category Manager — Electronics", team: "Merchandising", location: "On-site" },
  { title: "Customer Support Specialist", team: "Operations", location: "Remote" },
  { title: "Data Analyst, Growth", team: "Analytics", location: "Hybrid" },
];

export default function CareersPage() {
  return (
    <ContentPage
      icon={Briefcase}
      title="Careers"
      subtitle="Build the future of group-buy shopping with us."
      crumbs={[{ label: "About Yangkedu" }, { label: "Careers" }]}
    >
      <P>
        We&apos;re a small, fast-moving team on a simple mission: make great products affordable by letting shoppers team
        up. If you love solving real problems for real people, we&apos;d love to hear from you.
      </P>

      <H2>Why Yangkedu</H2>
      <P>
        Flexible remote-first work, real ownership over what you ship, and the chance to put a dent in how millions of
        people shop. We invest in growth, value clarity over process, and celebrate shipping.
      </P>

      <H2>Open roles</H2>
      <div className="divide-y divide-line">
        {ROLES.map((r) => (
          <div key={r.title} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="text-[14px] font-semibold text-ink">{r.title}</p>
              <p className="text-[12px] text-muted">{r.team} · {r.location}</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full border border-brand px-4 py-1.5 text-[12px] font-semibold text-brand hover:bg-pill"
            >
              Apply
            </Link>
          </div>
        ))}
      </div>

      <P>
        Don&apos;t see your role? Tell us how you&apos;d help on our <Link href="/contact" className="text-brand hover:underline">contact page</Link> — we&apos;re always glad to meet great people.
      </P>
    </ContentPage>
  );
}
