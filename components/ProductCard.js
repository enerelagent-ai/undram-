"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartActions } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { asset, ui, sizeOf, categoryOf } from "@/utils/storefront";
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
          <Image
            src={asset(product.image)}
            alt={product.title}
            fill
            sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 24vw"
            className="object-contain"
          />
      </Link>
      <div className="product-meta">
        <span>{sizeOf(product) === "UNDRAM" ? "" : sizeOf(product)}</span>
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
          <ShoppingCart size={17} />
        </button>
      </div>
    </article>
  );
}
