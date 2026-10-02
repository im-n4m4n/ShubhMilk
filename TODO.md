# TODO — everything you need to fill in

Shubh Milk website · placeholders live in **two files only**:

| File | What goes in it |
| --- | --- |
| `lib/businessConfig.ts` | Facts: phone, WhatsApp, FSSAI, rates, areas, UPIs, links, photos, plans |
| `lib/translations.ts` | Words: Hindi + English marketing copy (Hindi is default) |

Every placeholder is written as `[SOMETHING]` in **CAPITAL LETTERS inside square
brackets**. To fill one in, replace the whole token including the brackets.
Keep the quotes `"` and the trailing comma `,`.

---

## ⚠ Read this first — current status

**1. The two files are created but not yet wired into the site.**
The existing pages (`app/page.tsx`, `Hero`, `Nav`, `Footer`, `FloatingWhatsApp`, …)
were written earlier with demo values typed directly inside them. So right now,
editing `lib/businessConfig.ts` **will not change those screens yet**. Connecting
each component to the config is the next job — the list is at the bottom.

**2. Three legal/ethical items are not "just a placeholder".**

- **FSSAI number** — only publish a licence you actually hold. Never invent one
  or copy someone else's. It is shown in the trust bar, the footer and the
  Google schema.
- **Testimonials** — use real customers' own words, with their permission. Do not
  publish invented reviews.
- **Photos** — "real photos, not stock" was in your brief, so every photo slot
  points to `/images/placeholder.jpg` and carries alt text describing the shot to
  take. The repo already ships real-looking dairy photos in `/public/images/`
  which you can switch to immediately (see §7).

**3. Business claims to confirm before going live.** The old code displays
"12,000+ homes" and "since 2019". Only keep a number/year you can stand behind —
see §8.

---

## 1. Contact & location

- [ ] `[PHONE]` — dialable, with country code → `"+91XXXXXXXXXX"`
- [ ] `[PHONE_DISPLAY]` — how it looks on screen → `"+91 98765 43210"`
- [ ] `[WHATSAPP]` — digits only, country code, **no `+`, no spaces** → `"919876543210"`
- [ ] `[WHATSAPP_DISPLAY]` — how it looks on screen
- [ ] `[EMAIL]`
- [ ] `[ADDRESS]` — shop/dairy address
- [ ] `[LOCALITY]` — locality name (helps "milk delivery near me" results)
- [ ] `[PINCODE]` — your base pincode
- [ ] `[GOOGLE_MAPS_EMBED]` — Google Maps → Share → Embed a map → copy the `src`
- [ ] `[GOOGLE_MAPS_LINK]` — plain maps link (used by every area row)
- [ ] `[LEGAL_NAME]` — registered entity name (or just your own name)
- [ ] `[GSTIN]` — or write "Not registered"
- [ ] `[SINCE_YEAR]` — the year you actually started

## 2. Compliance

- [ ] `[FSSAI]` — your real 14-digit licence number

## 3. Rates — `rates`

Rates are plain text, so you can write them the way you want them read
(`"₹60 / L"`). Unit labels are already set in `rateUnits`.

- [ ] `[RATE_COW]`
- [ ] `[RATE_BUFFALO]`
- [ ] `[RATE_A2]`
- [ ] `[RATE_DAHI]`
- [ ] `[RATE_PANEER]`
- [ ] `[RATE_GHEE]`

## 4. Delivery

- [ ] `[DELIVERY_TIME]` — e.g. `"5:30 AM – 7:30 AM, daily"`
- [ ] `[OPENS_24H]` / `[CLOSES_24H]` — 24-hour clock for Google, e.g. `"05:30"` / `"07:30"`
- [ ] `[MIN_ORDER]` — e.g. `"1 litre"` or `"₹200"`
- [ ] `[FREE_DELIVERY_ABOVE]` — or `"Not offered"`
- [ ] `[ORDER_CUTOFF]` — last time to order for tomorrow, e.g. `"10 PM the night before"`
- [ ] `[DELIVERY_DAYS]` — daily, or which days off
- [ ] `[PINCODE]` — **once per area row** (11 rows + 1 spare). Pincodes you do
      not serve yet: delete that row instead of guessing.
- [ ] `[AREA_NAME]` / `[AREA_SLUG]` — the spare row; delete it if you don't need it
- [ ] `[SEGMENT_*]` — 7 labels: families, hostels, cafes, chai stalls, sweet
      shops, hotels, ashrams

## 5. Payments & offers

