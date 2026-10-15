"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
import videos from "@/data/videos.json";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), { ssr: false });
const copy = {
  mn: {
    title: "Бидний түүх,", accent: "хөдөлгөөнд.",
    body: "Зөгийн үүрнээс балны шил хүртэл. Бидний өдөр тутмын хөдөлмөрийг ойроос үзээрэй.",
    collection: "Богино бичлэгүүд", play: "Бичлэг үзэх", hint: "Гүйлгээд дараагийн мөчийг нээгээрэй", count: "бичлэг",
  },
  en: {
    title: "Our story,", accent: "in motion.",
    body: "From the hive to the jar. A closer look at the everyday work behind our honey.",
    collection: "Short films", play: "Play video", hint: "Scroll to discover the next moment", count: "films",
  },
  zh: {
    title: "我们的故事，", accent: "鲜活呈现。",
    body: "从蜂巢到蜜罐，近距离看看每一瓶蜂蜜背后的日常劳动。",
    collection: "短片集", play: "播放视频", hint: "滑动，发现下一个瞬间", count: "段视频",
  },
  ko: {
    title: "우리의 이야기,", accent: "움직임으로.",
    body: "벌통에서 꿀 한 병까지. 꿀을 만드는 일상의 순간을 가까이 만나보세요.",
    collection: "짧은 영상", play: "영상 보기", hint: "옆으로 넘겨 다음 순간을 만나보세요", count: "개 영상",
  },
};

export function videoDuration(seconds) {
  const rounded = Math.ceil(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

export default function VideoGallery() {
  const { language } = useLanguage();
  const c = copy[language];
  const t = ui[language];
  const track = useRef(null);
  const [index, setIndex] = useState(null);
  const [edges, setEdges] = useState({ first: true, last: false });
  const close = useCallback(() => setIndex(null), []);
  const scroll = (direction) => {
    const el = track.current;
    const distance = el.firstElementChild.getBoundingClientRect().width + 20;
    el.scrollBy({
      left: direction * distance,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section className="film-section section" id="films" aria-labelledby="films-title">
      <div className="shell">
        <div className="film-heading">
          <div>
            <p className="eyebrow">UNDRAM / FILMS</p>
            <h2 id="films-title">{c.title}<br /><em>{c.accent}</em></h2>
          </div>
          <div className="film-intro">
            <p>{c.body}</p>
            <span className="film-total"><span aria-hidden="true" />{videos.length} {c.count} · UNDRAM</span>
          </div>
        </div>
        <div className="film-toolbar">
          <p>{c.collection}</p>
          <div className="gallery-tools">
            <button className="circle-button" aria-label={t.previous} disabled={edges.first} onClick={() => scroll(-1)}><ArrowLeft size={18} /></button>
            <button className="circle-button" aria-label={t.next} disabled={edges.last} onClick={() => scroll(1)}><ArrowRight size={18} /></button>
          </div>
        </div>
        <div
          ref={track}
          className="film-track"
          role="region"
          aria-label={c.collection}
          tabIndex={0}
          onScroll={() => {
            const el = track.current;
            setEdges({ first: el.scrollLeft < 2, last: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              scroll(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {videos.map((video, i) => (
            <button className="film-card" key={video.src} onClick={() => setIndex(i)} aria-label={`${c.play}: ${video.title[language]}`} aria-haspopup="dialog">
              <Image src={video.poster} alt="" fill sizes="(max-width:600px) 78vw, (max-width:1000px) 40vw, 25vw" loading="lazy" />
              <span className="film-number">{String(i + 1).padStart(2, "0")} / UNDRAM</span>
              <span className="film-duration">{videoDuration(video.duration)}</span>
              <span className="film-play" aria-hidden="true"><Play size={24} fill="currentColor" strokeWidth={1} /></span>
              <span className="film-caption"><span>{c.play} <ArrowRight size={15} /></span><strong>{video.title[language]}</strong></span>
            </button>
          ))}
        </div>
        <p className="film-hint">{c.hint}<ArrowRight size={15} aria-hidden="true" /></p>
      </div>
      {index !== null && <VideoPlayer videos={videos} index={index} setIndex={setIndex} onClose={close} />}
    </section>
  );
}
