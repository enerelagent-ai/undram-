"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown, Flower2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
import HeroSilk from "./effects/HeroSilk";
const copy = {
  mn: {
    top: "БАЙГАЛИЙН ӨГӨӨЖ. МОНГОЛЫН АМТ.",
    title: (
      <>
        Зэрлэг цэцэгсээс
        <br />
        бүтсэн <em>алтлаг</em>
        <br />
        амт.
      </>
    ),
    body: "Хатан Туулын хөндийн зэрлэг цэцэгс, зуны нар, зөгийчний нямбай хөдөлмөрийг нэг шилэнд.",
    note: "ТАЛААС ТАНЫ ШИРЭЭНД",
    caption: "Цэвэр зөгийн бал",
    sub: "Монголын зэрлэг цэцгийн амт",
  },
  en: {
    top: "NATURE’S GIFT. MONGOLIA’S TASTE.",
    title: (
      <>
        Wild flowers.
        <br />
        <em>Golden</em>
        <br />
        moments.
      </>
    ),
    body: "Wildflowers of the Tuul River valley, summer sunshine and the care of our beekeepers. All in one jar.",
    note: "FROM THE STEPPE TO YOUR TABLE",
    caption: "Pure wildflower honey",
    sub: "A taste of the Mongolian meadows",
  },
  zh: {
    top: "自然的馈赠。蒙古的味道。",
    title: (
      <>
        野花酿就
        <br />
        <em>金色</em>
        <br />
        滋味。
      </>
    ),
    body: "图勒河谷的野花、夏日阳光和蜂农的用心，尽在一瓶蜂蜜。",
    note: "从草原到您的餐桌",
    caption: "纯净野花蜂蜜",
    sub: "蒙古草原的滋味",
  },
  ko: {
    top: "자연의 선물. 몽골의 맛.",
    title: (
      <>
        야생화에서
        <br />
        <em>황금빛</em>
        <br />
        달콤함으로.
      </>
    ),
    body: "툴강 계곡의 야생화, 여름 햇살, 양봉가의 정성을 한 병에 담았습니다.",
    note: "초원에서 당신의 식탁까지",
    caption: "순수 야생화 꿀",
    sub: "몽골 초원의 맛",
  },
};
export default function Hero() {
  const { language } = useLanguage();
  const t = ui[language],
    c = copy[language];
  return (
    <section className="hero">
      <HeroSilk />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-rule" />
            {c.top}
          </p>
          <h1>{c.title}</h1>
          <p className="hero-description">{c.body}</p>
          <Link href="/products" className="button button-dark">
            {t.view}
            <ArrowRight size={19} />
          </Link>
          <Link href="/story" className="hero-story-link">
            {t.story}
            <ArrowUpRightIcon />
          </Link>
          <div className="hero-origin">
            <Flower2 size={26} strokeWidth={1} />
            <span>{c.note}</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/optimized/honey-small.webp"
              alt={c.caption}
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover"
              loading="eager"
            />
            <span className="hero-photo-index">01 — UNDRAM COLLECTION</span>
            <div className="origin-seal">
              <Flower2 size={28} strokeWidth={1} />
              <span>
                MONGOLIAN
                <br />
                WILDFLOWER
                <br />
                HONEY
              </span>
            </div>
          </div>
          <div className="hero-caption">
            <div>
              <h2>{c.caption}</h2>
              <p>{c.sub}</p>
            </div>
            <Link
              href="/products/2"
              aria-label={t.details}
              className="circle-button"
            >
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </div>
      <div className="shell hero-bottom">
        <span>UNDRAM · MONGOLIA</span>
        <a href="#shop">
          {t.collection}
          <ArrowDown size={14} />
        </a>
        <span>ЗӨГИЙН БАЛ / HONEY</span>
      </div>
    </section>
  );
}
function ArrowUpRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}
