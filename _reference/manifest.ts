/**
 * TEMPLATE — search/replace TEMPLATE_ID with your theme slug (lowercase,
 * hyphens). Search/replace "Template Theme" with your display name.
 *
 * Every slot you omit falls back to the default theme — your theme can
 * ship partial coverage. Required slots for a usable storefront:
 *   home, shop, product, cart, checkout + navbar, footer, cartDrawer.
 */

import type { StorefrontThemeV2 } from "@/storefront-engine/types";

const templateTheme: StorefrontThemeV2 = {
  id: "TEMPLATE_ID",
  label: "Template Theme",
  description: "One-line pitch — what this theme is for and who it's aimed at.",
  tags: ["Modern"],

  pages: {
    loadHomePage:     () => import("./pages/HomePage").then((m) => m.default),
    loadShopPage:     () => import("./pages/ShopPage").then((m) => m.default),
    loadProductPage:  () => import("./pages/ProductPage").then((m) => m.default),
    loadCartPage:     () => import("./pages/CartPage").then((m) => m.default),
    loadCheckoutPage: () => import("./pages/CheckoutPage").then((m) => m.default),
    loadAboutPage:    () => import("./pages/AboutPage").then((m) => m.default),
    loadContactPage:  () => import("./pages/ContactPage").then((m) => m.default),
    loadPrivacyPage:  () => import("./pages/PolicyPages").then((m) => m.PrivacyPage),
    loadTermsPage:    () => import("./pages/PolicyPages").then((m) => m.TermsPage),
    loadRefundPage:   () => import("./pages/PolicyPages").then((m) => m.RefundPage),
    loadBlogPage:     () => import("./pages/BlogPage").then((m) => m.default),
    loadBlogPostPage: () => import("./pages/BlogPage").then((m) => m.BlogPostPage),
  },

  chrome: {
    loadNavbar:     () => import("./chrome/Navbar").then((m) => m.default),
    loadFooter:     () => import("./chrome/Footer").then((m) => m.default),
    loadCartDrawer: () => import("./chrome/CartDrawer").then((m) => m.default),
  },
};

export default templateTheme;
