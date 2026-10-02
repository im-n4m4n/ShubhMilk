"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ProductSwapShowcase — one product cross-swaps through a set as you scroll.
 *
 * DESKTOP: a pinned stage; scroll progress selects the active product and the
 * outgoing image drifts left while the incoming settles in.
 *
 * MOBILE: no pin and no scrub. Pinning here meant locking a full-height
 * composited layer for four screens of scrolling while ScrollTrigger fed a React
 * state update every frame — that is what made the page feel sticky. On phones it
 * is now a plain horizontal snap-scroll rail: the browser's own native scroll,
 * one card per product, no JS on the scroll path at all.
 */

interface ShowcaseProduct {
  id: string;
  name: string;
  tagline: string;
  price: string;
  photo: string;
  accent: string;
}

const showcase: ShowcaseProduct[] = [
  {
    id: "a2",
    name: "A2 Desi Cow Milk",
    tagline: "Single-farm Gir cow milk, bottled in glass the same morning.",
    price: "₹145 / L",
    photo: "/images/bottle-still.jpeg",
    accent: "#F6F0E1",
  },
  {
    id: "ghee",
    name: "Bilona Ghee",
    tagline: "30 litres of milk, six hours of hand churning, one litre of gold.",
    price: "₹749 / 250ml",
    photo: "/images/ghee-jar.jpeg",
    accent: "#F4E8CE",
  },
  {
    id: "curd",
    name: "Set Curd",
    tagline: "Cultured overnight in the jar you return. Firm, mildly sweet.",
    price: "₹95 / 400g",
    photo: "/images/curd-bowl.jpeg",
    accent: "#F2EFE4",
  },
  {
    id: "lassi",
    name: "Sweet Lassi",
    tagline: "Thick set curd, a spoon of sugar, nothing else. Fresh every day.",
    price: "₹60 / 250ml",
    photo: "/images/lassi-glass.jpeg",
    accent: "#F4EEDF",
  },
];

/** Shared card body so the mobile rail and the desktop stage never drift apart. */
function ProductCard({ p, index }: { p: ShowcaseProduct; index: number }) {
  return (
    <>
      <div className="relative order-2 mt-6 lg:order-1 lg:col-span-5 lg:mt-0">
        <p className="font-mono text-[11px] tracking-[0.32em] text-kesar">
          0{index + 1} / 0{showcase.length}
        </p>
        <h2 className="display mt-3 text-[clamp(1.75rem,7vw,4rem)] font-medium leading-[1.1] text-ink lg:mt-5 lg:text-[clamp(2rem,4.5vw,4rem)] lg:leading-[1.05]">
          {p.name}
        </h2>
        <p className="mt-3 max-w-md text-[16px] leading-[1.7] text-muted lg:mt-5">{p.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-8 lg:gap-6">
          <span className="font-mono text-sm text-ink">{p.price}</span>
          <a
            href="/shop"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-mono text-xs text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            Shop now
            <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

function ProductVisual({ p }: { p: ShowcaseProduct }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl lg:h-[68vh] lg:w-auto">
      <Image
        src={p.photo}
        alt={p.name}
        fill
        sizes="(min-width:1024px) 55vw, 86vw"
        quality={70}
        className="object-cover"
      />
    </div>
  );
}

export default function ProductSwapShowcase() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = section.current;
    if (!el) return;

    /* Desktop only. On mobile the rail scrolls natively and no ScrollTrigger is
       created, so nothing runs on the scroll path. */
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * showcase.length * 0.9}`,
          pin: pin.current as HTMLElement,
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.min(
              showcase.length - 1,
              Math.floor(self.progress * showcase.length),
            );
            setActive(idx);
            setDrawn(self.progress);
          },
        });
      }, el);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  /* Mobile rail: keep the dot indicator in sync with native snapping.
     This fires on scroll-end only (rAF-throttled), never per frame. */
  const onRailScroll = () => {
    const el = rail.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(Math.max(0, Math.min(showcase.length - 1, i)));
  };

  const p = showcase[active];

  return (
    <section
      ref={section}
      className="relative bg-bone"
      style={{ ["--accent" as string]: p.accent, backgroundColor: "var(--accent)" }}
    >
      {/* ── MOBILE: native snap rail ─────────────────────────────────────── */}
      <div className="py-14 lg:hidden">
        <div
          ref={rail}
          onScroll={onRailScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {showcase.map((s, i) => (
            <div key={s.id} className="w-[86vw] shrink-0 snap-center">
              <ProductVisual p={s} />
              <ProductCard p={s} index={i} />
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-2 flex justify-center gap-2" aria-hidden>
          {showcase.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-kesar" : "w-1.5 bg-ink/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: pinned cross-swap stage ─────────────────────────────── */}
      <div ref={pin} className="hidden h-screen items-center overflow-hidden lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: p.accent }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-site items-center gap-10 px-12 lg:grid-cols-12">
          <ProductCard p={p} index={active} />

          <div className="relative order-1 flex items-center justify-center lg:order-2 lg:col-span-7">
            <div className="relative aspect-[4/5] h-[68vh] w-auto max-w-full">
              {showcase.map((s, i) => (
                <div
                  key={s.id}
                  aria-hidden={i !== active}
                  className="absolute inset-0 overflow-hidden rounded-3xl shadow-xl transition-all duration-700"
                  style={{
                    transform:
                      i === active
                        ? "translateX(0) scale(1) rotateY(0deg) blur(0px)"
                        : i < active
                          ? "translateX(-14%) scale(0.86) rotateY(6deg) blur(3px)"
                          : "translateX(14%) scale(0.86) rotateY(-6deg) blur(3px)",
                    opacity: i === active ? 1 : 0,
                    zIndex: i === active ? 2 : 1,
                  }}
                >
                  <Image
                    src={s.photo}
                    alt={i === active ? s.name : ""}
                    fill
                    sizes="55vw"
                    quality={70}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* segmented progress bar */}
        <div className="absolute bottom-10 left-1/2 flex w-40 -translate-x-1/2 gap-2" aria-hidden>
          {showcase.map((s, i) => (
            <span
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                i <= Math.round(drawn * (showcase.length - 1)) ? "bg-kesar" : "bg-ink/10"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
