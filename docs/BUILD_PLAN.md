# BUILD_PLAN — Dompet Garuda Landing Page (dompet-garuda-ui)

Hand these prompts to Claude Code one at a time. Review and merge each PR before the next.
This is a NEW repository — nothing exists yet.

---

## Draft copy reference (Indonesian — refine with Faisal, but usable now)

**Hero:**
- Eyebrow: `✱ Bayar di mana saja, tanpa sinyal.`
- Headline: **"Transfer tanpa internet, aman tanpa ribet."**
- Subhead: "Dompet Garuda memungkinkan transaksi langsung antar perangkat lewat Bluetooth — bahkan saat tidak ada koneksi internet sama sekali."
- CTA primary: `Pelajari Cara Kerja`
- CTA secondary: `Baca Artikel Kami`

**How It Works (three cards):**
- Cek Saldo — "Lihat saldo Anda kapan saja, online maupun offline."
- Transfer — "Kirim uang langsung ke perangkat lain lewat Bluetooth, tanpa internet."
- Scan QR — "Terima pembayaran secepat memindai kode QR."

**Features (photographic-background cards):**
- "Berfungsi di Mana Saja" — "Tidak butuh sinyal, tidak butuh WiFi. Transaksi tetap berjalan."
- "Keamanan Tingkat Bank" — "Setiap transaksi ditandatangani secara digital dan tidak bisa dipalsukan."
- "Cepat & Sederhana" — "Satu sentuhan, transfer selesai dalam hitungan detik."

**Security section:**
- Headline: "Dibangun di atas fondasi keamanan kriptografi nyata."
- Body: "Setiap transaksi offline ditandatangani menggunakan Ed25519 — standar kriptografi yang sama dipakai dalam sistem keamanan modern. Setiap Rupiah tercatat dalam ledger yang tidak bisa diubah."

**Articles teaser:**
- Headline: "Wawasan & Cerita dari Dompet Garuda"
- Subhead: "Pelajari lebih dalam tentang teknologi di balik pembayaran offline."

**Footer:** Product / Resources / Company columns (fill in real links as pages exist),
social icons only if Faisal has real accounts to link.

---

## Image asset prompts (for Gemini / Nano Banana — see chat log for full prompts)

1. Hero — market vendor + customer completing offline transfer, golden hour
2. Feature — close-up of two devices held near each other, rural setting
3. Feature — hand holding device showing Cek Saldo balance screen
4. Security — abstract geometric ledger/chain shapes, sage + sand tones
5. Product shot — single device, studio lighting, floating on gradient

Use placeholders (solid color blocks or simple SVG) in early PRs until real assets are ready —
do not block layout work on image generation.

---

## PR1 — Scaffold

```
Read CLAUDE.md fully before writing a single line.
Work on branch feat/scaffold, open a PR against main.

1. Initialize Next.js 16 App Router with Bun:
   bunx create-next-app@latest . \
     --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

2. Install and configure:
   - shadcn/ui (New York style, CSS variables enabled)
   - next-themes (default theme = dark, per CLAUDE.md §3)
   - framer-motion
   - next-sitemap
   Install these shadcn/ui components: button, card, sheet,
   separator, badge

3. Fonts (next/font/google): Space Grotesk (display) and
   Inter (body), per CLAUDE.md §3. Wire as CSS variables in
   root layout.

4. Apply the full color system from CLAUDE.md §3 to
   globals.css (dark AND light) and tailwind.config.ts.
   Dark mode is the DEFAULT — set defaultTheme="dark" in
   ThemeProvider, NOT "system".

5. Create the folder structure from CLAUDE.md §5. Empty
   placeholder section components (just a labeled <section>
   with a comment) for: hero, how-it-works, features,
   security, articles-teaser, footer. Wire them all into
   app/page.tsx in that order so the page renders top to
   bottom immediately, even with placeholder content.

6. Create lib/api.ts with getPublishedArticles and
   getArticleBySlug exactly as specified in CLAUDE.md §6.
   Create types/article.ts matching the backend's public
   article response shape (id, title, slug, contentHtml,
   coverImageUrl, status, authorId, publishedAt, createdAt,
   updatedAt).

7. Create .env.example with
   NEXT_PUBLIC_API_URL=https://api.dompetgaruda.com

8. Basic nav component (components/layout/nav.tsx) — logo
   text "Dompet Garuda", a few placeholder links, theme
   toggle, mobile hamburger using Sheet. This is a client
   component (needs state for mobile menu).

9. Verify: bun dev works, dark mode is the default on load,
   toggling to light mode works, fonts are visibly different
   from system default.

Open PR with screenshots of the empty-section scaffold in
both dark and light mode, desktop and mobile widths.
```

