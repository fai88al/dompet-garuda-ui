"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGsapReveal, useMagnetic, REVEAL_INITIAL_STYLE } from "@/lib/motion";

const chips = ["Bluetooth Connection", "Ed25519 Signed", "Tanpa Perlu Sinyal"];

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
        <div ref={contentRef} style={REVEAL_INITIAL_STYLE}>
          <p className="text-sm font-medium tracking-wide text-accent-hover dark:text-accent">
            ✱ Bayar di mana saja, tanpa sinyal.
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
            Transfer tanpa internet, aman tanpa ribet.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Dompet Garuda memungkinkan transaksi langsung antar perangkat
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

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-accent/30 bg-card/40 backdrop-blur-xl">
          <Image
            src="/images/hero.png"
            alt="Perangkat Dompet Garuda digunakan untuk transaksi offline langsung antar perangkat"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
}
