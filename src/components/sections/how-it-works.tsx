import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  {
    num: "1",
    title: "Registrasi & Provisi",
    description: "Daftarkan akun Anda dan aktifkan perangkat Dompet Garuda dalam hitungan menit.",
  },
  {
    num: "2",
    title: "Topup Saldo Anda",
    description: "Isi saldo lewat metode favorit Anda, langsung tersimpan di perangkat.",
  },
  {
    num: "3",
    title: "Pilih Transaksi",
    description: "Cek saldo, transfer, atau scan QR langsung dari layar perangkat.",
  },
  {
    num: "4",
    title: "Rasakan Transaksi Offline/Online",
    description: "Bertransaksi kapan saja — dengan atau tanpa koneksi internet.",
  },
  {
    num: "5",
    title: "Selesai",
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
      <Reveal className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja"
          headline="Lima langkah untuk dompet yang lebih pintar."
          centered
        />

        <div className="relative mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="absolute top-[26px] left-[6%] right-[6%] hidden h-px bg-[repeating-linear-gradient(90deg,oklch(0.7_0.06_155)_0_10px,transparent_10px_20px)] lg:block" />
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
