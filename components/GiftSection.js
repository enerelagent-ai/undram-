"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useProducts from "@/hooks/useProducts";
import { ui, asset, sizeOf } from "@/utils/storefront";
export default function GiftSection() {
  const { language } = useLanguage();
  const products = useProducts();
  const p = products.find((p) => p.id === "honey-set-6");
  if (!p) return null;
  const c = {
    mn: {
      title: (
        <>
          Сэтгэл шингэсэн
          <br />
          <em>амтат бэлэг.</em>
        </>
      ),
      body: "Цэвэр, барагшунтай, халгайтай зөгийн балны зургаан жижиг шил. Монголын амтыг хайртай хүндээ бэлэглээрэй.",
    },
    en: {
      title: (
        <>
          A little sweetness.
          <br />
          <em>A thoughtful gift.</em>
        </>
      ),
      body: "Six small jars of pure, shilajit and nettle honey. Share a taste of Mongolia with someone you love.",
    },
    zh: {
      title: (
        <>
          甜蜜心意。
          <br />
          <em>用心好礼。</em>
        </>
      ),
      body: "六瓶纯蜂蜜、喜来芝蜂蜜和荨麻蜂蜜。与所爱之人分享蒙古的滋味。",
    },
    ko: {
      title: (
        <>
          달콤한 마음.
          <br />
          <em>정성스러운 선물.</em>
        </>
      ),
      body: "순수 꿀, 실라짓 꿀, 쐐기풀 꿀 여섯 병. 소중한 사람에게 몽골의 맛을 선물하세요.",
    },
  }[language];
  return (
    <section className="gift-section">
      <div className="shell gift-grid">
        <div className="gift-image">
          <Image
            src={asset(p.image)}
            alt={p.title}
            fill
            sizes="(max-width:600px) 100vw, 50vw"
          />
        </div>
        <div className="gift-copy">
          <p className="eyebrow">04 / {ui[language].gifts}</p>
          <h2>{c.title}</h2>
          <p>{c.body}</p>
          <div className="gift-price">
            <span className="price">{p.price}</span>
            <span>{sizeOf(p)}</span>
          </div>
          <Link className="button button-amber" href={`/products/${p.id}`}>
            {ui[language].details}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
