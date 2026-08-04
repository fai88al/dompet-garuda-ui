import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api";
import { excerpt, formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan — Dompet Garuda" };
  }

  const description = excerpt(article.contentHtml, 160);

  return {
    title: `${article.title} — Dompet Garuda`,
    description,
    alternates: { canonical: `${SITE_URL}/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description,
      url: `${SITE_URL}/articles/${article.slug}`,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {article.coverImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="mt-8 font-display text-4xl leading-tight text-foreground sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {formatDate(article.publishedAt)}
      </p>

      <div
        className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:font-display"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </main>
  );
}
