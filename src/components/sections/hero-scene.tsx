"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const DeviceViewer = dynamic(
  () => import("@/components/three/device-viewer").then((mod) => mod.DeviceViewer),
  { ssr: false }
);

const badges = [
  { label: "Transfer Sukses", position: "top-[8%] right-[2%]", delay: "0s", duration: "5s" },
  { label: "Siap Pindai QR", position: "bottom-[10%] left-0", delay: "0.6s", duration: "6s" },
  { label: "Transaksi Offline", position: "top-[38%] left-0", delay: "1.1s", duration: "5.6s" },
  { label: "Cek Informasi Saldo", position: "top-0 left-[8%]", delay: "0.3s", duration: "5.2s" },
];

/** Decorative gradient orbs, grid pattern, and a cursor-follow glow behind the hero. */
export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;

    function handlePointerMove(event: PointerEvent) {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const container = containerRef.current;
        const glow = glowRef.current;
        if (!container || !glow) return;
        const rect = container.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          return;
        }
        glow.style.transform = `translate3d(${event.clientX - rect.left - 260}px, ${
          event.clientY - rect.top - 260
        }px, 0)`;
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="dg-motion absolute -top-[10%] -right-[8%] size-[52vw] max-h-[720px] max-w-[720px] rounded-full blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, oklch(0.9 0.09 160 / 0.9), oklch(0.9 0.09 160 / 0) 70%)",
          animation: "dg-drift 9s ease-in-out infinite",
        }}
      />
      <div
        className="dg-motion absolute -bottom-[15%] -left-[10%] size-[38vw] max-h-[520px] max-w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, oklch(0.55 0.13 155 / 0.16), transparent 70%)",
          animation: "dg-drift 12s ease-in-out infinite 1s",
        }}
      />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 size-[520px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.12 155 / 0.22), transparent 68%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none">
        <defs>
          <pattern id="dg-grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M46 0H0V46" fill="none" stroke="oklch(0.85 0.03 150)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dg-grid)" />
      </svg>
    </div>
  );
}

/** The rotating rings, floating badge chips, and the 3D device viewer itself. */
export function DeviceStage() {
  return (
    <div className="relative flex w-full justify-center">
      <div
        className="dg-motion absolute aspect-square w-[92%] max-w-[420px] rounded-full border-[1.5px] border-dashed border-primary/55"
        style={{ animation: "dg-spin 26s linear infinite" }}
      />
      <div
        className="dg-motion absolute aspect-square w-[74%] max-w-[340px] rounded-full border border-primary/35"
        style={{ animation: "dg-spin-rev 20s linear infinite" }}
      />

      <div
        className="shadow-device dg-motion relative aspect-[5.8/8] w-[70%] max-w-[300px]"
        style={{ animation: "dg-pop 0.8s cubic-bezier(.2,.8,.2,1) 0.15s both" }}
      >
        <DeviceViewer />
      </div>

      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`dg-motion shadow-chip pointer-events-none absolute ${badge.position} flex max-w-[44%] items-center gap-2 rounded-2xl border border-hairline bg-card/80 px-3.5 py-2.5 backdrop-blur-md`}
          style={{ animation: `dg-float ${badge.duration} ease-in-out infinite ${badge.delay}` }}
        >
          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-primary/20">
            <span className="size-2 rounded-sm bg-primary" />
          </span>
          <span className="text-[11px] font-semibold whitespace-nowrap text-foreground sm:text-xs">
            {badge.label}
          </span>
        </div>
      ))}

      <div
        className="absolute bottom-[-6%] h-[34px] w-[78%] max-w-[320px] rounded-full blur-[4px]"
        style={{
          background: "radial-gradient(ellipse, oklch(0.4 0.1 160 / 0.28), transparent 72%)",
        }}
      />
    </div>
  );
}
