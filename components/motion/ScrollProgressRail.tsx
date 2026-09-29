"use client";

import { useEffect, useRef, useState } from "react";
import Kolam from "@/components/patterns/Kolam";

/**
 * ScrollProgressRail — a thin vertical kolam dotted rail fixed to the right
 * edge. The kolam loop fills in saffron with scroll progress (clip-path only).
 */
export default function ScrollProgressRail() {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const read = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      raf.current = window.requestAnimationFrame(read);
    };
    raf.current = window.requestAnimationFrame(read);
    return () => window.cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed right-4 top-1/2 z-40 hidden h-52 w-6 -translate-y-1/2 lg:block"
    >
      <Kolam variant="rail" progress={progress} className="h-full w-full" />
    </div>
  );
}
