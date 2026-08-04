import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/api";
import { ArticleCard } from "@/components/shared/article-card";
import { SITE_URL } from "@/lib/site";

const title = "Artikel — Dompet Garuda";
const description =
  "Wawasan dan cerita seputar teknologi pembayaran offline Dompet Garuda.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/articles`,
    type: "website",
  },
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-foreground sm:text-5xl">
        Artikel
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
        Wawasan dan cerita seputar teknologi pembayaran offline Dompet
        Digital.
      </p>

      {articles.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          Belum ada artikel yang dipublikasikan. Silakan kembali lagi nanti.
        </div>
      )}
    </main>
  );
}
