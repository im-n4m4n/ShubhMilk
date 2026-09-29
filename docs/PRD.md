# SHUBH MILK — 产品需求文档 (PRD)

> 来源：用户提供的完整构建提示词（原文照录 + 结构化整理）。
> 项目：C:\ZWorkX\MeowMilk · Next.js 14 (App Router) + TypeScript + Tailwind CSS

---

## 1. ROLE

You are a senior frontend engineer + art director specializing in ultra-premium,
motion-first e-commerce websites with a deep understanding of Indian craft,
typography and visual culture. You build restrained, editorial-grade interfaces —
never generic AI-looking sites.

## 2. PROJECT

Build a premium e-commerce + subscription website for **"SHUBH MILK"** — an Indian
farm-to-doorstep dairy brand selling A2 desi cow milk, buffalo milk, curd, paneer,
bilona ghee, white butter, lassi, chaas, shrikhand and flavoured milk.

The brand promise: *"Shubh" means auspicious. Pure milk, delivered before sunrise,
in returnable glass bottles, from farms you can visit.*

Positioning line: **"Shudh. Shubh. Roz."** (Pure. Auspicious. Every day.)

The site must feel like a heritage Indian craft house that happens to run a
modern D2C subscription business — not a startup that slapped a mandala on a template.

## 3. TECH STACK

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (arbitrary values for exact spacing/colour)
- `gsap` + ScrollTrigger, `@studio-freight/lenis`
- `@react-three/fiber`, `@react-three/drei`, `three`, `@react-three/postprocessing`
- `framer-motion` (micro-interactions only — drawer, toasts, modals)
- `zustand` (cart + subscription state, persisted to localStorage)
- `lucide-react` (thin stroke only)
- `react-hook-form` + `zod` (checkout, pincode check, address)
- `next/font`, `next/image`
- Razorpay (leave as env-var-wired stub)

## 4. BUILD IN THREE ROUNDS

Do not attempt everything in one pass:

- **Round 1** → layout, grid, typography, spacing, static sections, cart state. No animation.
- **Round 2** → Lenis + GSAP motion layer + the 3D bottle + Indian pattern system.
- **Round 3** → polish, hover states, checkout wiring, a11y.

Start with Round 1 only and confirm before proceeding.

## 5. DESIGN SYSTEM

### 5.1 Palette (drive everything from CSS variables)

| Token | Value | Purpose |
|---|---|---|
| `--milk` | `#FFFFFF` | the canvas. True white, used only for cards on bone |
| `--bone` | `#FDFBF7` | warm off-white — the true page base. Never pure white. |
| `--buttermilk` | `#F7F3EA` | alternating section background — faintest cream |
| `--ink` | `#1A1410` | deep earthen brown-black. Never `#000`. |
| `--muted` | `#7A6F63` | secondary copy, warm grey-brown |
| `--kesar` | `#E08A2E` | SAFFRON — primary accent. CTAs, prices, active states. |
| `--peacock` | `#14304A` | deep indigo — secondary accent. Trust badges, links. |
| `--motif` | `#E8DFD0` | pattern linework colour. Warm, NOT grey. |
| `--hairline` | `#EDE6DA` | 1px borders on bone |
| `--fresh` | `#4A7C59` | muted leaf green — "Fresh today" / in-stock dots only |

Rules:
- **Saffron appears on ≤5% of any viewport.** It earns attention by scarcity.
- **Never place saffron text on buttermilk** — contrast fails. Use ink on cream,
  saffron on white or on ink.

### 5.2 Typography

- **Display** → a warm high-contrast serif (Fraunces / Playfair Display via `next/font`),
  weights 400–600, sizes `clamp(2.5rem, 6.5vw, 6rem)`, tracking `-0.02em`.
  Fraunces "SOFT" axis set high for a rounded, hand-cut warmth.
- **Body** → Inter, 16–18px, line-height 1.7, colour `--muted` on bone.
- **Mono** → JetBrains Mono for ALL overlines, prices, weights, MRP,
  subscription labels and product spec rows (`500ml · A2 · Glass`).
