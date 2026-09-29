"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { inr } from "@/lib/products";
import { useCart } from "@/lib/store";

type Phase = "idle" | "creating" | "done" | "error";

/**
 * CheckoutButton — posts the cart to /api/checkout (Razorpay when env creds
 * exist, deterministic stub otherwise) and shows order confirmation inline.
 * The Razorpay checkout.js popup opens only when mode === "razorpay".
 */
export default function CheckoutButton({ subtotal }: { subtotal: number }) {
  const lines = useCart((s) => s.lines);
  const subPincode = useCart((s) => s.subPincode);
  const subFrequency = useCart((s) => s.subFrequency);
  const subSlot = useCart((s) => s.subSlot);
  const clear = useCart((s) => s.clear);

  const [phase, setPhase] = useState<Phase>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const checkout = async () => {
    setPhase("creating");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines,
          pincode: subPincode,
          frequency: subFrequency,
          slot: subSlot,
        }),
      });
      const data = (await res.json()) as {
        mode?: "razorpay" | "stub";
        orderId?: string;
        amount?: number;
        keyId?: string;
        error?: string;
      };
      if (!res.ok || !data.orderId) {
        setErrorMsg(data.error ?? "Checkout failed");
        setPhase("error");
        return;
      }

      if (data.mode === "razorpay" && typeof window !== "undefined") {
        // Live gateway: open Razorpay's checkout.js popup.
        const w = window as unknown as {
          Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
        };
        if (w.Razorpay) {
          const rzp = new w.Razorpay({
            key: data.keyId ?? "",
            order_id: data.orderId,
            name: "Shubh Milk",
            description: "Farm to doorstep",
            theme: { color: "#E08A2E" },
          });
          rzp.open();
          setPhase("idle");
          return;
        }
        // Script not loaded — fall through to confirmation with the order id.
      }

      setOrderId(data.orderId);
      setPhase("done");
      clear();
    } catch {
      setErrorMsg("Network error — please try again");
      setPhase("error");
    }
  };

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        {phase === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-fresh/30 bg-fresh/5 p-5 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-fresh text-milk">
              <Check className="h-5 w-5" strokeWidth={2} />
            </span>
            <p className="display mt-3 text-lg text-ink">Order confirmed</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              {orderId} · First delivery tomorrow before 7 AM
            </p>
          </motion.div>
        ) : phase === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-kesar/40 bg-kesar/5 p-4 text-center"
            role="alert"
          >
            <p className="font-mono text-xs text-ink">{errorMsg}</p>
            <button
              type="button"
              onClick={() => setPhase("idle")}
              className="mt-2 font-mono text-[11px] text-peacock underline underline-offset-4"
            >
              Try again
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            type="button"
            disabled={phase === "creating" || subtotal === 0}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={checkout}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-[15px] font-medium text-bone transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {phase === "creating" ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin text-kesar" strokeWidth={1.5} />
                Creating order…
              </>
            ) : (
              <>Checkout · {inr(subtotal)}</>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
