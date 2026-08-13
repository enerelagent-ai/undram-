"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, ArrowLeft, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartActions } from "@/context/CartContext";
import { translations } from "@/context/translations";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductDetailClient() {
    const { id } = useParams();
    const { language } = useLanguage();
    const { addToCart } = useCartActions();
    const t = translations[language] || translations["mn"];

    // Derive product from translations synchronously — no loading state needed
    const allItems = useMemo(() => t.products?.items || [], [t.products?.items]);
    const translationProduct = useMemo(
        () => allItems.find((p) => String(p.id) === String(id)) || null,
        [allItems, id]
    );
    const translationRelated = useMemo(
        () => allItems.filter((p) => String(p.id) !== String(id)).slice(0, 3),
        [allItems, id]
    );

    // Firestore can silently override translation data in the background
    const [firestoreProduct, setFirestoreProduct] = useState(null);
    const [firestoreRelated, setFirestoreRelated] = useState(null);

    const product = firestoreProduct || translationProduct;
    const relatedProducts = firestoreRelated !== null ? firestoreRelated : translationRelated;

    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Only re-subscribe to Firestore when the route id changes — NOT on language changes
    useEffect(() => {
        if (!db) return undefined;
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                if (!snap.empty) {
                    const allProducts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                    const found = allProducts.find((p) => String(p.id) === String(id));
                    if (found) {
                        setFirestoreProduct(found);
                        setFirestoreRelated(
                            allProducts.filter((p) => String(p.id) !== String(id)).slice(0, 3)
                        );
                    }
                    // If not in Firestore, translationProduct is already visible — nothing to do
                }
            },
            () => {
                // Firestore error — translation data is already showing, no action needed
            }
        );
        return () => unsub();
    }, [id]); // Only id — language changes don't need a new Firestore subscription

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2500);
    };

    if (!product) {
        return (
            <main className="min-h-screen bg-cream-50 pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">Бүтээгдэхүүн олдсонгүй</h1>
                    <Link href="/products" className="text-yellow-600 underline">← Бүтээгдэхүүн рүү буцах</Link>
                </div>
            </main>
        );
    }

    const descParagraphs = (product.description || "").split(/\n\n+/).filter(Boolean);

    return (
        <main className="min-h-screen bg-cream-50 pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Breadcrumb */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-600 transition-colors mb-10"
                >
                    <ArrowLeft size={16} />
                    {t.products?.backToProducts || (language === "mn" ? "Бүтээгдэхүүн рүү буцах" : "Back to Products")}
                </Link>

                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Image */}
                    <div className="relative h-[420px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gold-100/50">
                        <Image
                            src={product.image || "/images/logo.png"}
                            alt={product.title || product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain p-8"
                            priority
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                            <Star size={18} className="text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs">
                                {t.shop?.collection || "Premium Collection"}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                                {product.title || product.name}
                            </h1>
                            <p className="text-2xl font-bold text-yellow-600 mt-3">
                                {product.price}
                            </p>
                        </div>

                        {/* Short description (first paragraph) */}
                        {descParagraphs[0] && (
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {descParagraphs[0]}
                            </p>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-700">
                                {t.products?.quantity || "Тоо"}:
                            </span>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                >−</button>
                                <span className="px-4 py-2 font-bold text-gray-900 min-w-[40px] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                >+</button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-white transition-all duration-300 ${
                                isAdded
                                    ? "bg-green-500 scale-95"
                                    : "bg-gray-900 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-200"
                            }`}
                        >
                            {isAdded ? (
                                <><Check size={22} strokeWidth={3} /> {t.shop?.added || "Нэмэгдлээ!"}</>
                            ) : (
                                <><ShoppingCart size={20} /> {t.shop?.addToCart || "Сагсанд нэмэх"}</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Full Description */}
                {descParagraphs.length > 1 && (
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gold-100/30 mb-16">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {t.products?.detailsHeading || (language === "mn" ? "Дэлгэрэнгүй мэдээлэл" : "Product Details")}
                        </h2>
                        <div className="space-y-4">
                            {descParagraphs.map((para, i) => (
                                <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            {t.products?.relatedProducts || "Бусад бүтээгдэхүүн"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProducts.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/products/${rel.id}`}
                                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group flex flex-col"
                                >
                                    <div className="relative h-40 bg-gray-50 rounded-xl overflow-hidden mb-4">
                                        <Image
                                            src={rel.image || "/images/logo.png"}
                                            alt={rel.title || rel.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-yellow-600 transition-colors line-clamp-2">{rel.title || rel.name}</h3>
                                    <p className="text-yellow-600 font-bold text-sm mt-1">{rel.price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
