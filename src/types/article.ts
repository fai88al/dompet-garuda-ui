export type ArticleStatus = "DRAFT" | "PUBLISHED";

export interface Article {
  id: string;
  title: string;
  slug: string;
  contentHtml: string;
  coverImageUrl: string;
  status: ArticleStatus;
  authorId: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
