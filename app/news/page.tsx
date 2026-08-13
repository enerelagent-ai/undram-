"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/utils/blogData";
import Footer from "@/components/Footer";

export default function NewsPage() {
    const { language } = useLanguage();
    const posts = blogPosts[language as keyof typeof blogPosts] || blogPosts.mn;

    return (
        <main className="bg-background min-h-screen">

            {/* Header */}
            <section className="pt-32 pb-12 bg-secondary text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="honeycomb" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M20 0L37.32 10V30L20 40L2.68 30V10L20 0Z" fill="none" stroke="#F59E0B" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#honeycomb)" />
                    </svg>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                        {language === 'mn' ? 'Мэдээ & Блог' : 'News & Blog'}
                    </h1>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        {language === 'mn'
                            ? 'Undram брэндийн шинэ мэдээ, түүх, зөвлөгөөг эндээс уншаарай.'
                            : 'Latest updates, stories, and honey tips from the Undram team.'}
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary/5 flex flex-col h-full"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-secondary/50 text-sm mb-3">
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-secondary mb-3 line-clamp-2 hover:text-primary transition-colors">
                                        <Link href={`/news/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="text-secondary/70 mb-6 line-clamp-3 text-sm flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/news/${post.id}`}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm mt-auto"
                                    >
                                        {language === 'mn' ? 'Дэлгэрэнгүй' : 'Read More'} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
