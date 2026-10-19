"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import useProducts from "@/hooks/useProducts";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
import { shopCopy } from "@/utils/shopCopy";
export default function ProductShowcase() {
  const products = useProducts();
  const { language } = useLanguage();
  const t = ui[language];
  const c = shopCopy[language];
  const featured = ["pine-nut-honey", 1, 2, 4, "honey-set-6", 5, "oxymel", 8]
    .map(id => products.find(p => String(p.id) === String(id))).filter(Boolean);
  return (
    <section className="shop-products shell" id="shop">
      <div className="shop-section-heading">
        <div><h2 className="shop-section-title">{c.selection}</h2><p>{c.intro}</p></div>
        <Link href="/products" className="text-link">{t.allProducts}<ArrowRight size={18} /></Link>
      </div>
      <div className="product-grid home-product-grid">{featured.map(p => <ProductCard key={p.id} product={p} />)}</div>
      <div className="shop-view-all"><Link className="button button-outline" href="/products">{t.allProducts}<ArrowRight size={18} /></Link></div>
    </section>
  );
}
