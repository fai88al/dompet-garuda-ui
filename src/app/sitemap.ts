import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.updatedAt,
  }));

  const staticRoutes = [
    "",
    "/articles",
    "/dokumentasi",
    "/faq",
    "/kontak",
    "/tentang-kami",
    "/kebijakan-privasi",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...articleEntries];
}
