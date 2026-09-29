"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";
import type { Frequency, Slot } from "@/lib/subscriptions";

export type LineKind = "one-time" | "subscription";

export interface CartLine {
  productId: string;
  kind: LineKind;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  /** site-wide toggle: swaps all displayed prices to subscription prices */
  subPrices: boolean;
  // subscription builder draft
  subPincode: string;
  subFrequency: Frequency;
  subSlot: Slot;
  // drawer
  drawerOpen: boolean;
  // actions
  add: (productId: string, kind?: LineKind) => void;
  remove: (productId: string, kind: LineKind) => void;
  setQty: (productId: string, kind: LineKind, qty: number) => void;
  toggleSubPrices: () => void;
  setSubDraft: (patch: Partial<Pick<CartState, "subPincode" | "subFrequency" | "subSlot">>) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      subPrices: false,
      subPincode: "",
      subFrequency: "daily",
      subSlot: "am",
      drawerOpen: false,
      add: (productId, kind = "one-time") =>
        set((s) => {
          const i = s.lines.findIndex((l) => l.productId === productId && l.kind === kind);
          if (i >= 0) {
            const lines = [...s.lines];
            lines[i] = { ...lines[i], qty: lines[i].qty + 1 };
            return { lines };
          }
          return { lines: [...s.lines, { productId, kind, qty: 1 }] };
        }),
      remove: (productId, kind) =>
        set((s) => ({
          lines: s.lines.filter((l) => !(l.productId === productId && l.kind === kind)),
        })),
      setQty: (productId, kind, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => !(l.productId === productId && l.kind === kind))
              : s.lines.map((l) =>
                  l.productId === productId && l.kind === kind ? { ...l, qty } : l,
                ),
        })),
      toggleSubPrices: () => set((s) => ({ subPrices: !s.subPrices })),
      setSubDraft: (patch) => set(patch),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "shubh-cart",
      partialize: (s) => ({
        lines: s.lines,
        subPrices: s.subPrices,
        subPincode: s.subPincode,
        subFrequency: s.subFrequency,
        subSlot: s.subSlot,
      }),
    },
  ),
);

/** Display price helper honouring the site-wide subscription toggle. */
export const displayPrice = (p: Product, subPrices: boolean): number =>
  subPrices ? p.subscriptionPrice : p.price;
