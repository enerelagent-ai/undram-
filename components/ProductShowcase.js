"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import ProductCard from "./ProductCard";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductShowcase() {
    const { language } = useLanguage();
    const t = translations[language] || translations["mn"];

    const [firestoreProducts, setFirestoreProducts] = useState([]);

    // Fetch products from Firestore in real-time (sync in background)
    useEffect(() => {
        if (!db) return undefined;
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                setFirestoreProducts(docs);
            },
            (err) => {
                console.error("ProductShowcase Firestore error:", err);
            }
        );
        return () => unsub();
    }, []);

    // Merge: Firestore overrides matching translation products; translation-only products always appear
    const products = useMemo(() => {
        const translationProducts = t.products?.items || [];
        if (firestoreProducts.length === 0) return translationProducts;
        const firestoreIdSet = new Set(firestoreProducts.map((p) => String(p.id)));
        const translationOnly = translationProducts.filter(
            (p) => !firestoreIdSet.has(String(p.id))
        );
        return [...firestoreProducts, ...translationOnly];
    }, [firestoreProducts, t.products?.items]);

    return (
        <section id="shop" className="py-12 md:py-20 bg-[#FDFBF7]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16 space-y-4">
                    <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">
                        {t.shop?.collection || "Collection"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 font-heading">
                        {t.shop?.heading || "Our Products"}
                    </h2>
                    <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full" />
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-xl text-gray-400">
                            {t.shop?.heading ? `${t.shop.heading}...` : "Бүтээгдэхүүн олдсонгүй."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "200px" }}
                                transition={{ delay: index < 3 ? index * 0.1 : 0 }}
                            >
                                <ProductCard product={product} t={t} priority={index < 3} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
