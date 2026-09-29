"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

const stats = [
  { n: "12,000+", l: "homes served" },
  { n: "4:30 AM", l: "milk leaves the farm" },
  { n: "100%", l: "A2 · lab tested" },
  { n: "40×", l: "each bottle reused" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Page-load entrance: overline → headline lines → sub → CTAs → glass cards
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(
          "[data-hero-overline]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
        )
          .fromTo(
            el.querySelectorAll("[data-line-inner]"),
            { yPercent: 110 },
            { yPercent: 0, duration: 1.2, stagger: 0.12 },
            "-=0.4",
          )
          .fromTo(
            "[data-hero-sub]",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9 },
            "-=0.6",
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
            "-=0.55",
          )
          .fromTo(
            "[data-hero-glass]",
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.9, stagger: 0.12 },
            "-=0.7",
          )
          .fromTo(
            "[data-hero-stats]",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9 },
            "-=0.5",
          );
      }

      // hero image scales down into a rounded frame while drifting up slower
      gsap.fromTo(
        imgWrap.current,
        { scale: 1.06 },
        {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
        },
      );
      // copy parallax drifts up faster
      gsap.to(copy.current, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen bg-bone">
      <div className="mx-auto max-w-site px-6 pb-10 pt-32 lg:px-12 lg:pt-36">
        {/* full-bleed editorial stage */}
        <div className="relative overflow-hidden rounded-3xl">
          <div ref={imgWrap} className="relative h-[86vh] min-h-[560px] w-full will-change-transform">
            <Image
              src="/images/hero-dawn.jpeg"
              alt="A Gir cow on the Shubh farm at dawn, mist over the pasture"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* warm editorial grade: ivory → earthen, content-safe on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

            {/* floating glass metric cards (DRIFT spec), top-right */}
            <div className="absolute right-6 top-6 hidden flex-col gap-3 lg:flex lg:right-10 lg:top-10">
              <div data-hero-glass>
                <GlassCard label="FSSAI CERTIFIED" sub="Every batch, every day" />
              </div>
              <div data-hero-glass>
                <GlassCard label="100% A2 GIR COW" sub="Single-farm, never blended" />
              </div>
              <div data-hero-glass>
                <GlassCard label="GLASS, NOT PLASTIC" sub="Returned & reused 40× a year" />
              </div>
            </div>

            {/* copy — centre-left over the image */}
            <div ref={copy} className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-6 lg:px-14">
                <p data-hero-overline className="overline text-[#F3C888]">
                  FARM TO DOORSTEP · SINCE 2019
                </p>
                <div className="mt-6 overflow-hidden">
                  <h1 className="display text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.02] text-[#FDFBF7]">
                    <span className="block overflow-hidden">
                      <span data-line-inner className="block will-change-transform">
                        Shudh. <em className="font-light">Shubh.</em>
                      </span>
                    </span>
                    <span className="block overflow-hidden">
                      <span data-line-inner className="block will-change-transform">
                        Roz.
                      </span>
                    </span>
                  </h1>
                </div>
                <p data-hero-sub className="mt-6 max-w-md text-[17px] leading-[1.7] text-[#EDE6DA]">
                  A2 desi cow milk in returnable glass bottles. At your door
                  before 7 AM. Every single morning.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link data-hero-cta href="/subscribe" aria-label="Start a Subscription">
                    <button className="group inline-flex items-center gap-3 rounded-full bg-[#E08A2E] px-8 py-4 text-[15px] font-medium text-[#1A1410] shadow-lg shadow-ink/30 transition-transform duration-200 hover:scale-[1.03]">
                      Start a Subscription
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[#1A1410] transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </Link>
                  <Link data-hero-cta href="/subscribe" aria-label="Find Your Pincode">
                    <button className="rounded-full border border-[#EDE6DA]/50 bg-[#1A1410]/20 px-8 py-4 text-[15px] font-medium text-[#FDFBF7] backdrop-blur-sm transition-colors duration-200 hover:bg-[#1A1410]/40">
                      Find Your Pincode
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* scroll cue */}
            <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
              <div className="flex items-center gap-2 rounded-full border border-[#EDE6DA]/30 bg-[#1A1410]/25 px-4 py-2 backdrop-blur-sm">
                <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#EDE6DA]" strokeWidth={1.5} />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#EDE6DA]">SCROLL</span>
              </div>
            </div>
          </div>
        </div>

        {/* floating stats bar below the stage */}
        <div data-hero-stats className="card mt-6 grid grid-cols-2 gap-y-6 px-8 py-6 sm:grid-cols-4 lg:px-12">
          {stats.map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <p className="display text-2xl text-ink lg:text-3xl">{s.n}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassCard({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-[#EDE6DA]/25 bg-[#FDFBF7]/10 px-5 py-3.5 backdrop-blur-md">
      <p className="font-mono text-[10px] tracking-[0.25em] text-[#F3C888]">{label}</p>
      <p className="mt-1 text-xs text-[#EDE6DA]">{sub}</p>
    </div>
  );
}
