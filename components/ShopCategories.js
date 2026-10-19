"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useProducts from "@/hooks/useProducts";
import { ui, categoryOf } from "@/utils/storefront";
import { shopCopy, shopCategories } from "@/utils/shopCopy";
const pictures = { honey: "honey-small.webp", gifts: "set.webp", drinks: "oxymel.webp", craft: "candle.webp" };
export default function ShopCategories() {
  const { language } = useLanguage();
  const products = useProducts();
  const c = shopCopy[language];
  return (
    <section className="shop-category-section shell" aria-labelledby="category-heading">
      <h2 className="shop-section-title" id="category-heading">{c.categories}</h2>
      <div className="shop-category-grid">
        {shopCategories.map(category => (
          <Link className="shop-category-card" href={`/products?category=${category}`} key={category}>
            <div className="shop-category-image"><Image src={`/optimized/${pictures[category]}`} alt="" fill sizes="80px" /></div>
            <div><strong>{ui[language][category]}</strong><span>{products.filter(p => categoryOf(p.id) === category).length} {c.count}</span></div>
            <ChevronRight size={17} />
          </Link>
        ))}
      </div>
    </section>
  );
}
