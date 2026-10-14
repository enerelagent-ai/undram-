"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { ui } from "@/utils/storefront";
import EditorialCard from "./EditorialCard";
export default function RecipesSection() {
  const { language } = useLanguage();
  const t = ui[language];
  return (
    <section className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / {t.recipes}</p>
          <h2>{t.recipeTitle}</h2>
        </div>
        <Link className="text-link" href="/recipes">
          {t.recipes}
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="editorial-grid">
        {translations[language].recipes.items.slice(0, 3).map((item) => (
          <EditorialCard
            key={item.id}
            item={item}
            kind="recipes"
            label={t.details}
          />
        ))}
      </div>
    </section>
  );
}
