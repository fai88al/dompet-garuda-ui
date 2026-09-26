import { Button } from "@/components/ui/button";
import { HeroBackground, DeviceStage } from "@/components/sections/hero-scene";
import { TrustIcon, type TrustShape } from "@/components/shared/trust-icon";

const trustBadges: { label: string; shape: TrustShape }[] = [
  { label: "Aman", shape: "aman" },
  { label: "Terhubung", shape: "terhubung" },
  { label: "Cepat", shape: "cepat" },
  { label: "Praktis", shape: "praktis" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="dg-motion flex min-w-0 flex-col gap-5" style={{ animation: "dg-rise 0.7s ease both" }}>
          <h1 className="font-serif-display text-[clamp(46px,6.2vw,76px)] leading-[1.04] tracking-[-0.01em] text-foreground">
            Dompet pintar
            <br />
            untuk masa depan
            <br />
            <span className="text-primary">yang lebih cerdas.</span>
          </h1>
          <p
            className="dg-motion max-w-[480px] text-[clamp(16px,1.6vw,19px)] leading-[1.6] text-muted-foreground"
            style={{ animation: "dg-rise 0.7s ease 0.1s both" }}
          >
            Dompet Garuda menghubungkan dompet fisik Anda ke dunia digital —
            transfer, scan QR, dan cek saldo langsung dari perangkat, aman dan
            terhubung kapan saja.
          </p>
          <div
            className="dg-motion mt-1 flex flex-wrap gap-3.5"
            style={{ animation: "dg-rise 0.7s ease 0.2s both" }}
          >
            <Button
              size="lg"
              className="shadow-button hover:shadow-button-lg h-auto rounded-[14px] px-7 py-3.5 text-[15px] font-bold transition-all hover:-translate-y-0.5 hover:scale-[1.03]"
              render={<a href="#cta" />}
              nativeButton={false}
            >
              Dapatkan Dompet Garuda
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-auto rounded-[14px] border-hairline px-7 py-3.5 text-[15px] font-bold transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:border-primary/50"
              render={<a href="#cara-kerja" />}
              nativeButton={false}
            >
              Lihat cara kerjanya
            </Button>
          </div>
          <div
            className="dg-motion mt-2 flex flex-wrap gap-4 sm:gap-8"
            style={{ animation: "dg-rise 0.7s ease 0.3s both" }}
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5">
                <TrustIcon shape={badge.shape} className="size-[15px] shrink-0" />
                <span className="text-[13px] font-bold text-muted-foreground">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0" style={{ perspective: "1400px" }}>
          <DeviceStage />
        </div>
      </div>

      <div className="absolute bottom-[22px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
        Gulir
        <div className="h-[26px] w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
