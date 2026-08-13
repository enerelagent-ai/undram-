"use client";

import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language].footer;

    return (
        <footer id="footer" className="bg-[#5D2906] text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    {/* Brand - Left Column */}
                    <div>
                        <Link href="/" className="text-3xl font-bold font-heading mb-6 block uppercase tracking-wider">
                            UNDRAM
                        </Link>
                        <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-md">
                            {t.desc}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/mongolian.natural.honey" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white text-[#5D2906] p-3 rounded-full hover:bg-gold-500 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/undram_brand_products/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white text-[#5D2906] p-3 rounded-full hover:bg-gold-500 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter & Contact - Right Column */}
                    <div>
                        <h4 className="font-bold text-2xl mb-4">{t.newsletter.heading}</h4>
                        <p className="text-white/80 mb-6">{t.newsletter.desc}</p>
                        <form className="flex flex-col sm:flex-row gap-3 mb-10" onSubmit={(event) => event.preventDefault()}>
                            <input
                                type="email"
                                aria-label={t.newsletter.placeholder}
                                placeholder={t.newsletter.placeholder}
                                className="bg-black/20 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 flex-grow"
                            />
                            <button className="bg-yellow-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-yellow-600 transition-colors uppercase tracking-wide">
                                {t.newsletter.btn}
                            </button>
                        </form>

                        <div className="text-white/80 space-y-3 font-light">
                            <p className="flex items-center gap-3">
                                <span className="font-bold">Phone:</span> {t.contactInfo.phone}
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="font-bold">Email:</span> {t.contactInfo.email}
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="font-bold">Address:</span> {t.contactInfo.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
                    <p>{t.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
