import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * POST /api/checkout/verify
 *
 * The security step after Razorpay's popup closes. Razorpay signs every
 * successful payment with HMAC-SHA256 over `${order_id}|${payment_id}` using
 * the merchant API keypair. We recompute that signature server-side and only
 * then tell the customer their order is confirmed.
 *
 * Why this matters: without it, the "Order confirmed" screen could be shown
 * for a payment that never happened.
 *
 * Returns { ok: true, paymentId } when the signature matches, 400 otherwise.
 * In stub mode (no credentials configured) the stub checkout never sends a
 * signature, so this endpoint is only used by the live flow.
 *
 * The signing key is read from the RAZORPAY_KEY_SECRET environment variable —
 * never hardcoded in this file.
 */

interface VerifyBody {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

export async function POST(request: Request) {
  // Read from the environment (set in .env.local — see docs/PAYMENTS.md).
  const signingKey = process.env.RAZORPAY_KEY_SECRET;

  let body: VerifyBody;
  try {
    body = (await request.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { ok: false, error: "Missing payment fields" },
      { status: 400 },
    );
  }

  // Live mode: verify the signature. No credentials = nothing to verify
  // against, so refuse rather than pretend.
  if (!signingKey) {
    return NextResponse.json(
      { ok: false, error: "Payment gateway not configured" },
      { status: 503 },
    );
  }

  const expected = createHmac("sha256", signingKey)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  // timingSafeEqual is the correct habit for signature checks; lengths must
  // match first or it throws.
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  const valid = a.length === b.length && timingSafeEqual(a, b);

  if (!valid) {
    return NextResponse.json(
      { ok: false, error: "Payment signature mismatch" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, paymentId });
}
