"use client";

import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { trackLead } from "@/lib/analytics";
import { Editable } from "@/storefront-engine/editor/Editable";
import "../styles.css";

export default function ContactPage() {
  const settings = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "general", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      // Contact submits go straight to the public endpoint (no api client method).
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      trackLead({ em: form.email || undefined, ph: form.phone || undefined, fn: form.name });
      setSent(true);
    } catch { /* show generic error */ }
    finally { setSending(false); }
  };

  return (
    <div className="tpl-page">
      <Editable section="contact" field="title" defaultValue="Get in touch" label="Contact title">
        {(v, ep) => <h1 {...ep} style={{ fontSize: 28, textAlign: "center", margin: "24px 0 32px" }}>{v}</h1>}
      </Editable>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        {sent ? (
          <div style={{ padding: 32, background: "#f0fdf4", border: "1px solid #bbf7d0", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 8px" }}>Thank you</h2>
            <p style={{ color: "var(--tpl-muted)" }}>Your message has been sent.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            {[
              { name: "name",    label: "Name",    type: "text"  },
              { name: "email",   label: "Email",   type: "email" },
              { name: "phone",   label: "Phone",   type: "tel"   },
            ].map((f) => (
              <label key={f.name} style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
                <span style={{ color: "var(--tpl-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{f.label}</span>
                <input type={f.type} required={f.name !== "phone"} value={form[f.name as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} style={{ padding: 10, border: "1px solid var(--tpl-line)", fontSize: 14 }} />
              </label>
            ))}
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
              <span style={{ color: "var(--tpl-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>Subject</span>
              <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ padding: 10, border: "1px solid var(--tpl-line)", fontSize: 14 }}>
                <option value="general">General</option>
                <option value="order">Order</option>
                <option value="product">Product</option>
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
              <span style={{ color: "var(--tpl-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>Message</span>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ padding: 10, border: "1px solid var(--tpl-line)", fontSize: 14, fontFamily: "inherit" }} />
            </label>
            <button type="submit" className="tpl-btn" disabled={sending}>
              {sending ? "Sending…" : "Send"}
            </button>
          </form>
        )}

        <aside style={{ background: "#fafafa", padding: 20, border: "1px solid var(--tpl-line)", height: "fit-content" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16 }}>Contact</h2>
          {settings.address && <p style={{ display: "flex", gap: 8, alignItems: "flex-start", color: "var(--tpl-muted)", marginBottom: 10, fontSize: 14 }}><FiMapPin size={14} style={{ marginTop: 3, flexShrink: 0 }} />{settings.address}</p>}
          {settings.phone && <p style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--tpl-muted)", marginBottom: 10, fontSize: 14 }}><FiPhone size={14} />{settings.phone}</p>}
          {settings.email && <p style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--tpl-muted)", fontSize: 14 }}><FiMail size={14} />{settings.email}</p>}
        </aside>
      </div>
    </div>
  );
}
