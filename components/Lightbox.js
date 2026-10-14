"use client";
import { useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { useLanguage } from "@/context/LanguageContext";
import { ui, asset } from "@/utils/storefront";
export default function Lightbox({ images, index, setIndex, onClose }) {
  const close = useCallback(() => onClose(), [onClose]);
  const ref = useModalAccessibility(true, close);
  const { language } = useLanguage();
  const t = ui[language];
  const move = (delta) =>
    setIndex((index + delta + images.length) % images.length);
  return (
    <div className="lightbox-backdrop" onClick={close}>
      <div
        ref={ref}
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={t.zoom}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <button
          className="lightbox-close icon-button"
          onClick={close}
          aria-label={t.close}
        >
          <X />
        </button>
        <Image
          src={asset(images[index].src)}
          alt={images[index].alt}
          fill
          sizes="95vw"
        />
        {images.length > 1 && (
          <>
            <button
              className="lightbox-prev icon-button"
              onClick={() => move(-1)}
              aria-label={t.previous}
            >
              <ChevronLeft />
            </button>
            <button
              className="lightbox-next icon-button"
              onClick={() => move(1)}
              aria-label={t.next}
            >
              <ChevronRight />
            </button>
          </>
        )}
        <span className="lightbox-count">
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
