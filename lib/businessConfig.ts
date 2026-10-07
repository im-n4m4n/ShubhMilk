/**
 * ============================================================================
 *  SHUBH MILK — BUSINESS CONFIG  (lib/businessConfig.ts)
 * ============================================================================
 *  The business FACTS (phone, WhatsApp, FSSAI, rates, areas, plans, products,
 *  cows, testimonials) now live in `content/*.json` so the admin panel
 *  (/admin) can edit them without touching code.
 *
 *  This file wires that data into typed exports the site imports. Edit copy
 *  in lib/translations.ts, layout in the components — but your numbers,
 *  names and rates belong in content/ now.
 *
 *  Self-check after editing, from the project folder:
 *     rg -n "\[[A-Z0-9_]+\]" content lib
 *
 *  HOW TO EDIT (two ways):
 *    1. The admin panel — run `npm run admin` + `npm run dev`, open
 *       http://localhost:3000/admin (see docs/ADMIN.md). This is the easy way.
 *    2. By hand — open the matching file in content/ and replace the value.
 *       Anything in CAPITALS inside square brackets is a placeholder.
 *
 *  NOTE / STATUS: photos, feature flags and the site's sentences stay in
 *  TypeScript on purpose: photos are design, and the Hindi/English copy is
 *  type-checked so the two languages can never drift out of shape.
 * ============================================================================
 */

import businessData from "@/content/business.json";
import areaData from "@/content/areas.json";
import planData from "@/content/plans.json";
import cowData from "@/content/cows.json";

// ─────────────────────────────────────────────────────────────────────────────
// 0. HELPERS — nothing to edit below this block
// ─────────────────────────────────────────────────────────────────────────────

/** Matches any [PLACEHOLDER], e.g. the one in "[PHONE]" or "[RATE_COW]". */
const PLACEHOLDER_RE = /\[[A-Z0-9_]+\]/;

/** true if a value still contains a [PLACEHOLDER]. */
export const isPlaceholder = (value: string): boolean => PLACEHOLDER_RE.test(value);

// ─────────────────────────────────────────────────────────────────────────────
// 1. BRAND  (content/business.json → brand)
// ─────────────────────────────────────────────────────────────────────────────

export const brand = businessData.brand;

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONTACT — the single most important block on the site
//    (content/business.json → contact)
// ─────────────────────────────────────────────────────────────────────────────

export const contact = businessData.contact;

// ─────────────────────────────────────────────────────────────────────────────
// 3. LOCATION & COMPLIANCE  (content/business.json → location, compliance)
// ─────────────────────────────────────────────────────────────────────────────

export const location = businessData.location;

export const compliance = businessData.compliance;

// ─────────────────────────────────────────────────────────────────────────────
// 4. RATES  (content/business.json → rates, rateUnits)
//    These are shown in the pricing table. Write them how you want them read,
//    including the unit:  "[RATE_COW]",  or  "₹60 / L" once you know it.
// ─────────────────────────────────────────────────────────────────────────────

export const rateKeys = ["cow", "buffalo", "a2", "dahi", "paneer", "ghee"] as const;
export type RateKey = (typeof rateKeys)[number];

export const rates: Record<RateKey, string> = businessData.rates;

/** Unit shown next to each rate. Edit only if your selling unit differs. */
export const rateUnits: Record<RateKey, string> = businessData.rateUnits;

// ─────────────────────────────────────────────────────────────────────────────
// 5. DELIVERY  (content/business.json → delivery; content/areas.json → areas)
// ─────────────────────────────────────────────────────────────────────────────

export const delivery = businessData.delivery;

export interface ServiceArea {
  /** Area name as customers say it. */
  name: string;
  /** URL-friendly slug (lowercase, hyphens) — used by area landing pages. */
  slug: string;
  /** Pincode(s) served. Several pincodes? write "221001, 221005". */
  pincode: string;
  /** Google Maps link for this area (or leave the city link). */
  mapLink: string;
}

/** Every area you deliver to — edited in the admin panel (content/areas.json). */
export const serviceAreas: ServiceArea[] = areaData.serviceAreas;

/**
 * Who you deliver to — used by the "Who we serve" section and the B2B plan card.
 * (content/areas.json → customerSegments)
 */
export const customerSegments = areaData.customerSegments;

// ─────────────────────────────────────────────────────────────────────────────
// 6. PAYMENTS, OFFERS & CLAIMS
//    (content/business.json → payments, offers, claims)
// ─────────────────────────────────────────────────────────────────────────────

export const payments = businessData.payments;

