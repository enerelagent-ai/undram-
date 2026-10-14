"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flower2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
import Reveal from "./effects/Reveal";
export const storyCopy = {
  mn: {
    title: (
      <>
        Талаас таны
        <br />
        <em>ширээнд.</em>
      </>
    ),
    body: "Туул голын хөндийн зэрлэг цэцэгсээс зөгийнүүдийн цуглуулсан балыг бид байгалийн шинж чанарыг нь хадгалан бэлтгэдэг. Шил бүрийн цаана Монголын зун, зөгийчний нямбай хөдөлмөр бий.",
    caption: "АРХУСТ НУТАГ · МОНГОЛ УЛС",
    signature: "БАЙГАЛЬТАЙГАА ХАМТ БҮТЭЭСЭН",
  },
  en: {
    title: (
      <>
        From the steppe.
        <br />
        <em>To your table.</em>
      </>
    ),
    body: "Our bees forage among the wildflowers of the Tuul River valley. We prepare every jar with care to preserve the honey’s natural character. Behind every jar is a Mongolian summer and a beekeeper’s patient craft.",
    caption: "ARKHUST · MONGOLIA",
    signature: "CRAFTED TOGETHER WITH NATURE",
  },
  zh: {
    title: (
      <>
        从草原
        <br />
        <em>到您的餐桌。</em>
      </>
    ),
    body: "蜜蜂从图勒河谷的野花中采集花蜜。我们用心制作每一瓶蜂蜜，保留自然品质。每瓶背后都有蒙古的夏天和蜂农的细心劳动。",
    caption: "阿尔胡斯特 · 蒙古",
    signature: "与自然共同创造",
  },
  ko: {
    title: (
      <>
        초원에서
        <br />
        <em>당신의 식탁까지.</em>
      </>
    ),
    body: "벌들은 툴강 계곡의 야생화에서 꿀을 모읍니다. 자연의 맛을 보존하며 정성껏 준비합니다. 한 병마다 몽골의 여름과 양봉가의 정성이 담겨 있습니다.",
    caption: "아르후스트 · 몽골",
    signature: "자연과 함께 만듭니다",
  },
};
export default function StorySection() {
  const { language } = useLanguage();
  const c = storyCopy[language];
  return (
    <section className="story-section section">
      <div className="shell story-grid">
        <div className="story-image">
          <Image
            src="/optimized/beekeeper-at-work-v2.webp"
            alt={ui[language].story}
            fill
            sizes="(max-width:600px) 100vw, 50vw"
          />
          <span className="image-caption">{c.caption}</span>
        </div>
        <Reveal className="story-copy">
          <p className="eyebrow">02 / {ui[language].story}</p>
          <h2>{c.title}</h2>
          <p>{c.body}</p>
          <Link className="text-link" href="/story">
            {ui[language].story}
            <ArrowRight size={18} />
          </Link>
          <div className="story-signature">
            <Flower2 size={27} strokeWidth={1} />
            <span>{c.signature}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
