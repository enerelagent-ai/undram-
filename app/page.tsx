import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import ProductShowcase from "@/components/ProductShowcase";
import StorySection from "@/components/StorySection";
import HarvestMediaSection from "@/components/HarvestMediaSection";
import VideoGallery from "@/components/VideoGallery";
import GiftSection from "@/components/GiftSection";
import RecipesSection from "@/components/RecipesSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import FaqSection from "@/components/FaqSection";
import PartnersSection from "@/components/PartnersSection";
import ShopCategories from "@/components/ShopCategories";
import OrderGuide from "@/components/OrderGuide";
export default function Home() {
  return (
    <main className="shop-home">
      <Hero />
      <TrustSection />
      <ShopCategories />
      <ProductShowcase />
      <GiftSection />
      <OrderGuide />
      <FaqSection />
      <StorySection />
      <VideoGallery />
      <HarvestMediaSection />
      <RecipesSection />
      <LatestNewsSection />
      <PartnersSection />
    </main>
  );
}
