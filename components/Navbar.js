"use client";

import Image from "next/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { translations } from "@/context/translations";
import CartModal from "./CartModal";
import CheckoutModal from "./CheckoutModal";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const { language, setLanguage } = useLanguage();
    const { toggleCart, cartItems } = useCart();
    const t = translations[language].nav;

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t?.shop || "Shop", href: "/#shop" },
        { name: t?.whereToBuy || "Where to Buy", href: "/stores" },
        { name: t?.story || "Our Story", href: "/story" },
        { name: t?.recipes || "Recipes", href: "/recipes" },
        { name: t?.contact || "Contact", href: "/#footer" },
    ];

    const languages = [
        { code: "mn", label: "Монгол" },
        { code: "en", label: "English" },
        { code: "zh", label: "中文" },
        { code: "ko", label: "한국어" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-cream-50/80 backdrop-blur-md shadow-sm py-4 border-b border-gold-500/10"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative h-10 w-auto hover:opacity-80 transition-opacity">
                        <Image
                            src="/images/logo.png"
                            alt="Undram Honey"
                            width={150}
                            height={40}
                            className="h-full w-auto object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-charcoal-900/80 hover:text-gold-500 font-medium transition-colors text-sm tracking-wide uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Language & Mobile Toggle */}
                    <div className="flex items-center gap-6">
                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-1 text-charcoal-900 font-bold hover:text-gold-500 transition-colors uppercase text-xs tracking-wider"
                            >
                                <Globe size={16} />
                                {language.toUpperCase()}
                                <ChevronDown size={12} />
                            </button>

                            <AnimatePresence>
                                {isLangMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-4 bg-white rounded-none shadow-xl border border-gold-100 overflow-hidden min-w-[120px]"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-6 py-3 text-sm font-medium hover:bg-gold-50 transition-colors ${language === lang.code ? "text-gold-500" : "text-charcoal-800"
                                                    }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className="relative text-charcoal-900 hover:text-gold-500 transition-colors"
                        >
                            <ShoppingBag size={20} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        <button
                            className="md:hidden text-charcoal-900 hover:text-gold-500 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "100vh" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-cream-50 fixed inset-0 top-[70px] z-40 overflow-y-auto"
                        >
                            <div className="flex flex-col p-8 gap-6 items-center justify-center h-full">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-2xl font-heading text-charcoal-900 hover:text-gold-500 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <CartModal onCheckout={() => setIsCheckoutOpen(true)} />
            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </>
    );
}
