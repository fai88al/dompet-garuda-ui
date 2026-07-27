"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TINT_VALUES: Record<string, number> = {
  sage: 0,
  neutral: 0.5,
  sand: 1,
};

export function TintDriver() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-tint]");

    const triggers = Array.from(sections).map((section) => {
      const target = TINT_VALUES[section.dataset.tint ?? "neutral"] ?? 0.5;

      function setTint() {
        gsap.to(document.documentElement, {
          "--tint": target,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: setTint,
        onEnterBack: setTint,
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
