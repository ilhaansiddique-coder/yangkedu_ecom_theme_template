"use client";

/**
 * TEMPLATE — Privacy / Terms / Refund pages.
 * Exports THREE named components from one file. Manifest maps each to
 * its loadPrivacyPage / loadTermsPage / loadRefundPage slot.
 */

import type { PolicyContent, PrivacyPageProps, RefundPageProps, TermsPageProps } from "@/storefront-engine/types/pages";
import { Editable } from "@/storefront-engine/editor/Editable";
import "../styles.css";

function pick(field: { en: string; bn: string }, lang: "en" | "bn"): string {
  return (lang === "bn" ? field.bn : field.en) || field.en || field.bn || "";
}

function PolicyView({ content, lang, section }: { content: PolicyContent; lang: "en" | "bn"; section: "privacy" | "terms" | "refund" }) {
  const title = pick(content.title, lang);
  const intro = pick(content.intro, lang);
  const lastUpdated = pick(content.lastUpdated, lang);

  return (
    <div className="tpl-page" style={{ maxWidth: 760 }}>
      <Editable section={section} field="title" defaultValue={title} label="Page title">
        {(v, ep) => <h1 {...ep} style={{ fontSize: 28, textAlign: "center", margin: "24px 0 8px" }}>{v}</h1>}
      </Editable>
      <p style={{ textAlign: "center", color: "var(--tpl-muted)", marginBottom: 32, fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em" }}>
        Last updated: {lastUpdated}
      </p>
      <Editable section={section} field="intro" defaultValue={intro} label="Intro">
        {(v, ep) => <p {...ep} style={{ color: "var(--tpl-muted)", lineHeight: 1.8, marginBottom: 24 }}>{v}</p>}
      </Editable>
      {content.sections.map((s, i) => {
        const n = i + 1;
        return (
          <div key={i}>
            <Editable section={section} field={`section${n}Title`} defaultValue={pick(s.title, lang)} label={`Section ${n} title`}>
              {(v, ep) => <h2 {...ep} style={{ fontSize: 20, marginTop: 24, marginBottom: 8 }}>{v}</h2>}
            </Editable>
            <Editable section={section} field={`section${n}Content`} defaultValue={pick(s.content, lang)} label={`Section ${n} body`}>
              {(v, ep) => <p {...ep} style={{ color: "var(--tpl-muted)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{v}</p>}
            </Editable>
          </div>
        );
      })}
    </div>
  );
}

export function PrivacyPage({ content, lang }: PrivacyPageProps) {
  return <PolicyView content={content} lang={lang} section="privacy" />;
}
export function TermsPage({ content, lang }: TermsPageProps) {
  return <PolicyView content={content} lang={lang} section="terms" />;
}
export function RefundPage({ content, lang }: RefundPageProps) {
  return <PolicyView content={content} lang={lang} section="refund" />;
}
