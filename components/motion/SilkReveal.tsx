"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SilkReveal — the signature entrance from the prompt library (AURELLE spec):
 * children fade from opacity 0, rise from y:60, un-skew from skewY:4,
 * 1.1s power4.out, staggered 0.08. Runs once when the block enters.
 */
export default function SilkReveal({
  children,
  className = "",
  stagger = 0.08,
  selector = "[data-silk]",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector);
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y: 60, skewY: 4 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [selector, stagger]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
