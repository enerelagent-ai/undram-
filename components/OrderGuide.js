"use client";
import Link from "next/link";
import { ShoppingCart, ClipboardList, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { shopCopy } from "@/utils/shopCopy";
const icons = [ShoppingCart, ClipboardList, MessageCircle];
export default function OrderGuide() {
  const { language } = useLanguage();
  const c = shopCopy[language];
  return (
    <section className="order-guide shell" id="how-to-order" aria-labelledby="order-guide-title">
      <div className="shop-section-heading"><div><h2 className="shop-section-title" id="order-guide-title">{c.order}</h2><p>{c.orderIntro}</p></div><Link className="text-link" href="/contact">{c.support}</Link></div>
      <ol className="order-steps">{c.steps.map(([title, body], i) => {
        const Icon = icons[i];
        return <li key={title}><div className="order-step-icon"><Icon size={24} /><span>{i + 1}</span></div><h3>{title}</h3><p>{body}</p></li>;
      })}</ol>
      <div className="order-help"><p>{c.needHelp}</p><a href="tel:+97691001393"><Phone size={17} />9100 1393</a></div>
    </section>
  );
}
