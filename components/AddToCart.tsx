"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { toast } from "@/components/motion/toast";

export default function AddToCart({ productId }: { productId: string }) {
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 rounded-full border border-hairline bg-milk px-4 py-2.5">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="text-ink transition-colors hover:text-muted"
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <span className="w-5 text-center font-mono text-sm">{qty}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty((q) => q + 1)}
          className="text-ink transition-colors hover:text-muted"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          for (let i = 0; i < qty; i++) add(productId);
          const name = getProduct(productId)?.name ?? "Item";
          toast(`${name} added to basket`);
          openDrawer();
        }}
        className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-bone transition-transform duration-200 hover:scale-[1.02]"
      >
        <ShoppingBag className="h-4 w-4 text-kesar" strokeWidth={1.5} />
        Add to Cart
      </button>
    </div>
  );
}
