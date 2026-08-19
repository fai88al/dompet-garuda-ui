# CLAUDE.md — Dompet Garuda Landing Page

> Context file for Claude Code. Read this fully before generating or editing any code.
> This is the **public marketing site** for Dompet Garuda — a separate codebase from
> both the Spring Boot backend and the backoffice admin panel.

---

## 1. What this project is

The public-facing landing page for Dompet Garuda, an offline-capable IoT payment device.
Deployed at `https://dompetgaruda.com` (and `https://www.dompetgaruda.com`).

Unlike the backoffice (authenticated, not indexed), this site is **public and SEO-critical**.
It must load fast, rank well, and be crawlable by search engines. It also displays published
articles pulled from the existing backend's public API — no separate content system.

**Stage: prototype, but public-facing.** This is the first thing a prospective user or
investor sees. Prefer polish and correctness over speed of development — this is not
an internal tool.

**Language:** Indonesian (Bahasa Indonesia) is the primary language for all copy — the
target audience is Indonesian market vendors and everyday users, not an English-speaking
technical audience. Do not default to English copy anywhere on this site.

---

## 2. Tech stack (fixed — do not substitute without being asked)

- **Runtime:** Bun
- **Framework:** Next.js 16 (App Router, Turbopack default)
- **Node.js:** >= 20.9.0 required
- **Components:** shadcn/ui (same as backoffice, for consistency)
- **Styling:** Tailwind CSS
- **Dark mode:** next-themes — this site DEFAULTS to dark mode (see §3), but must
  support toggling to light.
- **Animation:** Framer Motion (see §9 for the full motion/scroll spec).
- **Fonts:** see §3 for the specific type choices.
- **HTTP client:** native `fetch`, server-side where possible (this is a marketing site,
  not an authenticated app — most pages should be server components with no client JS
  needed for data fetching).
- **SEO:** Next.js Metadata API (`generateMetadata`) on every route. `next-sitemap` for
  sitemap.xml + robots.txt generation.
- **Images:** Next.js `<Image>` component everywhere — never raw `<img>` tags. This is
  critical for Core Web Vitals (LCP).

> Do NOT add: Redux, Zustand, React Query, Axios, SWR, or any client-side state library.
> This site has almost no client-side state — it's server-rendered content plus a handful
> of small interactive islands (mobile nav toggle, theme toggle, smooth-scroll provider).

---

## 3. Design system — Mercury-inspired structure, Dompet Garuda warmth

> Structural reference: Mercury.com design language
> (styles.refero.design/style/3172cd4d-...). We adopt the DISCIPLINE of this
> system — dark canvas, single chromatic accent, flat borderless cards, pill
> controls, generous spacing, restrained intermediate-weight type, smooth
> premium scroll — but explicitly reject Mercury's cold, corporate-aspirational
> mood. See §3a for the mood reversal in full. The accent color is Dompet
> Garuda's own sage green, never Mercury's cobalt — this keeps the landing
> page visually consistent with the already-shipped backoffice.

### Color — one accent, disciplined use

**Dark mode (default):**
- Canvas (page background): `#12140f` — near-black with a warm, slightly
  green undertone. Never pure/cool black.
- Card / elevated surface (one step lighter than canvas — this is the ONLY
  elevation mechanism, never a shadow): `#1a1f1b`
- Secondary interactive surface (inline form backgrounds, subtle buttons):
  `#222922`
- Structural border (dividers between sections): `#2a3129`
- Hairline border (ghost-button outline, input edge): `#3a453c`
- Muted text: `#9ca3af`
- Primary text: `#f1f1f1`
- **Accent — the ONLY chromatic color in the entire system:** `#7a9e8a`
  (sage). Reserved exclusively for the single primary action per section
  (e.g. one CTA button, one active nav state, the scroll-progress bar).
  Never used decoratively, never as an icon fill, never as a secondary-button
  color.
