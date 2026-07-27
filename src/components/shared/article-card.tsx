import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { excerpt, formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {article.coverImageUrl && (
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground">
          {formatDate(article.publishedAt)}
        </p>
        <h3 className="mt-2 font-display text-lg text-foreground group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {excerpt(article.contentHtml)}
        </p>
      </div>
    </Link>
  );
}
