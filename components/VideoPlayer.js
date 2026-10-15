"use client";

import { useState } from "react";
import { X, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";

const copy = {
  mn: { error: "Бичлэгийг ачаалж чадсангүй.", open: "Бичлэгийг шууд нээх" },
  en: { error: "This video could not be loaded.", open: "Open video directly" },
  zh: { error: "视频无法加载。", open: "直接打开视频" },
  ko: { error: "영상을 불러올 수 없습니다.", open: "영상 직접 열기" },
};

export default function VideoPlayer({ videos, index, setIndex, onClose }) {
  const ref = useModalAccessibility(true, onClose);
  const { language } = useLanguage();
  const [failedSource, setFailedSource] = useState(null);
  const t = ui[language];
  const c = copy[language];
  const current = videos[index];
  const move = (delta) => setIndex((index + delta + videos.length) % videos.length);

  return (
    <div className="film-modal-backdrop" onClick={onClose}>
      <div className="film-modal" ref={ref} role="dialog" aria-modal="true" aria-labelledby="film-player-title" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <div className="film-modal-header">
          <span>UNDRAM / FILMS</span>
          <button className="icon-button" onClick={onClose} aria-label={t.close}><X size={23} /></button>
        </div>
        <div className="film-screen">
          <video key={current.src} src={current.src} poster={current.poster} controls autoPlay playsInline preload="metadata" tabIndex={0} aria-label={current.title[language]} onError={() => setFailedSource(current.src)} />
          {failedSource === current.src && <div className="film-error" role="alert"><p>{c.error}</p><a href={current.src} target="_blank" rel="noreferrer">{c.open}<ExternalLink size={16} /></a></div>}
        </div>
        <div className="film-modal-footer">
          <div><p className="film-position" aria-live="polite">{String(index + 1).padStart(2, "0")} / {videos.length}</p><h3 id="film-player-title">{current.title[language]}</h3></div>
          <div className="gallery-tools">
            <button className="circle-button" onClick={() => move(-1)} aria-label={t.previous}><ArrowLeft size={19} /></button>
            <button className="circle-button" onClick={() => move(1)} aria-label={t.next}><ArrowRight size={19} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
