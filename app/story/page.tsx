"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { stories } from "@/utils/storyData";
import Footer from "@/components/Footer";

export default function StoryPage() {
    type Story = {
        id: string;
        title: string;
        date: string;
        content: string;
        image: string;
        subtitle?: string;
        gallery?: string[];
    };
    const { language } = useLanguage();
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const storyList: Story[] = stories[language as keyof typeof stories] || stories.mn;

    return (
        <main className="bg-[#FDFBF7] min-h-screen font-serif pt-32">

            {/* Header */}
            <section className="pt-32 pb-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block font-sans">
                        {language === 'mn' ? 'Бидний аялал' : 'Our Journey'}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 font-heading">
                        {language === 'mn' ? 'Undram Тэмдэглэл' : 'The Undram Diary'}
                    </h1>
                    <p className="text-secondary/60 max-w-2xl mx-auto text-lg italic">
                        {language === 'mn'
                            ? '"Зөгийн балны шил бүр нар, бороо, зэрлэг цэцэгс, зөгий хоёрын түүхийг өгүүлдэг."'
                            : '"Every jar of honey tells a story of the sun, the rain, the wildflowers, and the bees."'}
                    </p>
                </div>
            </section>

            {/* Stories */}
            <section className="pb-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="space-y-24">
                        {storyList.map((story, index: number) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
                            >
                                {/* Image */}
                                <div className="w-full md:w-1/2 cursor-pointer" onClick={() => setSelectedStory(story)}>
                                    <div className="relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform duration-700 border-8 border-white">
                                        <Image
                                            src={story.image}
                                            alt={story.title}
                                            fill
                                            className="object-cover sepia-[0.2]"
                                        />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="w-full md:w-1/2 text-center md:text-left">
                                    <div className="inline-block border-b-2 border-primary/30 pb-2 mb-6">
                                        <span className="text-primary font-bold uppercase tracking-wider text-sm font-sans">{story.subtitle || story.date}</span>
                                    </div>
                                    <h2
                                        className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight font-heading cursor-pointer hover:text-primary transition-colors"
                                        onClick={() => setSelectedStory(story)}
                                    >
                                        {story.title}
                                    </h2>
                                    <p className="text-secondary/80 text-lg leading-relaxed whitespace-pre-line mb-6">
                                        {story.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Signature */}
            <section className="py-20 bg-white border-t border-secondary/5 text-center">
                <div className="container mx-auto px-4">
                    <p className="text-2xl font-handwriting text-secondary mb-4">
                        {language === 'mn' ? 'Хүндэтгэсэн,' : 'With Love,'}
                    </p>
                    <h3 className="text-3xl font-bold text-secondary">Enerelt Tului LLC</h3>
                </div>
            </section>

            <Footer />

            {/* Story Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="relative h-[300px] md:h-[400px] w-full">
                                <Image
                                    src={selectedStory.image}
                                    alt={selectedStory.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                            {selectedStory.subtitle || selectedStory.date}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold font-heading leading-tight">
                                            {selectedStory.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="prose prose-lg max-w-none text-secondary/80">
                                    {selectedStory.content.split('\n').map((paragraph: string, idx: number) => (
                                        <p key={idx} className="mb-4 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                {selectedStory.gallery && selectedStory.gallery.length > 0 && (
                                    <div className="mt-12 pt-12 border-t border-gray-100">
                                        <h3 className="text-2xl font-bold text-secondary mb-6 font-heading">
                                            {language === 'mn' ? 'Зургийн цомог' : 'Photo Gallery'}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedStory.gallery.map((img: string, idx: number) => (
                                                <div key={idx} className="relative h-48 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                                    <Image
                                                        src={img}
                                                        alt={`Gallery ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main >
    );
}
