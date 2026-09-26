import Link from "next/link";
import { getPublishedArticles } from "@/lib/api";
import { ArticleCard } from "@/components/shared/article-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export async function ArticlesTeaser() {
  const articles = await getPublishedArticles();
  const latest = articles.slice(0, 3);

  return (
    <section id="articles" className="scroll-mt-16 border-b border-border">
      <Reveal className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dari Blog Kami"
          headline="Artikel & wawasan terbaru"
          centered
        />

        {latest.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Artikel akan segera hadir. Nantikan wawasan seputar Dompet Garuda.
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/articles"
            className="text-sm font-bold text-primary hover:text-primary-hover"
          >
            Lihat Semua Artikel →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