- [ ] `[UPI_ID]` — your VPA, e.g. `"shubhmilk@okhdfcbank"`
- [ ] `[PAYEE_NAME]` — name shown in the customer's UPI app
- [ ] `[UPI_QR_IMAGE]` — **your own** QR: generate it in your bank/GPay/PhonePe
      app, save it into `public/images/`, and write the path here. Test it with a
      ₹1 payment before publishing.
- [ ] `[FIRST_ORDER_OFFER]` — e.g. `"first order: ₹100 off"`
- [ ] `[REFERRAL_OFFER]` — your brief says: refer a friend → 1 litre free
- [ ] `[LOYALTY_OFFER]` — your brief says: 1 litre free on the 10th delivery

## 6. Plans

- [ ] `[PLAN_PRICE]` — the main monthly price
- [ ] `[PLAN_PRICE_TRIAL]` · `[PLAN_VOLUME_TRIAL]` — free trial (2 days)
- [ ] `[PLAN_PRICE_WEEKLY]` · `[PLAN_VOLUME_WEEKLY]`
- [ ] `[PLAN_VOLUME_MONTHLY]`
- [ ] `[PLAN_PRICE_FAMILY]` · `[PLAN_VOLUME_FAMILY]` — 2L / 3L daily
- [ ] `[PLAN_PRICE_B2B]` · `[PLAN_VOLUME_B2B]` · `[B2B_MIN_QTY]`
- [ ] `[GA_MEASUREMENT_ID]` — only if you choose Google Analytics; leave the
      provider as `"none"` until then

## 7. Photos — `photos` (15 slots)

Each slot currently points at `/images/placeholder.jpg`. Replace `src` with your
real photo path and delete that slot's `replaceWith` line.

The repo **already contains real dairy photography** in `public/images/` that you
can use right away — the third column below tells you which existing file matches.

| Placeholder | Photo to shoot | Already in the repo |
| --- | --- | --- |
| `[PHOTO_HERO]` | bottles delivered at a doorstep | `hero-dawn.jpeg` |
| `[PHOTO_COW_MILK]` | glass of cow milk | `bottle-still.jpeg` |
| `[PHOTO_BUFFALO_MILK]` | buffalo milk bottle | `buffalo-milk.jpeg` |
| `[PHOTO_A2_MILK]` | A2 milk bottle | `bottle-still.jpeg` |
| `[PHOTO_DAHI]` | dahi in a jar | `curd-bowl.jpeg` |
| `[PHOTO_PANEER]` | fresh paneer block | `paneer-leaves.jpeg` |
| `[PHOTO_GHEE]` | bilona ghee jar | `ghee-jar.jpeg` |
| `[PHOTO_BUTTER]` | white butter | `white-butter.jpeg` |
| `[PHOTO_KHOYA]` | khoya / mawa | `curd-paneer.jpeg` |
| `[PHOTO_CHAACH]` | chaach in steel glass | `chaas-steel.jpeg` |
| `[PHOTO_LASSI]` | sweet lassi glass | `lassi-glass.jpeg` |
| `[PHOTO_FARM]` | your dairy farm | `gir-herd.jpeg` |
| `[PHOTO_CATTLE]` | your cows being milked | `gir-herd.jpeg` |
| `[PHOTO_BOTTLES]` | bottles being washed/refilled | `bottle-still.jpeg` |
| `[PHOTO_DELIVERY]` | your delivery person on the route | `dawn-delivery.jpeg` |

## 8. Copy placeholders — `lib/translations.ts`

These are inside the Hindi (`hi`) and English (`en`) blocks. **Fill both.**

- [ ] `[FARM_DETAILS]` — where your milk comes from, how many animals
- [ ] `[TEST_REPORT_NOTE]` — e.g. "lab-tested daily, report shown on request"
- [ ] `[FRESHNESS_DETAIL]` — how the milk is chilled/stored
- [ ] `[PHOTO_NOTE]` — a caption for the real-photo section
- [ ] `[TESTIMONIAL_1_QUOTE]` · `[TESTIMONIAL_1_NAME]` · `[TESTIMONIAL_1_AREA]`
- [ ] `[TESTIMONIAL_2_QUOTE]` · `[TESTIMONIAL_2_NAME]` · `[TESTIMONIAL_2_AREA]`
- [ ] `[TESTIMONIAL_3_QUOTE]` · `[TESTIMONIAL_3_NAME]` · `[TESTIMONIAL_3_AREA]`

### Claims the old code already shows — confirm or change