- **Overlines:** uppercase, mono, `text-[11px]`, `tracking-[0.32em]`, colour `--kesar`.
- **Headlines:** use italic serif on one word for emphasis — *"Delivered before the sun."*

### 5.3 Layout

- 12-col grid, max-width 1440px, gutters 24px mobile / 48px desktop.
- Section padding: `py-32` mobile / `py-48` desktop minimum. This brand breathes.
- **Buttons:** pill-shaped. Primary = `--ink` fill, `--bone` text, saffron arrow that
  translates 4px on hover. Secondary = 1px `--hairline` border, `--ink` text.
  Never a saffron-filled button on a saffron-adjacent background.
- **Cards:** `rounded-3xl`, 1px `--hairline` border, `shadow-sm` ONLY. Nothing heavier.
- **Section dividers:** a 1px kantha-style dashed rule in `--motif`.
- **Scroll progress:** a thin vertical rail on the right edge, drawn as a kolam
  dotted line that fills in saffron as you scroll.

## 6. INDIAN PATTERN SYSTEM (the signature — a first-class feature)

Create `/components/patterns/` with each motif as a standalone inline-SVG React
component. All are rendered as absolutely-positioned layers with
`pointer-events: none`, `aria-hidden`, and opacity between **0.05 and 0.09** —
linework in `--motif`, `mix-blend-mode: multiply`. They must feel embossed into
handmade khadi paper, not printed on.

| Component | Motif | Usage |
|---|---|---|
| `Mandala.tsx` | concentric dot-and-petal rangoli, slow continuous rotation (120s/rev) | behind hero and the 3D section |
| `Warli.tsx` | stick figures, triangles, the *tarpa* (drum) | farm-to-doorstep journey timeline as narrative markers |
| `Kolam.tsx` | South Indian dot-grid with looping curved lines | scroll progress rail + subscription builder's step connector |
| `Madhubani.tsx` | fish, peacock, lotus, bordered panels | festive gifting section only |
| `Paisley.tsx` | the *ambi* / mango motif as repeating border strip | along section top/bottom edges |
| `Buti.tsx` | tiny Rajasthani block-print florals, scattered | sparse full-bleed background on products grid |
| `KanthaRule.tsx` | Bengali running-stitch dashed divider | between all major sections |

**Critical:** motifs are WARM (`#E8DFD0`) and LOW CONTRAST. If a pattern reads as
"grey" it is wrong. If it competes with content it is wrong. They are texture,
not decoration.

Also add a subtle **paper grain**: an SVG `feTurbulence` fractalNoise overlay at
opacity **0.025** across the whole page. This is what makes white feel expensive.

## 7. SECTIONS

### 1. NAV
Fixed, transparent over the hero, turns bone with a hairline bottom border after
80px scroll. "SHUBH" serif wordmark with a small saffron drop glyph (a milk drop,
not a lotus), "MILK" in mono beside it. Centre links: Shop, Subscribe, Our Farms,
Ghee, Gifting. Right: search icon, account icon, cart icon with an ink-filled
count badge. A slim top strip above the nav in `--peacock`:
"Free delivery on first order · Serving 12,000+ homes since 2019".

### 2. HERO (h-screen, pinned)
Bone background with the `Mandala.tsx` layer slowly rotating behind everything.
Centre-left: mono overline "FARM TO DOORSTEP · SINCE 2019", then a massive
Fraunces headline "Shudh. Shubh. Roz." with the second word in italic. Subtext:
"A2 desi cow milk in returnable glass bottles. At your door before 7 AM. Every
single morning." Two CTAs: saffron-accented "Start a Subscription" + ghost
"Find Your Pincode". Below: a mono trust row — "FSSAI Certified · 100% A2 ·
No Preservatives · Glass Bottled". The 3D bottle sits right-of-centre, emerging
from a soft shadow.

