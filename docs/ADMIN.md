# Admin panel guide — Shubh Milk

Edit the website's facts (phone, FSSAI, rates, products, prices, areas, plans,
cows, testimonials) from a friendly form — no code, no database.

---

## Start it (2 terminals, or 2 windows)

In the project folder:

```powershell
# Terminal 1 — the website
npm run dev

# Terminal 2 — the admin save-proxy
npm run admin
```

Then open **http://localhost:3000/admin**

- No login needed while working locally.
- Saving in the panel writes the change into the matching file in `content/`.
- The dev server hot-reloads, so the site updates instantly — check it in
  another tab.

## What you can edit there

| Collection | File it edits | What's inside |
| --- | --- | --- |
| Business details | `content/business.json` | Phone, WhatsApp, address, FSSAI, GSTIN, rates, delivery times, UPI, offers, claims, links, bottle deposit, quality-report values |
| Delivery areas | `content/areas.json` | The 12 areas + pincodes, and the B2B customer segments |
| Products | `content/products.json` | Every product: name, category, spec, price, MRP, badge |
| Plans | `content/plans.json` | Trial / weekly / monthly / family / B2B pricing |
| Our cows | `content/cows.json` | Cow profiles + adopt-a-cow amount |
| Testimonials | `content/testimonials.json` | Customer reviews |

Anything still showing `[SQUARE_BRACKETS]` on the site is a value you haven't
filled yet. Fill it in the panel, save, done.

## ⚠ Three things to never fake

1. **FSSAI number** — publish only a licence you actually hold.
2. **Testimonials** — real customers' own words, with their permission.
3. **Claims** (homes served, litres/day, rating) — only numbers you can stand behind.

## Publishing your edits

Saves land in `content/*.json` as normal file changes. Commit and push them
like any other change (or deploy as usual). Nothing else to do.

## Later: editing from your phone (free, ~10 minutes)

Once the site is hosted (e.g. Netlify, free tier) with the repo connected:

1. In Netlify: **Site settings → Identity → Enable**, then enable
   **Git Gateway** under Identity → Services.
2. Invite yourself: Identity → **Invite users** → your email.
3. In `public/admin/config.yml` uncomment the `git-gateway` backend block and
   remove `local_backend: true`.
4. Deploy. Open `https://YOUR-SITE/admin`, log in with the invite, and the
   same forms now save straight to the repository from anywhere.

(Other hosts like Vercel + GitHub also work with Decap's GitHub backend —
see https://decapcms.org/docs/backends-overview/.)

## What is NOT in the panel (on purpose)

- **Sentences and translations** (`lib/translations.ts`) — the Hindi/English
  copy is type-checked so the two languages can never drift apart; editing it
  stays a code edit.
- **Layout and design** (`components/`, `app/`) — that's code.
- **Photo slots** (`photos` in `lib/businessConfig.ts`) — design decision,
  still edited in code.
