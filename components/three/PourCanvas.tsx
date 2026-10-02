"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { MutableRefObject } from "react";

/**
 * The canvas is code-split with next/dynamic + ssr:false, so three.js (~950 KB)
 * lives in its own chunk and is fetched only when this component is actually
 * mounted. A plain `import` here would keep three.js in the homepage's initial
 * bundle no matter how the render was gated — that was the first mistake made
 * in this file, and the chunk measurement caught it.
 */
const BottleScene = dynamic(() => import("@/components/three/BottleScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * PourCanvas — the lazy, power-aware wrapper around the three.js pour.
 *
 * WHY THIS EXISTS (the lag fix):
 *   1. three.js is ~950 KB. It is loaded with a dynamic import (below), so it
 *      is NOT part of the homepage's first-load JS. The chunk arrives only when
 *      the section is actually about to be seen.
 *   2. The canvas used to render every frame from the moment the page opened,
 *      even while far off-screen, burning battery and GPU. It now mounts only
 *      when the section comes into view and unmounts again when it leaves.
 *   3. Mobile and reduced-motion visitors never download or run the canvas at
 *      all — they get a still image of the same moment. On phones the 3D scene
 *      is the single most expensive thing on the page and the least legible.
 */

/** Coarse pointer / small screen / reduced motion => don't ship the 3D at all. */
const shouldSkip3D = (): boolean => {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(max-width: 1023px)").matches) return true;
  // Device memory is not in every browser; treat "unknown" as capable.
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof mem === "number" && mem <= 4) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  return false;
};

export default function PourCanvas({
  progressRef,
  fallback,
}: {
  progressRef: MutableRefObject<number>;
  /** Static image used when the 3D scene is skipped. */
  fallback: React.ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);

  /* Decide once, on the client, whether this device gets the canvas. */
  useEffect(() => {
    setEnabled(!shouldSkip3D());
  }, []);

  /* Mount only while the section is on screen; tear down when it leaves. */
  useEffect(() => {
    if (!enabled) return;
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      // a little margin so it is ready just before it scrolls into view
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div ref={host} className="absolute inset-0 z-10">
      {enabled && inView ? (
        <BottleScene progressRef={progressRef} />
      ) : (
        fallback
      )}
    </div>
  );
}