### 3. TRUST MARQUEE
Infinite horizontal scroll, full-bleed, top and bottom `Paisley.tsx` borders.
Mono text separated by a small saffron drop glyph: "FSSAI CERTIFIED · A2 CERTIFIED ·
LAB TESTED DAILY · GLASS BOTTLED · NO PRESERVATIVES · FARM TRACEABLE · 12,000+ HOMES".

### 4. THE PROMISE
4 pillars in a 4-col grid (2-col mobile). Each: a thin lucide icon, mono label,
serif title, one-line body. "Before Sunrise" / "Glass, Not Plastic" /
"Lab Tested Daily" / "Farms You Can Visit". Each card sits on `--milk` with a
`--hairline` border. `Buti.tsx` scattered faintly behind the grid.

### 5. SHOP BY CATEGORY
5 cards in an asymmetric bento: one tall left (A2 Milk), four smaller right
(Curd & Yogurt, Paneer & Butter, Ghee, Traditional Drinks). Full-bleed product
photography in tall 4:5 frames with `rounded-3xl`, a soft cream gradient at the
bottom, serif labels, and a saffron "Explore" pill that slides up on hover.

### 6. BESTSELLERS (e-commerce grid)
Buttermilk background. Overline "MOST LOVED", serif title "The Daily Essentials".
4-col grid (2 mobile) of product cards:
- Product image on `--milk`, `rounded-2xl`, with a subtle hover Ken Burns
- A saffron "BESTSELLER" or green "FRESH TODAY" pill where applicable
- Name in serif, weight/variant in mono (`500ml · Glass Bottle`)
- Price + struck-through MRP + a small mono "% OFF"
- A circular bag icon button that fills ink on hover
- A slide-up "Add to Cart" bar on card hover
Include a quick "Subscribe & Save 12%" toggle at the top of the grid that swaps
all prices to subscription prices site-wide via zustand.

### 7. THE POUR (pinned 3D section, ~300vh)
The showpiece. Bone background, pinned R3F canvas. As scroll progress 0→1:
- The camera slowly orbits the glass bottle
- The bottle rotates and milk pours from it into a glass below
- The liquid level in the glass rises with scroll progress
- The `Mandala.tsx` DOM layer behind the canvas counter-rotates slowly

Three overlay text beats fade in beside the bottle at progress checkpoints:
- `0.25` → "Collected at 4:30 AM, chilled within 90 minutes."
- `0.55` → "Never homogenised. Never powdered. Never touched by plastic."
- `0.85` → "Bottled, sealed, and at your door by 6:45 AM."

This section proves the brand claim physically.

### 8. FARM TO DOORSTEP
A pinned horizontal-scroll timeline. As you scroll down, a row of 6 illustrated
panels translates left: Farm → Milking → Chilling → Testing → Glass Bottling →
Your Doorstep. Each panel is a warm duotone illustration framed in a
Madhubani-style border, with a `Warli.tsx` figure standing at its base. A
`Kolam.tsx` dotted line connects them, drawing in saffron as you progress. A
thin mono progress caption below reads "02 / 06".

### 9. BILONA GHEE (craft split section)
A pinned split. Left: a slow macro video/image loop of hand-churned bilona ghee,
wood churn, clay pot, golden liquid — Ken Burns from 1.15 → 1. Right: overline
"MADE THE OLD WAY", serif headline "Churned by hand. Not by machine.",
word-stagger copy about the Vedic bilona method, and three animated counters:
"30L milk → 1L ghee", "6 hrs of hand churning", "0 additives". A saffron
"Shop Ghee" pill below.

### 10. SUBSCRIPTION BUILDER
The commerce centrepiece. A 4-step interactive builder styled as a kolam:
- **Step 1** — Pincode check (validates serviceability, shows AM/PM slot availability)
- **Step 2** — Pick products (multi-select grid with quantity steppers, default: 1L A2 milk daily)
- **Step 3** — Choose frequency (Daily / Alternate Days / Weekdays Only / Weekly) and slot (5:30–7:30 AM / 6:00–8:00 PM)
- **Step 4** — Review: a live-calculating summary card showing monthly total, savings vs one-time, and a "Start Subscription" CTA

