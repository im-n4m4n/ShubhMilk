"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * KenBurns — slow scale 1.15 → 1 inside an overflow-hidden frame, scrubbed with
 * scroll (AURELLE spec). Wrap any img; give it a wrapper.
 *
 * MOBILE NOTE: this is a subtle parallax on cards, but it is also a scrubbed
 * tween with `will-change` per card. On a grid of product tiles that means many
 * concurrent tweens and many promoted layers, all competing with the scroll. On
 * small screens the image is simply shown at rest — the effect is barely
 * perceptible at phone size and the cost is very real.
 *
 * The layer is also promoted only while the tween runs, rather than for the whole
 * life of the page.
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
    /* Desktop only — see the note above. */
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const el = inner.current;
    if (!el) return;

    gsap.set(el, { willChange: "transform" });

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
      gsap.set(el, { willChange: "auto" });
    };
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
