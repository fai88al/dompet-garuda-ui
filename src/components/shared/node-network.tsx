"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const DOT_COUNT = 60;
const CONNECT_DISTANCE = 140;
const SAGE = "#7a9e8a";
const SAND = "#c4a882";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  affinity: number;
}

export function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- documented next-themes hydration pattern (see components/layout/theme-toggle.tsx)
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || resolvedTheme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      affinity: Math.random(),
    }));

    function getTint(): number {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--tint"
      );
      const value = parseFloat(raw);
      return Number.isNaN(value) ? 0 : value;
    }

    function drawFrame() {
      const tint = getTint();
      ctx!.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = dot.affinity < tint ? SAND : SAGE;
        ctx!.globalAlpha = 0.6;
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < CONNECT_DISTANCE) {
            ctx!.beginPath();
            ctx!.moveTo(dots[i].x, dots[i].y);
            ctx!.lineTo(dots[j].x, dots[j].y);
            ctx!.strokeStyle = dots[i].affinity < tint ? SAND : SAGE;
            ctx!.globalAlpha = 0.15 * (1 - distance / CONNECT_DISTANCE);
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1;
    }

    if (prefersReducedMotion) {
      drawFrame();
      return () => window.removeEventListener("resize", resize);
    }

    let frameId: number;
    function loop() {
      drawFrame();
      frameId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