Each step's connector is a `Kolam.tsx` dotted path that fills saffron as you
advance. The summary card sticks to the right on desktop, becomes a bottom sheet
on mobile. A mono line reads "Pause or cancel anytime. No lock-in. First delivery free."

### 11. FESTIVE GIFTING
A single wide card on `--buttermilk`. `Madhubani.tsx` pattern faintly behind.
Serif headline "Gift the auspicious." Copy about Diwali / Raksha Bandhan / wedding
gifting boxes. A curated 3-box row (Ghee Trio, Mithai & Milk, The Shubh Hamper)
with saffron ribbon glyphs and a "Build a Hamper" CTA. Show a small "Corporate &
bulk gifting" link for B2B leads.

### 12. WHY GLASS
A quiet, confident section. Left: a mono spec table comparing glass vs plastic vs
tetra (shelf life, taste, recycling, cost to farmer). Right: a stat block —
"1 bottle returned = 1 bottle reused, 40× a year". A small interactive: a toggle
that visually swaps a glass bottle for a plastic one and updates the stats.
Saffron highlight on the glass column.

### 13. TESTIMONIALS
3-col grid, middle card offset with `translate-y-8`. Large decorative Fraunces
quotation mark in `--kesar` at 12% opacity. Avatar, name, neighbourhood
(e.g. "Indiranagar, Bengaluru"), mono subscription tag ("Subscriber since 2021").
Below the grid, a stacked avatar row + "4.8/5 · 3,200+ verified reviews".

### 14. FAQ
8 questions, single column, accordion with measured-height animation and a
rotating `+`. Covers: A2 vs regular, delivery slots, bottle deposit, pausing,
ghee shelf life, lab reports, coverage areas, returns.

### 15. NEWSLETTER + FOOTER
Ink-dark footer. A massive faded Fraunces "SHUBH" spanning the full width at ~5%
opacity behind the content, with a `Paisley.tsx` strip along the top edge.
Foreground: a floating `--milk` card containing the newsletter input
("Get ₹100 off your first subscription"), then 4 link columns (Shop, Subscribe,
About, Help), WhatsApp + Instagram + phone, FSSAI licence number in mono, payment
icons (UPI, Visa, Mastercard, Razorpay, Paytm), and copyright. A one-line footer
note: "Shubh Milk Pvt. Ltd. · Farm to door since 2019."

### 16. PERSISTENT
- Floating WhatsApp CTA bottom-right (ink circle, expands to "Order on WhatsApp")
- Slide-in cart drawer (framer-motion, backdrop blur, item list with quantity
  steppers, subscription vs one-time line items, subtotal, saffron "Checkout" pill)
- A slim "delivery slot closing soon" bar on the cart drawer if the user's pincode
  has an AM cutoff within 2 hours.

## 8. DO NOT

- Do not use pure `#FFFFFF` as the page background. Use `--bone`.
- Do not use gold foil, glitter, marble textures or "luxury" gradients.
- Do not use lotus emoji, Om symbols, or generic "Indian" clipart. The motifs must
  be drawn from the specific craft traditions listed above, and drawn well.
- Do not place patterns at high opacity. If you can read the pattern before the
  content, it is broken.
- Do not use thick-stroked icons.
- Do not animate anything except `transform`, `opacity` and `clip-path`.
- Do not use standard `ease-in-out`. `power3`/`power4.out` and `inOut` only.

## 9. DELIVERABLES

- `app/page.tsx`
- `/shop`, `/product/[slug]`, `/subscribe`, `/farms`, `/gifting` routes
- every section as its own component
- a typed `products.ts` and `subscriptions.ts`
- the full `patterns/` folder
- a zustand cart store
- a `CartDrawer`

---

## 10. 实施状态（本仓库实际进度）

### Round 1 — 已完成并验证 ✅
- Next.js 14.2.35 + TS + Tailwind 3.4 脚手架；依赖 zustand / lucide-react /
  react-hook-form / zod / @hookform/resolvers / framer-motion 已装
