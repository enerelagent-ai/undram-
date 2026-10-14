"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { ui, asset } from "@/utils/storefront";
export default function RecipeDetailClient() {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = ui[language];
  const item = translations[language].recipes.items.find(
    (p) => String(p.id) === String(id),
  );
  if (!item)
    return (
      <main className="empty-state">
        <h1>{t.none}</h1>
        <Link href="/recipes" className="button button-dark">
          {t.recipes}
        </Link>
      </main>
    );
  const labels = {
    mn: { ingredients: "Орц найрлага", steps: "Хийх арга" },
    en: { ingredients: "Ingredients", steps: "Method" },
    zh: { ingredients: "配料", steps: "制作方法" },
    ko: { ingredients: "재료", steps: "만드는 방법" },
  }[language];
  const render = (block, i) => {
    if (typeof block === "string") return <p key={i}>{block}</p>;
    if (block.type === "heading") return <h2 key={i}>{block.text}</h2>;
    if (block.type === "list")
      return (
        <ul key={i}>
          {block.items?.map((li, j) => (
            <li key={j}>{li}</li>
          ))}
        </ul>
      );
    return (
      <p
        key={i}
        className={block.type === "warning" ? "ingredients" : undefined}
      >
        {block.text}
      </p>
    );
  };
  return (
    <main className="shell article-shell page-content">
      <div className="breadcrumb">
        <Link className="text-link" href="/recipes">
          <ArrowLeft size={16} />
          {t.recipes}
        </Link>
      </div>
      <article>
        <p className="eyebrow">UNDRAM / {item.category}</p>
        <h1 className="article-title">{item.title}</h1>
        <div className="article-meta">{t.recipeBody}</div>
        <div className="article-image">
          <Image
            src={asset(item.image)}
            alt={item.title}
            fill
            sizes="(max-width:1000px) 100vw, 1000px"
            loading="eager"
          />
        </div>
        <div className="article-body">
          {item.description && <p>{item.description}</p>}
          {item.ingredients?.length > 0 && (
            <div className="ingredients">
              <h2>{labels.ingredients}</h2>
              <ul>
                {item.ingredients.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          )}
          {item.steps?.length > 0 && (
            <>
              <h2>{labels.steps}</h2>
              <ol>
                {item.steps.map((step, i) => (
                  <li key={i}>
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            </>
          )}
          {Array.isArray(item.content)
            ? item.content.map(render)
            : item.content && <p>{item.content}</p>}
          <div className="article-end">
            <Link className="text-link" href="/recipes">
              <ArrowLeft size={16} />
              {t.recipes}
            </Link>
            <Link href="/products" className="button button-dark">
              {t.view}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
