"use client";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
import { blogPosts } from "@/utils/blogData";
import PageHeading from "@/components/PageHeading";
import EditorialCard from "@/components/EditorialCard";
export default function NewsPage() {
  const { language } = useLanguage();
  const t = ui[language as keyof typeof ui];
  const posts = blogPosts[language as keyof typeof blogPosts] || blogPosts.mn;
  return (
    <main className="shell page-content">
      <PageHeading
        eyebrow={t.news}
        title={t.journal}
        description={t.newsBody}
      />
      <div className="editorial-grid">
        {posts.map((p) => (
          <EditorialCard key={p.id} item={p} kind="news" label={t.read} />
        ))}
      </div>
    </main>
  );
}
