"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ui, asset } from "@/utils/storefront";
import gallery from "@/data/gallery.json";
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });
const featured = [
  { src: "/media/beekeeper-at-work-v2.jpg", alt: "Зөгийчин / Beekeeper" },
  { src: "/media/natural-honeycomb.jpg", alt: "Сархинаг / Honeycomb" },
  { src: "/media/beekeeper-team.jpg", alt: "UNDRAM баг / Team" },
  { src: "/images/harvest.jpg", alt: "Бал хураалт / Harvest" },
  {
    src: "/images/beekeeper-story.webp",
    alt: "Зөгийчний түүх / Beekeeper story",
  },
  ...gallery
    .filter((x) => x.type === "image")
    .map((x, i) => ({ ...x, alt: `UNDRAM · ${i + 1}` })),
];
export default function HarvestMediaSection() {
  const { language } = useLanguage();
  const t = ui[language];
  const track = useRef(null);
  const [index, setIndex] = useState(null);
  const [start, setStart] = useState(0);
  const close = useCallback(() => setIndex(null), []);
  const step = (direction) => {
    const next = Math.max(0, Math.min(featured.length - 1, start + direction));
    setStart(next);
    const child = track.current.children[next];
    child?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  return (
    <section className="gallery-section section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / UNDRAM GALLERY</p>
          <h2>{t.gallery}</h2>
        </div>
        <div className="gallery-tools">
          <button
            className="circle-button"
            onClick={() => step(-1)}
            disabled={start === 0}
            aria-label={t.previous}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            className="circle-button"
            onClick={() => step(1)}
            disabled={start >= featured.length - 1}
            aria-label={t.next}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <div
        className="gallery-track"
        ref={track}
        role="region"
        aria-label={t.gallery}
        tabIndex={0}
        onScroll={() => {
          const el = track.current;
          const width = el.children[0]?.getBoundingClientRect().width || 1;
          setStart(Math.round(el.scrollLeft / (width + 22)));
        }}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
      >
        {featured.map((item, i) => (
          <button
            className="gallery-item"
            key={item.src}
            aria-label={`${t.zoom}: ${item.alt}`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={asset(item.src)}
              alt={item.alt}
              fill
              sizes="(max-width:600px) 80vw, 32vw"
              loading="lazy"
            />
            <span>
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>
      <p className="gallery-note">
        {t.galleryBody} · {featured.length}{" "}
        {language === "mn"
          ? "зураг"
          : language === "en"
            ? "photos"
            : language === "zh"
              ? "张照片"
              : "장"}
      </p>
      {index !== null && (
        <Lightbox
          images={featured}
          index={index}
          setIndex={setIndex}
          onClose={close}
        />
      )}
    </section>
  );
}
