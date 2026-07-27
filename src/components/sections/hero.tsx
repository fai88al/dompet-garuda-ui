"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section data-tint="sage" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium tracking-wide text-accent-hover dark:text-accent">
            ✱ Bayar di mana saja, tanpa sinyal.
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Transfer tanpa internet, aman tanpa ribet.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Dompet Digital memungkinkan transaksi langsung antar perangkat
            lewat Bluetooth — bahkan saat tidak ada koneksi internet sama
            sekali.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">Pelajari Cara Kerja</Button>
            <Button size="lg" variant="outline">
              Baca Artikel Kami
            </Button>
          </div>
        </motion.div>

        {/* TODO: replace with generated asset — market vendor offline transfer scene */}
        <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 dark:from-primary/20 dark:via-accent/15 dark:to-background" />
      </div>
    </section>
  );
}
