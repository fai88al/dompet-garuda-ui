import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { excerpt, formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="shadow-soft hover:shadow-elevated group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40"
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
      <div className="flex flex-col gap-2 p-5.5">
        <p className="text-xs font-bold text-muted-foreground">
          {formatDate(article.publishedAt)}
        </p>
        <h3 className="font-display text-[17px] leading-[1.35] font-extrabold text-foreground">
          {article.title}
        </h3>
        <p className="text-sm leading-[1.55] text-muted-foreground">
          {excerpt(article.contentHtml)}
        </p>
        <span className="mt-1.5 text-[13.5px] font-bold text-primary">
          Baca selengkapnya →
        </span>
      </div>
    </Link>
  );
}
