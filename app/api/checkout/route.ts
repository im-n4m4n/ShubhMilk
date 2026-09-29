import { NextResponse } from "next/server";
import { products } from "@/lib/products";

/**
 * POST /api/checkout
 *
 * Creates a Razorpay order. Wired via env vars — set these to go live:
 *   RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET  (server-side)
 *   NEXT_PUBLIC_RAZORPAY_KEY_ID            (client-side, checkout.js)
 *
 * Without credentials this returns a deterministic stub order so the
 * full checkout flow can be developed and tested end-to-end.
 */

interface CheckoutLine {
  productId: string;
  kind: "one-time" | "subscription";
  qty: number;
}

interface CheckoutBody {
  lines: CheckoutLine[];
  pincode?: string;
  frequency?: string;
  slot?: string;
}

const validKind = (k: string): k is CheckoutLine["kind"] =>
  k === "one-time" || k === "subscription";

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Re-price server-side — never trust client totals.
  let amount = 0;
  for (const line of body.lines) {
    if (
      typeof line.productId !== "string" ||
      !validKind(String(line.kind)) ||
      !Number.isInteger(line.qty) ||
      line.qty < 1 ||
      line.qty > 99
    ) {
      return NextResponse.json({ error: "Invalid line item" }, { status: 400 });
    }
    const product = products.find((p) => p.id === line.productId);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${line.productId}` }, { status: 400 });
    }
    const unit = validKind(String(line.kind)) && line.kind === "subscription"
      ? product.subscriptionPrice
      : product.price;
    amount += unit * line.qty;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  // --- Live Razorpay path (only when credentials exist) ---
  if (keyId && keySecret) {
    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amount * 100, // paise
          currency: "INR",
          receipt: `shubh_${Date.now()}`,
          notes: {
            pincode: body.pincode ?? "",
            frequency: body.frequency ?? "",
            slot: body.slot ?? "",
          },
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json(
          { error: "Razorpay order failed", detail },
          { status: 502 },
        );
      }
      const order = (await res.json()) as { id: string; amount: number };
      return NextResponse.json({
        mode: "razorpay" as const,
        orderId: order.id,
        amount,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? keyId,
      });
    } catch {
      return NextResponse.json({ error: "Payment gateway unreachable" }, { status: 502 });
    }
  }

  // --- Stub path (no credentials configured) ---
  return NextResponse.json({
    mode: "stub" as const,
    orderId: `stub_${Date.now().toString(36)}`,
    amount,
  });
}
