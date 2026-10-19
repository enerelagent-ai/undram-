"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import PageHeading from "@/components/PageHeading";
import useProducts from "@/hooks/useProducts";
import { useLanguage } from "@/context/LanguageContext";
import { ui, categoryOf } from "@/utils/storefront";
import { parsePrice } from "@/utils/cart.mjs";
import { shopCopy, shopCategories } from "@/utils/shopCopy";
export default function ProductsPage() {
  return <Suspense fallback={<CatalogLoading />}><CatalogFromQuery /></Suspense>;
}
function CatalogLoading() {
  const { language } = useLanguage();
  return <main className="shell page-content"><p className="catalog-loading" role="status">{shopCopy[language].loading}</p></main>;
}
function CatalogFromQuery() {
  const params = useSearchParams();
  const category = shopCategories.includes(params.get("category")) ? params.get("category") : "all";
  const query = (params.get("q") || "").slice(0, 100);
  return <Catalog key={JSON.stringify([category, query])} initialCategory={category} initialQuery={query} />;
}
function Catalog({ initialCategory, initialQuery }) {
  const { language } = useLanguage();
  const t = ui[language];
  const c = shopCopy[language];
  const products = useProducts();
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialQuery);
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
    <main className="shell page-content shop-catalog">
      <nav className="breadcrumb" aria-label={t.home}><Link href="/">{t.home}</Link><span>/</span><span>{t.allProducts}</span></nav>
      <PageHeading
        eyebrow={t.collection}
        title={t.allProducts}
        description={
          language === "mn"
            ? "Өдөр тутмын амт, сэтгэл шингэсэн бэлэг. Өөрт тохирох сонголтоо олоорой."
            : language === "en"
              ? "An everyday ritual. A thoughtful gift. Find your own taste of Mongolia."
              : t.collection
        }
      />
      <div className="shop-catalog-layout">
        <aside className="shop-catalog-sidebar">
          <h2>{c.categories}</h2>
        <div className="filter-tabs" aria-label={t.products}>
          {["all", "honey", "gifts", "drinks", "craft"].map((c) => (
            <button
              key={c}
              className="filter-tab"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              <span>{t[c]}</span><span>{c === "all" ? products.length : products.filter(p => categoryOf(p.id) === c).length}</span>
            </button>
          ))}
        </div>
          <div className="catalog-help"><strong>{c.delivery}</strong><p>{c.deliveryBody}</p><Link href="/#how-to-order">{c.order}</Link></div>
        </aside>
        <div className="shop-catalog-results">
      <div className="catalog-toolbar">
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
        </div>
      </div>
    </main>
  );
}
