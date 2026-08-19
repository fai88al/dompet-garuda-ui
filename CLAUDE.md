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
- **Animation:** Framer Motion, used sparingly (see §9) — NOT on every element.
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
> of small interactive islands (mobile nav toggle, theme toggle, maybe a contact form).

---

## 3. Design system — Mercury-inspired dark monochrome, sage accent

> Reference: Mercury.com design language (styles.refero.design/style/3172cd4d-...).
> We adopt the STRUCTURE and DISCIPLINE of this system — dark canvas, single
> chromatic accent, flat borderless cards, pill controls, generous spacing,
> restrained intermediate-weight type — but the accent color is Dompet Garuda's
> own sage green, never Mercury's cobalt. This keeps the landing page visually
> consistent with the already-shipped backoffice (also sage/sand).

### Color — one accent, disciplined use

**Dark mode (default):**
- Canvas (page background): `#12140f`
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
  (e.g. one CTA button, one active nav state). Never used decoratively,
  never as an icon fill, never as a secondary-button color.
- Pure white (text on filled accent buttons only): `#ffffff`

**Light mode** (secondary experience, toggle only): canvas `#f1f1f1`, card
`#ffffff`, accent `#5d7066`, text `#1a1a1a`, muted `#6b7280`.

### Typography — intermediate weight, never bold

Mercury's signature restraint is avoiding true bold (700+) entirely, using an
intermediate weight instead. We approximate this with the fonts we have:

- **Display/headings (Space Grotesk):** weight **500** (medium), NOT 700.
  This is a deliberate downgrade from a typical bold hero headline — the
  confidence comes from SIZE and letter-spacing, not weight.
- **Body (Inter):** weight 400 for paragraphs, 500 for emphasis. Never 600+.
- **Letter-spacing:** small positive tracking on display sizes
  (0.01em–0.02em) — gives headlines an "architectural, wide-set" quality
  rather than tight editorial compression.
- **Line-height:** tight on display (1.1–1.15), generous on body (1.5).
- Hero headline: `text-5xl md:text-7xl font-medium tracking-[0.01em]
  leading-[1.1]` — not `font-bold`.

### Shape — pills and flat cards, zero shadows

- **Buttons, inputs, nav pills:** `rounded-full` (or `rounded-[32px]` /
  `rounded-[40px]`) — every interactive control is a pill. Sharp corners
  are reserved for structural elements only (rare in this design).
- **Cards:** `rounded-xl` (12px), `p-8` (32px padding), background is the
  card-surface color, **NO box-shadow anywhere in this codebase**.
  Separation between card and canvas comes purely from the value
  difference between `#12140f` and `#1a1f1b` — remove any `shadow-*`
  Tailwind classes from existing components.

### Spacing — generous, consistent rhythm