export const offers = businessData.offers;

/**
 * 6b. CLAIMS — numbers you state publicly about your business.
 *     Every one of these is a factual claim a customer can check. Only publish
 *     a figure you can stand behind.
 */
export const claims = businessData.claims;

// ─────────────────────────────────────────────────────────────────────────────
// 7. SUBSCRIPTION PLANS  (content/plans.json)
//    Prices are text fields so you can write "₹60 / L" or "On request".
// ─────────────────────────────────────────────────────────────────────────────

export interface Plan {
  key: "trial" | "weekly" | "monthly" | "family" | "b2b";
  /** Price as printed for the customer. */
  priceLabel: string;
  /** What the customer gets, short. */
  volume: string;
  /** Extra business rule stored with the plan. */
  note: string;
}

const planKeys = ["trial", "weekly", "monthly", "family", "b2b"] as const;

export const plans: Plan[] = planData.plans.flatMap((raw) =>
  (planKeys as readonly string[]).includes(raw.key)
    ? [{ key: raw.key as Plan["key"], priceLabel: raw.priceLabel, volume: raw.volume, note: raw.note }]
    : [],
);

// ─────────────────────────────────────────────────────────────────────────────
// 8. LINKS & SOCIAL  (content/business.json → links)
// ─────────────────────────────────────────────────────────────────────────────

export const links = businessData.links;

// ─────────────────────────────────────────────────────────────────────────────
// 9. PHOTOS
//    Photo slots stay here: they are design decisions, not business facts.
//    Every entry points at /images/placeholder.jpg so the site never breaks.
//    To use a real photo: drop the file in /public/images/ and write the path
//    in `src` (e.g. "/images/hero-dawn.jpeg"), then delete its `replaceWith`
//    line. `alt` is what screen readers and Google read.
//    (This repo already ships real photos in /public/images/ — you can reuse
//    them right away; see TODO.md.)
// ─────────────────────────────────────────────────────────────────────────────

export interface PhotoSlot {
  src: string;
  alt: string;
  replaceWith: string;
}

const slot = (placeholder: string, alt: string, existing: string): PhotoSlot => ({
  src: "/images/placeholder.jpg",
  alt,
  replaceWith: `${placeholder} — or use ${existing}`,
});

export const photos = {
  hero: slot("[PHOTO_HERO]", "Morning delivery of glass milk bottles at a Varanasi doorstep", "/images/hero-dawn.jpeg"),
  cowMilk: slot("[PHOTO_COW_MILK]", "Glass bottle of fresh cow milk", "/images/bottle-still.jpeg"),
  buffaloMilk: slot("[PHOTO_BUFFALO_MILK]", "Full-cream buffalo milk in a glass bottle", "/images/buffalo-milk.jpeg"),
  a2Milk: slot("[PHOTO_A2_MILK]", "A2 desi cow milk bottle, single farm", "/images/bottle-still.jpeg"),
  dahi: slot("[PHOTO_DAHI]", "Set dahi in a returnable glass jar", "/images/curd-bowl.jpeg"),
  paneer: slot("[PHOTO_PANEER]", "Fresh malai paneer block cut that morning", "/images/paneer-leaves.jpeg"),
  ghee: slot("[PHOTO_GHEE]", "Bilona ghee in a glass jar", "/images/ghee-jar.jpeg"),
  butter: slot("[PHOTO_BUTTER]", "White butter, freshly churned", "/images/white-butter.jpeg"),
  khoya: slot("[PHOTO_KHOYA]", "Khoya / mawa, fresh from the dairy", "/images/curd-paneer.jpeg"),
  chaach: slot("[PHOTO_CHAACH]", "Masala chaach in a steel glass", "/images/chaas-steel.jpeg"),
  lassi: slot("[PHOTO_LASSI]", "Thick sweet lassi in a glass", "/images/lassi-glass.jpeg"),
  farm: slot("[PHOTO_FARM]", "The dairy farm and cattle that supply your milk", "/images/gir-herd.jpeg"),
  cattle: slot("[PHOTO_CATTLE]", "Gir cows being milked at the farm", "/images/gir-herd.jpeg"),
  bottles: slot("[PHOTO_BOTTLES]", "Returnable glass bottles being washed and refilled", "/images/bottle-still.jpeg"),
  delivery: slot("[PHOTO_DELIVERY]", "Your delivery person on the morning route", "/images/dawn-delivery.jpeg"),
} as const;

export type PhotoKey = keyof typeof photos;

