import RecipeDetailClient from "./RecipeDetailClient";

export async function generateStaticParams() {
    // Generate paths for all recipes (IDs 1-9)
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({
        id: id.toString(),
    }));
}

export default function Page() {
    return <RecipeDetailClient />;
}
