"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartActions } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const TOAST_TITLES = { mn: "Амжилттай!", en: "Added!", zh: "成功!", ko: "성공!" };
const TOAST_SUFFIXES = { mn: "нэмэгдлээ", en: "added to cart", zh: "已加入购物车", ko: "장바구니에 담겼습니다" };

// TASTY NOTIFICATION COMPONENT
const Toast = ({ show, message, title }) => (
    <div className={`fixed bottom-5 right-5 bg-white border-l-4 border-yellow-500 shadow-2xl p-4 rounded-lg transform transition-all duration-500 ease-out z-[100] flex items-center gap-3 ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Check size={18} />
        </div>
        <div>
            <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
            <p className="text-gray-500 text-xs">{message}</p>
        </div>
    </div>
);

export default function ProductCard({ product, t, priority = false }) {
    const [isAdded, setIsAdded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { addToCart } = useCartActions();
    const { language } = useLanguage();

    const handleAddToCart = () => {
        // 0. Add to Cart Context
        addToCart(product);

        // 1. Button Animation State
        setIsAdded(true);

        // 2. Show Toast
        setShowToast(true);

        // 3. Reset after delay
        setTimeout(() => {
            setIsAdded(false);
            setShowToast(false);
        }, 3000);
    };

    return (
        <>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gold-100/50 flex flex-col h-full">
                <Link href={`/products/${product.id}`} className="flex-1 flex flex-col group">
                    {/* Product Image */}
                    <div className="relative h-72 w-full bg-gray-50 overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.title || product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={priority}
                            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.tag && (
                            <div className="absolute top-4 left-4 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                {product.tag}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 pb-0 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-charcoal-900 mb-1 leading-tight">
                                    {product.title || product.name}
                                </h3>
                                <p className="text-gold-600 font-bold text-lg font-price">
                                    {product.price}
                                </p>
                            </div>
                        </div>

                        {/* Description (Truncated for clean look) */}
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                            {/* Use benefits as description if description is missing */}
                            {(product.description || product.benefits)?.replace(/<[^>]*>?/gm, '')}
                        </p>
                    </div>
                </Link>

                {/* LUXURY BUTTON */}
                <div className="p-8 pt-0 mt-auto">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${isAdded
                            ? "bg-green-600 text-white shadow-inner scale-95"
                            : "bg-gold-500 text-white hover:bg-gold-600 hover:shadow-lg hover:shadow-gold-200"
                            }`}
                    >
                        {isAdded ? (
                            <>
                                <Check size={20} /> {t?.shop?.added || "Сагсанд орлоо"}
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={20} /> {t?.shop?.addToCart || "Сагсанд хийх"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Render Toast Portal */}
            <Toast
                show={showToast}
                title={TOAST_TITLES[language] || TOAST_TITLES.mn}
                message={`${product.title || product.name} ${TOAST_SUFFIXES[language] || TOAST_SUFFIXES.mn}.`}
            />
        </>
    );
}
