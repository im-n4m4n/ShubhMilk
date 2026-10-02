"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SilkReveal from "@/components/motion/SilkReveal";
import { brand, claims, isPlaceholder } from "@/lib/businessConfig";

/**
 * StatsBand — "Every Number Tells a Story" with animated counters.
 * Numbers count up once on scroll-in; bilingual heading kept as-is.
 *
 * NOTE: the counters animate numerically, so the real figures are parsed out
 * of the config strings ("2,000+" → 2000). Until you fill claims.* the
 * parse yields 0 and the band shows 0 — that is deliberate: an obvious zero
 * is better than a confident invented number.
 */
const num = (v: string): number => {
  const digits = v.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
};

const suffixOf = (v: string): string => v.replace(/[0-9,\s]/g, "") || "";

const stats = [
  {
    raw: claims.homesServed,
    value: num(claims.homesServed),
    suffix: suffixOf(claims.homesServed),
    label: "homes served every morning",
    hi: "हर सुबह, हर घर",
  },
  {
    raw: claims.litresDaily,
    value: num(claims.litresDaily),
    suffix: suffixOf(claims.litresDaily),
    label: "litres delivered daily",
    hi: "रोज़ाना ताज़ा दूध",
  },
  {
    raw: claims.bottleReuse,
    value: num(claims.bottleReuse),
    suffix: "\u00d7",
    label: "each glass bottle reused",
    hi: "बोतल, बार-बार",
  },
  {
    raw: brand.since,
    value: num(brand.since),
    suffix: "",
    label: "farm to doorstep since",
    hi: "जड़ों से जुड़े",
  },
];

export default function StatsBand() {
  const root = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);
  const [vals, setVals] = useState(stats.map(() => 0));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun(true);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => setRun(true),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!run) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // power4.out
      setVals(stats.map((s) => Math.round(s.value * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  const fmt = (n: number) => n.toLocaleString("en-IN");

  return (
    <section ref={root} className="bg-ink py-24 text-bone lg:py-32">
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <SilkReveal>
          <div data-silk className="text-center">
            <p className="overline text-[#F3C888]">MORE THAN A BRAND, A FAMILY</p>
            <h2 className="display mt-4 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.1]">
              Every number tells a <em className="font-light">story</em>.
            </h2>
            <p className="mt-2 text-lg text-bone/60">जड़ों से जुड़े लोग, असली बदलाव</p>
          </div>
        </SilkReveal>

        <div className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              {/* While the claim is unfilled we show the placeholder itself, so
                  nobody quotes an invented figure and you can see what to fill. */}
              <p
                className={
                  isPlaceholder(s.raw)
                    ? "display text-xl font-medium text-kesar lg:text-2xl"
                    : "display text-4xl font-medium text-bone lg:text-6xl"
                }
              >
                {isPlaceholder(s.raw) ? s.raw : `${fmt(vals[i])}${s.suffix}`}
              </p>
              <p className="mx-auto mt-3 max-w-[220px] text-sm leading-[1.6] text-bone/70">
                {s.label}
              </p>
              <p className="mt-1 font-mono text-[11px] text-kesar">{s.hi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
