/**
 * ============================================================================
 *  SHUBH MILK — BUSINESS CONFIG  (lib/businessConfig.ts)
 * ============================================================================
 *  This ONE file is the control panel for the whole website.
 *  Anything written in CAPITALS inside square brackets is a placeholder:
 *  replace it with your real detail and the site picks it up.
 *
 *  Self-check after editing, from the project folder:
 *     rg -n "\[[A-Z0-9_]+\]" lib/businessConfig.ts lib/translations.ts
 *
 *  HOW TO EDIT (only 3 rules):
 *    1. Change the VALUE, don't rename the key:
 *         phone: "[PHONE]"   ->   phone: "+919876543210"
 *    2. Don't delete the quotes " " and don't delete the comma , at the end.
 *    3. Hindi/English marketing copy lives in lib/translations.ts — this file is
 *       only for facts (numbers, links, names, rates).
 *
 *  CHECKLIST OF EVERYTHING TO FILL: see TODO.md in the project root.
 *  Every unfilled placeholder in this file is listed by missingPlaceholders() below.
 *
 *  NOTE / STATUS: this config is currently NOT yet wired into the existing
 *  components (Hero, Nav, Footer, FloatingWhatsApp …). The earlier code still
 *  has demo values inlined (e.g. "10012345678901", "+91 98450 00000",
 *  "919845000000"). Connecting each component to this file is the next step —
 *  until that is done, editing this file alone will not change those spots.
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────────────────────
// 0. HELPERS — nothing to edit below this block
// ─────────────────────────────────────────────────────────────────────────────

/** Matches any [PLACEHOLDER], e.g. the one in "[PHONE]" or "[RATE_COW]". */
const PLACEHOLDER_RE = /\[[A-Z0-9_]+\]/;

/** true if a value still contains a [PLACEHOLDER]. */
export const isPlaceholder = (value: string): boolean => PLACEHOLDER_RE.test(value);

// ─────────────────────────────────────────────────────────────────────────────
// 1. BRAND
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  /** Short name used in the wordmark, schema.org and WhatsApp greeting. */
  name: "Shubh Milk",
  /** Registered/legal entity name for the footer + JSON-LD "legalName". */
  legalName: "[LEGAL_NAME]",
  /** GST number, if you are registered. "Not registered" is a valid value. */
  gstin: "[GSTIN]",
  /** The year the business actually started (used in "since …" copy). */
  since: "[SINCE_YEAR]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONTACT — the single most important block on the site
// ─────────────────────────────────────────────────────────────────────────────