- 设计令牌 `app/globals.css`（全部 CSS 变量 + `.display` / `.overline` /
  `.kantha-rule` / `.card`）；字体 Fraunces / Inter / JetBrains Mono
  （因构建环境无法访问 fonts.gstatic.com，改用 `@fontsource/*` 自托管同款字体，
  CSS 变量名保持不变）
- `lib/products.ts`（13 SKU）、`lib/subscriptions.ts`、`lib/store.ts`（zustand + persist）
- 14 个静态区块组件 + `CartDrawer` + `AddToCart` + `components/ui.tsx` 原语
- 路由：`/`、`/shop`、`/product/[slug]`（13 个 SSG 页）、`/subscribe`、`/farms`、`/gifting`
- 验证：`npm run build` EXIT=0，21 个静态页生成；7 条路由 HTTP 200

### Round 2 — 已完成并验证 ✅
- 依赖：gsap、@studio-freight/lenis、three、@react-three/fiber 8、@react-three/drei 9
  （fiber 9 需 React 19，与 Next 14 + React 18 冲突，故锁 8.x；
  @react-three/postprocessing 暂未安装——当前场景无后期处理需求，Round 3 需要时再评估）
- `components/patterns/`：Mandala / Warli / Kolam（rail+strip 双形态）/ Madhubani /
  Paisley / Buti / KanthaRule / PatternLayer（统一包萏：absolute + pointer-events-none
  + aria-hidden + opacity 0.05–0.09 + multiply）/ PaperGrain（feTurbulence 0.025）
- 动效层：`components/motion/SmoothScroll.tsx`（Lenis 挂 GSAP ticker，全局接入
  layout）、`ScrollProgressRail`（右缘 kolam 虚线轨，scroll 进度 saffron 填充）
- THE POUR：`components/three/BottleScene.tsx`（lathe 玻璃瓶倒奶入杯，滚动驱动
  progress ref，不触发 React 重渲染）+ `ThePour.tsx`（300vh 钉住区块，Mandala
  反向旋转，三段文案 beat 在 0.25/0.55/0.85 淡入，power3.out）
- FARM TO DOORSTEP：`FarmJourney.tsx`（钉住横向滚动 6 面板，Madhubani 式边框
  插画 + Warli 底部人偶 + Kolam 连接线随进度填充 + "0X / 06" 进度字幕）
- 整合：Hero 换 3D 瓶 + Mandala 慢转背景；TrustMarquee 升级 GSAP 无限跑马灯
  （hover 暂停）+ 上下 paisley 边；Promise/Bestsellers 背景铺 Buti；Gifting 铺
  Madhubani；Footer 顶缘 paisley 条；BilonaGhee 左图 Ken Burns 1.15→1；
  SubscriptionBuilder 步骤连接器换 Kolam
- 验证：`npx tsc --noEmit` EXIT=0；`npm run build` EXIT=0（首页 First Load
  472 kB，含 three.js）；6 条路由 HTTP 200；SSR 内容抽验：THE POUR/三段 beat
  文案/时间轴/纸纹 filter 全部命中

### Round 2.5 — 视觉奢华化升级（依据两份 PDF 参考）— 已完成并验证 ✅
- PDF 参考已解析并存档：docs/pdf_text.txt（premium-website-workflow 7 页 +
  scroll_3d_build_prompts_v2 8 个 prompt 全文）
- AI 品牌摄影 7 张（Seedream 生成，统一暖 ivory/saffron 调色）：hero-dawn（16:9
  黎明牧场）、bottle-still、ghee-macro、curd-paneer、drinks、gifting-hamper、
  farmer-hands（均 4:5），落盘 public/images/
- Hero 重构（PDF 1「hero 是最重要的区块」+ DRIFT/AURELLE 规范）：全幅 rounded
  编辑大片 + 双层渐变调色 + masked-line 双行标题 + 漂浮玻璃信任卡 ×3 +
  saffron 主 CTA + scroll cue + 底部浮动数据条（12,000+ / 4:30 AM / 100% A2 / 40×）