- [ ] **“12,000+ homes”** — appears in the nav strip, hero stats, testimonials and
      the trust marquee (`components/sections/`). Put your real number, or a
      smaller honest one.
- [ ] **“since 2019”** — appears in the nav strip, `app/layout.tsx` metadata and the
      footer. Set `brand.since` and update these.
- [ ] **₹100-off first-order offer** — in the footer card and
      `app/api/newsletter/route.ts` (`WELCOME100`).
- [ ] **Free delivery claim** — the nav bar promises "Free delivery on first
      order"; `delivery.freeDeliveryAbove` must agree with it.

---

## Leftover demo values in the existing code

These are **not** placeholders yet — real-looking fake data typed into components.
They must be replaced (and should read from `businessConfig` instead):

| Value | Where | Should become |
| --- | --- | --- |
| `10012345678901` | `components/sections/Footer.tsx` | `compliance.fssai` |
| `+91 98450 00000` | `components/sections/Footer.tsx` | `contact.whatsappDisplay` |
| `919845000000` | `components/sections/FloatingWhatsApp.tsx` (default when env var is unset) | `contact.whatsapp` |
| `12,000+` | `Nav.tsx`, `Hero.tsx`, `Testimonials.tsx`, `TrustMarquee.tsx` | your real figure |
| `since 2019` | `Nav.tsx`, `Footer.tsx`, `app/layout.tsx` | `brand.since` |
| ₹-prices per product | `lib/products.ts`, `lib/combos.ts` | your real selling rates |
| test/demo reviews | `components/sections/Testimonials.tsx` | real reviews or remove |
| `FSSAI CERTIFIED` badge text | `components/sections/TrustMarquee.tsx`, `Hero.tsx` | only keep once licensed |

> Note: `lib/products.ts` prices and `lib/combos.ts` bundle prices are separate
> from `rates` — the per-product prices are what the shop actually charges. Your
> per-litre rates must agree with them, or customers will see two different rates.

---

## Wiring still to do

- [ ] `Header` / `Nav` — language toggle (Hindi default), links from `translations.nav`
- [ ] `Hero` — headline, subheadline, 3 CTAs (`waLink()`, `telLink()`), trust bar
- [ ] `Footer` — FSSAI, phone, WhatsApp, Instagram/GMB links, areas list
- [ ] `FloatingWhatsApp` + mobile sticky bar — **WhatsApp + Call** (currently
      WhatsApp only; the brief asks for both, always visible)
- [ ] `PricingTable` — render `rates` + `translations.pricing`
- [ ] `OrderForm` — Name, Mobile, Area, Address, Milk type, Litre, Frequency,
      Start date, Payment preference → prefilled WhatsApp message + success line
- [ ] `SubscriptionCard` — trial / weekly / monthly / family / B2B + pause + extra
      milk + monthly bill reminder
- [ ] `TestimonialCard`, `FAQ` accordion (Deliveries / minimum order / payment /
      pause / bottle return)
- [ ] Rates, areas, plans and testimonials sections
- [ ] **Bilingual runtime** — a small language context + cookie so the toggle works
- [ ] **Area landing pages** — `/milk-delivery-lanka-varanasi`,
      `/a2-cow-milk-varanasi`, `/paneer-delivery-bhelupur` (use
      `serviceAreas[].slug` and the `meta.area*Template` strings)
- [ ] **LocalBusiness JSON-LD** — name, address, phone, areaServed, opening hours
- [ ] **PWA** — `manifest.json` + service worker ("Add to Home Screen")
- [ ] **Analytics** — Vercel Analytics or Google Analytics (your choice; none installed yet)
- [ ] **README section** — how to update rates, areas, phone, FSSAI

---

## How to check your work

1. **See what is still unfilled.** In the project folder run:

   ```powershell
   node --experimental-strip-types --no-warnings -e "import('./lib/businessConfig.ts').then(m => console.log(m.missingPlaceholders().length + ' left'))"
   ```

   Every unfilled field comes back as `a.b.c = [TOKEN]`.

2. **Catches every leftover token** in both config files:

   ```powershell
   rg -n "\[[A-Z0-9_]+\]" lib/businessConfig.ts lib/translations.ts
   ```

3. **Typecheck + build** after editing (both are clean today):

   ```powershell
   npx tsc --noEmit
   npm run build
   ```

   > Heads-up: `npm run lint` is **already broken in this repo** and fails before
   > touching any of this work — `typescript-eslint` cannot run under the
   > installed TypeScript 7.0. That is a pre-existing problem, not caused by
   > these files; it needs a dependency decision from you.
