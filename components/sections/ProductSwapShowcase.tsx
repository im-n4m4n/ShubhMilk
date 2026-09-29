"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ProductSwapShowcase — per prompt library #03 (Lenis Smooth Scroll + GSAP
 * Products Hero): a pinned section where one hero product cross-swaps through
 * a set as the user scrolls. Outgoing image drifts left + fades; incoming
 * settles from scale 0.85 with a subtle rotateY — a clean cross-swap, never a
 * hard cut. Background tint tweens per product via a CSS variable.
 */

interface ShowcaseProduct {
  id: string;
  name: string;
  tagline: string;
  price: string;
  photo: string;
  accent: string; // soft cream tint per product
}

const showcase: ShowcaseProduct[] = [
  {
    id: "a2",
    name: "A2 Desi Cow Milk",
    tagline: "Single-farm Gir cow milk. Collected at 4:30 AM, at your door by 6:45.",
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

export default function ProductSwapShowcase() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [drawn, setDrawn] = useState(0); // scroll progress 0..1 for caption bar

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = section.current;
    if (!el) return;

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
  }, []);

  const p = showcase[active];

  return (
    <section ref={section} className="relative bg-bone" style={{ ["--accent" as string]: p.accent }}>
      <div
        ref={pin}
        className="flex h-screen items-center overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {/* decorative drifting glow (parallax behind product, per spec) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: p.accent }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-site items-center gap-10 px-6 lg:grid-cols-12 lg:px-12">
          {/* Left: index, name, copy, price */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.32em] text-kesar">
              0{active + 1} / 0{showcase.length}
            </p>
            <div className="mt-5 overflow-hidden">
              <h2
                key={p.id}
                className="display animate-[swapin_0.9s_cubic-bezier(0.16,1,0.3,1)] text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.05] text-ink"
              >
                {p.name}
              </h2>
            </div>
            <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-muted">{p.tagline}</p>
            <div className="mt-8 flex items-center gap-6">
              <span className="font-mono text-sm text-ink">{p.price}</span>
              <a
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-mono text-xs text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                Shop now
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>

            {/* segmented progress bar (one per product) */}
            <div className="mt-10 flex gap-2" aria-hidden>
              {showcase.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= active ? "bg-kesar" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: cross-swapping image */}
          <div className="relative order-1 flex items-center justify-center lg:order-2 lg:col-span-7">
            <div className="relative aspect-[4/5] h-[42vh] w-auto max-w-full lg:h-[68vh]">
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
                    sizes="(min-width:1024px) 55vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes swapin {
          from {
            transform: translateY(110%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
