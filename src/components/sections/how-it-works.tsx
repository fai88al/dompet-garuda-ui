import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  {
    num: "1",
    title: "Pasang & Hubungkan",
    description: "Sambungkan perangkat Dompet Garuda ke jaringan rumah atau ponsel Anda.",
  },
  {
    num: "2",
    title: "Pilih Transaksi",
    description: "Cek saldo, transfer online/offline, atau scan QR langsung dari layar.",
  },
  {
    num: "3",
    title: "Selesai, Aman",
    description: "Setiap transaksi terenkripsi dan tercatat secara real-time.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-secondary/70 to-background"
    >
      <div className="pointer-events-none absolute top-[8%] left-[-6%] size-[280px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.13_155_/_0.1),transparent_70%)]" />
      <Reveal className="relative mx-auto max-w-[1100px] px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja"
          headline="Tiga langkah untuk dompet yang lebih pintar."
          centered
        />

        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          <div className="absolute top-[26px] left-[8%] right-[8%] hidden h-px bg-[repeating-linear-gradient(90deg,oklch(0.7_0.06_155)_0_10px,transparent_10px_20px)] sm:block" />
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="shadow-step relative z-10 flex size-[52px] items-center justify-center rounded-full bg-primary text-[19px] font-extrabold text-primary-foreground">
                {step.num}
              </div>
              <h3 className="mt-5.5 font-display text-lg font-extrabold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
