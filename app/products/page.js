"use client";

import { useState } from "react";
import { ShoppingCart, Check, Star, Info } from "lucide-react";
import Script from "next/script";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import Link from "next/link";
import Image from "next/image";

// --- TOAST COMPONENT ---
const Toast = ({ show, product }) => (
    <div className={`fixed bottom-8 right-8 z-50 transform transition-all duration-500 ease-out ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[300px]">
            <div className="bg-green-100 p-2 rounded-full text-green-600 shrink-0">
                <Check size={20} strokeWidth={3} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm">Added to Cart</h4>
                <p className="text-gray-500 text-xs truncate max-w-[180px]">{product?.title}</p>
            </div>
            <div className="ml-auto pl-4 border-l border-gray-100">
                <span className="text-yellow-600 text-xs font-bold uppercase tracking-wider">Undram</span>
            </div>
        </div>
    </div>
);

export default function ProductsPage() {
    const { language } = useLanguage();
    const [addedId, setAddedId] = useState(null);
    const [toastProduct, setToastProduct] = useState(null);

    // Get Data
    const currentLangData = translations[language] || translations['mn'];
    const { title: pageTitle, items: products } = currentLangData.products;

    // --- 100% НАЙДВАРТАЙ CDN ТЭСЭЛГЭЭ ---
    const handleAddToCart = (product) => {
        // 1. Шалгах: window.confetti бэлэн үү?
        if (typeof window !== "undefined" && window.confetti) {

            // 2. Тохиргоо
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 10000, // <--- Дэлгэцийн хамгийн наана гарна!
            };

            function fire(particleRatio, opts) {
                window.confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio),
                    colors: ['#FFD700', '#FF69B4', '#F472B6', '#FFFFFF', '#FCD34D'],
                    shapes: ['circle'],
                    scalar: 1.5,
                    ticks: 300
                });
            }

            // 3. ГАЛЛАА! 🔥
            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });

        } else {
            console.log("Confetti хараахан ачаалагдаагүй байна...");
        }

        // Toast болон Товчны төлөв
        setAddedId(product.id);
        setToastProduct(product);

        setTimeout(() => setAddedId(null), 2000);
        setTimeout(() => setToastProduct(null), 4000);
    };

    return (
        <main className="min-h-screen bg-cream-50 pt-32 pb-20 px-4">

            {/* --- ЭНЭ МӨР БАЙХАД Л ХАНГАЛТТАЙ --- */}
            <Script
                src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
                strategy="lazyOnload"
            />

            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs">Premium Collection</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{pageTitle}</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {currentLangData.products?.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={product.id} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-gold-100/50 group flex flex-col relative">

                            <Link href={`/products/${product.id}`} className="flex-1 flex flex-col group">
                                <div className="relative h-64 bg-gray-50 rounded-2xl mb-6 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        priority={index === 0}
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-yellow-600 transition-colors">{product.title}</h3>
                                    <span className="font-bold text-gray-900 bg-yellow-50 px-3 py-1 rounded-lg text-sm whitespace-nowrap">{product.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                                    {product.description?.replace(/\n\n.*/s, '') || ""}
                                </p>
                            </Link>

                            <div className="flex gap-3 mt-auto">
                                <Link href={`/products/${product.id}`} className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-colors">
                                    <Info size={20} />
                                </Link>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                    disabled={addedId === product.id}
                                    className={`flex-1 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${addedId === product.id
                                        ? "bg-green-500 text-white shadow-inner"
                                        : "bg-gray-900 text-white hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-200"
                                        }`}
                                >
                                    {addedId === product.id ? (
                                        <>
                                            <Check size={20} strokeWidth={3} className="animate-bounce" />
                                            {currentLangData.shop?.added || 'Нэмэгдлээ'}
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={18} />
                                            {currentLangData.shop?.addToCart || 'Сагсанд'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Toast show={!!toastProduct} product={toastProduct} />
        </main>
    );
}