- Section vertical padding: `py-24` (matches Mercury's 72px-ish rhythm,
  rounded to Tailwind's scale)
- Card padding: `p-8` (32px)
- Page content max-width: `max-w-6xl` (~1200px, matches Mercury's
  page-max-width token)
- Gap between elements within a card/section: `gap-3` (12px) for tight
  groups, `gap-8` for section-level groups

### Component patterns (translate directly from Mercury's spec, sage not cobalt)

- **Primary CTA button:** `bg-primary-dark text-onyx-canvas` (dark text on
  the light sage — check contrast), `rounded-full`, `px-8 py-4`, no border,
  no shadow, `font-medium`.
- **Ghost/outline button:** `bg-transparent border border-ivory-text/60
  text-ivory-text rounded-full px-6 py-3`. Never colored — ivory only.
- **Nav pill links:** transparent, `rounded-full`, `px-5`, floats over the
  hero, NO background until scroll (see §9 for scroll-triggered nav fill).

### Why dark-first
The product story is "offline, no signal, works anywhere" — a darker, more premium palette
reinforces that this isn't a generic banking app. Dark mode is the DEFAULT theme; light mode
is available via toggle but is the secondary experience.

### Color palette

Same brand colors as the backoffice, reused for consistency across the whole product family:

**Dark mode (default):**
- **Background:** `#12140f` → near-black with a very slight warm/green undertone (NOT pure black)
- **Surface (cards/sections):** `#1a1f1b`
- **Primary:** `#7a9e8a` (lightened sage — buttons, links, active states)
- **Primary hover:** `#8fb09c`
- **Accent:** `#c4a882` (muted warm sand — highlights, eyebrow tags, badges)
- **Text primary:** `#f1f1f1`
- **Text secondary:** `#9ca3af`
- **Border:** `#2a3129`

**Light mode:**
- **Background:** `#f1f1f1`
- **Surface:** `#ffffff`
- **Primary:** `#5d7066`
- **Primary hover:** `#4a5c53`
- **Accent:** `#d9c6b0`
- **Text primary:** `#1a1a1a`
- **Text secondary:** `#6b7280`
- **Border:** `#e5e7eb`

### Typography

Do NOT use the default Inter/system-ui — this is the single biggest lever for avoiding
a generic/templated look.

- **Display/headings:** A confident, slightly condensed sans-serif with real personality —
  use `next/font/google` to load **"Space Grotesk"** (headings, large text, hero copy).
- **Body:** **"Inter"** is fine for body copy specifically (small text, paragraphs) since
  it's genuinely excellent for readability at small sizes — the "generic" feeling comes
  from using Inter for EVERYTHING, not from using it at all.
- Headline sizes should be large and confident: hero headline `text-5xl` to `text-7xl`
  depending on breakpoint, tight `leading-[1.05]` to `leading-[1.1]`.

### Tailwind config

```ts
colors: {
  primary: {
    DEFAULT: '#5d7066',
    hover: '#4a5c53',
    dark: '#7a9e8a',
    'dark-hover': '#8fb09c',
  },
  accent: {
    DEFAULT: '#d9c6b0',
    dark: '#c4a882',
  },
},
fontFamily: {
  display: ['var(--font-space-grotesk)', 'sans-serif'],
  body: ['var(--font-inter)', 'sans-serif'],
}
```

---

## 4. What NOT to design like (read before building any section)

These are the specific generic-fintech-template tropes to actively avoid, agreed on with
the human developer after reviewing reference designs:

- **No floating glossy 3D bank/credit card renders.** Dompet Garuda's product is a small
  handheld device, not a card — using card imagery misrepresents the product.
- **No generic 3D chrome shield icon** for the security section. Ground security messaging
  in the actual mechanisms (Ed25519 signatures, double-entry ledger) rather than a stock
  "enterprise security" visual.
  section unless Faisal explicitly asks for one later — the prototype has no billing.
- Every hero/feature image should show the **actual device** or **real offline-transaction
  scenarios** (market vendors, rural settings, two devices near each other) — never a
  generic smartphone-with-abstract-app-mockup image.

---

## 5. Project structure

```
src/
  app/
    layout.tsx                 # Root layout: fonts, ThemeProvider, default dark
    page.tsx                   # Home page (hero + all sections)
    globals.css
    articles/
      page.tsx                 # Article listing (from public API)
      [slug]/
        page.tsx                # Single article page (generateMetadata per article)
    sitemap.ts                  # Dynamic sitemap (includes published article slugs)
    robots.ts
  components/
    ui/                         # shadcn/ui generated components
    sections/
      hero.tsx
      how-it-works.tsx
      features.tsx
      security.tsx
      articles-teaser.tsx
      footer.tsx
    layout/
      nav.tsx                   # Top nav, mobile menu (client component — needs state)
      theme-toggle.tsx
    shared/
      article-card.tsx
      section-heading.tsx        # Eyebrow tag + headline + optional subhead, reused everywhere
  lib/
    api.ts                       # Fetches from https://api.dompetgaruda.com/public/articles
    utils.ts
  types/
    article.ts                   # Article type matching the backend's public article shape
```

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
  data-fetching library. Server components fetch directly; no loading spinners needed for
  the article list/detail pages since they render server-side.
- If the API is unreachable, fail gracefully: article sections show an empty state, never
  a broken page or thrown error visible to the visitor.
- Render `article.contentHtml` via `dangerouslySetInnerHTML` — this is trusted content
  (written by an authenticated WRITER/ADMIN through the backoffice), consistent with how
  the backoffice's own preview renders it.

---

## 7. SEO requirements (this is why this site exists as Next.js, take it seriously)

- **Every route** must export `generateMetadata` with a unique `title`, `description`,
  and Open Graph tags (`og:title`, `og:description`, `og:image`).
- **Article pages** (`/articles/[slug]`): metadata pulled from the article's title +
  first ~160 characters of stripped content as description; `og:image` = the article's
  cover image URL.
- **Structured data (JSON-LD):** add `Organization` schema on the homepage, `Article`
  schema on article pages.
- **`sitemap.ts`**: must include the homepage, `/articles`, and every published article
  slug (fetched at build/request time from the public API).
- **`robots.ts`**: allow all crawlers, point to the sitemap.
- **Images:** every `<Image>` must have descriptive `alt` text — never empty or generic
  ("image", "photo").
- **Performance target:** this site should ship near-zero client JavaScript for anything
  that isn't interactive (nav toggle, theme toggle). Prefer server components by default;
  only mark a component `'use client'` when it genuinely needs interactivity or browser APIs.

---

## 8. Domain & deployment

- **Domains:** `dompetgaruda.com` (root/apex) AND `www.dompetgaruda.com` — both must work
  and serve the same site. Standard approach: one is canonical (root), the other redirects
  (Caddy handles this — `www` redirects to root, or vice versa; confirm with the human
  developer which is canonical before writing the Caddyfile block. Default assumption
  unless told otherwise: **root is canonical, `www` redirects to root**.)
- **Deployment:** same pattern as the backoffice — Dockerfile with Next.js `output: 'standalone'`,
  GitHub Actions build+push to GHCR, deploy via SSH to the same VPS, served by the existing
  Caddy instance (already running for `api.`, `mqtt.`, `backoffice.` subdomains).
- **Apex domain caveat:** Caddy can obtain a cert for an apex domain directly (no special
  handling needed, unlike some older ACME setups) — but confirm the apex A record points to
  the VPS IP `72.60.74.117`, and a CNAME or second A record exists for `www` pointing to the
  same IP (apex domains cannot use CNAME per DNS spec, so `www` gets an A record too, not a
  CNAME to the apex).

---

## 9. Motion and smooth scroll (revised)

This section replaces the prior more conservative animation guidance — we
are explicitly adding a premium, Mercury-style smooth-scroll feel, but
implemented carefully so it never compromises the SEO/performance mandate
in §7.

### Smooth scroll — Lenis, optimized

- Add `lenis` (the modern successor to Locomotive Scroll) as the smooth
  momentum-scroll engine.
- Initialize it in a **client-only component**
  (`components/layout/smooth-scroll-provider.tsx`), dynamically imported
  with `ssr: false` so it never affects server-rendered HTML, initial
  paint, or crawlability. This is a pure post-hydration enhancement.
- **MUST check `window.matchMedia('(prefers-reduced-motion: reduce)')`
  before initializing.** If the user has that OS setting, do NOT
  initialize Lenis at all — fall back to native browser scroll entirely.
  This is not optional.
- Lenis config: `duration: 1.1`, `easing` a standard ease-out curve,
  `smoothWheel: true`. Do not enable touch-device smoothing overrides —
  native touch scroll feels better on mobile and Lenis's touch smoothing
  can feel laggy; disable smooth scroll on touch, keep it desktop-only.

### Scroll-triggered nav (the signature "modern" moment)

- Nav bar is `fixed` top, starts fully transparent over the hero
  (no background, no border).
- On scroll past ~80px: nav transitions to `bg-canvas/80 backdrop-blur-md
  border-b border-structural` — a frosted-glass solid fill. Use Framer
  Motion or a simple scroll-listener + CSS transition (300ms) — whichever
  is already idiomatic in the codebase.
- This transition must be smooth, not an abrupt snap.

### Scroll-triggered section reveals (refine existing pattern)

- Every major section fades and slides up as it enters the viewport:
  `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`,
  `transition={{ duration: 0.6, ease: "easeOut" }}`, `viewport={{ once:
  true }}`.
- Apply this CONSISTENTLY to every section (hero already has its own
  entrance; how-it-works, features, security, articles-teaser, footer
  all get this same treatment) — consistency matters more than variety.

### Optional — scroll progress indicator

- A thin (2px) fixed bar at the very top of the viewport, filled with the
  sage accent color, width driven by scroll progress (0–100%). Cheap,
  genuinely reads as "modern product site." Use Framer Motion's
  `useScroll` + `useSpring` for a smooth (not jumpy) fill.

### Still forbidden (unchanged from before)

- No parallax on photographic hero/feature images (§4 still applies —
  keep imagery honest, not gimmicky).
- No scroll-jacking or section-snapping — this is a content site with
  articles meant to be read normally, not a single-viewport product demo.
- No cursor-follow effects, no staggered per-card animation delays.

---

## 10. Environment variables

```
NEXT_PUBLIC_API_URL=https://api.dompetgaruda.com
```

Commit `.env.example`. No secrets needed — this site only calls public, unauthenticated
endpoints.

---

## 11. Git workflow

- Work on feature branches (`feat/...`). Open PRs against `main`.
- Never push directly to `main`.
- Keep PRs focused — one section or one feature per PR (see BUILD_PLAN.md for the sequence).
- Always use my GitHub account as contributor — never Claude.

---

## 12. What NOT to do

- Don't add Redux, Zustand, React Query, Axios, or SWR.
- Don't use raw `<img>` tags — always Next.js `<Image>`.
- Don't use generic fintech visual tropes — see §4.
- Don't animate everything — see §9.
- Don't default to English copy — see §1.
- Don't build a pricing/subscription section — not applicable to this product.
- Don't add authentication, login, or any admin functionality to this codebase — that
  belongs in the backoffice repo.
- Don't hardcode article content — always fetch from the public API.
- Don't use Inter (or any default system font) for headings — see §3.
- Don't mark components `'use client'` unless they genuinely need it — see §7.