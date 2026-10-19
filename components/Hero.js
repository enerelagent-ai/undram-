"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { shopCopy } from "@/utils/shopCopy";
export default function Hero() {
  const { language } = useLanguage();
  const c = shopCopy[language];
  return (
    <section className="shop-hero shell">
      <div className="shop-banner">
        <div className="shop-banner-copy">
          <p className="eyebrow">UNDRAM · {c.shop}</p>
          <h1>{c.hero}</h1>
          <p>{c.heroBody}</p>
          <div className="shop-banner-actions">
            <Link href="/products" className="button button-dark">{c.browse}<ArrowRight size={18} /></Link>
            <Link href="/products?category=gifts" className="shop-secondary-link">{c.gifts}</Link>
          </div>
        </div>
        <Link href="/products?category=honey" className="shop-banner-image" aria-label={c.browse}>
          <Image src="/optimized/honey-big.webp" alt={c.hero} fill sizes="(max-width:600px) 80vw, 42vw" loading="eager" />
          <span className="shop-banner-stamp">UNDRAM<br /><small>MONGOLIAN HONEY</small></span>
        </Link>
      </div>
    </section>
  );
}
