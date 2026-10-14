"use client";
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Minus, Plus, Truck, Expand } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartActions } from "@/context/CartContext";
import useProducts from "@/hooks/useProducts";
import { ui, asset, sizeOf, categoryOf } from "@/utils/storefront";
import ProductCard from "@/components/ProductCard";
const Lightbox = dynamic(() => import("@/components/Lightbox"), { ssr: false });
export default function ProductDetailClient() {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = ui[language];
  const products = useProducts();
  const product = products.find((p) => String(p.id) === String(id));
  const { addToCart } = useCartActions();
  const [quantity, setQuantity] = useState(1);
  const [photo, setPhoto] = useState(0);
  const [zoom, setZoom] = useState(false);
  const close = useCallback(() => setZoom(false), []);
  if (!product)
    return (
      <main className="empty-state">
        <h1>{t.none}</h1>
        <Link className="button button-dark" href="/products">
          {t.allProducts}
        </Link>
      </main>
    );
  const photos = [...new Set([product.image, ...(product.images || [])])]
    .filter(Boolean)
    .map((src) => ({ src, alt: product.title }));
  const selected = Math.min(photo, photos.length - 1);
  const variants = [1, 2, 3].includes(Number(product.id))
    ? products.filter((p) => [1, 2, 3].includes(Number(p.id)))
    : [];
  const related = products
    .filter((p) => String(p.id) !== String(id))
    .sort(
      (a, b) =>
        (categoryOf(b.id) === categoryOf(product.id) ? 1 : 0) -
        (categoryOf(a.id) === categoryOf(product.id) ? 1 : 0),
    )
    .slice(0, 3);
  return (
    <main className="shell page-content">
      <div className="breadcrumb">
        <Link href="/">{t.home}</Link>
        <span>/</span>
        <Link href="/products">{t.products}</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>
      <div className="detail-grid">
        <div>
          <button
            className="detail-photo"
            onClick={() => setZoom(true)}
            aria-label={t.zoom}
          >
            <Image
              src={asset(photos[selected].src)}
              alt={product.title}
              fill
              sizes="(max-width:600px) 100vw, 55vw"
              loading="eager"
            />
            <span>
              <Expand size={19} />
            </span>
          </button>
          <div className="detail-thumbs">
            {photos.map((p, i) => (
              <button
                key={p.src}
                onClick={() => setPhoto(i)}
                aria-pressed={selected === i}
                aria-label={`${product.title} ${i + 1}`}
              >
                <Image src={asset(p.src)} alt={p.alt} fill sizes="80px" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">UNDRAM / {t[categoryOf(product.id)]}</p>
          <h1>{product.title}</h1>
          <span className="price">{product.price}</span>
          <p className="detail-description">
            {product.description?.split(/(?<=[.!。])\s/)[0]}
          </p>
          <span className="field-label">{t.size}</span>
          <div className="size-options">
            {variants.length ? (
              variants.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  aria-current={
                    String(p.id) === String(id) ? "page" : undefined
                  }
                >
                  {sizeOf(p)}
                </Link>
              ))
            ) : (
              <span>{sizeOf(product)}</span>
            )}
          </div>
          <span className="field-label">{t.quantity}</span>
          <div className="purchase-row">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
                aria-label={`${t.quantity} −`}
              >
                <Minus size={16} />
              </button>
              <output aria-live="polite">{quantity}</output>
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                disabled={quantity === 99}
                aria-label={`${t.quantity} +`}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              className="button button-dark"
              onClick={() => addToCart(product, quantity)}
            >
              {t.add}
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="delivery-note">
            <Truck size={22} />
            <div>
              <strong>{t.delivery}</strong>
              {t.deliveryBody}
            </div>
          </div>
          <details className="product-details-accordion">
            <summary>{t.details}</summary>
            <p>{product.description}</p>
          </details>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>{t.related}</h2>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      {zoom && (
        <Lightbox
          images={photos}
          index={selected}
          setIndex={setPhoto}
          onClose={close}
        />
      )}
    </main>
  );
}
