"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function RecipesPage() {
    const { language } = useLanguage();

    // FIX: Ensure we fallback to 'mn' and access the correct key 'recipes' (not recipesPage)
    const currentLangData = translations[language] || translations['mn'];
    const content = currentLangData.recipes;
    const recipesList = content.items || [];

    return (
        <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs">Lifestyle</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{content.title}</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">{content.subtitle}</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipesList.map((item) => (
                        <Link href={`/recipes/${item.id}`} key={item.id} className="group">
                            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">

                                {/* Image */}
                                <div className="h-64 overflow-hidden relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                        {item.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>

                                    {/* Meta (Assuming translation items might not have 'time' yet, we conditionally render or fallback) */}
                                    <div className="flex items-center gap-4 text-gray-400 text-sm mt-auto pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            <span>5-10 мин</span>
                                        </div>
                                        <div className="flex items-center gap-1 ml-auto text-yellow-600 font-bold group-hover:translate-x-1 transition-transform">
                                            Дэлгэрэнгүй <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
