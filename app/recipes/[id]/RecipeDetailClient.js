"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function RecipeDetailClient() {
    const params = useParams();
    const { language } = useLanguage();
    const id = parseInt(params.id);

    // 1. Get the correct language data (Fallback to MN if missing)
    const currentLangData = translations[language] || translations['mn'];
    const recipes = currentLangData.recipes?.items || [];

    // 2. Find the specific recipe
    const item = recipes.find((i) => i.id === id);

    // 3. Handle Not Found
    if (!item) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
            <div className="text-xl font-bold text-gray-400">Not Found (ID: {id})</div>
        </div>
    );

    // 4. Helper to render rich content blocks (paragraphs, lists, warnings)
    const renderContent = (block, index) => {
        // Safety check if content is just a string (in case translation is simple)
        if (typeof block === 'string') return <p key={index} className="text-gray-700 mb-4">{block}</p>;

        switch (block.type) {
            case 'heading': return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3 border-b pb-2 border-yellow-200">{block.text}</h3>;
            case 'paragraph': return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{block.text}</p>;
            case 'list': return <ul key={index} className="list-disc pl-5 mb-4 space-y-1 text-gray-700">{block.items?.map((li, i) => <li key={i}>{li}</li>)}</ul>;
            case 'warning': return <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded flex gap-3"><AlertTriangle className="text-red-500 shrink-0" /><p className="text-red-800 text-sm font-bold">{block.text}</p></div>;
            default: return null;
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/recipes" className="inline-flex items-center text-gray-500 hover:text-yellow-600 mb-6 font-bold">
                    <ArrowLeft size={20} className="mr-2" />
                    {language === 'en' ? 'Back' : language === 'zh' ? '返回' : language === 'ko' ? '뒤로' : 'Буцах'}
                </Link>

                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    {/* Hero Image */}
                    <div className="relative h-[300px] md:h-[400px] w-full bg-gray-200">
                        <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" priority />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">{item.category}</span>
                            <h1 className="text-2xl md:text-4xl font-bold text-white shadow-sm">{item.title}</h1>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 md:p-10">
                        {/* Description (Italic Intro) */}
                        {item.description && (
                            <p className="text-lg text-gray-600 font-medium mb-8 italic border-l-4 border-yellow-400 pl-4">{item.description}</p>
                        )}

                        {/* Ingredients Box */}
                        {item.ingredients && item.ingredients.length > 0 && (
                            <div className="bg-yellow-50 p-6 rounded-xl mb-8">
                                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    {language === 'en' ? 'Ingredients' : language === 'zh' ? '配料' : language === 'ko' ? '재료' : 'Орц найрлага'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.ingredients.map((ing, i) => (
                                        <span key={i} className="bg-white px-3 py-1 rounded border border-yellow-200 text-sm font-medium">{ing}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rich Text Content */}
                        <div className="prose max-w-none text-gray-800">
                            {item.content && Array.isArray(item.content)
                                ? item.content.map((block, index) => renderContent(block, index))
                                : <p>{item.content}</p> // Fallback if content is simple string
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
