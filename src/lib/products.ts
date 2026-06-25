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
  image: string; // hero background image (wide, desktop)
  imageMobile: string; // shorter-aspect crop for the mobile banner
  href: string; // where the banner links to
}

/**
 * Keyword-matched product photos (LoremFlickr) so images are relevant to the
 * item rather than random. `lock` keeps each image stable across reloads.
 */
const photo = (tag: string, lock: number) => `https://loremflickr.com/600/600/${tag}?lock=${lock}`;
const gallery = (tag: string, n = 3): string[] => Array.from({ length: n }, (_, i) => photo(tag, i + 1));

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
  {
    id: "b1",
    title: "Super Deals",
    subtitle: "Top brands, lowest prices every day",
    image: "/banners/super-deals.png",
    imageMobile: "/banners/super-deals-m.png",
    href: "/category?cat=subsidy",
  },
  {
    id: "b2",
    title: "Lightning Deals",
    subtitle: "Flash sales on the hour — while stocks last",
    image: "/banners/lightning-deals.png",
    imageMobile: "/banners/lightning-deals-m.png",
    href: "/category?cat=flash",
  },
  {
    id: "b3",
    title: "New User Zone",
    subtitle: "Group deals from $0.99 · free trials",
    image: "/banners/new-user.png",
    imageMobile: "/banners/new-user-m.png",
    href: "/shop",
  },
  {
    id: "b4",
    title: "Summer Mega Sale",
    subtitle: "Up to 70% off · limited time only",
    image: "/banners/summer-sale.png",
    imageMobile: "/banners/summer-sale-m.png",
    href: "/shop",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Cotton Short-Sleeve T-Shirt — Unisex Summer Loose Tee",
    image: photo("tshirt", 1),
    gallery: gallery("tshirt"),
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
    image: photo("earbuds", 1),
    gallery: gallery("earbuds"),
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
    image: photo("apple", 1),
    gallery: gallery("apple"),
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
    image: photo("umbrella", 1),
    gallery: gallery("umbrella"),
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
    image: photo("waterbottle", 1),
    gallery: gallery("waterbottle"),
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
    image: photo("skincare", 1),
    gallery: gallery("skincare"),
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
    image: photo("keyboard", 1),
    gallery: gallery("keyboard"),
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
    image: photo("babyclothes", 1),
    gallery: gallery("babyclothes"),
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
    image: photo("sneakers", 1),
    gallery: gallery("sneakers"),
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
    image: photo("nuts", 1),
    gallery: gallery("nuts"),
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
    image: photo("dress", 1),
    gallery: gallery("dress"),
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
    image: photo("charger", 1),
    gallery: gallery("charger"),
    price: 8.99,
    singlePrice: 29.99,
    sold: 41230,
    category: "digital",
    tags: ["Free Shipping"],
    desc: "15W fast charge · secure magnetic hold · smart temperature protection.",
  },
];

/**
 * Product imagery is AI-generated studio photography stored in /public/products,
 * keyed by product id: `<id>-1.png` is the hero, extra files are gallery angles.
 * This overrides the placeholder URLs defined on each product above.
 */
const GALLERY_COUNT: Record<string, number> = {
  p1: 2, p2: 3, p3: 3, p4: 1, p5: 1, p6: 2,
  p7: 3, p8: 2, p9: 1, p10: 1, p11: 3, p12: 1,
};
for (const p of products) {
  const n = GALLERY_COUNT[p.id] ?? 1;
  p.image = `/products/${p.id}-1.png`;
  p.gallery = Array.from({ length: n }, (_, i) => `/products/${p.id}-${i + 1}.png`);
}

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

