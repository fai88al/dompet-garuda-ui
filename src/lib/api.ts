import type { Article } from "@/types/article";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.dompetgaruda.com";

export async function getPublishedArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE_URL}/public/articles`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await fetch(`${BASE_URL}/public/articles/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}
