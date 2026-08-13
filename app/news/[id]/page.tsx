import { blogPosts } from "@/utils/blogData";
import ArticlePageClient from "./ClientPage";

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