export const contact = {
  /** Dialable phone, country code included. Example: "+919876543210" */
  phone: "[PHONE]",
  /** WhatsApp number, country code included, NO + and NO spaces: "919876543210" */
  whatsapp: "[WHATSAPP]",
  /** How the phone number should LOOK on screen. Example: "+91 98765 43210" */
  phoneDisplay: "[PHONE_DISPLAY]",
  /** How the WhatsApp number should LOOK on screen. */
  whatsappDisplay: "[WHATSAPP_DISPLAY]",
  /** Business email for invoices / enquiries. */
  email: "[EMAIL]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. LOCATION & COMPLIANCE
// ─────────────────────────────────────────────────────────────────────────────

export const location = {
  /** Full shop/dairy address, one or two lines. */
  address: "[ADDRESS]",
  /** Locality for schema.org (helps "milk delivery near me" searches). */
  locality: "[LOCALITY]",
  city: "Varanasi",
  state: "Uttar Pradesh",
  /** Your base pincode. */
  pincode: "[PINCODE]",
  /** Optional Google Maps embed URL (share → embed a map → copy src="…"). */
  mapEmbed: "[GOOGLE_MAPS_EMBED]",
} as const;

export const compliance = {
  /**
   * Your real 14-digit FSSAI licence number.
   * LEGAL NOTE: never publish a number you don't hold — it is shown in the
   * trust bar, the footer and the JSON-LD schema.
   */
  fssai: "[FSSAI]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 4. RATES — fill your real selling rates
//    These are shown in the pricing table. Write them how you want them read,
//    including the unit:  "[RATE_COW]",  or  "₹60 / L" once you know it.
// ─────────────────────────────────────────────────────────────────────────────

export const rateKeys = ["cow", "buffalo", "a2", "dahi", "paneer", "ghee"] as const;
export type RateKey = (typeof rateKeys)[number];

export const rates: Record<RateKey, string> = {
  cow: "[RATE_COW]",
  buffalo: "[RATE_BUFFALO]",
  a2: "[RATE_A2]",
  dahi: "[RATE_DAHI]",
  paneer: "[RATE_PANEER]",
  ghee: "[RATE_GHEE]",
};

/** Unit shown next to each rate. Edit only if your selling unit differs. */
export const rateUnits: Record<RateKey, string> = {
  cow: "/ litre",
  buffalo: "/ litre",
  a2: "/ litre",
  dahi: "/ kg",
  paneer: "/ kg",
  ghee: "/ litre",
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. DELIVERY
// ─────────────────────────────────────────────────────────────────────────────

export const delivery = {
  /** Human-readable delivery window, exactly as you want it printed. */
  time: "[DELIVERY_TIME]",
  /** Machine-readable hours for schema.org — 24h clock. */
  opens: "[OPENS_24H]",
  closes: "[CLOSES_24H]",
  /** Minimum order value / quantity. Example: "1 litre" or "₹200" */
  minOrder: "[MIN_ORDER]",
  /** Free delivery above this order value. Example: "₹500" (or "Not offered"). */
  freeDeliveryAbove: "[FREE_DELIVERY_ABOVE]",
  /** Cut-off time to place or change an order for the next morning. */
  orderCutoff: "[ORDER_CUTOFF]",
  /** Delivery is daily, or does it include a weekly off? */
  days: "[DELIVERY_DAYS]",
} as const;

export interface ServiceArea {
  /** Area name as customers say it. */
  name: string;
  /** URL-friendly slug (lowercase, hyphens) — used by area landing pages. */
  slug: string;
  /** Pincode(s) served. Several pincodes? write "221001, 221005". */
  pincode: string;
  /** Google Maps link for this area (or leave the city link). */
  mapLink: "[GOOGLE_MAPS_LINK]" | string;
}

/**
 * Every area you deliver to. Add or remove entries freely — the areas list,
 * the footer and the area landing pages all read from here.
 * Replace each [PINCODE] with the real pincode before you publish.
 */
export const serviceAreas: ServiceArea[] = [
  { name: "Lanka", slug: "lanka", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Assi", slug: "assi", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Bhelupur", slug: "bhelupur", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Sigra", slug: "sigra", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Mahmoorganj", slug: "mahmoorganj", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Ravindrapuri", slug: "ravindrapuri", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Sarnath", slug: "sarnath", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Cantt", slug: "cantt", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Pandeypur", slug: "pandeypur", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Teliyabagh", slug: "teliyabagh", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  { name: "Orderly Bazar", slug: "orderly-bazar", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
  /** Add more rows in this shape if you expand. */
  { name: "[AREA_NAME]", slug: "[AREA_SLUG]", pincode: "[PINCODE]", mapLink: "[GOOGLE_MAPS_LINK]" },
];

/**
 * Who you deliver to — used by the "Who we serve" section and the B2B plan card.
 */
export const customerSegments = [
  { key: "families", label: "[SEGMENT_FAMILIES]" },
  { key: "hostels", label: "[SEGMENT_HOSTELS]" },
  { key: "cafes", label: "[SEGMENT_CAFES]" },
  { key: "chaistalls", label: "[SEGMENT_CHAI_STALLS]" },
  { key: "sweetshops", label: "[SEGMENT_SWEET_SHOPS]" },
  { key: "hotels", label: "[SEGMENT_HOTELS]" },
  { key: "ashrams", label: "[SEGMENT_ASHRAMS]" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 6. PAYMENTS & LOYALTY
// ─────────────────────────────────────────────────────────────────────────────

export const payments = {
  /** Your UPI ID / VPA. Example: "shubhmilk@okhdfcbank" */
  upiId: "[UPI_ID]",
  /** Name shown in the customer's UPI app when they pay. */
  payeeName: "[PAYEE_NAME]",
  /**
   * Image of YOUR OWN UPI QR (generate it in your bank/GPay/PhonePe app,
   * screenshot it, drop the file in /public/images/ and put the path here).
   * Never ship a QR you have not tested with a ₹1 payment.
   */
  upiQrImage: "[UPI_QR_IMAGE]",
  /** Payment modes you actually accept. */
  methods: ["UPI", "Cash on delivery", "Monthly bill"] as string[],
} as const;

export const offers = {
  /** First-order offer (the footer's offer card + newsletter reply use this). */
  firstOrder: "[FIRST_ORDER_OFFER]",
  /** Referral offer. Brief said: "Friend ko refer karein, 1 litre free." */
  referral: "[REFERRAL_OFFER]",
  /** Loyalty offer. Brief said: "10th delivery pe 1 litre free." */
  loyalty: "[LOYALTY_OFFER]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 6b. CLAIMS — numbers you state publicly about your business
//     Every one of these is a factual claim a customer can check. Only publish
//     a figure you can stand behind; the previous build said "12,000+ homes" and
//     "since 2019", which were never verified. Fill these in or delete the line
//     and remove the matching row from the section that shows it.
// ─────────────────────────────────────────────────────────────────────────────

export const claims = {
  /** e.g. "2,000+" — how many homes you actually deliver to. */
  homesServed: "[HOMES_SERVED]",
  /** e.g. "450" — litres you actually sell per day. */
  litresDaily: "[LITRES_DAILY]",
  /** e.g. "40" — how many times a glass bottle really gets reused. */
  bottleReuse: "[BOTTLE_REUSE_COUNT]",
  /** e.g. "4:30 AM" — the time milk actually leaves your dairy. */
  dairyLeaveTime: "[DAIRY_LEAVE_TIME]",
  /** e.g. "4.8" — your real average rating. */
  rating: "[RATING]",
  /** e.g. "120+" — how many reviews you actually have. */
  reviewCount: "[REVIEW_COUNT]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 7. SUBSCRIPTION PLANS
//    Prices: [PLAN_PRICE] is the main monthly price. The per-plan placeholders
//    below let you price every tier separately — use only the ones you need.
// ─────────────────────────────────────────────────────────────────────────────

export interface Plan {
  key: "trial" | "weekly" | "monthly" | "family" | "b2b";
  /** Price as printed for the customer. A text field, not a number, so you can
   *  write "₹60 / L" or "On request" per plan. */
  priceLabel: string;
  /** What the customer gets, short. */
  volume: string;
  /** Extra business rule you want stored with the plan. */
  note: string;
}

export const plans: Plan[] = [
  {
    key: "trial",
    priceLabel: "[PLAN_PRICE_TRIAL]",
    volume: "[PLAN_VOLUME_TRIAL]",
    note: "Free trial — 2 days. Fixed by the brief.",
  },
  {
    key: "weekly",
    priceLabel: "[PLAN_PRICE_WEEKLY]",
    volume: "[PLAN_VOLUME_WEEKLY]",
    note: "Weekly plan.",
  },
  {
    key: "monthly",
    priceLabel: "[PLAN_PRICE]",
    volume: "[PLAN_VOLUME_MONTHLY]",
    note: "Monthly plan — the main conversion.",
  },
  {
    key: "family",
    priceLabel: "[PLAN_PRICE_FAMILY]",
    volume: "[PLAN_VOLUME_FAMILY]",
    note: "Family pack — 2L / 3L daily.",
  },
  {
    key: "b2b",
    priceLabel: "[PLAN_PRICE_B2B]",
    volume: "[PLAN_VOLUME_B2B]",
    note: "Hostel / PG / cafe / hotel — quote-based, min quantity in [B2B_MIN_QTY].",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. LINKS & SOCIAL
// ─────────────────────────────────────────────────────────────────────────────

export const links = {
  instagram: "[INSTAGRAM_LINK]",
  /** Google My Business profile link (review requests point here). */
  gmb: "[GMB_LINK]",
  /** Google Maps location of your service area / shop (privacy-safe, not home). */
  googleMaps: "[GOOGLE_MAPS_LINK]",
  /** Live site URL, used for canonical tags and JSON-LD. */
  siteUrl: "[SITE_URL]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 9. PHOTOS
//    Every entry points at /images/placeholder.jpg so the site never breaks.
//    To use a real photo: drop the file in /public/images/ and write the path
//    in `src` (e.g. "/images/hero-dawn.jpeg"), then delete its `replaceWith`
//    line. `alt` is what screen readers and Google read — describe the real
//    photo you intend to shoot.
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
// 10. FEATURE FLAGS — turn things on as you go
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
// PLACEHOLDER AUDIT — lists every [TOKEN] still left in this file
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
