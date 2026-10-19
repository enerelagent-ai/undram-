"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ShoppingCart, Search, Phone, Menu, X, ArrowUpRight, Grid2X2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { ui } from "@/utils/storefront";
import { shopCopy, shopCategories } from "@/utils/shopCopy";
const CartModal = dynamic(() => import("./CartModal"), { ssr: false });
const CheckoutModal = dynamic(() => import("./CheckoutModal"), { ssr: false });
export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { cartItems, isCartOpen, toggleCart } = useCart();
  const [menu, setMenu] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const close = useCallback(() => setMenu(false), []);
  const closeCheckout = useCallback(() => setCheckout(false), []);
  const ref = useModalAccessibility(menu, close);
  const pathname = usePathname();
  const t = ui[language];
  const c = shopCopy[language];
  const links = [
    ["products", "/products"],
    ["story", "/story"],
    ["stores", "/stores"],
    ["recipes", "/recipes"],
    ["news", "/news"],
  ];
  const count = cartItems.reduce((s, p) => s + p.quantity, 0);
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.details}
      </a>
      <div className="shop-topbar">
        <div className="shell"><span>UNDRAM · {c.shop}</span><div><Link href="/#how-to-order">{c.order}</Link><a href="tel:+97691001393"><Phone size={13} />9100 1393</a></div></div>
      </div>
      <header className="site-header">
        <nav className="nav-shell" aria-label={t.menu}>
          <Link href="/" className="wordmark" aria-label="UNDRAM">
            <span>
              UNDRAM<span className="brand-dot">.</span>
            </span>
            <small>MONGOLIAN HONEY</small>
          </Link>
          <form action="/products" method="get" role="search" className="shop-search">
            <label className="sr-only" htmlFor="store-search">{t.search}</label>
            <input id="store-search" name="q" type="search" placeholder={t.search} maxLength={100} />
            <button type="submit" aria-label={t.search}><Search size={20} /></button>
          </form>
          <div className="nav-actions">
            <label className="language-select">
              <span className="sr-only">{t.language}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label={t.language}
              >
                <option value="mn">MN</option>
                <option value="en">EN</option>
                <option value="zh">中文</option>
                <option value="ko">한국어</option>
              </select>
            </label>
            <button
              className="bag-button"
              aria-label={`${t.cart} (${count})`}
              onClick={toggleCart}
            >
              <ShoppingCart size={23} />
              <span className="bag-label">{t.cart}</span>
              <span className="bag-count">{count}</span>
            </button>
            <button
              className="mobile-toggle icon-button"
              aria-label={t.menu}
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
        <nav className="shop-nav" aria-label={c.categories}>
          <div className="shell">
            <Link className="shop-all-link" href="/products"><Grid2X2 size={17} />{t.allProducts}</Link>
            {shopCategories.map(category => <Link key={category} href={`/products?category=${category}`}>{t[category]}</Link>)}
            <span className="shop-nav-divider" />
            {[["stores", "/stores"], ["contact", "/contact"]].map(([key, href]) => <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined}>{t[key]}</Link>)}
          </div>
        </nav>
      </header>
      {menu && (
        <div
          className="mobile-menu"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
          tabIndex={-1}
        >
          <div className="mobile-menu-top">
            <span className="eyebrow">UNDRAM / {t.menu}</span>
            <button
              className="icon-button"
              onClick={close}
              aria-label={t.close}
            >
              <X />
            </button>
          </div>
          {[links[0], ...shopCategories.map(category => [category, `/products?category=${category}`]), ...links.slice(1), ["contact", "/contact"]].map(([key, href], i) => (
            <Link key={key} href={href} onClick={close}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              {t[key]}
              <ArrowUpRight size={24} />
            </Link>
          ))}
          <p>MONGOLIAN HONEY · EST. IN NATURE</p>
        </div>
      )}
      {isCartOpen && <CartModal onCheckout={() => setCheckout(true)} />}
      <CheckoutModal isOpen={checkout} onClose={closeCheckout} />
    </>
  );
}
