"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Flower, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartActions } from "@/context/CartContext";

export default function ProductModal({ isOpen, onClose, product }) {
    const { addToCart } = useCartActions();
    const [isAdded, setIsAdded] = useState(false);
    const [showToast, setShowToast] = useState(false);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: 1 });
        setIsAdded(true);
        setShowToast(true);

        // Close modal after a short delay or let user close it? 
        // Usually better to keep it open or close immediately. 
        // Let's keep it open to show the success state, then user can close.
        setTimeout(() => {
            setIsAdded(false);
            setShowToast(false);
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[80]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[90] p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-4xl rounded-none shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row border border-gold-100 max-h-[90vh] md:max-h-[600px]">

                            {/* Close Button (Mobile) */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:hidden z-10 bg-white/80 p-2 rounded-full text-charcoal-900"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Side: Image */}
                            <div className="w-full md:w-1/2 bg-cream-50 relative flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-gold-100">
                                <div className="absolute inset-0 bg-gold-500/5" />
                                <div className="relative w-full h-64 md:h-full flex items-center justify-center">
                                    <Image
                                        src={product.image || "/images/hero.jpg"}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto bg-gradient-to-br from-[#FFFDF5] to-[#FFF8E1] relative">
                                {/* Decorative Background Pattern */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <svg className="absolute top-0 right-0 text-amber-500/5 w-64 h-64 transform translate-x-1/3 -translate-y-1/3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                                    </svg>
                                    <div className="absolute top-20 right-10 text-amber-500/10">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                    </div>
                                    <div className="absolute bottom-10 left-10 text-amber-500/10">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                    </div>
                                </div>

                                {/* Theme Icon (Flower representation) */}
                                <div className="absolute top-6 right-6 pointer-events-none">
                                    <Flower className="w-8 h-8 text-orange-400 rotate-12 opacity-80" />
                                </div>

                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <span className="text-amber-600 font-bold uppercase tracking-widest text-xs"></span>
                                    <button
                                        onClick={onClose}
                                        className="hidden md:block text-amber-800/60 hover:text-amber-900 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4 relative z-10">
                                    {product.name}
                                </h2>

                                <div className="flex items-baseline gap-4 mb-8 relative z-10">
                                    <span className="text-2xl font-bold text-amber-700">{product.price}</span>

                                </div>

                                <div className="space-y-6 mb-10 flex-1 relative z-10">
                                    <div>
                                        <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2">Description</h3>
                                        <div
                                            className="text-amber-900/80 font-light leading-relaxed prose prose-sm max-w-none prose-p:text-amber-900/80 prose-headings:text-amber-900 prose-strong:text-amber-900 prose-li:text-amber-900/80 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1"
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    className={`w-full py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group rounded-xl shadow-lg relative z-10 ${isAdded
                                        ? "bg-green-600 text-white shadow-inner scale-95"
                                        : "bg-amber-900 text-white hover:bg-amber-800 shadow-amber-900/20"
                                        }`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check size={18} /> Added
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag size={18} className="group-hover:animate-bounce" /> Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Toast Notification */}
                    <div className={`fixed bottom-5 right-5 bg-white border-l-4 border-yellow-500 shadow-2xl p-4 rounded-lg transform transition-all duration-500 ease-out z-[100] flex items-center gap-3 ${showToast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <Check size={18} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">Success!</h4>
                            <p className="text-gray-500 text-xs">{product.name} added to cart.</p>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
