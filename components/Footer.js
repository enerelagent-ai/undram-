"use client";
import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { ui } from "@/utils/storefront";
export default function Footer() {
  const { language } = useLanguage();
  const t = ui[language],
    f = translations[language].footer;
  return (
    <footer id="footer" className="site-footer">
      <div className="shell footer-top">
        <div className="footer-intro">
          <span className="eyebrow">MONGOLIAN HONEY</span>
          <h2>
            {language === "mn"
              ? "Байгалиас.\nСэтгэлээс."
              : language === "en"
                ? "From nature.\nWith care."
                : language === "zh"
                  ? "源自自然。\n用心呈现。"
                  : "자연에서.\n정성으로."}
          </h2>
          <p>{f.desc}</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/mongolian.natural.honey"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={19} />
            </a>
            <a
              href="https://www.instagram.com/undram_brand_products/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={19} />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <span className="eyebrow">UNDRAM</span>
          {[
            ["products", "/products"],
            ["story", "/story"],
            ["stores", "/stores"],
            ["recipes", "/recipes"],
            ["news", "/news"],
            ["contact", "/contact"],
          ].map(([k, h]) => (
            <Link href={h} key={k}>
              {t[k]}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <span className="eyebrow">{t.contact}</span>
          <a href="tel:+97691001393" className="footer-phone">
            {f.contactInfo.phone}
          </a>
          <a href="mailto:Undraabrand@gmail.com">{f.contactInfo.email}</a>
          <p>{f.contactInfo.address}</p>
          <Link className="text-link" href="/contact">
            {t.delivery}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="shell footer-wordmark" aria-hidden="true">
        UNDRAM<span>®</span>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 UNDRAM · Энэрэлт Тулуй ХХК</span>
        <span>MONGOLIA, WITH LOVE.</span>
      </div>
    </footer>
  );
}