// ─────────────────────────────────────────────────────────────────────────────
// 9b. BOTTLE DEPOSIT  (content/business.json → bottleDeposit)
//     ONE number, read by the product page, the FAQ and the return policy.
//     The figure is written down only here, so the site can never disagree
//     with itself about it.
// ─────────────────────────────────────────────────────────────────────────────

export const bottleDeposit = businessData.bottleDeposit;

// ─────────────────────────────────────────────────────────────────────────────
// 9c. QUALITY & TESTING  (content/business.json → quality)
//     What you check every morning, and the figures your lab reports.
//     LEGAL NOTE: publish only numbers a laboratory actually gave you. Until the
//     real values are typed in, the site prints the [TOKEN] on purpose — an
//     obvious gap is far better than a confident invented reading.
// ─────────────────────────────────────────────────────────────────────────────

export const quality = businessData.quality;

// ─────────────────────────────────────────────────────────────────────────────
// 9d. COW PROFILES / "ADOPT A COW"  (content/cows.json)
//     One entry per animal customers can meet. An adopted-cow plan is only
//     real once you decide the amount and what the sponsor receives.
// ─────────────────────────────────────────────────────────────────────────────

export interface CowProfile {
  /** The animal's name, as your family calls her. */
  name: string;
  /** Breed — Gir, Sahiwal, Tharparkar ... */
  breed: string;
  /** Age as you want it printed. */
  age: string;
  /** Photo already in /public/images (or your own path). */
  photo: string;
  /** One line about her, in your own words. */
  note: string;
}

export const cows: CowProfile[] = cowData.cows;

/** Monthly amount for the adopt-a-cow plan. Empty until you decide it. */
export const cowSponsor = cowData.cowSponsor;

// ─────────────────────────────────────────────────────────────────────────────
// 10. FEATURE FLAGS — turn things on as you go (stays in code)
// ─────────────────────────────────────────────────────────────────────────────

export const flags = {
  /** Language toggle in the header (default: Hindi). */
  bilingual: true,
  /** Sticky WhatsApp + Call bar on mobile. */
  stickyCta: true,
  /** Show the pending-payment / UPI QR block. */
  upiQr: true,
  /** Add to Home Screen support (manifest + service worker). */
  pwa: true,
  /** Analytics provider: "vercel" | "ga" | "none" + its ID. */
  analytics: { provider: "none", gaId: "[GA_MEASUREMENT_ID]" },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// THE WHOLE CONFIG IN ONE OBJECT (handy for passing around)
// ─────────────────────────────────────────────────────────────────────────────

export const businessConfig = {
  brand,
  contact,
  location,
  compliance,
  rates,
  rateUnits,
  delivery,
  serviceAreas,
  customerSegments,
  payments,
  offers,
  claims,
  plans,
  links,
  photos,
  bottleDeposit,
  quality,
  cows,
  cowSponsor,
  flags,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DERIVED VALUES & HELPERS — build links without retyping numbers
// ─────────────────────────────────────────────────────────────────────────────

/** Digits only, for wa.me. Empty string while [WHATSAPP] is unfilled. */
export const whatsappDigits = (): string => contact.whatsapp.replace(/\D/g, "");

/** Prefilled WhatsApp chat link: waLink("I want 2 litre cow milk daily"). */
export const waLink = (message = "Hi Shubh Milk! I'd like to order / start a subscription."): string =>
  `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(message)}`;

/** Click-to-call link. */
export const telLink = (): string => `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

/** UPI intent link (GPay / PhonePe / Paytm all understand upi://). */
export const upiLink = (amount: string | number, note: string): string => {
  const params = new URLSearchParams({
    pa: payments.upiId,
    pn: payments.payeeName,
    cu: "INR",
    am: String(amount),
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
};

/** True while any required-but-unfilled placeholder remains (displayed nowhere yet). */
export const hasMissingPlaceholders = (): boolean => missingPlaceholders().length > 0;

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER AUDIT — lists every [TOKEN] still left in content/ + this file
// ─────────────────────────────────────────────────────────────────────────────

const walk = (node: unknown, path: string, out: string[]): void => {
  if (typeof node === "string") {
    if (isPlaceholder(node)) out.push(`${path} = ${node}`);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((value, i) => walk(value, `${path}[${i}]`, out));
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      walk(value, path ? `${path}.${key}` : key, out);
    }
  }
};

/** Every unfilled placeholder in businessConfig, as "a.b.c = [TOKEN]". */
export const missingPlaceholders = (): string[] => {
  const out: string[] = [];
  walk(businessConfig, "", out);
  return out;
};
