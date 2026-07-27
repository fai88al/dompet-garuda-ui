# Offline Mesh Redesign — Phase 1 (Infra + Hero) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the shared visual/motion infrastructure (animated node-network canvas, grain texture, scroll-driven color-tint system, GSAP motion helpers) and use it to redesign the Hero section, replacing Framer Motion with GSAP along the way.

**Architecture:** Three new fixed, non-interactive global components (`NodeNetwork`, `GrainOverlay`, `TintDriver`) mount once in the root layout, sitting behind all page content. A shared `lib/motion.ts` exposes two hooks (`useGsapReveal`, `useMagnetic`) that sections use instead of importing Framer Motion directly. Hero is rebuilt on top of these; How It Works keeps its current layout but swaps its existing Framer Motion reveal for the same `useGsapReveal` hook, which lets the `framer-motion` dependency be removed entirely once both consumers have migrated.

**Tech Stack:** Next.js 16 (App Router, TypeScript), GSAP + ScrollTrigger (new), next-themes (existing), Tailwind v4 (existing). No test framework exists in this repo — verification throughout is `bunx tsc --noEmit`, `bun run lint`, `bun run build`, and manual browser checks (dark/light × desktop/mobile), matching how every prior PR in this repo has been verified.

## Global Constraints

- Dark mode is the default theme; light mode must keep working and stay clean/minimal (CLAUDE.md §3). `NodeNetwork` is dark-mode-only by design (see spec).
- Brand colors only: primary `#7a9e8a`/`#5d7066` (sage) and accent `#c4a882`/`#d9c6b0` (sand) — no new colors introduced anywhere in this plan.
- Respect `prefers-reduced-motion` in every animated component (CLAUDE.md §9, still honored even though §9's "restraint" guidance is otherwise superseded per the approved spec).
- No new state-management or data-fetching libraries (CLAUDE.md §12) — not relevant to this plan, but stated for completeness.
- `bun` is the package manager and runtime throughout; use `bun add` / `bun remove`, not `npm`/`yarn`.
- This plan does not touch `lib/api.ts`, article data fetching, SEO/metadata files, or the Docker/deploy pipeline.
- Every new/edited component preserves existing `id`/`data-*` attributes already relied on elsewhere (`id="cara-kerja"`, `id="keamanan"`, the nav/footer anchors).

---

## Task 1: GSAP dependency + shared motion hooks

**Files:**
- Modify: `package.json` (add `gsap`, remove nothing yet)
- Create: `src/lib/motion.ts`

**Interfaces:**
- Produces: `useGsapReveal(ref: RefObject<HTMLElement | null>, options?: { targets?: string; stagger?: number; immediate?: boolean }): void`
- Produces: `useMagnetic(ref: RefObject<HTMLElement | null>, strength?: number): void`

- [ ] **Step 1: Install GSAP**

Run: `bun add gsap`

- [ ] **Step 2: Write `src/lib/motion.ts`**

```ts
"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  /** CSS selector for children to animate individually; omit to animate the container itself. */
  targets?: string;
  /** Seconds between staggered children. Ignored when `targets` is omitted. */
  stagger?: number;
  /** Animate immediately on mount instead of when scrolled into view. */
  immediate?: boolean;
}

export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  { targets, stagger = 0.12, immediate = false }: RevealOptions = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = targets
      ? Array.from(el.querySelectorAll<HTMLElement>(targets))
      : [el];

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(elements, { opacity: 0, y: 16 });

    const tween = gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger,
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              once: true,
            },
          }),
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, targets, stagger, immediate]);
}

export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 12) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

    function handleMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo((relX / rect.width) * strength);
      yTo((relY / rect.height) * strength);
    }

    function handleLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [ref, strength]);
}
```

- [ ] **Step 3: Verify it typechecks**

Run: `bunx tsc --noEmit`
Expected: no errors (this file isn't imported anywhere yet, but must still be valid TypeScript on its own).

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock src/lib/motion.ts
git commit -m "Add GSAP and shared reveal/magnetic motion hooks"
```

---

## Task 2: Node-network canvas background

**Files:**
- Create: `src/components/shared/node-network.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `<NodeNetwork />` — a component with no props, rendered once. Reads a `--tint` CSS custom property (0–1) each frame via `getComputedStyle`, defaulting to `0` if unset (Task 4 defines it; this task must work correctly before Task 4 exists).

- [ ] **Step 1: Write `src/components/shared/node-network.tsx`**

```tsx
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
```

- [ ] **Step 2: Mount it in the root layout**

In `src/app/layout.tsx`, add the import and render it as the first child inside `<ThemeProvider>`:

```tsx
import { NodeNetwork } from "@/components/shared/node-network";
```

```tsx
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NodeNetwork />
          <Nav />
          {children}
        </ThemeProvider>
```

- [ ] **Step 3: Verify build**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: all three succeed with no errors.

- [ ] **Step 4: Manual browser check**

Run `bun run dev`, open `localhost:3000` in Chrome at 1440×900. Confirm: in dark mode (default), a field of faint drifting sage-colored dots is visible behind the page content, occasionally connected by thin lines; nothing renders in light mode; resizing the window doesn't distort or clip the canvas.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/node-network.tsx src/app/layout.tsx
git commit -m "Add dark-mode node-network canvas background"
```

---

## Task 3: Grain overlay

**Files:**
- Create: `src/components/shared/grain-overlay.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `<GrainOverlay />` — a prop-less server component (no `"use client"` needed; pure static markup).

- [ ] **Step 1: Write `src/components/shared/grain-overlay.tsx`**

```tsx
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
```

- [ ] **Step 2: Mount it in the root layout, after `NodeNetwork`**

```tsx
import { GrainOverlay } from "@/components/shared/grain-overlay";
```

```tsx
          <NodeNetwork />
          <GrainOverlay />
          <Nav />
```

- [ ] **Step 3: Verify build**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: all succeed.

- [ ] **Step 4: Manual browser check**

Reload `localhost:3000` in both themes. Confirm a very subtle grain texture is visible over the whole page (most obvious over large flat color areas) in both dark and light mode, and that it doesn't block clicks on any button or link.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/grain-overlay.tsx src/app/layout.tsx
git commit -m "Add grain texture overlay"
```

---

## Task 4: Scroll-driven tint system

**Files:**
- Create: `src/components/shared/tint-driver.tsx`
- Modify: `src/app/globals.css` (add `--tint: 0;`)
- Modify: `src/app/layout.tsx` (mount `TintDriver`)
- Modify: `src/components/sections/hero.tsx` (add `data-tint="sage"` — done as part of Task 5's rewrite, so only add it here if Task 5 hasn't run yet; see note below)
- Modify: `src/components/sections/how-it-works.tsx` (add `data-tint="sage"`)
- Modify: `src/components/sections/features.tsx` (add `data-tint="neutral"`)
- Modify: `src/components/sections/security.tsx` (add `data-tint="sand"`)
- Modify: `src/components/sections/articles-teaser.tsx` (add `data-tint="sand"`)
- Modify: `src/components/sections/footer.tsx` (add `data-tint="neutral"`)

**Note on ordering:** this plan does Task 4 before Task 5 (Hero redesign), so Hero's `data-tint="sage"` is added here as a one-line edit to the *current* `hero.tsx`; Task 5 then rewrites the whole file and must keep that attribute.

**Interfaces:**
- Consumes: nothing.
- Produces: `<TintDriver />` (no props, renders `null`); the `--tint` CSS custom property on `document.documentElement`, read by `NodeNetwork` (Task 2).

- [ ] **Step 1: Add the CSS variable**

In `src/app/globals.css`, inside the existing `:root { ... }` block (the one starting `/* Light mode... */`), add one line right after `--ring: #5d7066;`:

```css
  --ring: #5d7066;
  --tint: 0;
```

- [ ] **Step 2: Write `src/components/shared/tint-driver.tsx`**

```tsx
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
```

- [ ] **Step 3: Mount it in the root layout, after `GrainOverlay`**

```tsx
import { TintDriver } from "@/components/shared/tint-driver";
```

```tsx
          <NodeNetwork />
          <GrainOverlay />
          <TintDriver />
          <Nav />
```

- [ ] **Step 4: Add `data-tint` to Hero**

In `src/components/sections/hero.tsx`, change:

```tsx
    <section className="border-b border-border">
```

to:

```tsx
    <section data-tint="sage" className="border-b border-border">
```

- [ ] **Step 5: Add `data-tint` to How It Works**

In `src/components/sections/how-it-works.tsx`, change the outer `<motion.section id="cara-kerja" ...>` opening tag to include `data-tint="sage"` (kept as-is otherwise; Task 6 will migrate this file off Framer Motion):

```tsx
    <motion.section
      id="cara-kerja"
      data-tint="sage"
      initial={{ opacity: 0, y: 16 }}
```

- [ ] **Step 6: Add `data-tint` to Features**

In `src/components/sections/features.tsx`, change:

```tsx
    <section className="border-b border-border">
```

to:

```tsx
    <section data-tint="neutral" className="border-b border-border">
```

- [ ] **Step 7: Add `data-tint` to Security**

In `src/components/sections/security.tsx`, change:

```tsx
    <section id="keamanan" className="scroll-mt-16 border-b border-border">
```

to:

```tsx
    <section id="keamanan" data-tint="sand" className="scroll-mt-16 border-b border-border">
```

- [ ] **Step 8: Add `data-tint` to Articles Teaser**

In `src/components/sections/articles-teaser.tsx`, change:

```tsx
    <section className="border-b border-border">
```

to:

```tsx
    <section data-tint="sand" className="border-b border-border">
```

- [ ] **Step 9: Add `data-tint` to Footer**

In `src/components/sections/footer.tsx`, change:

```tsx
    <footer>
```

to:

```tsx
    <footer data-tint="neutral">
```

- [ ] **Step 10: Verify build**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: all succeed.

- [ ] **Step 11: Manual browser check**

In dark mode at 1440×900, scroll slowly from top to bottom. Confirm the node-network dots gradually shift from mostly-sage near the top toward more sand-colored around the Security/Articles sections, and back toward a sage/sand mix near the footer. Scrolling back up should reverse it.

- [ ] **Step 12: Commit**

```bash
git add src/app/globals.css src/components/shared/tint-driver.tsx src/app/layout.tsx src/components/sections/hero.tsx src/components/sections/how-it-works.tsx src/components/sections/features.tsx src/components/sections/security.tsx src/components/sections/articles-teaser.tsx src/components/sections/footer.tsx
git commit -m "Add scroll-driven sage-to-sand tint system across all sections"
```

---

## Task 5: Hero redesign

**Files:**
- Modify: `src/components/sections/hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `useGsapReveal`, `useMagnetic` from `@/lib/motion` (Task 1).

- [ ] **Step 1: Rewrite `src/components/sections/hero.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGsapReveal, useMagnetic } from "@/lib/motion";

const chips = ["Bluetooth Mesh", "Ed25519 Signed", "Zero Signal Required"];

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLDivElement>(null);
  const secondaryCtaRef = useRef<HTMLDivElement>(null);

  useGsapReveal(contentRef, { immediate: true });
  useMagnetic(primaryCtaRef);
  useMagnetic(secondaryCtaRef);

  return (
    <section data-tint="sage" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
        <div ref={contentRef}>
          <p className="text-sm font-medium tracking-wide text-accent-hover dark:text-accent">
            ✱ Bayar di mana saja, tanpa sinyal.
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-8xl">
            Transfer tanpa internet, aman tanpa ribet.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Dompet Digital memungkinkan transaksi langsung antar perangkat
            lewat Bluetooth — bahkan saat tidak ada koneksi internet sama
            sekali.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div ref={primaryCtaRef}>
              <Button size="lg">Pelajari Cara Kerja</Button>
            </div>
            <div ref={secondaryCtaRef}>
              <Button size="lg" variant="outline">
                Baca Artikel Kami
              </Button>
            </div>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* TODO: replace with generated asset — market vendor offline transfer scene */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-accent/30 bg-card/40 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 dark:from-primary/20 dark:via-accent/15 dark:to-background" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: all succeed. (Framer Motion is still a dependency at this point — How It Works still imports it — so this step must not remove it yet.)

- [ ] **Step 3: Manual browser check**

At 1440×900 in dark mode: confirm the headline is visibly larger than before, the hero text block fades/slides in once on load, hovering the two CTA buttons pulls them slightly toward the cursor within a small radius and they spring back on mouse-leave, the three capability chips render below the CTAs, and the image slot now reads as a glassy framed panel rather than a flat gradient block. Repeat at 390×844 (mobile): confirm the layout stacks to one column and the magnetic effect doesn't interfere with tapping (it's disabled on coarse pointers). Repeat both in light mode: confirm everything still reads correctly with no node-network artifacts.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "Redesign hero: larger headline, glass panel, magnetic CTAs, capability chips"
```

---

## Task 6: Migrate How It Works off Framer Motion; remove the dependency

**Files:**
- Modify: `src/components/sections/how-it-works.tsx` (full rewrite)
- Modify: `package.json` (remove `framer-motion`)

**Interfaces:**
- Consumes: `useGsapReveal` from `@/lib/motion` (Task 1).

- [ ] **Step 1: Rewrite `src/components/sections/how-it-works.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { Wallet, Send, QrCode } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { useGsapReveal } from "@/lib/motion";

const steps = [
  {
    icon: Wallet,
    title: "Cek Saldo",
    description: "Lihat saldo Anda kapan saja, online maupun offline.",
  },
  {
    icon: Send,
    title: "Transfer",
    description:
      "Kirim uang langsung ke perangkat lain lewat Bluetooth, tanpa internet.",
  },
  {
    icon: QrCode,
    title: "Scan QR",
    description: "Terima pembayaran secepat memindai kode QR.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGsapReveal(sectionRef, { targets: "[data-reveal-card]" });

  return (
    <section
      id="cara-kerja"
      data-tint="sage"
      className="scroll-mt-16 border-b border-border"
    >
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja"
          headline="Tiga langkah, tanpa ribet."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <Card key={title} data-reveal-card className="bg-card">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="mt-4 font-display text-xl">
                  {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Remove Framer Motion**

Run: `bun remove framer-motion`

- [ ] **Step 3: Confirm no remaining references**

Run: `grep -rl "framer-motion" src`
Expected: no output (no files match).

- [ ] **Step 4: Verify build**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: all succeed.

- [ ] **Step 5: Manual browser check**

At 1440×900 in dark mode, scroll down to How It Works: confirm the three cards fade+slide in with a slight stagger the first time the section enters view, and don't re-animate on scrolling back up past them and down again. Repeat at 390×844 and in light mode.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/how-it-works.tsx package.json bun.lock
git commit -m "Migrate How It Works reveal to GSAP; remove framer-motion dependency"
```

---

## Task 7: Full verification pass

**Files:** none (verification only).

- [ ] **Step 1: Full clean verification**

Run: `bunx tsc --noEmit && bun run lint && bun run build`
Expected: all three succeed with zero errors/warnings.

- [ ] **Step 2: Lighthouse check**

Run: `bun run build && bun run start`, then in a new terminal:
`npx --yes lighthouse http://localhost:3000/ --output=json --output-path=/tmp/lh-hero-redesign.json --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --quiet`

Then: `node -e "const r = require('/tmp/lh-hero-redesign.json'); console.log('Performance:', Math.round(r.categories.performance.score*100)); console.log('Accessibility:', Math.round(r.categories.accessibility.score*100));"`

Record both numbers for the PR description. A Performance drop from the PR5 baseline (93) is expected and accepted per the approved spec — not a blocker — but Accessibility must stay at 100 (the node-network/grain overlays are `aria-hidden` and `pointer-events-none`, so they shouldn't affect it).

- [ ] **Step 3: Full manual browser sweep**

Using Chrome, check the homepage at 1440×900 and 390×844, in both dark and light mode (8 combinations total): hero, how-it-works, and every other section still render without visual breakage, the node-network/grain/tint system behaves as described in Tasks 2–4, and the mobile nav (Sheet) and theme toggle still work.

- [ ] **Step 4: Stop the production server**

Run: `pkill -f "next start"` (and `pkill -f "next dev"` if a dev server is also still running from earlier steps).

- [ ] **Step 5: Final commit (if anything was fixed during this pass)**

```bash
git add -A
git commit -m "Fix issues found in phase 1 verification pass"
```

(Skip this step if verification found nothing to fix.)

---

## What's deliberately NOT in this phase

- How It Works' bento layout restructuring, Features' bento layout + hover parallax, Security's animated SVG draw-in, and the Articles/Footer glass-card consistency pass are Phase 2 and Phase 3 per the spec's delivery plan — separate plans, separate branches/PRs.
- No Lighthouse regression fixing — expected and accepted per the approved spec.
