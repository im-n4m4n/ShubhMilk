"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Toasts — minimal global toast store + viewport renderer.
 * Usage:  import { toast } from "@/components/motion/toast";  toast("Added to basket");
 * Mount <Toasts /> once in the root layout.
 */

type ToastItem = { id: number; message: string };

let items: ToastItem[] = [];
const listeners = new Set<(items: ToastItem[]) => void>();
let nextId = 1;

export function toast(message: string) {
  const item = { id: nextId++, message };
  items = [...items, item];
  listeners.forEach((l) => l(items));
  window.setTimeout(() => {
    items = items.filter((t) => t.id !== item.id);
    listeners.forEach((l) => l(items));
  }, 2600);
}

export function Toasts() {
  const [list, setList] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (next: ToastItem[]) => setList(next);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2"
    >
      <AnimatePresence>
        {list.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 flex items-center gap-2.5 rounded-full border border-hairline bg-ink px-5 py-3 shadow-lg"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-fresh text-milk">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span className="font-mono text-xs text-bone">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
