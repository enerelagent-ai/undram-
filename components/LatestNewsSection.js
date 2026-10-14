"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/utils/blogData";
import { ui } from "@/utils/storefront";
import EditorialCard from "./EditorialCard";
export default function LatestNewsSection() {
  const { language } = useLanguage();
  const t = ui[language];
  return (
    <section className="section news-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">06 / {t.news}</p>
            <h2>{t.journal}</h2>
          </div>
          <Link className="text-link" href="/news">
            {t.news}
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="editorial-grid">
          {(blogPosts[language] || blogPosts.mn).slice(0, 3).map((item) => (
            <EditorialCard
              key={item.id}
              item={item}
              kind="news"
              label={t.read}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
