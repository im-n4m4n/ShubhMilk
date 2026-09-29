"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * KenBurns — slow scale 1.15 → 1 inside an overflow-hidden frame, scrubbed
 * with scroll (AURELLE spec). Wrap any img; give it a wrapper.
 */
export default function KenBurns({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = inner.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { scale: 1.15 },
      {
        scale: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
