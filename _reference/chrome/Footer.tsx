"use client";

import Link from "next/link";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { Editable } from "@/storefront-engine/editor/Editable";
import "../styles.css";

export default function Footer() {
  const settings = useSiteSettings();
  const brand = settings.site_name || "Brand";
  const year = new Date().getFullYear();

  return (
    <footer className="tpl-foot">
      <div className="tpl-foot__grid">
        <div>
          <h4>{brand}</h4>
          <Editable section="footer" field="tagline" defaultValue="One-line about your store." label="Footer tagline">
            {(v, ep) => <p {...ep}>{v}</p>}
          </Editable>
        </div>
        <div>
          <h4>Shop</h4>
          <Link href="/shop">All products</Link>
          <Link href="/shop?category=new">New arrivals</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund">Refunds</Link>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: 32, fontSize: 12, opacity: 0.6 }}>
        © {year} {brand}. All rights reserved.
      </p>
    </footer>
  );
}
