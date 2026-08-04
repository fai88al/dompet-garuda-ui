import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/content-page";
import { SITE_URL } from "@/lib/site";

const title = "Tentang Kami — Dompet Garuda";
const description =
  "Cerita di balik Dompet Garuda: mengapa kami membangun dompet digital yang tetap bisa bertransaksi tanpa internet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/tentang-kami` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tentang-kami`,
    type: "website",
  },
};

export default function TentangKamiPage() {
  return (
    <ContentPage
      eyebrow="Tentang Kami"
      title="Dibangun untuk Indonesia yang sesungguhnya"
      subtitle="Bukan Indonesia yang selalu punya sinyal penuh dan WiFi kencang — tapi Indonesia yang sebenarnya kita semua tahu."
    >
      <h2>Masalahnya</h2>
      <p>
        Hampir semua dompet digital yang ada hari ini dibangun dengan satu
        asumsi diam-diam: bahwa penggunanya selalu punya koneksi internet
        yang stabil. Asumsi itu masuk akal kalau Anda merancang produk dari
        kantor di kota besar. Tapi begitu Anda pergi ke pasar tradisional di
        pinggiran, ke desa yang jauh dari BTS terdekat, atau bahkan cuma ke
        basement mal yang sinyalnya mati total — asumsi itu langsung runtuh.
      </p>
      <p>
        Pedagang di tempat-tempat itu bukan tidak mau menggunakan pembayaran
        digital. Banyak dari mereka justru sudah mencoba, dan berhenti
        karena transaksi gagal di tengah jalan, QR yang tidak bisa dipindai
        karena aplikasi tidak bisa memuat, atau pembeli yang akhirnya
        membatalkan belanja karena tidak ada cara lain untuk membayar. Yang
        hilang bukan cuma satu transaksi — tapi kepercayaan terhadap seluruh
        sistem.
      </p>

      <h2>Misi kami</h2>
      <p>
        Dompet Garuda dibangun dengan satu pertanyaan sederhana: bagaimana
        kalau pembayaran digital tidak lagi bergantung pada sinyal sama
        sekali? Kami membangun perangkat pembayaran fisik yang bisa
        bertransaksi langsung antar perangkat lewat Bluetooth, dengan
        keamanan kriptografis yang sama kuatnya dengan sistem perbankan —
        tanpa perlu internet untuk menyelesaikan satu transaksi pun.
      </p>
      <p>
        Misi kami bukan menggantikan sistem pembayaran digital yang sudah
        ada, tapi mengisi celah yang selama ini diabaikan: pedagang pasar,
        warung kecil, dan siapa pun yang tinggal atau bekerja di area dengan
        konektivitas yang tidak bisa diandalkan.
      </p>

      <h2>Visi kami</h2>
      <p>
        Kami membayangkan masa depan di mana lokasi geografis atau kualitas
        sinyal tidak lagi menentukan siapa yang bisa ikut serta dalam
        ekonomi digital. Di mana seorang pedagang di pasar terpencil punya
        alat yang sama andalnya dengan toko di pusat kota. Dompet Garuda
        adalah langkah pertama kami menuju visi itu — satu perangkat kecil,
        untuk masalah yang selama ini dianggap terlalu besar untuk
        diselesaikan.
      </p>
    </ContentPage>
  );
}
