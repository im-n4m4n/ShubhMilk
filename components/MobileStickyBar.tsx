"use client";

import { useEffect, useState } from "react";
import { inr, getProduct } from "@/lib/products";
import { useCart } from "@/lib/store";
import { toast } from "@/components/motion/toast";

/**
 * MobileStickyBar — on product pages, a sticky bottom bar (mobile only) with
 * price + Add to Cart, appearing after the hero image scrolls past.
 */
export default function MobileStickyBar({ productId }: { productId: string }) {
  const [visible, setVisible] = useState(false);
  const add = useCart((s) => s.add);
  const product = getProduct(productId);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-hairline bg-bone px-5 py-3 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div>
        <p className="display text-base text-ink">{product.name}</p>
        <p className="font-mono text-xs text-muted">
          {inr(product.price)} <span className="line-through">{inr(product.mrp)}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          add(product.id);
          toast(`${product.name} added to basket`);
        }}
        className="shrink-0 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-bone"
      >
        Add to Cart
      </button>
    </div>
  );
}