- **Warm sand `#c4a882` — exception, not a second accent.** Used ONLY as a
  small-text label color (eyebrow tags above headlines, e.g. "✱ Bayar di
  mana saja"). Never used on buttons, fills, icons, or anything larger than
  a short line of caption text. This is desaturated and low-contrast enough
  that it reads as a warm neutral, not a competing bright color — it does
  NOT violate the one-accent rule because it never appears as an
  interactive or attention-grabbing element.
- Pure white (text on filled accent buttons only): `#ffffff`

**Light mode** (secondary experience, toggle only):
- Canvas: `#f1f1f1`
- Surface: `#ffffff`
- Primary/accent: `#5d7066`
- Primary hover: `#4a5c53`
- Sand label color: `#d9c6b0` (same exception rule as dark mode)
- Text primary: `#1a1a1a`
- Text secondary: `#6b7280`
- Border: `#e5e7eb`

### Typography — intermediate weight, never bold

Mercury's signature restraint is avoiding true bold (700+) entirely, using an
intermediate weight instead. We approximate this with the fonts we have.

- **Display/headings:** `next/font/google` **"Space Grotesk"**, weight
  **500** (medium), NOT 700. This is a deliberate downgrade from a typical
  bold hero headline — the confidence comes from SIZE, not weight.
- **Body:** **"Inter"**, weight 400 for paragraphs, 500 for emphasis. Never
  600+.
- **Letter-spacing:** keep close to natural — **max `0.005em` on display
  text.** Do NOT adopt Mercury's wide positive tracking (0.01–0.02em) —
  that architectural wide-set quality reads as corporate distance, which
  §3a explicitly rejects. Natural or very slightly tightened tracking feels
  warmer and more approachable.
- **Line-height:** tight on display (1.1–1.15), generous on body (1.5).
- Hero headline: `text-5xl md:text-7xl font-medium leading-[1.1]` — no
  `font-bold`, no added `tracking-*` beyond the default.

### Shape — pills and flat cards, zero shadows

- **Buttons, inputs, nav pills:** `rounded-full` (or `rounded-[32px]` /
  `rounded-[40px]`) — every interactive control is a pill. Sharp corners
  are reserved for structural elements only.
- **Cards:** `rounded-xl` (12px), `p-8` (32px padding), background is the
  card-surface color, **NO box-shadow anywhere in this codebase.**
  Separation between card and canvas comes purely from the value
  difference between `#12140f` and `#1a1f1b`.

### Spacing — generous, consistent rhythm

- Section vertical padding: `py-24`
- Card padding: `p-8` (32px)
- Page content max-width: `max-w-6xl` (~1200px)
- Gap between elements: `gap-3` (12px) for tight groups, `gap-8` for
  section-level groups

### Component patterns

- **Primary CTA button:** `bg-primary-dark text-onyx-canvas` (verify
  contrast), `rounded-full`, `px-8 py-4`, no border, no shadow,
  `font-medium`.
- **Ghost/outline button:** `bg-transparent border border-ivory-text/60
  text-ivory-text rounded-full px-6 py-3`. Never colored — ivory only.
- **Nav pill links:** transparent, `rounded-full`, `px-5`, floats over the
  hero, NO background until scroll (§9).
- **Eyebrow tag:** small sand-colored (`#c4a882`) uppercase label above a
  headline, e.g. `✱ Bayar di mana saja, tanpa sinyal.` — the one place sand
  appears (see color exception above).

### Tailwind config

```ts
colors: {
  canvas: '#12140f',
  card: '#1a1f1b',
  surface2: '#222922',
  border: {
    structural: '#2a3129',
    hairline: '#3a453c',
  },
  primary: {
    DEFAULT: '#5d7066',   // light mode
    dark: '#7a9e8a',      // dark mode
  },
  sand: {
    DEFAULT: '#d9c6b0',   // light mode label color
    dark: '#c4a882',      // dark mode label color
  },
},
fontFamily: {
  display: ['var(--font-space-grotesk)', 'sans-serif'],
  body: ['var(--font-inter)', 'sans-serif'],
}
```

---

## 3a. Mood — warm and grounded, deliberately NOT Mercury's coldness

We borrow Mercury's structural discipline but explicitly reject its
emotional register. Mercury sells aspirational distance to funded startup
founders; Dompet Garuda sells trust and closeness to people who've been
excluded from digital finance. Every mood-defining choice below is a
deliberate reversal, not an oversight.

| Element | Mercury (cold) | Dompet Garuda (warm) |
|---|---|---|
| Canvas undertone | Cool blue-black (#171721) | Warm near-black, slight green undertone (#12140f) |
| Accent color | Clinical cobalt blue | Organic sage green |
| Hero imagery | Misty mountains, solitary desk, distant/aspirational | Market vendor + customer completing a transfer, golden hour, close proximity, candid |
| Hero mechanism | Scroll-scrubbed video tied to scroll position | Static full-bleed photograph — see "still forbidden" below |
| Feature imagery | Abstract product UI screenshots, generic app mockups | Real device photography, real hands, real settings (§4, unchanged) |
| Letter-spacing on display type | Wide positive tracking (0.01–0.02em), "architectural" | Natural, max 0.005em — see §3 typography |
| Copy voice | Clever, punchy startup wordplay | Direct, human, warm Indonesian — same voice as the published articles |
| Font weight restraint | Kept (intermediate weight = confidence) | Kept — this is orthogonal to warmth |
| Flat cards, pill buttons, no shadows | Kept | Kept — modern minimalism, not corporate coldness on its own |

**The test for every new visual decision going forward:** if it makes the
site feel like a tool for a well-funded startup founder rather than a
market vendor in a real Indonesian town, it's wrong — reconsider it even
if it matches Mercury's structural pattern.

---

## 4. What NOT to design like (read before building any section)

Generic-fintech-template tropes to actively avoid:

- **No floating glossy 3D bank/credit card renders.** Dompet Garuda's product
  is a small handheld device, not a card.
- **No generic 3D chrome shield icon** for the security section. Ground
  security messaging in the actual mechanisms (Ed25519 signatures,
  double-entry ledger) rather than a stock "enterprise security" visual.
- No pricing/subscription section — the prototype has no billing.
- Every hero/feature image shows the **actual device** or **real
  offline-transaction scenarios** — never a generic smartphone-with-
  abstract-app-mockup image.
- **No scroll-scrubbed hero video** (Mercury does this — we don't, per
  §3a). Static full-bleed photography only.
- **No abstract product-UI-mockup imagery anywhere** — every image is
  real device photography or a real human scenario.

---

## 5. Project structure
src/
app/
layout.tsx # Root layout: fonts, ThemeProvider, smooth-scroll provider
page.tsx # Home page (hero + all sections)
globals.css
articles/
page.tsx # Article listing (from public API)
[slug]/
page.tsx # Single article page (generateMetadata per article)
sitemap.ts # Dynamic sitemap (includes published article slugs)
robots.ts
components/
ui/ # shadcn/ui generated components
sections/
hero.tsx
how-it-works.tsx
features.tsx
security.tsx
articles-teaser.tsx
footer.tsx
layout/
nav.tsx # Top nav, scroll-triggered frosted fill, mobile menu
theme-toggle.tsx
smooth-scroll-provider.tsx # Lenis, client-only, see §9
scroll-progress-bar.tsx # Thin top progress indicator, see §9
shared/
article-card.tsx
section-heading.tsx # Eyebrow tag (sand) + headline + optional subhead
lib/
api.ts # Fetches from https://api.dompetgaruda.com/public/articles
utils.ts
types/
article.ts # Article type matching the backend's public article shape


---

## 6. Public API integration (articles)

This site consumes the backend's existing **public, unauthenticated** endpoints — no login,
no token, no admin surface touches this codebase at all.

```ts
// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.dompetgaruda.com'

export async function getPublishedArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE_URL}/public/articles`, {
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  })
  if (!res.ok) return []
  return res.json()
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await fetch(`${BASE_URL}/public/articles/${slug}`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return null
  return res.json()
}
```

- Use Next.js's built-in fetch caching + `revalidate` (ISR) — do NOT reach for a client-side
  data-fetching library. Server components fetch directly.
- If the API is unreachable, fail gracefully: article sections show an empty state, never
  a broken page or thrown error.
- Render `article.contentHtml` via `dangerouslySetInnerHTML` — trusted content, consistent
  with the backoffice's own preview.

---

## 7. SEO requirements (this is why this site exists as Next.js, take it seriously)

- **Every route** must export `generateMetadata` with a unique `title`, `description`,
  and Open Graph tags (`og:title`, `og:description`, `og:image`).
- **Article pages** (`/articles/[slug]`): metadata pulled from the article's title +
  first ~160 characters of stripped content as description; `og:image` = the article's
  cover image URL.
- **Structured data (JSON-LD):** `Organization` schema on the homepage, `Article` schema
  on article pages.
- **`sitemap.ts`**: homepage, `/articles`, and every published article slug.
- **`robots.ts`**: allow all crawlers, point to the sitemap.
- **Images:** every `<Image>` has descriptive `alt` text.
- **Performance target:** near-zero client JavaScript for anything that isn't interactive.
  Prefer server components by default. The smooth-scroll provider (§9) is the one
  deliberate exception — it MUST be implemented so it never affects LCP or blocks
  server-rendered content (dynamic import, `ssr: false`).

---

## 8. Domain & deployment

- **Domains:** `dompetgaruda.com` (root/apex, canonical) AND `www.dompetgaruda.com`
  (redirects to root via Caddy).
- **Deployment:** Dockerfile with Next.js `output: 'standalone'`, GitHub Actions
  build+push to GHCR, deploy via SSH to the same VPS, served by the existing Caddy
  instance.
- **Apex domain:** A record for `@` and `www`, both pointing to `72.60.74.117`.

---

## 9. Motion and smooth scroll

A premium, Mercury-style smooth-scroll feel, implemented carefully so it never
compromises the SEO/performance mandate in §7, and never tips into the coldness
rejected in §3a.

### Smooth scroll — Lenis, optimized

- Add `lenis` (the modern successor to Locomotive Scroll) as the smooth
  momentum-scroll engine.
- Initialize it in a **client-only component**
  (`components/layout/smooth-scroll-provider.tsx`), dynamically imported
  with `ssr: false` — pure post-hydration enhancement, never affects
  server-rendered HTML, initial paint, or crawlability.
- **MUST check `window.matchMedia('(prefers-reduced-motion: reduce)')`
  before initializing.** If set, do NOT initialize Lenis — fall back to
  native scroll entirely. Not optional.
- Config: `duration: 1.1`, standard ease-out curve, `smoothWheel: true`.
  **Desktop only** — disable smooth scroll on touch devices (native touch
  scroll feels better; Lenis's touch smoothing can feel laggy).

### Scroll-triggered nav (the signature "modern" moment)

- `fixed` top, fully transparent over the hero (no background, no border)
  at scroll position 0.
- Past ~80px scroll: transitions to `bg-canvas/80 backdrop-blur-md
  border-b border-structural` — frosted-glass fill, smooth 300ms
  transition, never an abrupt snap.

### Scroll-triggered section reveals

- Every major section fades and slides up as it enters the viewport:
  `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`,
  `transition={{ duration: 0.6, ease: "easeOut" }}`, `viewport={{ once:
  true }}`.
- Apply this CONSISTENTLY across every section (hero, how-it-works,
  features, security, articles-teaser, footer) — consistency matters more
  than variety.

### Scroll progress indicator

- Thin (2px) fixed bar at the very top of the viewport, filled with the
  sage accent (`#7a9e8a`), width driven by scroll progress (0–100%).
  Framer Motion `useScroll` + `useSpring` for a smooth, not jumpy, fill.

### Still forbidden

- No parallax on photographic hero/feature images.
- No scroll-jacking or section-snapping — this is a content site with
  articles meant to be read normally.
- No cursor-follow effects, no staggered per-card animation delays.
- No scroll-scrubbed video (§3a, §4).

---

## 10. Environment variables
NEXT_PUBLIC_API_URL=https://api.dompetgaruda.com


Commit `.env.example`. No secrets needed — this site only calls public, unauthenticated
endpoints.

---

## 11. Git workflow

- Work on feature branches (`feat/...`). Open PRs against `main`.
- Never push directly to `main`.
- Keep PRs focused.
- Always use my GitHub account as contributor — never Claude.

---

## 12. What NOT to do

- Don't add Redux, Zustand, React Query, Axios, or SWR.
- Don't use raw `<img>` tags — always Next.js `<Image>`.
- Don't use generic fintech visual tropes — see §4.
- Don't animate everything — see §9.
- Don't default to English copy — see §1.
- Don't build a pricing/subscription section.
- Don't add authentication, login, or any admin functionality — that belongs in the
  backoffice repo.
- Don't hardcode article content — always fetch from the public API.
- Don't use Inter (or any default system font) for headings — see §3.
- Don't mark components `'use client'` unless they genuinely need it — see §7.
- Don't use sand (`#c4a882` / `#d9c6b0`) anywhere except small eyebrow-tag text — see §3.
- Don't widen letter-spacing beyond 0.005em on headings — see §3 and §3a.
- Don't build Mercury's scroll-scrubbed hero video — see §3a and §4.