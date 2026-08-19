import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const features = [
  {
    title: "Berfungsi di Mana Saja",
    description: "Tidak butuh sinyal, tidak butuh WiFi. Transaksi tetap berjalan.",
    image: "/images/offline_transaction.png",
    alt: "Dua perangkat Dompet Garuda melakukan transaksi offline langsung tanpa sinyal",
  },
  {
    title: "Keamanan Tingkat Bank",
    description:
      "Setiap transaksi ditandatangani secara digital dan tidak bisa dipalsukan.",
    image: "/images/processor.png",
    alt: "Chip prosesor keamanan di dalam perangkat Dompet Garuda yang menandatangani setiap transaksi",
  },
  {
    title: "Cepat & Sederhana",
    description: "Satu sentuhan, transfer selesai dalam hitungan detik.",
    image: "/images/offline_qris.png",
    alt: "Pemindaian kode QR offline menggunakan perangkat Dompet Garuda",
  },
];

export function Features() {
  return (
    <section data-tint="neutral" className="border-b border-border">
      <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keunggulan"
          headline="Didesain untuk kenyataan di lapangan."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map(({ title, description, image, alt }) => (
            <div
              key={title}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card"
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 backdrop-blur-md [mask-image:linear-gradient(to_top,black,transparent)] [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-display text-xl text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
