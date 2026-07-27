import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  {
    title: "Berfungsi di Mana Saja",
    description: "Tidak butuh sinyal, tidak butuh WiFi. Transaksi tetap berjalan.",
    // TODO: replace with generated asset — close-up of two devices held near each other, rural setting
    gradient: "from-primary/60 via-primary/20 to-transparent",
  },
  {
    title: "Keamanan Tingkat Bank",
    description:
      "Setiap transaksi ditandatangani secara digital dan tidak bisa dipalsukan.",
    // TODO: replace with generated asset — abstract geometric ledger/chain shapes, sage + sand tones
    gradient: "from-accent/60 via-accent/20 to-transparent",
  },
  {
    title: "Cepat & Sederhana",
    description: "Satu sentuhan, transfer selesai dalam hitungan detik.",
    // TODO: replace with generated asset — hand holding device showing Cek Saldo balance screen
    gradient: "from-primary/50 via-accent/20 to-transparent",
  },
];

export function Features() {
  return (
    <section data-tint="neutral" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keunggulan"
          headline="Didesain untuk kenyataan di lapangan."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map(({ title, description, gradient }) => (
            <div
              key={title}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
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
      </div>
    </section>
  );
}