---

## PR2 — Hero + How It Works

```
Read CLAUDE.md fully — especially §3 (typography, dark-first),
§4 (avoid generic tropes), §9 (animation restraint).
Work on branch feat/hero-how-it-works.

1. Hero section (components/sections/hero.tsx):
   - Eyebrow tag (small, accent-colored, with a subtle icon
     or asterisk) — copy from BUILD_PLAN.md draft copy
   - Large headline using font-display, text-5xl md:text-7xl,
     tight leading
   - Subhead, text-secondary color, max-w for readability
   - Two CTA buttons (primary + outline/ghost secondary)
   - Hero image: use a placeholder (solid gradient block or
     simple illustration) with a comment noting
     "TODO: replace with generated asset — market vendor
     offline transfer scene" — do NOT block on real imagery
   - One Framer Motion entrance animation on the text block
     (fade + slide-up, ~500ms) — nothing else animated here

2. How It Works section (components/sections/how-it-works.tsx):
   - Section heading (use shared SectionHeading component —
     build it now: eyebrow + headline + optional subhead,
     reusable across all sections)
   - Three cards: Cek Saldo, Transfer, Scan QR — copy from
     BUILD_PLAN.md
   - Simple icon per card (lucide-react: Wallet, Send,
     QrCode or similar) — no images needed here
   - Scroll-triggered fade+slide-up on the section as a whole
     (whileInView, triggered once) — NOT staggered per-card
     animations

Open PR with screenshots: hero (dark + light, desktop +
mobile), how-it-works section (dark + light).
```

---

## PR3 — Features + Security

```
Read CLAUDE.md fully — especially §4 (no generic shield icon
or card renders).
Work on branch feat/features-security.

1. Features section (components/sections/features.tsx):
   - Three cards with photographic-style backgrounds
     (placeholder: use a solid color/gradient overlay for
     now, structured so a real background image slots in
     later — see hero's placeholder pattern)
   - Copy from BUILD_PLAN.md: "Berfungsi di Mana Saja",
     "Keamanan Tingkat Bank", "Cepat & Sederhana"
   - Responsive: 3 columns desktop, 1 column mobile, cards
     roughly matching the Naroo reference's card proportions

2. Security section (components/sections/security.tsx):
   - NO generic shield icon. Use the abstract geometric
     placeholder image slot described in CLAUDE.md §4, OR
     a simple custom SVG illustration hinting at a ledger/
     signature concept (interlocking shapes, sage/sand tones)
     — ask if unsure rather than defaulting to a stock shield.
   - Headline + body copy from BUILD_PLAN.md
   - Optional: a small "Learn More" link (can point to
     /articles or be a placeholder anchor for now)

Open PR with screenshots of both sections, dark + light mode.
```

---

## PR4 — Articles integration (real data, no more placeholders here)

```
Read CLAUDE.md fully — especially §6 (public API integration)
and §7 (SEO requirements).
Work on branch feat/articles.

This is the first PR that touches the LIVE public API —
https://api.dompetgaruda.com/public/articles is real and
already has published content.

1. Articles teaser section on the homepage
   (components/sections/articles-teaser.tsx):
   - Server component, calls getPublishedArticles() directly
   - Shows the 3 most recent published articles as cards
     (cover image via next/image, title, short excerpt —
     strip HTML tags from contentHtml and truncate to ~120
     chars for the excerpt)
   - "View All Articles" link → /articles
   - If zero articles exist: show a graceful empty state,
     not a broken section

2. Article listing page (app/articles/page.tsx):
   - Server component, calls getPublishedArticles()
   - Grid of ArticleCard components (build this shared
     component: cover image, title, published date, excerpt)
   - generateMetadata: title "Artikel — Dompet Garuda",
     appropriate description

3. Single article page (app/articles/[slug]/page.tsx):
   - Server component, calls getArticleBySlug(slug)
   - If not found: call notFound() from next/navigation
     (renders Next's 404)
   - Render: cover image (next/image, full width), title
     (font-display, large), published date, then
     contentHtml via dangerouslySetInnerHTML in a prose-
     styled container (readable max-width, generous
     line-height — Tailwind Typography plugin is fine to
     add here if useful)
   - generateMetadata: dynamic per article — title,
     description (from stripped content), Open Graph tags
     including og:image = article's cover image
   - Add Article JSON-LD structured data (schema.org)

4. ArticleCard component (components/shared/article-card.tsx):
   - Reusable across the teaser section and the listing page
   - Cover image, title, formatted date, excerpt, hover state

Open PR with screenshots of: homepage articles teaser showing
REAL published articles, the /articles listing page, and one
individual article page. Confirm the data is genuinely coming
from the live API (not mocked).
```

