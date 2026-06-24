"use client";

import { Editable } from "@/storefront-engine/editor/Editable";
import "../styles.css";

const DEFAULT_ABOUT_IMG = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80";

export default function AboutPage() {
  return (
    <div className="tpl-page">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div style={{ aspectRatio: "4 / 5", overflow: "hidden", background: "var(--tpl-line)" }}>
          <Editable section="about" field="heroImage" type="image" defaultValue={DEFAULT_ABOUT_IMG} label="About image">
            {(src, ep) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...ep} src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </Editable>
        </div>
        <div>
          <Editable section="about" field="title" defaultValue="Our story" label="About title">
            {(v, ep) => <h1 {...ep} style={{ fontSize: 32, margin: "0 0 16px" }}>{v}</h1>}
          </Editable>
          <Editable
            section="about"
            field="body"
            defaultValue="Tell your story here. Tenants edit this in place from the storefront — keep the default copy generic so a fresh tenant sees something coherent before they personalise it."
            label="About body"
          >
            {(v, ep) => <p {...ep} style={{ color: "var(--tpl-muted)", lineHeight: 1.8, fontSize: 15 }}>{v}</p>}
          </Editable>
        </div>
      </div>
    </div>
  );
}
