"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * FlipIn — the DRIFT spec entrance: elements stagger in by fading from
 * opacity:0, translating up from y:50, and rotating up from rotateX:-40 with
 * transformPerspective:1000. Runs once per block on scroll-in.
 */
export default function FlipIn({
  children,
  className = "",
  stagger = 0.08,
  selector = "[data-flip]",
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
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transformPerspective: 1000,
          duration: 1,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [selector, stagger]);

  return (
    <div ref={root} className={className} style={{ perspective: "1000px" }}>
      {children}
    </div>
  );
}
