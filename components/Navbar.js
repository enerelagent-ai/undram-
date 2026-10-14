"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { ui } from "@/utils/storefront";
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
      <div className="announcement">
        {language === "mn"
          ? "МОНГОЛЫН ЗЭРЛЭГ ЦЭЦЭГСЭЭС • ТАНЫ ШИРЭЭНД"
          : language === "en"
            ? "FROM MONGOLIAN WILDFLOWERS • TO YOUR TABLE"
            : language === "zh"
              ? "从蒙古野花 • 到您的餐桌"
              : "몽골의 야생화에서 • 당신의 식탁까지"}
      </div>
      <header className="site-header">
        <nav className="nav-shell" aria-label={t.menu}>
          <Link href="/" className="wordmark" aria-label="UNDRAM">
            <span>
              UNDRAM<span className="brand-dot">.</span>
            </span>
            <small>MONGOLIAN HONEY</small>
          </Link>
          <div className="desktop-links">
            {links.map(([key, href]) => (
              <Link
                key={key}
                href={href}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
              >
                {t[key]}
              </Link>
            ))}
          </div>
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
              <ShoppingBag size={20} />
              <span>{count}</span>
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
          {[...links, ["contact", "/contact"]].map(([key, href], i) => (
            <Link key={key} href={href} onClick={close}>
              <small>0{i + 1}</small>
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