- 动效原语（PDF 2 silk 规范）：SilkReveal（opacity 0 → y:60 → skewY:4 归零，
  1.1s power4.out，stagger 0.08）、MaskedLines（y:110% → 0 遮罩滑升）、
  KenBurns（1.15 → 1 scrub）
- 接入：CategoryBento / Bestsellers / Testimonials silk 入场；Bento/产品卡/详情页
  换真实摄影 + Ken Burns；BilonaGhee 换酥油微距 + MaskedLines + 计数器入场；
  Gifting 嵌礼盒横幅图；Farms 双栏 + 奶农摄影；Shop 页头图 + MaskedLines
- 验证：tsc EXIT=0；build EXIT=0（21 页）；6 路由 + 2 图片 HTTP 200；
  SSR 抽验 hero 图/标题/数据条命中

### Image library expansion — 已完成并验证 ✅
- Internet image search returned no results (empty result sets), so per the user's
  fallback instruction images were generated: 11 new photos covering previously
  duplicated categories — curd-bowl, paneer-leaves, lassi-glass, chaas-steel,
  shrikhand-jar, white-butter, gir-herd, dawn-delivery, kesar-milk, buffalo-milk,
  ghee-jar (all in public/images/)
- Every product category now has its own distinct photo (was: 3 photos shared
  across 10 categories)
- Wired: lib/products.ts categoryPhoto + categories; Farms page now uses gir-herd;
  Subscribe page got a new hero banner (dawn-delivery) with masked-line headline;
  product detail pages pick up per-category photos automatically
- Verification: tsc EXIT=0; clean rebuild (deleted .next after a stale-chunk
  MODULE_NOT_FOUND on next start) EXIT=0, 21 pages; all routes + 16 asset URLs
  200 on port 3001
- Note: a user-started `next dev` (PID 8176) occupies port 3000 running an older
  in-memory build — left untouched by request path; production preview ran on 3001

### Platform upgrade — 已完成并验证 ✅ (2026-09-29)
- Upgraded every dependency to latest: Next **14.2 → 16.3.7** (Turbopack),
  React **18.3 → 19.3**, TypeScript **5.9 → 7.0**, Tailwind **3.4 → 4.3**,
  ESLint **8.57 → 10.11**, R3F **8.17 → 9.8**, drei **9.122 → 10.7**,
  lenis (renamed from @studio-freight/lenis) 1.3.26, plus latest gsap 3.15,
  zustand 5, framer-motion 13, lucide-react, react-hook-form, zod 4, fontsource
- Migration work: Tailwind v4 CSS-first config (@theme inline in globals.css,
  deleted tailwind.config.ts + autoprefixer), ESLint 9 flat config
  (eslint.config.mjs, deleted .eslintrc.json, lint script → "eslint ."),
  async params in /product/[slug] (Next 15+), lenis import path,
  React 19 RefObject nullability fixes in ThePour, zodResolver typing
- Phased install to dodge ERESOLVE (React 19 first, then R3F 9)
- Verification: tsc EXIT=0; clean `next build` EXIT=0 (Next 16 + Turbopack,
  20 pages, auto tsconfig migration to ES2017/react-jsx); smoke test on :3001 —
  6 routes + 4 product pages + hero image all 200, SSR content checks hit
- Known notes: `postcss` left at 8.5 (current stable); three/@types/three at
  0.186 (latest); Next 16 auto-updated tsconfig (ES2017 target, react-jsx)

### Round 3 — 已完成并验证 ✅ (2026-09-29)
- **Checkout wired**: `POST /api/checkout` — server-side re-pricing (never trusts
  client totals), input validation (qty 1–99, kind whitelist, unknown-product
  400s), Razorpay order creation when RAZORPAY_KEY_ID/SECRET env vars exist
  (amount in paise, INR, notes carry pincode/frequency/slot), deterministic stub
  order otherwise; `CheckoutButton` posts the cart, shows creating→done/error
  states (framer-motion), opens Razorpay checkout.js popup in live mode with
  saffron theme; order confirmation clears the cart
- **Nav**: live cart count badge (hidden at 0, 9+ cap), opens the drawer,
  accessible aria-label with count
