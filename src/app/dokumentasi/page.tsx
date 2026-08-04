import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/content-page";
import { SITE_URL } from "@/lib/site";

const title = "Dokumentasi — Dompet Garuda";
const description =
  "Penjelasan konseptual tentang cara kerja Dompet Garuda: model pouch offline, tiga aksi perangkat, dan bagaimana settlement terjadi saat perangkat kembali online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/dokumentasi` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/dokumentasi`,
    type: "website",
  },
};

export default function DokumentasiPage() {
  return (
    <ContentPage
      eyebrow="Dokumentasi"
      title="Dokumentasi"
      subtitle="Gambaran konseptual tentang cara kerja Dompet Garuda — bukan referensi API, tapi penjelasan yang bisa dipahami siapa saja: developer, mitra, atau tim lapangan."
    >
      <h2>Apa itu Dompet Garuda?</h2>
      <p>
        Dompet Garuda adalah perangkat pembayaran fisik berbentuk genggam
        yang bisa melakukan transaksi antar perangkat lewat Bluetooth, tanpa
        bergantung pada koneksi internet atau sinyal seluler. Setiap
        perangkat menyimpan saldo dan riwayat transaksinya secara lokal, dan
        setiap transaksi ditandatangani secara kriptografis (Ed25519)
        sehingga tidak bisa dipalsukan meskipun terjadi tanpa koneksi ke
        server pusat.
      </p>
      <p>
        Perangkat ini dirancang untuk pedagang pasar, warung, dan pengguna
        di wilayah yang jaringan datanya tidak stabil atau tidak ada sama
        sekali — situasi yang sangat umum di banyak daerah di Indonesia,
        tapi jarang diperhitungkan oleh sistem pembayaran digital pada
        umumnya.
      </p>

      <h2>Model &ldquo;pouch&rdquo; offline</h2>
      <p>
        Alih-alih menyimpan saldo sebagai satu angka di server, Dompet
        Garuda menyimpan saldo sebagai kumpulan unit bertanda tangan digital
        yang kami sebut <em>pouch</em>. Setiap pouch adalah unit nilai yang
        sudah diverifikasi dan ditandatangani sebelumnya oleh sistem,
        sehingga perangkat bisa membuktikan keasliannya sendiri tanpa perlu
        bertanya ke server saat itu juga.
      </p>
      <p>
        Saat dua perangkat bertransaksi lewat Bluetooth, perangkat pengirim
        menyerahkan satu atau beberapa pouch ke perangkat penerima, lengkap
        dengan tanda tangan digitalnya. Perangkat penerima memverifikasi
        tanda tangan tersebut secara lokal — bukan lewat internet — sehingga
        transaksi bisa selesai dalam hitungan detik, di mana saja, tanpa
        sinyal.
      </p>

      <h2>Tiga aksi utama perangkat</h2>
      <p>Dari sisi pengguna, semua interaksi dengan Dompet Garuda dirangkum dalam tiga aksi:</p>
      <ul>
        <li>
          <strong>Cek Saldo</strong> — melihat total nilai pouch yang saat
          ini tersimpan di perangkat, baik saat online maupun offline.
        </li>
        <li>
          <strong>Transfer</strong> — mengirim pouch ke perangkat lain yang
          berada dalam jangkauan Bluetooth, biasanya untuk membayar barang
          atau jasa.
        </li>
        <li>
          <strong>Scan QR</strong> — menerima pembayaran dengan cara
          memindai kode QR yang dihasilkan oleh perangkat pembeli, sebagai
          alternatif dari transfer langsung antar perangkat.
        </li>
      </ul>
      <p>
        Ketiga aksi ini bisa dilakukan sepenuhnya tanpa koneksi internet.
        Perangkat hanya perlu online secara berkala untuk proses settlement
        di belakang layar.
      </p>

      <h2>Bagaimana settlement bekerja saat perangkat online kembali</h2>
      <p>
        Karena transaksi offline dicatat secara lokal di kedua perangkat,
        sistem pusat perlu menyelaraskan (settlement) catatan tersebut
        begitu salah satu perangkat kembali terhubung ke internet — misalnya
        saat pedagang pulang ke rumah yang memiliki WiFi, atau berjalan
        melewati area dengan sinyal seluler.
      </p>
      <p>
        Saat itu terjadi, perangkat mengirimkan seluruh riwayat pouch yang
        diterima dan dikeluarkan sejak sinkronisasi terakhir ke server.
        Server memverifikasi ulang setiap tanda tangan, mencatatnya ke dalam
        ledger double-entry yang tidak bisa diubah, lalu menerbitkan pouch
        baru untuk transaksi berikutnya. Proses ini berjalan otomatis di
        latar belakang dan tidak memerlukan tindakan apa pun dari pengguna.
      </p>
      <p>
        Hasilnya: pengguna bisa bertransaksi kapan saja, di mana saja — dan
        sistem tetap punya catatan keuangan yang akurat dan bisa
        dipertanggungjawabkan begitu perangkat terhubung kembali.
      </p>
    </ContentPage>
  );
}
