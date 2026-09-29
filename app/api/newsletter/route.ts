import { NextResponse } from "next/server";

/**
 * POST /api/newsletter
 *
 * Stores a newsletter signup. Env-wired: with RESEND_API_KEY + NEWSLETTER_TO
 * it sends a notification email via Resend; otherwise it acknowledges with a
 * stub so the flow works in demos.
 */
export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NEWSLETTER_FROM ?? "Shubh Milk <onboarding@resend.dev>",
          to: process.env.NEWSLETTER_TO ?? "orders@shubhmilk.in",
          subject: "New newsletter signup",
          text: `${email} signed up for ₹100 off their first subscription.`,
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: "Signup failed, try again" }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ error: "Signup failed, try again" }, { status: 502 });
    }
  }

  return NextResponse.json({
    ok: true,
    mode: apiKey ? "live" : "stub",
    message: "Use WELCOME100 at checkout — ₹100 off your first subscription.",
  });
}