- **CartDrawer**: photo thumbnails (was SVG), Escape-to-close, focus moves into
  dialog on open, outline-none + tabIndex=-1 panel
- **Toast system**: `toast()` + `<Toasts />` mounted in layout (aria-live,
  ink pill + fresh check, 2.6 s auto-dismiss); fired on add-to-cart from
  Bestsellers cards and product pages
- **prefers-reduced-motion**: SilkReveal / MaskedLines / KenBurns skip their
  animations; SmoothScroll skips Lenis entirely (native scroll)
- **Mobile tuning**: THE POUR pin shortened to 220vh below lg (300vh desktop);
  3D DPR clamped to 1.5 with high-performance hint
- Verification: tsc EXIT=0; build EXIT=0 (21 pages + /api/checkout dynamic);
  live API tests: valid cart → 200 stub order with correct server-side total
  (₹887), empty cart → 400, unknown product → 400; routes 200
- Note: to activate the real gateway set RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
  NEXT_PUBLIC_RAZORPAY_KEY_ID and add the checkout.js script tag; without them
  the stub confirmation flow works end-to-end for demos

### Frontend motion upgrade — 已完成并验证 ✅ (2026-09-29)
- Research: subagent pulled live DOM from Two Brothers, SPYLT (Awwwards SOTD),
  Anveshan, Barosi, Pride of Cows, GirOrganic, Amul — pattern report archived at
  .zwork/runs/71f031a9/0-研究员.md
- Applied patterns:
  · ProductSwapShowcase (prompt #03): pinned cross-swap hero showcase — 4
    products, background tint tweens per product, drift+blur+rotateY cross-swap,
    masked name reveal, segmented progress bar, index 01/04
  · FlipIn (DRIFT spec): fade + y:50 + rotateX:-40, perspective 1000 — applied
    to Promise pillars, Bestsellers grid, WhyGlass spec table
  · Lab-report hover swap (Anveshan): product pack shot cross-fades to today's
    lab report image on hover with "TODAY'S LAB REPORT" chip
  · Dense product cards (Two Brothers): benefit one-liner, ★ 4.9 · 2k+ reviews
  · PressStrip (Two Brothers): "Featured in" — Vogue, GQ, ET, HT…
  · WaveDivider (SPYLT): warm wavy divider after the marquee
  · SideRail (Two Brothers): fixed vertical editorial caption, left edge, xl+
  · Hero page-load orchestration: overline → masked headline lines → sub → CTAs
    → glass cards → stats bar, power4.out timeline (reduced-motion safe)
- New images: lab-report.jpeg (generated)
- Verification: tsc EXIT=0; build EXIT=0 (21 pages); SSR checks confirm showcase
  products, press strip, lab-report chip; all routes 200

### Conversion + backend polish — 已完成并验证 ✅ (2026-09-29)
- Newsletter: `POST /api/newsletter` (email validation, Resend when
  RESEND_API_KEY + NEWSLETTER_TO exist, stub otherwise, promo code response);
  interactive footer form (client component: sending/done/error states,
  aria-live, disabled-while-sending)
- WhatsApp: floating button now a real `wa.me` deep link with prefilled order
  message; number overridable via NEXT_PUBLIC_WHATSAPP_NUMBER
- Mobile: sticky Add-to-Cart bar on product pages (slides in after hero, price
  + CTA, lg:hidden)
- Verification: tsc EXIT=0; build EXIT=0 (22 pages incl. /api/newsletter);
  live API tests: valid email → 200 stub + WELCOME100 code, invalid → 400;
  wa.me link confirmed in SSR HTML; routes 200

### Future polish backlog — 可选
- Real product photography替换（当前为 AI 生成）
- Real testimonials/FAQ copy; WhatsApp button real number (wa.me link)
- Newsletter/subscribe form backend (Neon + API route per PDF 1 phase 06)
- Image optimization pass (AVIF via next/image is already on by default)
- 待办：hover 状态打磨、checkout 接线（Razorpay 环境变量 stub）、a11y
