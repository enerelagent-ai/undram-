import type { MetadataRoute } from "next";
import { translations } from "@/context/translations";
import { blogPosts } from "@/utils/blogData";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://undram-honey.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/story", "/stores", "/recipes", "/news", "/contact"];
  const productRoutes = translations.mn.products.items.map((item) => `/products/${item.id}`);
  const recipeRoutes = translations.mn.recipes.items.map((item) => `/recipes/${item.id}`);
  const newsRoutes = blogPosts.mn.map((item) => `/news/${item.id}`);

  return [...routes, ...productRoutes, ...recipeRoutes, ...newsRoutes].map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: index < 2 ? "weekly" : "monthly" as const,
    priority: index === 0 ? 1 : index === 1 ? 0.9 : 0.7,
  }));
}
