"use client";
import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import PageHeading from "@/components/PageHeading";
import useProducts from "@/hooks/useProducts";
import { useLanguage } from "@/context/LanguageContext";
import { ui, categoryOf } from "@/utils/storefront";
import { parsePrice } from "@/utils/cart.mjs";
export default function ProductsPage() {
  const { language } = useLanguage();
  const t = ui[language];
  const products = useProducts();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const filtered = products
    .filter(
      (p) =>
        (category === "all" || categoryOf(p.id) === category) &&
        p.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? parsePrice(a.price) - parsePrice(b.price)
        : sort === "high"
          ? parsePrice(b.price) - parsePrice(a.price)
          : 0,
    );
  return (
    <main className="shell page-content">
      <PageHeading
        eyebrow={t.collection}
        title={t.products}
        description={
          language === "mn"
            ? "Өдөр тутмын амт, сэтгэл шингэсэн бэлэг. Өөрт тохирох сонголтоо олоорой."
            : language === "en"
              ? "An everyday ritual. A thoughtful gift. Find your own taste of Mongolia."
              : t.collection
        }
      />
      <div className="catalog-toolbar">
        <div className="filter-tabs" aria-label={t.products}>
          {["all", "honey", "gifts", "drinks", "craft"].map((c) => (
            <button
              key={c}
              className="filter-tab"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {t[c]}
            </button>
          ))}
        </div>
        <div className="catalog-inputs">
          <label className="search-field">
            <Search size={16} />
            <span className="sr-only">{t.search}</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
            />
          </label>
          <select
            aria-label={t.sort}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {["featured", "low", "high"].map((s) => (
              <option key={s} value={s}>
                {t[s]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} {t.results}
      </p>
      {filtered.length ? (
        <div className="product-grid catalog-grid">
          {filtered.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={40} />
          <h2>{t.none}</h2>
          <button
            className="button button-dark"
            onClick={() => {
              setSearch("");
              setCategory("all");
              setSort("featured");
            }}
          >
            {t.reset}
          </button>
        </div>
      )}
    </main>
  );
}
