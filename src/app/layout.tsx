import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Nav } from "@/components/layout/nav";
import { GrainOverlay } from "@/components/shared/grain-overlay";
import { TintDriver } from "@/components/shared/tint-driver";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const title = "Dompet Garuda — Transfer tanpa internet, aman tanpa ribet";
const description =
  "Dompet Garuda memungkinkan transaksi langsung antar perangkat lewat Bluetooth — bahkan saat tidak ada koneksi internet sama sekali.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Dompet Garuda",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GrainOverlay />
          <TintDriver />
          <SmoothScrollProvider />
          <ScrollProgress />
          <Nav />
          <div className="flex flex-1 flex-col pt-16">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
