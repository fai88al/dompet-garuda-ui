import { SectionHeading } from "@/components/shared/section-heading";
import Link from "next/link";

export function Security() {
  return (
    <section id="keamanan" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Keamanan"
            headline="Dibangun di atas fondasi keamanan kriptografi nyata."
            subhead="Setiap transaksi offline ditandatangani menggunakan Ed25519 — standar kriptografi yang sama dipakai dalam sistem keamanan modern. Setiap Rupiah tercatat dalam ledger yang tidak bisa diubah."
          />
          <Link
            href="/articles"
            className="mt-6 inline-block text-sm font-medium text-primary hover:text-primary-hover"
          >
            Pelajari Lebih Lanjut →
          </Link>
        </div>

        {/* Abstract ledger/signature illustration — interlocking blocks, no generic shield icon (see CLAUDE.md §4) */}
        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="mx-auto w-full max-w-sm text-primary"
          aria-hidden="true"
        >
          <rect
            x="60"
            y="60"
            width="140"
            height="140"
            rx="20"
            className="stroke-current"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <rect
            x="130"
            y="130"
            width="140"
            height="140"
            rx="20"
            className="stroke-current"
            strokeWidth="2"
            fill="var(--accent)"
            fillOpacity="0.15"
          />
          <rect
            x="200"
            y="200"
            width="140"
            height="140"
            rx="20"
            className="stroke-current"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <line
            x1="130"
            y1="130"
            x2="200"
            y2="200"
            className="stroke-current"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <circle cx="130" cy="130" r="5" fill="var(--accent)" />
          <circle cx="270" cy="270" r="5" className="fill-current" />
        </svg>
      </div>
    </section>
  );
}
