import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContentPage } from "@/components/layout/content-page";
import { SITE_URL } from "@/lib/site";

const title = "Kontak — Dompet Garuda";
const description =
  "Cara menghubungi tim Dompet Garuda untuk pertanyaan, kerja sama, atau melaporkan kendala.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/kontak` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/kontak`,
    type: "website",
  },
};

// TODO(Faisal): konfirmasi alamat email resmi yang akan dipakai publik — ini masih placeholder.
const CONTACT_EMAIL = "hello@dompetgaruda.com";

export default function KontakPage() {
  return (
    <ContentPage
      eyebrow="Kontak"
      title="Hubungi Kami"
      subtitle="Ada pertanyaan, masukan, atau ingin bekerja sama dengan Dompet Garuda? Kami senang mendengarnya."
    >
      <div className="not-prose flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Mail className="size-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-display text-lg text-foreground hover:text-primary"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <p>
        Untuk saat ini, email adalah cara tercepat untuk menghubungi kami.
        Kami berupaya membalas setiap pesan dalam 1&ndash;2 hari kerja.
      </p>

      {/*
        TODO(Faisal): lengkapi saluran kontak lain begitu tersedia —
        nomor telepon / WhatsApp resmi, alamat kantor, dan tautan media
        sosial. Jangan tampilkan placeholder palsu ke publik sebelum
        datanya benar-benar dikonfirmasi.
      */}
    </ContentPage>
  );
}
