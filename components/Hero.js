"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function Hero() {
    const { language } = useLanguage();
    const t = translations[language].hero;

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">


            <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left"
                >
                    {/* Badge */}
                    <span className="inline-block bg-gold-100 text-accent px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
                        {t.badge}
                    </span>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gold-900 mb-3 leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gold-600 font-medium mb-8 tracking-wide">
                        {t.titleHighlight}
                    </p>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-accent/80 mb-10 max-w-lg mx-auto md:mx-0 font-body leading-relaxed">
                        {t.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mb-16">
                        <Link
                            href="#shop"
                            className="group bg-gold-500 text-white px-8 py-4 rounded-full font-bold text-base tracking-wide hover:bg-gold-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
                        >
                            {t.shopBtn}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <Link
                            href="#story"
                            className="px-8 py-4 rounded-full font-bold text-base tracking-wide text-gold-900 border border-gold-900/20 hover:bg-gold-50 hover:border-gold-500 transition-all flex items-center justify-center"
                        >
                            {t.storyBtn}
                        </Link>
                    </div>

                    {/* Awards Box */}
                    <div className="bg-white border border-cream-100 p-6 rounded-xl shadow-sm inline-block text-left max-w-md">
                        <p className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-4 border-b border-cream-100 pb-2">
                            {t.awards.title}
                        </p>
                        <ul className="flex flex-col gap-3 text-sm text-charcoal-800 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                                <span>{t.awards.award1}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                                <span>{t.awards.award2}</span>
                            </li>
                            {t.awards.award3 && (
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                                    <span>{t.awards.award3}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center"
                >
                    {/* Abstract Blob Background */}
                    <div className="absolute inset-0 bg-gold-500/5 rounded-full blur-3xl transform scale-90" />

                    {/* Main Image */}
                    <div className="relative w-full h-full max-w-lg mx-auto">
                        <div className="absolute inset-0 bg-gold-900/5 rounded-full blur-2xl z-0 transform translate-y-10 scale-90"></div>
                        <Image
                            src="/images/hero.jpg"
                            alt="Undram Honey Jar"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="absolute bottom-20 right-4 md:right-10 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gold-100 z-20"
                    >
                        <p className="text-gold-900 font-heading font-bold text-center leading-tight">
                            <span className="text-4xl text-gold-500 block mb-1">100%</span>
                            <span className="text-xs tracking-widest uppercase">{t.floatingBadge}</span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
