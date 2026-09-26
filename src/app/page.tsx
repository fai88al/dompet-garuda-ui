import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Security } from "@/components/sections/security";
import { ArticlesTeaser } from "@/components/sections/articles-teaser";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dompet Garuda — Transfer tanpa internet, aman tanpa ribet",
  description:
    "Dompet Garuda memungkinkan transaksi langsung antar perangkat lewat Bluetooth — bahkan saat tidak ada koneksi internet sama sekali.",
  alternates: { canonical: SITE_URL },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dompet Garuda",
  url: SITE_URL,
  description:
    "Dompet Garuda adalah perangkat pembayaran offline berbasis Bluetooth untuk pedagang dan pengguna Indonesia.",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Features />
      <HowItWorks />
      <Security />
      <ArticlesTeaser />
      <Cta />
      <Footer />
    </main>
  );
}
