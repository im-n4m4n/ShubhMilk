export type DairyCategory =
  | "a2-milk"
  | "buffalo-milk"
  | "curd"
  | "paneer"
  | "ghee"
  | "butter"
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
  "a2-milk": "/images/bottle-still.jpeg",
  "buffalo-milk": "/images/buffalo-milk.jpeg",
  curd: "/images/curd-bowl.jpeg",
  paneer: "/images/paneer-leaves.jpeg",
  ghee: "/images/ghee-jar.jpeg",
  butter: "/images/white-butter.jpeg",
  lassi: "/images/lassi-glass.jpeg",
  chaas: "/images/chaas-steel.jpeg",
  shrikhand: "/images/shrikhand-jar.jpeg",
  "flavoured-milk": "/images/kesar-milk.jpeg",
};

const p = (
  id: string,
  name: string,
  category: DairyCategory,
  spec: string,
  price: number,
  mrp: number,
  badge: Badge = null,
  blurb = "",
): Product => ({
  id,
  slug: id,
  name,
  category,
  spec,
  price,
  mrp,
  subscriptionPrice: Math.round(price * 0.88),
  image: `/images/${id}.svg`,
  photo: categoryPhoto[category],
  badge,
  blurb,
});

export const products: Product[] = [
  p("a2-milk-500", "A2 Desi Cow Milk", "a2-milk", "500ml · A2 · Glass", 78, 85, "bestseller", "Our signature. Single-farm A2 milk from indigenous Gir cows, bottled in glass."),
  p("a2-milk-1l", "A2 Desi Cow Milk", "a2-milk", "1L · A2 · Glass", 145, 160, null, "The family bottle. Same single-farm A2 milk, one litre."),
  p("buffalo-milk-500", "Buffalo Milk", "buffalo-milk", "500ml · Glass", 85, 95, "bestseller", "Thick, creamy buffalo milk — for chai that stands a spoon in it."),
  p("buffalo-milk-1l", "Buffalo Milk", "buffalo-milk", "1L · Glass", 160, 175, null, "One litre of full-cream buffalo milk."),
  p("curd-400", "Set Curd", "curd", "400g · Glass Jar", 95, 105, "bestseller", "Slow-set overnight in the jar you return. Firm, mildly sweet."),
  p("paneer-200", "Malai Paneer", "paneer", "200g · Wrapped", 130, 145, null, "Soft, milky blocks cut fresh each morning."),
  p("bilona-ghee-250", "Bilona Ghee", "ghee", "250ml · Glass Jar", 749, 849, "bestseller", "Hand-churned the Vedic way. 30L milk to 1L ghee."),
  p("bilona-ghee-500", "Bilona Ghee", "ghee", "500ml · Glass Jar", 1399, 1549, null, "Our flagship ghee, half-litre jar."),
  p("white-butter-200", "White Butter", "butter", "200g · Wrapped", 145, 160, null, "Unsalted cultured white butter, churned from the same cream."),
  p("lassi-250", "Sweet Lassi", "lassi", "250ml · Glass", 60, 70, "fresh-today", "Thick set lassi, only set curd and a spoon of sugar."),
  p("chaas-250", "Masala Chaas", "chaas", "250ml · Glass", 45, 55, "fresh-today", "Thin buttermilk with roasted cumin and curry leaf."),
  p("shrikhand-200", "Kesar Shrikhand", "shrikhand", "200g · Glass Jar", 140, 155, null, "Hung curd folded with kesar and cardamom."),
  p("kesar-milk-200", "Kesar Thandai Milk", "flavoured-milk", "200ml · Glass", 75, 85, null, "Saffron, almond, cardamom — festival in a bottle."),
];

export const categories: { key: DairyCategory; label: string; blurb: string; photo: string }[] = [
  { key: "a2-milk", label: "A2 Milk", blurb: "Single-farm Gir cow milk, never blended.", photo: "/images/bottle-still.jpeg" },
  { key: "curd", label: "Curd & Yogurt", blurb: "Set slow in returnable glass jars.", photo: "/images/curd-bowl.jpeg" },
  { key: "paneer", label: "Paneer & Butter", blurb: "Cut and churned fresh each morning.", photo: "/images/paneer-leaves.jpeg" },
  { key: "ghee", label: "Bilona Ghee", blurb: "Hand-churned, 30 litres to one.", photo: "/images/ghee-jar.jpeg" },
  { key: "lassi", label: "Traditional Drinks", blurb: "Lassi, chaas and festival milk.", photo: "/images/lassi-glass.jpeg" },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((x) => x.slug === slug);

export const inr = (n: number): string => `₹${n.toLocaleString("en-IN")}`;
