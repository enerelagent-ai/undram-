"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChefHat } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { recipes } from "@/utils/recipeData";
import Footer from "@/components/Footer";

export default function RecipeDetailPageClient() {
    const params = useParams();
    const { language } = useLanguage();
    const recipeList = recipes[language as keyof typeof recipes] || recipes.mn;
    const recipe = recipeList.find((r) => r.id === params.id);

    if (!recipe) {
        return (
            <main className="bg-background min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-secondary mb-4">
                            {language === 'mn' ? 'Жор олдсонгүй' : 'Recipe Not Found'}
                        </h1>
                        <Link href="/recipes" className="text-primary font-bold hover:underline">
                            {language === 'mn' ? 'Жор руу буцах' : 'Back to Recipes'}
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="bg-background min-h-screen print:bg-white">
            <article className="pt-32 pb-20 print:pt-0 print:pb-0">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Link */}
                    <Link
                        href="/recipes"
                        className="inline-flex items-center gap-2 text-secondary/60 hover:text-primary transition-colors mb-8 font-medium print:hidden"
                    >
                        <ArrowLeft size={18} /> {language === 'mn' ? 'Жор руу буцах' : 'Back to Recipes'}
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
                        {/* Hero Image */}
                        <div className="relative h-[400px] w-full">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 md:p-12">
                                <div className="text-white">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading leading-tight text-shadow">
                                        {recipe.title}
                                    </h1>
                                    <p className="text-white/90 italic text-lg max-w-2xl">
                                        &ldquo;{recipe.excerpt}&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            {/* Meta & Actions */}


                            <div className="grid md:grid-cols-3 gap-12">
                                {/* Ingredients */}
                                <div className="md:col-span-1">
                                    <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                                        <span className="text-primary">●</span> {language === 'mn' ? 'Орц' : 'Ingredients'}
                                    </h3>
                                    <ul className="space-y-4">
                                        {recipe.ingredients.map((ingredient, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-secondary/80 pb-3 border-b border-secondary/5 last:border-0">
                                                <span className="font-bold text-primary/50 text-sm mt-1">{idx + 1}</span>
                                                <span>{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Instructions */}
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                                        <ChefHat className="text-primary" /> {language === 'mn' ? 'Заавар' : 'Instructions'}
                                    </h3>
                                    <div className="prose prose-lg text-secondary/80 whitespace-pre-line leading-relaxed">
                                        {recipe.instructions}
                                    </div>

                                    <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-center italic text-secondary/70">
                                            &ldquo;{language === 'mn' ? 'Undram зөгийн балтайгаа амтархан зооглоорой!' : 'Enjoy this delicious recipe with Undram Honey!'}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <div className="print:hidden">
                <Footer />
            </div>
        </main>
    );
}
