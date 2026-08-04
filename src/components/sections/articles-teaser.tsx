import Link from "next/link";
import { getPublishedArticles } from "@/lib/api";
import { ArticleCard } from "@/components/shared/article-card";
import { SectionHeading } from "@/components/shared/section-heading";

export async function ArticlesTeaser() {
  const articles = await getPublishedArticles();
  const latest = articles.slice(0, 3);

  return (
    <section data-tint="sand" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Wawasan & Cerita"
            headline="Wawasan & Cerita dari Dompet Garuda"
            subhead="Pelajari lebih dalam tentang teknologi di balik pembayaran offline."
          />
          <Link
            href="/articles"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            Lihat Semua Artikel →
          </Link>
        </div>

        {latest.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Artikel akan segera hadir. Nantikan wawasan seputar Dompet Garuda.
          </div>
        )}
      </div>
    </section>
  );
}