---

## PR5 — Footer + SEO finalization

```
Read CLAUDE.md fully — especially §7 (SEO requirements).
Work on branch feat/footer-seo.

1. Footer section (components/sections/footer.tsx):
   - Product / Resources / Company columns per BUILD_PLAN.md
     draft copy — use placeholder links (#) for pages that
     don't exist yet, real links (/articles) for pages that do
   - Copyright line with current year
   - No app store badges (no mobile app exists)

2. sitemap.ts (app/sitemap.ts):
   - Homepage, /articles, and every published article slug
     (fetch getPublishedArticles() at build/request time)

3. robots.ts (app/robots.ts):
   - Allow all crawlers, reference the sitemap

4. Root layout metadata (app/layout.tsx or a metadata
   export): Organization JSON-LD structured data on the
   homepage. Default Open Graph image (can be a placeholder
   for now — note TODO for a real one).

5. Verify every route has generateMetadata with a unique
   title and description — audit app/page.tsx,
   app/articles/page.tsx, app/articles/[slug]/page.tsx.

6. Run a quick Lighthouse check locally (bun run build &&
   bun run start, then Lighthouse in Chrome DevTools) and
   note the Performance/SEO/Accessibility scores in the PR
   description. Target: SEO 100, Performance 90+.

Open PR with the Lighthouse scores and confirmation that
sitemap.xml and robots.txt render correctly at
localhost:3000/sitemap.xml and /robots.txt.
```

---

## PR6 — Deployment (dompetgaruda.com + www)

```
Read CLAUDE.md fully — especially §8 (domain & deployment).
Work on branch feat/deployment.

1. Dockerfile (multi-stage, same pattern as the backoffice
   repo): deps -> builder (bun run build) -> runner
   (output: 'standalone', non-root user, EXPOSE 3000).

2. next.config.ts: output: 'standalone'.

3. .github/workflows/deploy.yml:
   - build-and-push: build + push to GHCR as
     ghcr.io/fai88al/dompet-garuda-ui:latest
   - deploy: SSH to VPS, docker compose up -d landing
   Trigger: push to main + workflow_dispatch
   Secrets needed (same names as other repos): VPS_HOST,
   VPS_USER, VPS_SSH_KEY

4. Document in README.md the manual steps needed in the
   BACKEND repo (docker-compose.prod.yml + Caddyfile) —
   do NOT attempt to edit the backend repo from here:

   docker-compose.prod.yml addition:
     landing:
       image: ghcr.io/fai88al/dompet-garuda-ui:latest
       container_name: dompet-landing
       restart: unless-stopped
       expose:
         - "3000"

   Caddyfile addition (root canonical, www redirects to root
   — confirm this is still the desired direction before
   applying):
     www.dompetgaruda.com {
         redir https://dompetgaruda.com{uri} permanent
     }

     dompetgaruda.com {
         reverse_proxy landing:3000
     }

   DNS records needed:
     Type A, Name @ (root), Value 72.60.74.117
     Type A, Name www, Value 72.60.74.117

Open PR with the Dockerfile/workflow. This PR does NOT touch
the backend repo — flag clearly in the PR description that a
companion manual step is needed there.
```

---

## After PR6 — manual steps in the BACKEND repo (not Claude Code)

1. Add the `landing` service block to `docker-compose.prod.yml` (content above).
2. Add the two Caddyfile blocks (content above) — confirm root vs `www` canonical direction
   with the human developer before applying, in case Faisal has a preference.
3. Add DNS A records for `@` (root) and `www`, both pointing to `72.60.74.117`.
4. Commit, push, wait for backend pipeline to deploy Caddy's new config.
5. Wait for DNS propagation (`nslookup dompetgaruda.com` and `nslookup www.dompetgaruda.com`).
6. Trigger the `dompet-garuda-ui` deploy workflow manually (or push to its main).
7. Verify: `curl -sf https://dompetgaruda.com` and `curl -sf https://www.dompetgaruda.com`
   (should redirect to root) both work, and Caddy has obtained valid certs for both.

---

## Standing reminders for every task

- One PR per task; keep them small and reviewable.
- Never push to main; never commit as the AI — commits are authored by your GitHub account.
- This codebase never touches auth, admin functionality, or the backend's write endpoints —
  read-only, public API calls only.
- If asked to add a section or feature not in this plan, confirm scope before building —
  don't guess at what Faisal wants for a public-facing page.