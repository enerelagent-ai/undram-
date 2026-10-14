"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const labels = { mn: "Захиалга өгөх", en: "Order now", zh: "立即订购", ko: "주문하기" };

export default function MessengerButton() {
    const { language } = useLanguage();
    return <a href="https://m.me/mongolian.natural.honey" target="_blank" rel="noopener noreferrer" aria-label={labels[language] || labels.mn} className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#29231d] px-4 py-3 text-sm font-bold text-white shadow-2xl ring-2 ring-white/70 transition hover:-translate-y-1 hover:bg-amber-600 md:bottom-7 md:right-7 md:px-5"><MessageCircle size={20} /><span className="hidden sm:inline">{labels[language] || labels.mn}</span></a>;
}
