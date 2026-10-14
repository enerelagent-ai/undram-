"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Phone, Search } from "lucide-react";
import { STORES } from "@/data/stores";
import { useLanguage } from "@/context/LanguageContext";
import { ui, asset } from "@/utils/storefront";
import PageHeading from "@/components/PageHeading";
export default function StoresPage() {
  const { language } = useLanguage();
  const t = ui[language];
  const [search, setSearch] = useState("");
  const stores = STORES.filter((s) =>
    (s.name + s.location).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className="shell page-content">
      <PageHeading
        eyebrow={t.stores}
        title={t.stores}
        description={t.storeBody}
      />
      <label className="search-field mb-8 max-w-sm">
        <Search size={17} />
        <span className="sr-only">{t.stores}</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.stores}
        />
      </label>
      <div className="store-grid">
        {stores.map((s) => (
          <article className="store-card" key={s.id}>
            <div className="store-image">
              <Image src={asset(s.image)} alt={s.name} fill sizes="110px" />
            </div>
            <div>
              <h2>{s.name}</h2>
              <p>
                {language === "mn" || s.type === "specific"
                  ? s.location
                  : s.id === 6 ? ({en: "Health section", zh: "保健品区", ko: "건강 제품 코너"}[language]) : t.allBranches}
              </p>
              {s.phone && (
                <a href={`tel:+976${s.phone.replace("-", "")}`}>
                  <Phone size={13} />
                  {s.phone}
                </a>
              )}
              <br />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + " Улаанбаатар Монгол")}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.find}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
      {stores.length === 0 && (
        <div className="empty-state">
          <p>
            {language === "mn"
              ? "Борлуулалтын цэг олдсонгүй."
              : language === "en"
                ? "No stores found."
                : t.none}
          </p>
          <button className="button button-dark" onClick={() => setSearch("")}>
            {t.reset}
          </button>
        </div>
      )}
    </main>
  );
}
