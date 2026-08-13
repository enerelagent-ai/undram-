"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { blogPosts } from "@/utils/blogData";
import Footer from "@/components/Footer";

export default function ArticlePageClient() {
    const params = useParams();
    const { language } = useLanguage();
    const posts = blogPosts[language as keyof typeof blogPosts] || blogPosts.mn;
    const post = posts.find((p) => p.id === params.id);

    if (!post) {
        return (
            <main className="bg-background min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-secondary mb-4">
                            {language === 'mn' ? 'Мэдээ олдсонгүй' : 'Article Not Found'}
                        </h1>
                        <Link href="/news" className="text-primary font-bold hover:underline">
                            {language === 'mn' ? 'Мэдээ рүү буцах' : 'Back to News'}
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="bg-background min-h-screen">
            <article className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Link */}
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-secondary/60 hover:text-primary transition-colors mb-8 font-medium"
                    >
                        <ArrowLeft size={18} /> {language === 'mn' ? 'Мэдээ рүү буцах' : 'Back to News'}
                    </Link>

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-secondary/60 border-b border-secondary/10 pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-secondary">Undram Brand</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-secondary/80">
                        <p className="whitespace-pre-line leading-relaxed text-lg">
                            {post.content}
                        </p>
                    </div>

                    {/* Share / Footer of Article */}
                    <div className="mt-16 pt-8 border-t border-secondary/10 flex justify-between items-center">
                        <p className="font-bold text-secondary">
                            {language === 'mn' ? 'Хуваалцах:' : 'Share this article:'}
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-gray-100 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
