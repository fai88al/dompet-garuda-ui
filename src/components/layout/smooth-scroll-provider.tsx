"use client";

import { useEffect } from "react";

// Lenis is loaded via a runtime dynamic import (not a static top-level
// import) so its code stays out of the initial JS bundle entirely — this
// is a pure post-hydration enhancement and must never affect LCP. See
// CLAUDE.md §9.
export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lenis: import("lenis").default | undefined;
    let frame: number;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis!.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
