"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function StorySection() {
    const { language } = useLanguage();
    const t = translations[language].story;

    return (
        <section id="story" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/harvest.jpg"
                            alt="Beekeeping in Mongolia"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="font-bold text-lg">{t.imageCaption}</p>
                            <p className="text-sm opacity-80">{t.imageSub}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">{t.subtitle || t.badge}</span>
                        <h2 className="text-4xl font-bold text-secondary mt-2 mb-6">{t.title || t.heading}</h2>

                        <div className="space-y-6 text-lg text-secondary/80 leading-relaxed">
                            {t.description ? (
                                <div dangerouslySetInnerHTML={{ __html: t.description }} />
                            ) : (
                                <>
                                    <p>{t.p1}</p>
                                    <p>{t.p2}</p>
                                    <p>{t.p3}</p>
                                </>
                            )}
                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
