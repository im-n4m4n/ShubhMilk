"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

interface Slide {
  photo: string;
  alt: string;
  overline: string;
  line1: React.ReactNode;
  line2: string;
  sub: string;
  cta: { label: string; href: string };
  ghost: { label: string; href: string };
}

const slides: Slide[] = [
  {
    photo: "/images/hero-dawn.jpeg",
    alt: "A Gir cow on the Shubh farm at dawn, mist over the pasture",
    overline: "FARM TO DOORSTEP · SINCE 2019",
    line1: (
      <>
        Shudh. <em className="font-light">Shubh.</em>
      </>
    ),
    line2: "Roz.",
    sub: "A2 desi cow milk in returnable glass bottles. At your door before 7 AM. Every single morning.",
    cta: { label: "Start a Subscription", href: "/subscribe" },
    ghost: { label: "Find Your Pincode", href: "/subscribe" },
  },
  {
    photo: "/images/hero-ghee.jpeg",
    alt: "Golden bilona ghee being poured from a copper pot into a glass jar",
    overline: "MADE THE OLD WAY",
    line1: (
      <>
        Churned by <em className="font-light">hand.</em>
      </>
    ),
    line2: "Not by machine.",
    sub: "Thirty litres of milk, six hours of wooden-churn bilona, one litre of golden ghee. Nothing hurried.",
    cta: { label: "Shop Bilona Ghee", href: "/shop" },
    ghost: { label: "The Bilona Method", href: "/farms" },
  },
  {
    photo: "/images/hero-delivery.jpeg",
    alt: "Glass bottles loaded into a bicycle crate at blue-hour dawn",
    overline: "BEFORE THE CITY WAKES",
    line1: (
      <>
        At your door <em className="font-light">by</em>
      </>
    ),
    line2: "6:45 AM.",
    sub: "Collected at 4:30, chilled within ninety minutes, bottled in glass and delivered before sunrise.",
    cta: { label: "Build Your Rhythm", href: "/subscribe" },
    ghost: { label: "See Our Farms", href: "/farms" },
  },
];

const stats = [
  { n: "12,000+", l: "homes served" },
  { n: "4:30 AM", l: "milk leaves the farm" },
  { n: "100%", l: "A2 · lab tested" },
  { n: "40×", l: "each bottle reused" },
];

const AUTOPLAY_MS = 6500;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const slideCopy = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [armed, setArmed] = useState(false);

  const go = useCallback((i: number) => {
    setActive(((i % slides.length) + slides.length) % slides.length);
  }, []);

  /* Auto-advance the hero carousel (Rosier-style hero slider). */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, []);

  /* Page-load entrance choreography, then slide-change reveals. */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo("[data-hero-overline]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
          .fromTo(
            el.querySelectorAll("[data-line-inner]"),
            { yPercent: 110 },
            { yPercent: 0, duration: 1.2, stagger: 0.12 },
            "-=0.4",
          )
          .fromTo("[data-hero-sub]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
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
          .fromTo("[data-hero-stats]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
          .add(() => setArmed(true));
      } else {
        setArmed(true);
      }

      gsap.fromTo(
        imgWrap.current,
        { scale: 1.06 },
        {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
        },
      );
      gsap.to(copy.current, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* Re-run a compact copy reveal whenever the slide changes. */
  useEffect(() => {
    if (!armed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scoped = slideCopy.current;
    if (!scoped) return;
    gsap.fromTo(
      scoped.querySelectorAll("[data-line-inner]"),
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.1, ease: "power4.out" },
    );
    gsap.fromTo(
      scoped,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power3.out" },
    );
  }, [active, armed]);

  const s = slides[active];

  return (
    <section ref={root} className="relative min-h-screen bg-bone">
      <div className="mx-auto max-w-site px-6 pb-10 pt-32 lg:px-12 lg:pt-36">
        <div className="relative overflow-hidden rounded-3xl">
          <div ref={imgWrap} className="relative h-[86vh] min-h-[560px] w-full will-change-transform">
            {/* slide stack — crossfade + slow ken-burns on the active slide */}
            {slides.map((sl, i) => (
              <div
                key={sl.photo}
                aria-hidden={i !== active}
                className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Image
                  src={sl.photo}
                  alt={i === active ? sl.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover transition-transform duration-[9000ms] ease-out"
                  style={{ transform: i === active ? "scale(1.06)" : "scale(1)" }}
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

            {/* floating glass metric cards (DRIFT spec) */}
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
              <div ref={slideCopy} className="max-w-2xl px-6 lg:px-14">
                <p data-hero-overline className="overline text-[#F3C888]">
                  {s.overline}
                </p>
                <div className="mt-6 overflow-hidden">
                  <h1 className="display text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.02] text-[#FDFBF7]">
                    <span className="block overflow-hidden">
                      <span data-line-inner className="block will-change-transform">
                        {s.line1}
                      </span>
                    </span>
                    <span className="block overflow-hidden">
                      <span data-line-inner className="block will-change-transform">
                        {s.line2}
                      </span>
                    </span>
                  </h1>
                </div>
                <p data-hero-sub className="mt-6 max-w-md text-[17px] leading-[1.7] text-[#EDE6DA]">
                  {s.sub}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link data-hero-cta href={s.cta.href} aria-label={s.cta.label}>
                    <button className="group inline-flex items-center gap-3 rounded-full bg-[#E08A2E] px-8 py-4 text-[15px] font-medium text-[#1A1410] shadow-lg shadow-ink/30 transition-transform duration-200 hover:scale-[1.03]">
                      {s.cta.label}
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[#1A1410] transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </button>
                  </Link>
                  <Link data-hero-cta href={s.ghost.href} aria-label={s.ghost.label}>
                    <button className="rounded-full border border-[#EDE6DA]/50 bg-[#1A1410]/20 px-8 py-4 text-[15px] font-medium text-[#FDFBF7] backdrop-blur-sm transition-colors duration-200 hover:bg-[#1A1410]/40">
                      {s.ghost.label}
                    </button>
                  </Link>
                </div>

                {/* slide indicators */}
                <div className="mt-10 flex items-center gap-3">
                  {slides.map((sl, i) => (
                    <button
                      key={sl.photo}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === active}
                      className="group flex items-center gap-2"
                    >
                      <span
                        className={`block h-[3px] rounded-full transition-all duration-500 ${
                          i === active ? "w-10 bg-[#E08A2E]" : "w-5 bg-[#EDE6DA]/45 group-hover:bg-[#EDE6DA]/80"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-mono text-[10px] tracking-[0.25em] text-[#EDE6DA]/70">
                    {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </span>
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
          {stats.map((st) => (
            <div key={st.l} className="text-center sm:text-left">
              <p className="display text-2xl text-ink lg:text-3xl">{st.n}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                {st.l}
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
