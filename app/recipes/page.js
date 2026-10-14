"use client";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
import { translations } from "@/context/translations";
import PageHeading from "@/components/PageHeading";
import EditorialCard from "@/components/EditorialCard";
export default function RecipesPage() {
  const { language } = useLanguage();
  const t = ui[language];
  return (
    <main className="shell page-content">
      <PageHeading
        eyebrow={t.recipes}
        title={t.recipeTitle}
        description={t.recipeBody}
      />
      <div className="editorial-grid">
        {translations[language].recipes.items.map((p) => (
          <EditorialCard key={p.id} item={p} kind="recipes" label={t.details} />
        ))}
      </div>
    </main>
  );
}
