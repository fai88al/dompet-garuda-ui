# Offline Mesh Redesign — Design

## Context

The user asked for a visual overhaul of the landing page, citing
`https://garuda-alpha-ten.vercel.app/` (a v0-generated fintech template) as
"prettier" than what we have. That reference is a textbook generic-fintech
template: light blue theme, floating badge pills, icon-in-rounded-square
feature cards, animated stat counters, and a Pricing section — all things
CLAUDE.md §4 and §12 explicitly tell us to avoid, and a Pricing section this
product (no billing exists) shouldn't have at all.

Through clarifying questions, the direction settled on: keep and elevate our
own brand (dark-first, Space Grotesk, sage/sand palette per CLAUDE.md §3),
push visual richness/motion/layout hard rather than copying the reference,
accept a real performance cost in exchange for a distinctive "wow" factor,
and reject fabricated growth stats (this is a public prototype with no real
users yet) in favor of factual capability chips.

## Goal

A comprehensive visual redesign of every homepage section, built around the
product's actual differentiator — offline, peer-to-peer Bluetooth transfer —
rather than generic premium-SaaS decoration.

## Explicit deviation from CLAUDE.md §9

CLAUDE.md §9 calls for animation restraint ("one or two deliberate motion
moments"). This redesign intentionally supersedes that guidance per the
user's explicit direction to go all-in on motion/richness. Noting this here
so it doesn't read as an oversight in a future review.

## Libraries

- **Add**: `gsap`, `@gsap/react` (ScrollTrigger plugin bundled in `gsap`).
  GSAP's plugins have been free for commercial use since the 2024 license
  change (no Club GreenSock paywall) — no licensing concern.
- **Remove**: `framer-motion`. Its two current uses (hero entrance fade,
  how-it-works scroll reveal) get migrated to GSAP so the project has one
  animation library, not two, even under a "go all-in" visual budget.
- **No new dependency** for the node-network visual — hand-rolled
  `<canvas>` + `requestAnimationFrame`, both for bundle weight and because
  off-the-shelf particle libraries (tsparticles, particles.js) produce the
  same "networked dots" look used on hundreds of other sites. Hand-rolling
  it keeps the effect specific to this product's story and fully
  controllable (color, density, connection distance, theme-awareness).

## Global additions

- **`components/shared/node-network.tsx`** (client component): fixed,
  full-viewport `<canvas>` behind all page content (`z-index` below
  everything, `pointer-events-none`). Renders only when `resolvedTheme ===
  'dark'` (returns `null` in light mode, which stays clean per its
  "secondary experience" status). Draws a field of slowly-drifting dots in
  `--color-primary`/`--color-accent` tones; when two dots are within a
  threshold distance, a thin line is drawn between them with opacity
  proportional to proximity — the "offline mesh" metaphor made literal.
  Respects `prefers-reduced-motion` (renders a static frame, no RAF loop, if
  set). Mounted once in `app/layout.tsx`.
- **Grain overlay**: a fixed, full-viewport `<div>` with a `background-image`
  data-URI SVG noise filter, ~3% opacity, `mix-blend-mode: overlay`,
  `pointer-events-none`. Also mounted in the root layout. Same in both
  themes (cheap, non-interactive, no JS).
- **Section tint drift**: each major section gets a `data-tint` attribute
  (`sage` | `sand` | `neutral`); a small GSAP ScrollTrigger batch updates a
  CSS custom property (`--ambient-tint`) consumed by the node-network canvas
  and section background glows as the user scrolls, so the page's color
  temperature subtly shifts through the sage→sand range CLAUDE.md already
  defines — no new colors introduced.
- **`lib/motion.ts`**: tiny shared helpers — a `useGsapReveal` hook wrapping
  the common "fade + slide + stagger on scroll" pattern so every section
  doesn't hand-roll its own ScrollTrigger boilerplate.

## Per-section changes

**Hero** (`components/sections/hero.tsx`)
- Headline scales up to `text-8xl` on desktop (from `text-7xl`).
- The existing gradient placeholder becomes a glass panel: `backdrop-blur-xl`,
  translucent `bg-card/40`, glowing 1px gradient border (sage→sand). Keeps
  the same `TODO: replace with generated asset` intent from BUILD_PLAN —
  just a nicer holding pattern.
- CTAs get a magnetic hover: button shifts a few px toward the cursor within
  a small radius (via a pointer-move handler + GSAP `quickTo`).
- Below the CTAs: a row of three factual capability chips — "Bluetooth
  Mesh", "Ed25519 Signed", "Zero Signal Required" — replacing any stats-row
  idea. Small pill badges, sand-accent border, no numbers/claims.
- Entrance animation migrates from Framer Motion to a GSAP timeline (same
  fade+slide beat, just re-implemented).

**How It Works** (`components/sections/how-it-works.tsx`)
- Layout changes from 3 equal columns to a bento arrangement: one larger
  "Transfer" card (the core action) spanning 2 rows/taller, "Cek Saldo" and
  "Scan QR" stacked beside it at half-height each. Single column on mobile,
  in copy order.
- Cards get the glass treatment (translucent + blurred + glowing border on
  hover) instead of flat `bg-card`.
- Reveal changes from one whole-section fade to a GSAP stagger: cards
  animate in individually (fade + slight scale-up) as the section enters
  view, still triggered once.

**Features** (`components/sections/features.tsx`)
- Same bento idea applied to the photographic-placeholder cards: one wide
  card + two narrower ones instead of 3 even columns. Existing gradient
  placeholders and per-card TODO comments (referencing BUILD_PLAN asset
  prompts) are preserved as-is.
- Add a subtle hover parallax: the gradient background shifts slightly
  based on cursor position within the card (mousemove → transform, GSAP
  `quickTo`, capped so it stays subtle).

**Security** (`components/sections/security.tsx`)
- The abstract ledger SVG grows to be the section's clear centerpiece
  (larger, better-balanced against the text column).
- The dashed connector line animates in via `stroke-dashoffset`, driven by
  a GSAP ScrollTrigger tied to the section's scroll position — it "draws
  itself" as the user arrives, reinforcing the signature/verification idea
  rather than being static decoration.

**Articles teaser / Footer**
- Article cards get the same glass treatment as other cards, for visual
  consistency across the page.
- Footer gets a subtle glowing hairline on its top border (`border-image` or
  a thin gradient div), otherwise structurally unchanged.

## Explicitly out of scope

- No pricing section (product has no billing; CLAUDE.md §12 already rules
  this out — the reference's Pricing tab is not being copied).
- No fabricated stats/counters.
- No 3D engine (react-three-fiber/three.js) — the node-network canvas
  covers the "wow" role without that dependency weight.
- Not touching `lib/api.ts`, article data fetching, SEO/metadata, or the
  deployment pipeline — this is a purely visual/motion pass on already-
  shipped sections.

## Performance note

This is a deliberate trade: the user chose "go all-in, perf be damned" over
staying within the Performance 90+ budget set in PR5. Expect the Lighthouse
Performance score to drop from its current ~93/96 — the canvas animation,
GSAP, and additional blur/glow effects all cost real paint/JS time. Not
treating this as a regression to fix, per the user's explicit choice, but
flagging it in the eventual PR description for visibility.

## Delivery plan

Phased, mirroring the original BUILD_PLAN sequence, each its own branch/PR:

1. **Infra + Hero** — node-network canvas, grain overlay, GSAP setup,
   remove Framer Motion, hero redesign.
2. **How It Works + Features** — bento layouts, glass cards, stagger
   reveals.
3. **Security + Articles teaser + Footer** — SVG animation, glass
   consistency pass, footer hairline.

Concrete task breakdown for phase 1 (and stubs for 2–3) will be written out
by the writing-plans skill next.
