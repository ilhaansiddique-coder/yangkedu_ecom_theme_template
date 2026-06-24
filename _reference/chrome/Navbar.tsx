"use client";

/**
 * TEMPLATE Navbar — sticky bar with brand, links, search/account/cart icons.
 * Mobile collapses links to a drawer (add your own drawer markup below).
 * Required props from engine: onSearchOpen, onCartOpen, onAuthOpen.
 */

import Link from "next/link";
import { FiMenu, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { Editable } from "@/storefront-engine/editor/Editable";
import type { NavbarProps } from "@/storefront-engine/types/pages";
import "../styles.css";

const LINKS = [
  { href: "/shop",    key: "shop",    fallback: "Shop" },
  { href: "/blog",    key: "blog",    fallback: "Blog" },
  { href: "/about",   key: "about",   fallback: "About" },
  { href: "/contact", key: "contact", fallback: "Contact" },
];

export default function Navbar({ onSearchOpen, onCartOpen, onAuthOpen }: NavbarProps) {
  const { totalItems } = useCart();
  const settings = useSiteSettings();
  const brand = settings.site_name || "Brand";

  return (
    <header className="tpl-nav">
      <div className="tpl-nav__bar">
        <button type="button" className="tpl-nav__icon" aria-label="Menu" style={{ display: "inline-flex" }}>
          <FiMenu size={20} />
        </button>

        <Link href="/" className="tpl-nav__brand">{brand}</Link>

        <nav className="tpl-nav__links">
          {LINKS.map((link) => (
            <Editable key={link.key} section="navbar" field={link.key} defaultValue={link.fallback} label={`Nav ${link.key}`}>
              {(value, ep) => <Link href={link.href} {...ep}>{value || link.fallback}</Link>}
            </Editable>
          ))}
        </nav>

        <div className="tpl-nav__icons">
          <button type="button" className="tpl-nav__icon" aria-label="Search" onClick={onSearchOpen}><FiSearch size={18} /></button>
          <button type="button" className="tpl-nav__icon" aria-label="Account" onClick={onAuthOpen}><FiUser size={18} /></button>
          <button type="button" className="tpl-nav__icon" aria-label="Bag" onClick={onCartOpen}>
            <FiShoppingBag size={18} />
            {totalItems > 0 && <span className="tpl-nav__badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
