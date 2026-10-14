import { blogPosts } from "@/utils/blogData";
import ArticlePageClient from "./ClientPage";
import type { Metadata } from "next";

export async function generateMetadata({ params }: PageProps<"/news/[id]">): Promise<Metadata> {
    const { id } = await params;
    const post = blogPosts.mn.find((item) => item.id === id);
    if (!post) return { title: "Мэдээ олдсонгүй" };
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: { type: "article", title: post.title, description: post.excerpt, images: [post.image] },
    };
}

export async function generateStaticParams() {
    const ids = new Set<string>();
    Object.values(blogPosts).forEach((posts) => {
        posts.forEach((post) => ids.add(post.id));
    });
    return Array.from(ids).map((id) => ({ id }));
}

export default function ArticlePage() {
    return <ArticlePageClient />;
}
