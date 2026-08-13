"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function RecipesSection() {
    const { language } = useLanguage();
    const t = translations[language]?.recipes || translations["mn"].recipes;

    if (!t) return null;

    const viewAllLabel = translations[language]?.nav?.recipes || "View All";
    const viewDetailLabel = translations[language]?.recipes?.viewDetail || "View Detail";

    return (
        <section id="recipes" className="py-24 bg-cream-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-gold-500 font-bold tracking-wider uppercase text-sm">
                            {t.subtitle}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gold-900 mt-3">
                            {t.title}
                        </h2>
                    </div>
                    <Link
                        href="/recipes"
                        className="hidden md:flex items-center gap-2 text-charcoal-900 font-bold hover:text-gold-500 transition-colors"
                    >
                        {viewAllLabel} <ArrowUpRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {t.items.slice(0, 4).map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#FAF5EA]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/recipes/${recipe.id}`} className="block">
                                <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden mb-4">
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-[#451A03] shadow-sm">
                                        {recipe.category}
                                    </div>
                                </div>
                                <h3 className="text-lg md:text-xl font-heading font-bold text-[#451A03] group-hover:text-[#F59E0B] transition-colors mb-2 line-clamp-2 leading-tight">
                                    {recipe.title}
                                </h3>
                                <p className="text-gray-500 text-xs md:text-sm line-clamp-2 font-body mb-4">
                                    {recipe.description}
                                </p>
                                <div className="flex items-center gap-2 text-[#F59E0B] text-xs md:text-sm font-bold uppercase tracking-wider">
                                    {viewDetailLabel} <ArrowUpRight size={16} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 text-gold-900 font-bold hover:text-gold-500 transition-colors"
                    >
                        {viewAllLabel} <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
