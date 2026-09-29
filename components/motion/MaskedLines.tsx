"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * MaskedLines — headline lines slide up from y:110% inside overflow-hidden
 * masks (AURELLE spec). Each direct child element is one line.
 */
export default function MaskedLines({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.12,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-line-inner]"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <h2 ref={root} className={className}>
      {lines.map((l, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <span data-line-inner className="block will-change-transform">
            {l}
          </span>
        </span>
      ))}
    </h2>
  );
}
