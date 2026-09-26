import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { TrustIcon, type TrustShape } from "@/components/shared/trust-icon";

const features: { shape: TrustShape; title: string; description: string }[] = [
  {
    shape: "aman",
    title: "Aman",
    description: "Data Anda terlindungi dengan enkripsi end-to-end di setiap transaksi.",
  },
  {
    shape: "terhubung",
    title: "Terhubung",
    description: "Kapan saja, di mana saja — perangkat Anda selalu siap terhubung.",
  },
  {
    shape: "cepat",
    title: "Cepat",
    description: "Transaksi selesai tanpa delay, kapan pun Anda membutuhkannya.",
  },
  {
    shape: "praktis",
    title: "Praktis",
    description: "Satu perangkat untuk semua kebutuhan transaksi harian Anda.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-b border-border">
      <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Mengapa Dompet Garuda"
          headline="Dibangun untuk kehidupan yang selalu terhubung dan aman."
          centered
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ shape, title, description }) => (
            <div
              key={title}
              className="shadow-soft hover:shadow-elevated group rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <TrustIcon shape={shape} className="size-4" />
              </div>
              <h3 className="mt-4.5 font-display text-[19px] font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
