import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function Cta() {
  return (
    <section id="cta" className="scroll-mt-16 overflow-hidden">
      <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[32px] p-9 sm:p-14"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.32 0.09 158), oklch(0.42 0.11 155))",
          }}
        >
          <div className="pointer-events-none absolute -top-[20%] -right-[10%] size-[320px] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.1_160_/_0.25),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="dg-motion absolute top-0 left-0 h-full w-2/5 bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
              style={{ animation: "dg-shine 5s ease-in-out infinite 1s" }}
            />
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-7">
            <div className="max-w-[520px] min-w-0">
              <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-extrabold text-white text-pretty">
                Siap beralih ke dompet yang lebih pintar?
              </h2>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-white/90">
                Bergabung dengan pengguna Dompet Garuda dan rasakan transaksi
                yang aman, cepat, dan terhubung kapan saja.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Button
                size="lg"
                className="h-auto rounded-[14px] bg-white px-7 py-3.5 text-[15px] font-extrabold text-[oklch(0.3_0.09_158)] hover:bg-white/90"
                render={<a href="/kontak" />}
                nativeButton={false}
              >
                Mulai Sekarang
              </Button>
              <Button
                size="lg"
                className="h-auto rounded-[14px] border border-white/30 bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white hover:bg-white/20"
                render={<a href="/kontak" />}
                nativeButton={false}
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
