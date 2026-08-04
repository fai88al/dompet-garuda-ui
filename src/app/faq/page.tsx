import type { Metadata } from "next";
import { ContentPage } from "@/components/layout/content-page";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SITE_URL } from "@/lib/site";

const title = "FAQ — Dompet Garuda";
const description =
  "Pertanyaan yang sering diajukan tentang Dompet Garuda, dompet digital yang bisa transaksi tanpa internet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

const faqs = [
  {
    question: "Apakah benar-benar bisa transaksi tanpa internet?",
    answer:
      "Ya. Dompet Garuda menggunakan Bluetooth untuk berkomunikasi langsung antar perangkat, tanpa perlu internet atau sinyal seluler sama sekali. Setiap transaksi ditandatangani secara digital dan diverifikasi langsung oleh perangkat penerima, sehingga tetap sah meskipun tidak ada koneksi ke server saat itu terjadi.",
  },
  {
    question: "Bagaimana keamanan uang saya saat offline?",
    answer:
      "Setiap transaksi ditandatangani menggunakan kriptografi Ed25519 — standar yang sama digunakan dalam sistem keamanan digital modern. Tanda tangan ini tidak bisa dipalsukan atau diubah, sehingga saldo Anda tetap aman walaupun perangkat sedang tidak terhubung ke internet. Saat perangkat kembali online, seluruh transaksi juga dicatat ke ledger pusat yang tidak bisa diubah.",
  },
  {
    question: "Berapa maksimal saldo yang bisa disimpan offline?",
    answer:
      "Ada batas saldo maksimum yang bisa disimpan dan ditransaksikan secara offline pada satu perangkat, sebagai bagian dari manajemen risiko. Batas pastinya bisa berbeda tergantung kebijakan yang berlaku dan akan ditampilkan langsung di perangkat serta aplikasi terkait.",
  },
  {
    question: "Apa yang terjadi jika perangkat saya hilang?",
    answer:
      "Segera laporkan kehilangan tersebut melalui halaman Kontak agar akun Anda dapat dibekukan. Karena setiap perangkat memiliki identitas kriptografis sendiri, tim kami dapat mencabut sertifikat perangkat yang hilang sehingga tidak bisa lagi digunakan untuk bertransaksi, begitu perangkat tersebut mencoba terhubung ke jaringan mana pun.",
  },
  {
    question: "Berapa lama sertifikat offline berlaku?",
    answer:
      "Sertifikat offline pada setiap perangkat memiliki masa berlaku terbatas demi keamanan, dan akan diperbarui secara otomatis setiap kali perangkat terhubung ke internet. Selama perangkat rutin online — misalnya beberapa hari sekali — sertifikat akan selalu diperbarui tanpa Anda perlu melakukan apa pun secara manual.",
  },
  {
    question: "Apakah perlu aplikasi di HP?",
    answer:
      "Tidak wajib. Dompet Garuda dirancang agar bisa berfungsi penuh langsung dari perangkatnya sendiri — mengecek saldo, transfer, dan menerima pembayaran semuanya bisa dilakukan tanpa ponsel pintar. Aplikasi pendamping di HP bersifat opsional untuk kebutuhan tambahan seperti riwayat transaksi yang lebih lengkap.",
  },
  {
    question: "Bagaimana cara isi saldo?",
    answer:
      "Saldo dapat diisi melalui agen atau titik isi ulang resmi Dompet Garuda, atau melalui transfer dari perangkat lain yang sudah memiliki saldo. Setelah proses isi ulang online berhasil, saldo akan tersedia di perangkat Anda dan siap digunakan untuk transaksi offline.",
  },
  {
    question: "Apakah ada biaya transaksi?",
    answer:
      "Untuk transaksi antar perangkat (Transfer dan Scan QR), pada umumnya tidak dikenakan biaya tambahan. Biaya hanya berlaku untuk proses isi ulang saldo tertentu, tergantung metode dan mitra isi ulang yang digunakan. Rincian biaya akan selalu ditampilkan secara jelas sebelum transaksi dikonfirmasi.",
  },
];

export default function FaqPage() {
  return (
    <ContentPage
      eyebrow="FAQ"
      title="Pertanyaan yang Sering Diajukan"
      subtitle="Jawaban singkat untuk pertanyaan yang paling sering kami terima dari pedagang dan pengguna Dompet Garuda."
    >
      <Accordion className="not-prose">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger className="font-display text-base text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ContentPage>
  );
}
