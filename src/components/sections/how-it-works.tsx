"use client";

import { motion } from "framer-motion";
import { Wallet, Send, QrCode } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";

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
  return (
    <motion.section
      id="cara-kerja"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-16 border-b border-border"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja"
          headline="Tiga langkah, tanpa ribet."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-card">
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
    </motion.section>
  );
}
