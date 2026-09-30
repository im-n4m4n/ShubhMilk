import { inr } from "@/lib/products";

export interface Combo {
  id: string;
  name: string;
  items: string;
  /** bundle price */
  price: number;
  /** struck-through sum of individual prices */
  mrp: number;
  photo: string;
  rating: string;
}

export const combos: Combo[] = [
  {
    id: "morning-ritual",
    name: "The Morning Ritual",
    items: "A2 Milk 1L ×7 + Set Curd 400g",
    price: 1099,
    mrp: 1265,
    photo: "/images/bottle-still.jpeg",
    rating: "4.9",
  },
  {
    id: "ghee-kitchen",
    name: "Grandma's Kitchen Pack",
    items: "Bilona Ghee 500ml + White Butter 200g",
    price: 1469,
    mrp: 1694,
    photo: "/images/ghee-jar.jpeg",
    rating: "4.9",
  },
  {
    id: "festive-table",
    name: "The Festive Table",
    items: "Kesar Shrikhand 200g + Sweet Lassi ×4 + Chaas ×4",
    price: 849,
    mrp: 985,
    photo: "/images/drinks.jpeg",
    rating: "4.8",
  },
  {
    id: "trial-trio",
    name: "The Trial Trio",
    items: "A2 Milk 500ml + Curd 400g + Lassi 250ml",
    price: 199,
    mrp: 235,
    photo: "/images/curd-paneer.jpeg",
    rating: "4.7",
  },
];
