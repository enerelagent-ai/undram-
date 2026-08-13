"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function PartnersSection() {
    const { language } = useLanguage();
    const t = translations[language].nav; // Reusing nav translations for "Where to Buy" title if available, or hardcoding

    const partners = [
        { name: "Nomin", logo: "/images/nomin.png" },
        { name: "Monos", logo: "/images/monos.png" },
        { name: "M-Mart", logo: "/images/mmart.png" },
        { name: "Khanburegdei", logo: "/images/khanburegdei.png" },
        { name: "Naran", logo: "/images/naran.png" },
    ];

    return (
        <section className="py-16 bg-cream-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-secondary mb-12 uppercase tracking-widest">
                    {t.whereToBuy}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner) => (
                        <div key={partner.name} className="relative w-32 h-16 md:w-40 md:h-20">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
