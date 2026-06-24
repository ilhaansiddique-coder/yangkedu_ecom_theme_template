/**
 * Mock catalogue for the Yangkedu (Pinduoduo-style) demo storefront.
 * The signature trait is the dual price: `price` is the group-buy price,
 * `singlePrice` is the more-expensive solo price shown struck-through.
 */

export interface Product {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  price: number; // group-buy price
  singlePrice: number; // solo price, struck through
  sold: number; // units sold
  category: string; // category id
  tags: string[]; // e.g. Super Deal, Free Shipping
  desc: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  from: string; // gradient start
  to: string; // gradient end
}

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const categories: Category[] = [
  { id: "subsidy", name: "Super Deals" },
  { id: "flash", name: "Lightning Deals" },
  { id: "food", name: "Food & Fresh" },
  { id: "apparel", name: "Fashion" },
  { id: "home", name: "Home & Living" },
  { id: "digital", name: "Electronics" },
  { id: "beauty", name: "Beauty" },
  { id: "baby", name: "Baby & Kids" },
  { id: "sports", name: "Sports & Outdoor" },
  { id: "more", name: "All Categories" },
];

export const banners: Banner[] = [
  { id: "b1", title: "Super Deals", subtitle: "Top brands, lowest prices every day", from: "#ff5a3c", to: "#e8290b" },
  { id: "b2", title: "Lightning Deals", subtitle: "Flash sales on the hour — while stocks last", from: "#ff8a3c", to: "#fb5621" },
  { id: "b3", title: "New User Zone", subtitle: "Group deals from $0.99 · free trials", from: "#ff6a8e", to: "#e2294f" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Cotton Short-Sleeve T-Shirt — Unisex Summer Loose Tee",
    image: img("tee"),
    gallery: [img("tee"), img("tee2"), img("tee3")],
    price: 6.99,
    singlePrice: 19.99,
    sold: 128342,
    category: "apparel",
    tags: ["Super Deal", "Free Shipping"],
    desc: "100% combed cotton · keeps its shape · multiple colors · 7-day free returns.",
  },
  {
    id: "p2",
    name: "Wireless Bluetooth Earbuds — Noise Cancelling, Long Battery",
    image: img("buds"),
    gallery: [img("buds"), img("buds2"), img("buds3")],
    price: 13.99,
    singlePrice: 49.99,
    sold: 56210,
    category: "digital",
    tags: ["Super Deal", "Ships in 24h"],
    desc: "Active noise cancelling · 30-hour battery · dual-ear calls · touch controls.",
  },
  {
    id: "p3",
    name: "Fresh Sweet-Heart Apples — In-Season, 5 lb Box",
    image: img("apple"),
    gallery: [img("apple"), img("apple2"), img("apple3")],
    price: 5.99,
    singlePrice: 13.99,
    sold: 302118,
    category: "food",
    tags: ["Farm Direct", "Freshness Guarantee"],
    desc: "Crisp and juicy · picked and shipped fresh · damaged-fruit refund guarantee.",
  },
  {
    id: "p4",
    name: "Auto Open-Close Umbrella — Windproof, UV Sun Protection",
    image: img("umbrella"),
    gallery: [img("umbrella"), img("umbrella2")],
    price: 4.99,
    singlePrice: 16.99,
    sold: 88904,
    category: "home",
    tags: ["Free Shipping"],
    desc: "One-touch open/close · windproof frame · UPF50+ sun-protective coating.",
  },
  {
    id: "p5",
    name: "Insulated Water Bottle — 316 Steel, Large Capacity",
    image: img("cup"),
    gallery: [img("cup"), img("cup2")],
    price: 9.99,
    singlePrice: 32.99,
    sold: 47620,
    category: "home",
    tags: ["Super Deal", "Free Shipping"],
    desc: "Food-grade 316 steel liner · 24-hour insulation · leak-proof design.",
  },
  {
    id: "p6",
    name: "Amino Acid Facial Cleanser — Gentle, Oil-Control",
    image: img("face"),
    gallery: [img("face"), img("face2")],
    price: 3.49,
    singlePrice: 12.99,
    sold: 211450,
    category: "beauty",
    tags: ["Buy 2 Get 1", "Free Shipping"],
    desc: "Amino acid formula · gentle, non-stripping · deep clean.",
  },
  {
    id: "p7",
    name: "Mechanical Gaming Keyboard — 104 Keys, RGB Backlit",
    image: img("keyboard"),
    gallery: [img("keyboard"), img("keyboard2")],
    price: 25.99,
    singlePrice: 75.99,
    sold: 19980,
    category: "digital",
    tags: ["Super Deal"],
    desc: "Hot-swappable switches · RGB lighting · full N-key rollover.",
  },
  {
    id: "p8",
    name: "Baby Cotton Romper — Newborn Long-Sleeve Bodysuit",
    image: img("baby"),
    gallery: [img("baby"), img("baby2")],
    price: 7.99,
    singlePrice: 25.99,
    sold: 65730,
    category: "baby",
    tags: ["Baby Safe", "Free Shipping"],
    desc: "Safety-grade fabric · soft pure cotton · snap closure for easy changes.",
  },
  {
    id: "p9",
    name: "Men's Running Shoes — Breathable Mesh, Cushioned Sole",
    image: img("shoes"),
    gallery: [img("shoes"), img("shoes2")],
    price: 16.99,
    singlePrice: 56.99,
    sold: 73210,
    category: "sports",
    tags: ["Super Deal", "Free Shipping"],
    desc: "Flyknit mesh upper · springy midsole · anti-slip durable outsole.",
  },
  {
    id: "p10",
    name: "Mixed Nuts Snack Gift Box — Daily Healthy Assortment",
    image: img("nuts"),
    gallery: [img("nuts"), img("nuts2")],
    price: 11.99,
    singlePrice: 29.99,
    sold: 154200,
    category: "food",
    tags: ["Free Shipping", "Fresh Direct"],
    desc: "Assorted flavors · individually wrapped · wholesome and nutritious.",
  },
  {
    id: "p11",
    name: "French Vintage Floral Dress — Slim Summer Midi",
    image: img("dress"),
    gallery: [img("dress"), img("dress2")],
    price: 19.99,
    singlePrice: 66.99,
    sold: 28940,
    category: "apparel",
    tags: ["Super Deal"],
    desc: "Chiffon fabric · waist-cinching slim fit · great drape, wrinkle-resistant.",
  },
  {
    id: "p12",
    name: "Magnetic Wireless Charger — Fast Charge for iPhone/Android",
    image: img("charger"),
    gallery: [img("charger"), img("charger2")],
    price: 8.99,
    singlePrice: 29.99,
    sold: 41230,
    category: "digital",
    tags: ["Free Shipping"],
    desc: "15W fast charge · secure magnetic hold · smart temperature protection.",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productsByCategory(catId: string): Product[] {
  if (catId === "subsidy") return products.filter((p) => p.tags.includes("Super Deal"));
  if (catId === "flash") return products.slice(0, 6);
  return products.filter((p) => p.category === catId);
}

export function categoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? "All";
}

/** Case-insensitive search over name, tags and category name. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.desc, categoryName(p.category), ...p.tags].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

/** A few suggested keywords for the empty search state. */
export const hotKeywords = ["earbuds", "t-shirt", "shoes", "apples", "charger", "dress", "keyboard"];

export interface Variant {
  label: string;
  options: string[];
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

/** Stable small hash of a product id, for deterministic mock data. */
function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return h;
}

/** Deterministic 4.6–4.9 star rating. */
export function productRating(p: Product): number {
  return Number((4.6 + (hash(p.id) % 4) / 10).toFixed(1));
}

/** Review count scaled from units sold. */
export function productReviewCount(p: Product): number {
  return Math.max(18, Math.round(p.sold * 0.04));
}

/** Selectable options per category (color / size etc.); empty when none apply. */
export function productVariants(p: Product): Variant[] {
  switch (p.category) {
    case "apparel":
      return [
        { label: "Color", options: ["Black", "White", "Navy", "Beige"] },
        { label: "Size", options: ["S", "M", "L", "XL"] },
      ];
    case "sports":
      return [
        { label: "Color", options: ["Black", "Grey", "Blue"] },
        { label: "Size", options: ["7", "8", "9", "10", "11"] },
      ];
    case "digital":
      return [{ label: "Color", options: ["Black", "White"] }];
    case "home":
      return [{ label: "Color", options: ["White", "Pink", "Green"] }];
    case "baby":
      return [{ label: "Size", options: ["0–3M", "3–6M", "6–12M"] }];
    default:
      return [];
  }
}

const REVIEW_POOL: { author: string; text: string }[] = [
  { author: "Jordan M.", text: "Exactly as described and arrived fast. Great value for the group price!" },
  { author: "Priya S.", text: "Really happy with the quality. Would buy again and recommend to friends." },
  { author: "Liang W.", text: "Good deal — joined a group buy and it filled within an hour." },
  { author: "Amara O.", text: "Solid product, packaging was neat. Knocked off one star for slow shipping." },
  { author: "Chris T.", text: "Better than expected for the price. Five stars." },
  { author: "Noah K.", text: "Works perfectly. The group discount made it a no-brainer." },
];

/** Deterministic set of 3 sample reviews per product. */
export function sampleReviews(p: Product): Review[] {
  const base = hash(p.id);
  const dates = ["Jun 2026", "May 2026", "Apr 2026"];
  return [0, 1, 2].map((i) => {
    const r = REVIEW_POOL[(base + i) % REVIEW_POOL.length];
    return {
      author: r.author,
      rating: i === 2 ? 4 : 5,
      date: dates[i],
      text: r.text,
    };
  });
}
