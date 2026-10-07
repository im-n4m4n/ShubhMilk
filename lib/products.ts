import productData from "@/content/products.json";

export type DairyCategory =
  | "cow-milk"
  | "a2-milk"
  | "buffalo-milk"
  | "curd"
  | "paneer"
  | "ghee"
  | "butter"
  | "khoya"
  | "rabri"
  | "peda"
  | "lassi"
  | "chaas"
  | "shrikhand"
  | "flavoured-milk";

export type Badge = "bestseller" | "fresh-today" | null;

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: DairyCategory;
  /** short mono spec line, e.g. "500ml · A2 · Glass" */
  spec: string;
  /** one-time price in ₹ */
  price: number;
  /** struck-through MRP in ₹ */
  mrp: number;
  /** subscription price (≈ 12% off, precomputed to keep the grid honest) */
  subscriptionPrice: number;
  image: string;
  /** brand photography (AI-generated brand shoot) shared per family */
  photo: string;
  badge: Badge;
  blurb: string;
}

const categoryPhoto: Record<DairyCategory, string> = {
  "cow-milk": "/images/bottle-still.jpeg",
  "a2-milk": "/images/bottle-still.jpeg",
  "buffalo-milk": "/images/buffalo-milk.jpeg",
  curd: "/images/curd-bowl.jpeg",
  paneer: "/images/paneer-leaves.jpeg",
  ghee: "/images/ghee-jar.jpeg",
  butter: "/images/white-butter.jpeg",
  khoya: "/images/curd-paneer.jpeg",
  rabri: "/images/curd-paneer.jpeg",
  peda: "/images/gifting-hamper.jpeg",
  lassi: "/images/lassi-glass.jpeg",
  chaas: "/images/chaas-steel.jpeg",
  shrikhand: "/images/shrikhand-jar.jpeg",
  "flavoured-milk": "/images/kesar-milk.jpeg",
};

/**
 * Products are DATA, edited in the admin panel (content/products.json).
 * The shape stays typed: an unknown category or badge in the JSON is dropped
 * here rather than breaking the build.
 */
export const products: Product[] = productData.products.flatMap((raw) => {
  const category = raw.category as DairyCategory;
  const badge = (raw.badge === "bestseller" || raw.badge === "fresh-today" ? raw.badge : null) as Badge;
  if (!(category in categoryPhoto)) return [];
  return [
    {
      id: raw.id,
      slug: raw.id,
      name: raw.name,
      category,
      spec: raw.spec,
      price: raw.price,
      mrp: raw.mrp,
      subscriptionPrice: Math.round(raw.price * 0.88),
      image: `/images/${raw.id}.svg`,
      photo: categoryPhoto[category],
      badge,
      blurb: raw.blurb,
    },
  ];
});

export const categories: { key: DairyCategory; label: string; blurb: string; photo: string }[] = [
  { key: "cow-milk", label: "Cow Milk", blurb: "Everyday single-farm cow milk in glass.", photo: "/images/bottle-still.jpeg" },
  { key: "a2-milk", label: "A2 Milk", blurb: "Single-farm Gir cow milk, never blended.", photo: "/images/bottle-still.jpeg" },
  { key: "buffalo-milk", label: "Buffalo Milk", blurb: "Full-cream buffalo milk for thick chai.", photo: "/images/buffalo-milk.jpeg" },
  { key: "curd", label: "Curd & Yogurt", blurb: "Set slow in returnable glass jars.", photo: "/images/curd-bowl.jpeg" },
  { key: "paneer", label: "Paneer & Butter", blurb: "Cut and churned fresh each morning.", photo: "/images/paneer-leaves.jpeg" },
  { key: "ghee", label: "Bilona Ghee", blurb: "Hand-churned, 30 litres to one.", photo: "/images/ghee-jar.jpeg" },
  { key: "khoya", label: "Khoya & Rabri", blurb: "Reduced-milk sweets, made to order.", photo: "/images/curd-paneer.jpeg" },
  { key: "lassi", label: "Traditional Drinks", blurb: "Lassi, chaas and festival milk.", photo: "/images/lassi-glass.jpeg" },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((x) => x.slug === slug);

export const inr = (n: number): string => `₹${n.toLocaleString("en-IN")}`;
