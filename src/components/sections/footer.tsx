import Link from "next/link";

const columns = [
  {
    heading: "Produk",
    links: [
      { label: "Cara Kerja", href: "/#cara-kerja" },
      { label: "Keamanan", href: "/#keamanan" },
      { label: "Artikel", href: "/articles" },
    ],
  },
  {
    heading: "Sumber Daya",
    links: [
      { label: "Dokumentasi", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Kontak", href: "#" },
    ],
  },
  {
    heading: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "#" },
      { label: "Karier", href: "#" },
      { label: "Kebijakan Privasi", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-tint="neutral">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Dompet Digital
            </span>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-medium text-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
          © {year} Dompet Digital. Semua hak dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}