/** Products related to the given one — same category first, topped up with others. */
export function relatedProducts(id: string, limit = 6): Product[] {
  const current = getProduct(id);
  if (!current) return [];
  const sameCat = products.filter((p) => p.id !== id && p.category === current.category);
  const others = products.filter((p) => p.id !== id && p.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
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
  verified: boolean;
  images: string[];
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

/** At or below this remaining count, an item is flagged as "low stock". */
export const LOW_STOCK_THRESHOLD = 10;

/**
 * Deterministic stock level. Most items are healthy, a few run low ("Only N
 * left"), and roughly one sells out (0) — enough to exercise every UI state.
 */
export function productStock(p: Product): number {
  const h = hash(p.id);
  const bucket = h % 13;
  if (bucket === 0) return 0; // sold out
  if (bucket <= 3) return (h % 7) + 3; // low: 3–9 left
  return 45 + (h % 320); // healthy
}

export const isSoldOut = (p: Product): boolean => productStock(p) === 0;
export const isLowStock = (n: number): boolean => n > 0 && n <= LOW_STOCK_THRESHOLD;

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

const REVIEW_POOL: { author: string; text: string; rating: number; photos: number }[] = [
  { author: "Jordan M.", text: "Exactly as described and arrived fast. Great value for the group price!", rating: 5, photos: 2 },
  { author: "Priya S.", text: "Really happy with the quality. Would buy again and recommend to friends.", rating: 5, photos: 0 },
  { author: "Liang W.", text: "Good deal — joined a group buy and it filled within an hour.", rating: 4, photos: 1 },
  { author: "Amara O.", text: "Solid product, packaging was neat. Knocked off one star for slow shipping.", rating: 4, photos: 0 },
  { author: "Chris T.", text: "Better than expected for the price. Five stars all the way.", rating: 5, photos: 0 },
  { author: "Noah K.", text: "Works perfectly and feels premium. The group discount made it a no-brainer.", rating: 5, photos: 2 },
  { author: "Mia D.", text: "Decent, does the job. A couple of small flaws but fine for the money.", rating: 3, photos: 0 },
];

const REVIEW_DATES = ["Jun 18, 2026", "Jun 2, 2026", "May 21, 2026", "May 4, 2026", "Apr 27, 2026"];

/** Deterministic set of 5 sample reviews per product (some with photos). */
export function sampleReviews(p: Product): Review[] {
  const base = hash(p.id);
  return [0, 1, 2, 3, 4].map((i) => {
    const r = REVIEW_POOL[(base + i) % REVIEW_POOL.length];
    // reuse the product's own studio shots as customer "verification" photos
    const images = Array.from({ length: r.photos }, (_, k) => p.gallery[(i + k) % p.gallery.length]);
    return {
      author: r.author,
      rating: r.rating,
      date: REVIEW_DATES[i],
      text: r.text,
      verified: i % 4 !== 3,
      images,
    };
  });
}

/** Star distribution (5→1) derived from the headline rating + review count. */
export function ratingDistribution(p: Product): { star: number; count: number; pct: number }[] {
  const total = productReviewCount(p);
  // weights skewed toward 5★, nudged by the product's rating
  const weights = [0.7, 0.18, 0.07, 0.03, 0.02];
  return [5, 4, 3, 2, 1].map((star, i) => {
    const count = Math.round(total * weights[i]);
    return { star, count, pct: Math.round(weights[i] * 100) };
  });
}

/** Benefit bullets — the product's "·"-separated description split into a list. */
export function productHighlights(p: Product): string[] {
  return p.desc
    .split("·")
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

/** Deterministic spec sheet (dimensions / material / shipping etc.). */
export function productSpecs(p: Product): { label: string; value: string }[] {
  const h = hash(p.id);
  const materials = ["Cotton blend", "Aluminum alloy", "ABS + silicone", "Stainless steel", "Recycled polyester"];
  const origins = ["Guangdong, CN", "Zhejiang, CN", "Vietnam", "India"];
  const weight = (0.2 + (h % 18) / 10).toFixed(1);
  const w = 8 + (h % 20);
  const d = 5 + (h % 12);
  const ht = 3 + (h % 16);
  return [
    { label: "Category", value: categoryName(p.category) },
    { label: "Material", value: materials[h % materials.length] },
    { label: "Dimensions", value: `${w} × ${d} × ${ht} cm` },
    { label: "Weight", value: `${weight} kg` },
    { label: "Ships from", value: origins[h % origins.length] },
    { label: "Shipping", value: p.tags.some((t) => t.includes("Shipping")) ? "Free shipping" : "Calculated at checkout" },
    { label: "Warranty", value: "1-year limited · 7-day returns" },
    { label: "SKU", value: `YK-${p.id.toUpperCase()}-${(h % 900) + 100}` },
  ];
}
