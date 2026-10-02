"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { claims, compliance } from "@/lib/businessConfig";

/**
 * TrustMarquee — infinite horizontal scroll of trust claims, separated by
 * saffron drop glyphs. GSAP xPercent loop, transform-only, pauses on hover.
 */
export default function TrustMarquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });

    el.addEventListener("mouseenter", () => tween.pause());
    el.addEventListener("mouseleave", () => tween.play());
    return () => {
      tween.kill();
    };
  }, []);

  /* Claims come from lib/businessConfig.ts — never invent a number here. */
  const licence = compliance.fssai.startsWith("[");
  const items = [
    licence ? compliance.fssai : `FSSAI ${compliance.fssai}`,
    "A2 CERTIFIED",
    "LAB TESTED DAILY",
    "GLASS BOTTLED",
    "NO PRESERVATIVES",
    "FARM TRACEABLE",
    `${claims.homesServed} HOMES`,
  ];

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={`${key}-${t}`} className="flex items-center">
          <span className="px-6 font-mono text-xs tracking-[0.25em] text-bone/80">{t}</span>
          <DropGlyph />
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-ink py-5">
      <div ref={track} className="flex w-max cursor-default">
        {row("a")}
        {row("b")}
      </div>
      {/* top & bottom paisley borders */}
      <PaisleyEdge position="top" />
      <PaisleyEdge position="bottom" />
    </section>
  );
}

function DropGlyph() {
  return (
    <svg viewBox="0 0 12 16" className="h-3 w-2.5 text-kesar" aria-hidden>
      <path
        d="M6 1 C8 5 11 7.5 11 10.5 A5 5 0 0 1 1 10.5 C1 7.5 4 5 6 1 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PaisleyEdge({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-10 h-3 opacity-[0.09] ${
        position === "top" ? "top-0" : "bottom-0 rotate-180"
      }`}
      style={{ mixBlendMode: "screen" }}
    >
      <svg viewBox="0 0 640 12" preserveAspectRatio="none" className="h-full w-full">
        <g fill="none" stroke="var(--motif)" strokeWidth="1">
          {Array.from({ length: 40 }, (_, i) => (
            <path key={i} d={`M${i * 16} 12 C${i * 16 + 4} 4 ${i * 16 + 12} 4 ${i * 16 + 16} 12`} />
          ))}
        </g>
      </svg>
    </div>
  );
}