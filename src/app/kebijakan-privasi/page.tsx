import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/layout/content-page";
import { SITE_URL } from "@/lib/site";

const title = "Kebijakan Privasi — Dompet Garuda";
const description =
  "Kebijakan privasi Dompet Garuda: data apa saja yang kami kumpulkan, bagaimana data tersebut digunakan dan dilindungi, serta hak Anda sebagai pengguna.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/kebijakan-privasi` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/kebijakan-privasi`,
    type: "website",
  },
};

const LAST_UPDATED = "4 Agustus 2026";

/**
 * DRAFT — bukan nasihat hukum. Isi halaman ini disusun sebagai kerangka awal
 * dan HARUS ditinjau serta disetujui oleh Faisal (atau penasihat hukum yang
 * berwenang) sebelum situs ini benar-benar diluncurkan ke publik.
 */
export default function KebijakanPrivasiPage() {
  return (
    <ContentPage
      eyebrow="Kebijakan Privasi"
      title="Kebijakan Privasi"
      subtitle={`Terakhir diperbarui: ${LAST_UPDATED}`}
    >
      <div className="not-prose mb-10 rounded-2xl border border-hairline bg-secondary p-4 text-sm text-foreground">
        <strong>Catatan:</strong> Halaman ini masih berupa draf awal dan
        belum ditinjau secara hukum. Isinya belum dapat dijadikan acuan
        resmi sampai ditinjau dan disetujui oleh tim Dompet Garuda.
      </div>

      <p>
        Kebijakan privasi ini menjelaskan bagaimana Dompet Garuda
        mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi
        pengguna perangkat dan situs kami.
      </p>

      <h2>Data yang kami kumpulkan</h2>
      <p>Untuk menyediakan layanan, kami dapat mengumpulkan data berikut:</p>
      <ul>
        <li>
          <strong>Nama</strong> — digunakan untuk mengidentifikasi pemilik
          akun dan perangkat.
        </li>
        <li>
          <strong>Nomor telepon</strong> — digunakan untuk verifikasi akun
          dan sebagai kontak jika terjadi kendala keamanan, misalnya
          perangkat hilang.
        </li>
        <li>
          <strong>Riwayat transaksi</strong> — dicatat untuk keperluan
          settlement, audit keuangan, dan mendeteksi aktivitas mencurigakan.
        </li>
      </ul>

      <h2>Bagaimana data digunakan</h2>
      <p>Data yang dikumpulkan digunakan untuk:</p>
      <ul>
        <li>Memverifikasi identitas pemilik perangkat dan akun.</li>
        <li>
          Memproses dan mencatat transaksi, termasuk settlement saat
          perangkat kembali online.
        </li>
        <li>Mencegah penipuan dan penyalahgunaan sistem.</li>
        <li>
          Menghubungi pengguna terkait keamanan akun, misalnya saat
          perangkat dilaporkan hilang.
        </li>
      </ul>
      <p>
        Kami tidak menjual data pribadi pengguna kepada pihak ketiga untuk
        kepentingan pemasaran.
      </p>

      <h2>Bagaimana data disimpan dan diamankan</h2>
      <p>
        Riwayat transaksi disimpan dalam ledger yang tidak bisa diubah
        (immutable), dan setiap transaksi ditandatangani secara kriptografis
        menggunakan Ed25519. Data pribadi disimpan pada infrastruktur server
        yang dilindungi dengan kontrol akses terbatas, dan hanya dapat
        diakses oleh personel yang berwenang untuk keperluan operasional
        yang sah.
      </p>

      <h2>Hak pengguna</h2>
      <p>Sebagai pengguna, Anda berhak untuk:</p>
      <ul>
        <li>Meminta informasi mengenai data pribadi yang kami simpan tentang Anda.</li>
        <li>Meminta koreksi jika terdapat data yang tidak akurat.</li>
        <li>
          Meminta penghapusan data pribadi Anda, sepanjang tidak bertentangan
          dengan kewajiban pencatatan keuangan yang berlaku.
        </li>
      </ul>

      <h2>Kontak seputar privasi</h2>
      <p>
        Pertanyaan mengenai kebijakan privasi ini dapat disampaikan melalui
        halaman <Link href="/kontak">Kontak</Link>.
      </p>
    </ContentPage>
  );
}
