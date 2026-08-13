"use client";

import { motion } from "framer-motion";
import { Flower, Droplets, ShieldCheck, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function TrustSection() {
    const { language } = useLanguage();
    const t = translations[language].trust;

    const features = [
        {
            icon: Flower,
            title: t.wildflower.title,
            description: t.wildflower.desc,
        },
        {
            icon: Droplets,
            title: t.raw.title,
            description: t.raw.desc,
        },
        {
            icon: ShieldCheck,
            title: t.lab.title,
            description: t.lab.desc,
        },
        {
            icon: Heart,
            title: t.family.title,
            description: t.family.desc,
        },
    ];

    return (
        <section className="py-20 bg-white relative z-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t.heading}</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300 shadow-sm border border-primary/10">
                                <feature.icon className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">{feature.title}</h3>
                            <p className="text-secondary/70 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
