"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll — mounts Lenis on DESKTOP ONLY and drives it from GSAP's ticker
 * so smooth scrolling and ScrollTrigger share one clock.
 *
 * WHY DESKTOP ONLY (the lag fix):
 *   Smooth scrolling works by intercepting the wheel and re-writing scroll
 *   position every frame. On a touch device there is no wheel to smooth — the
 *   platform's own inertia is already good — so all it does is add a frame of
 *   latency and fight the compositor. On phones it was making the page feel
 *   sticky for no benefit. Touch devices now get native scrolling.
 *
 * `gsap.ticker.lagSmoothing(0)` was also removed: disabling lag smoothing makes
 * GSAP try to catch up on every frame after any stall, which turns a single
 * dropped frame into a visible jolt.
 */
const shouldSmooth = (): boolean => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // No smoothing on touch/coarse-pointer devices.
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(max-width: 1023px)").matches) return false;
  return true;
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!shouldSmooth()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
