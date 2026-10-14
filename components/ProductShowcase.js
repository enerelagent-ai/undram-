"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Reveal from "./effects/Reveal";
import useProducts from "@/hooks/useProducts";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
export default function ProductShowcase() {
  const products = useProducts();
  const { language } = useLanguage();
  const t = ui[language];
  const featured = [1, 2, "honey-set-6"]
    .map((id) => products.find((p) => String(p.id) === String(id)))
    .filter(Boolean);
  return (
    <section className="section shell" id="shop">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / {t.collection}</p>
            <h2>
              {language === "mn" ? (
                <>
                  Шил бүрд нэг
                  <br />
                  <em>Монгол зун.</em>
                </>
              ) : language === "en" ? (
                <>
                  A Mongolian summer.
                  <br />
                  <em>In every jar.</em>
                </>
              ) : (
                t.products
              )}
            </h2>
          </div>
          <Link href="/products" className="text-link">
            {t.allProducts}
            <ArrowRight size={18} />
          </Link>
        </div>
      </Reveal>
      <div className="product-grid">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
