# Payments guide — Shubh Milk

The site can take real online payments through **Razorpay** — UPI (GPay,
PhonePe, Paytm), credit/debit cards, netbanking, wallets and EMI, all in one
Razorpay-hosted sheet. While the keys are not configured, checkout runs in a
safe "stub" mode so the flow can be demoed without money moving.

---

## 1. Get your keys (10 minutes, free)

1. Create an account at https://dashboard.razorpay.com (free; KYC needed
   only to receive live payouts).
2. **Settings → API Keys → Generate Key.**
3. Copy the **Key Id** and the **Key Secret** shown once (the secret is shown
   only that one time).

Razorpay gives you **Test keys** and **Live keys**. Start with test keys.

## 2. Put them in `.env.local`

In the project folder, copy the template and fill in one pair:

```powershell
Copy-Item .env.example .env.local
```

```
RAZORPAY_KEY_SECRET=your_secret_here
RAZORPAY_KEY_ID=your_key_id_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
```

Restart the dev server (`npm run dev`) after changing `.env.local`.
`.env.local` is gitignored — your keys never enter the repository.

## 3. Test it

With **test keys** in place:

1. Open the site, add products to the basket, press **Checkout**.
2. The Razorpay sheet opens. Pay with Razorpay's test values, e.g. UPI id
   `success@razorpay`, or test card `4111 1111 1111 1111` with any future
   expiry and CVV.
3. You should see **Order confirmed** with a payment id (`pay_…`).

If you see *"Payment could not be verified"* — the keys in `.env.local` are
mixed (a test secret with a live key id, or a typo). Regenerate and re-enter
the pair together.

## 4. Go live

1. Finish Razorpay KYC (bank account etc. — done in their dashboard).
2. **Settings → API Keys** → use the **Live** pair in `.env.local`.
3. Make a **real ₹1 order yourself** and confirm it settles in the Razorpay
   dashboard before telling customers.

## How the flow works (what was built)

```
Basket → POST /api/checkout
           ├─ server re-prices the cart (client totals are never trusted)
           ├─ creates a Razorpay order (live) or a stub order (no keys)
           └─ returns order id + amount
       → Razorpay sheet opens (checkout.js, lazy-loaded)
       → customer pays
       → POST /api/checkout/verify
           ├─ recomputes Razorpay's HMAC-SHA256 signature server-side
           └─ "Order confirmed" ONLY if the signature matches
```

- **Stub mode** (no keys): order confirmation appears directly — for
  development and demos only.
- **Dismissed sheet**: nothing happens, cart stays intact.
- **Failed payment**: an honest error, no confirmation.
- **Verification failure**: no confirmation; the message tells the customer
  that any debited money auto-refunds via Razorpay and to WhatsApp us.

## What is NOT covered (on purpose)

- **Auto-recurring monthly subscriptions** (Razorpay mandates) — needs plan
  setup in the Razorpay dashboard; a separate feature if you want it later.
  Today a "subscription" in the basket bills once, as a monthly charge.
- **Payment records in a database** — the confirmed payment id is shown to
  the customer; orders still reach you on WhatsApp per the site's design.
- **Refunds from the site** — done from the Razorpay dashboard (search the
  payment id).

## Fallback paths that still exist

- **UPI QR / UPI id** on `/order` (editable in the admin panel) for direct
  manual payment.
- **Cash on delivery** and **monthly billing** — set on the order form.
