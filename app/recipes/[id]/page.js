import RecipeDetailClient from "./RecipeDetailClient";
import { translations } from "@/context/translations";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const recipe = translations.mn.recipes?.items?.find((item) => String(item.id) === id);
    if (!recipe) return { title: "Жор олдсонгүй" };
    return {
        title: recipe.title,
        description: recipe.description,
        openGraph: { title: recipe.title, description: recipe.description, images: [recipe.image] },
    };
}

export async function generateStaticParams() {
    // Generate paths for all recipes (IDs 1-9)
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({
        id: id.toString(),
    }));
}

export default function Page() {
    return <RecipeDetailClient />;
}
