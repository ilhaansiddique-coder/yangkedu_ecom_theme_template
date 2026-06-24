"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogListingPageProps, BlogPostPageProps } from "@/storefront-engine/types/pages";
import { Editable } from "@/storefront-engine/editor/Editable";
import { sanitizeRichText } from "@/lib/sanitize-html";
import "../styles.css";

/* ─── Listing ───────────────────────────────────────────────────── */
export default function BlogPage({ posts }: BlogListingPageProps) {
  return (
    <div className="tpl-page">
      <Editable section="blog" field="title" defaultValue="Blog" label="Blog title">
        {(v, ep) => <h1 {...ep} style={{ fontSize: 28, textAlign: "center", margin: "24px 0 32px" }}>{v}</h1>}
      </Editable>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--tpl-muted)", padding: "40px 0" }}>
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="tpl-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="tpl-card">
              <div className="tpl-card__media" style={{ aspectRatio: "16 / 10" }}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={600}
                    height={400}
                    unoptimized={p.image.startsWith("/storage/") || p.image.includes("://")}
                  />
                ) : <div style={{ width: "100%", height: "100%", background: "var(--tpl-line)" }} />}
              </div>
              <small style={{ color: "var(--tpl-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em" }}>
                {new Date(p.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })} · {p.author_name}
              </small>
              <h3 className="tpl-card__name" style={{ fontSize: 18, marginTop: 4 }}>{p.title}</h3>
              {p.excerpt && <p style={{ color: "var(--tpl-muted)", fontSize: 14, lineHeight: 1.6, marginTop: 4 }}>{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Single post ──────────────────────────────────────────────── */
export function BlogPostPage({ post, related }: BlogPostPageProps) {
  return (
    <article className="tpl-page" style={{ maxWidth: 760 }}>
      <p style={{ textAlign: "center", color: "var(--tpl-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", marginTop: 24 }}>
        {new Date(post.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} · {post.author_name}
      </p>
      <h1 style={{ fontSize: 32, textAlign: "center", margin: "8px 0 32px" }}>{post.title}</h1>

      {post.image && (
        <div style={{ aspectRatio: "16 / 9", overflow: "hidden", background: "var(--tpl-line)", marginBottom: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      <div
        style={{ color: "var(--tpl-muted)", lineHeight: 1.8, fontSize: 15 }}
        dangerouslySetInnerHTML={{ __html: sanitizeRichText(post.content) }}
      />

      {related.length > 0 && (
        <section style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--tpl-line)" }}>
          <h2 style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>More posts</h2>
          <div className="tpl-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {related.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="tpl-card">
                <div className="tpl-card__media" style={{ aspectRatio: "16 / 10" }}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={400}
                      height={250}
                      unoptimized={p.image.startsWith("/storage/") || p.image.includes("://")}
                    />
                  ) : <div style={{ width: "100%", height: "100%", background: "var(--tpl-line)" }} />}
                </div>
                <h3 className="tpl-card__name">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
