"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { getProduct, inr } from "@/lib/products";
import { displayPrice, useCart } from "@/lib/store";
import CheckoutButton from "@/components/CheckoutButton";

export default function CartDrawer() {
  const lines = useCart((s) => s.lines);
  const drawerOpen = useCart((s) => s.drawerOpen);
  const subPincode = useCart((s) => s.subPincode);
  const setQty = useCart((s) => s.setQty);
  const closeDrawer = useCart((s) => s.closeDrawer);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape; focus the panel when opened (dialog a11y).
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  // Join cart lines with product data; drop lines whose product no longer exists.
  const rows = lines.flatMap((line) => {
    const product = getProduct(line.productId);
    return product ? [{ line, product }] : [];
  });

  let subtotal = 0;
  let savings = 0;
  for (const { line, product } of rows) {
    const paid = displayPrice(product, line.kind === "subscription") * line.qty;
    subtotal += paid;
    savings += (product.price - displayPrice(product, line.kind === "subscription")) * line.qty;
  }

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping basket"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-hairline bg-bone outline-none"
          >
            {/* AM-slot urgency note */}
            {/^[56]/.test(subPincode) && (
              <p className="border-b border-hairline bg-buttermilk px-6 py-3 font-mono text-[11px] text-ink">
                AM slot closing soon — order within 1 h 58 m
              </p>
            )}

            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <h2 className="display text-2xl font-medium text-ink">Your Basket</h2>
              <button
                type="button"
                aria-label="Close basket"
                onClick={closeDrawer}
                className="rounded-full p-2 text-ink hover:bg-buttermilk"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {rows.length === 0 ? (
              /* Empty state */
              <div className="flex flex-1 items-center justify-center p-6">
                <p className="font-mono text-xs text-muted">
                  Your basket is empty — the milk is still warm.
                </p>
              </div>
            ) : (
              <>
                {/* Lines */}
                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                  {rows.map(({ line, product }) => {
                    const isSub = line.kind === "subscription";
                    const unit = displayPrice(product, isSub);
                    return (
                      <div
                        key={`${line.productId}-${line.kind}`}
                        className="card flex gap-4 p-4"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={product.photo}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="display text-base font-medium text-ink">{product.name}</h3>
                          <p className="mt-1 font-mono text-[11px] text-muted">{product.spec}</p>
                          <div className="mt-1.5 flex items-center justify-between gap-3">
                            <span
                              className={`font-mono text-[10px] ${
                                isSub ? "text-kesar" : "text-muted"
                              }`}
                            >
                              {isSub ? "SUBSCRIPTION · SAVE 12%" : "ONE-TIME"}
                            </span>
                            <span className="font-mono text-[11px] text-muted">{inr(unit)}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => setQty(line.productId, line.kind, line.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink hover:bg-buttermilk"
                              >
                                <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                              </button>
                              <span className="w-5 text-center font-mono text-sm text-ink">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => setQty(line.productId, line.kind, line.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink hover:bg-buttermilk"
                              >
                                <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                              </button>
                            </div>
                            <span className="font-mono text-sm text-ink">
                              {inr(unit * line.qty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary */}
                <div className="border-t border-hairline p-6">
                  <div className="space-y-2 font-mono text-xs text-muted">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-ink">{inr(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Savings</span>
                      <span className="text-fresh">{inr(savings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="text-ink">FREE</span>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <span>Total</span>
                      <span className="display text-xl text-ink">{inr(subtotal)}</span>
                    </div>
                  </div>
                  <CheckoutButton subtotal={subtotal} />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
