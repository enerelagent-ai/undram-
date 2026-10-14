"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { useCartActions } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { asset, ui, sizeOf, categoryOf } from "@/utils/storefront";
import ProductTilt from "./effects/ProductTilt";
export default function ProductCard({ product }) {
  const { language } = useLanguage();
  const { addToCart } = useCartActions();
  const t = ui[language];
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.id}`}
        className="product-photo"
        aria-label={product.title}
      >
        <span className="product-label">{t[categoryOf(product.id)]}</span>
        <ProductTilt>
          <Image
            src={asset(product.image)}
            alt={product.title}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
            className="object-contain"
          />
        </ProductTilt>
        <span className="photo-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="product-meta">
        <span>{sizeOf(product)}</span>
        <span>UNDRAM</span>
      </div>
      <Link href={`/products/${product.id}`}>
        <h3>{product.title}</h3>
      </Link>
      <div className="product-bottom">
        <span className="price">{product.price}</span>
        <button
          className="add-button"
          onClick={() => addToCart(product)}
          aria-label={`${product.title}: ${t.add}`}
        >
          <span>{t.add}</span>
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}
