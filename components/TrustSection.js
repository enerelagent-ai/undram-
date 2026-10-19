"use client";
import Link from "next/link";
import { Truck, Landmark, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { shopCopy } from "@/utils/shopCopy";
export default function TrustSection() {
  const { language } = useLanguage();
  const c = shopCopy[language];
  return (
    <div className="shop-services shell">
      {[[Truck, c.delivery, c.deliveryBody, "/contact"], [Landmark, c.payment, c.paymentBody, "/#how-to-order"], [Phone, c.support, c.supportBody, "tel:+97691001393"]].map(([Icon, title, body, href]) => (
        <Link href={href} key={title}><Icon size={25} strokeWidth={1.6} /><div><strong>{title}</strong><span>{body}</span></div></Link>
      ))}
    </div>
  );
}
