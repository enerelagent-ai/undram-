import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import ProductShowcase from "@/components/ProductShowcase";
import StorySection from "@/components/StorySection";
import HarvestMediaSection from "@/components/HarvestMediaSection";
import GiftSection from "@/components/GiftSection";
import RecipesSection from "@/components/RecipesSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import FaqSection from "@/components/FaqSection";
import PartnersSection from "@/components/PartnersSection";
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustSection />
      <ProductShowcase />
      <StorySection />
      <HarvestMediaSection />
      <GiftSection />
      <RecipesSection />
      <LatestNewsSection />
      <FaqSection />
      <PartnersSection />
    </main>
  );
}
