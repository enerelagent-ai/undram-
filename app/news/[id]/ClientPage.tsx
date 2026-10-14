"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/utils/blogData";
import { ui, asset } from "@/utils/storefront";
export default function ArticlePageClient() {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = ui[language as keyof typeof ui];
  const posts = blogPosts[language as keyof typeof blogPosts] || blogPosts.mn;
  const post = posts.find((p) => p.id === id);
  if (!post)
    return (
      <main className="empty-state">
        <h1>{t.none}</h1>
        <Link href="/news" className="button button-dark">
          {t.news}
        </Link>
      </main>
    );
  return (
    <main className="shell article-shell page-content">
      <div className="breadcrumb">
        <Link href="/news" className="text-link">
          <ArrowLeft size={16} />
          {t.news}
        </Link>
      </div>
      <article>
        <p className="eyebrow">UNDRAM / {post.tags.join(" · ")}</p>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">
          <time>{post.date}</time>
          <span>UNDRAM BRAND</span>
        </div>
        <div className="article-image">
          <Image
            src={asset(post.image)}
            alt={post.title}
            fill
            sizes="(max-width:1000px) 100vw, 1000px"
            loading="eager"
          />
        </div>
        <div className="article-body">
          {post.content
            .split("\n")
            .filter(Boolean)
            .map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          <div className="article-end">
            <Link className="text-link" href="/news">
              <ArrowLeft size={16} />
              {t.news}
            </Link>
            <a
              className="text-link"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://mongolianhoney.com/news/${post.id}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook ↗
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
