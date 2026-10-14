"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/utils/storefront";
export default function PartnersSection() {
  const { language } = useLanguage();
  const t = ui[language];
  return (
    <section className="section shell stockist-strip">
      <div>
        <p className="eyebrow">{t.stores}</p>
        <h2>{t.storeBody}</h2>
      </div>
      <div className="stockist-logos">
        {[
          ["nomin", "Номин"],
          ["mmart", "M-Mart"],
          ["naran", "Наран"],
          ["monos", "Монос"],
        ].map(([file, name]) => (
          <Link className="stockist-logo" href="/stores" key={file}>
            <Image
              src={`/optimized/${file}.webp`}
              alt={name}
              fill
              sizes="80px"
            />
          </Link>
        ))}
      </div>
      <Link className="circle-button" href="/stores" aria-label={t.stores}>
        <ArrowUpRight size={21} />
      </Link>
    </section>
  );
}
