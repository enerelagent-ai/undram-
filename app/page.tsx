import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import TrustSection from "@/components/TrustSection";
import RecipesSection from "@/components/RecipesSection"; // Ensure this is imported
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Products */}
      <ProductShowcase />

      {/* 3. Trust / Features */}
      <TrustSection />

      {/* 4. Recipes (This was missing!) */}
      <RecipesSection />

      {/* 5. Footer */}
      <Footer />

      {/* 6. Celebration Overlay */}

    </main>
  );
}
