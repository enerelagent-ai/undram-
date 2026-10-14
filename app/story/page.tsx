"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { stories } from "@/utils/storyData";
import { ui, asset } from "@/utils/storefront";
import PageHeading from "@/components/PageHeading";
import { storyCopy } from "@/components/StorySection";
import HarvestMediaSection from "@/components/HarvestMediaSection";
export default function StoryPage() {
  const { language } = useLanguage();
  const lang = language as keyof typeof ui;
  const t = ui[lang];
  const c = storyCopy[lang];
  const list = stories[language as keyof typeof stories] || stories.mn;
  return (
    <main>
      <div className="shell">
        <PageHeading eyebrow={t.story} title={c.title} description={c.body} />
        <section className="story-page-intro">
          <div className="image-frame">
            <Image
              src="/optimized/beekeeper-story.webp"
              alt={t.story}
              fill
              sizes="(max-width:600px) 100vw, 50vw"
              loading="eager"
            />
          </div>
          <div>
            <p className="eyebrow">{c.caption}</p>
            <h2>{t.journal}</h2>
            <p>
              {language === "mn"
                ? "Зөгийн балны шил бүр нар, бороо, зэрлэг цэцэгс, зөгийчний хөдөлмөрийн түүхийг өгүүлдэг. Манай өдөр тутмын ажил, аялал, уулзалтуудыг эндээс уншаарай."
                : language === "en"
                  ? "Every jar tells a story of sunshine, rain, wildflowers and the care of our beekeepers. Explore our days in the field, journeys and encounters."
                  : c.body}
            </p>
          </div>
        </section>
        {list.map((story) => (
          <article className="story-entry" key={story.id}>
            <div className="story-entry-image">
              <Image
                src={asset(story.image)}
                alt={story.title}
                fill
                sizes="(max-width:600px) 100vw, 40vw"
              />
            </div>
            <div>
              <span className="eyebrow">{story.date}</span>
              <h2>{story.title}</h2>
              <p>{story.content}</p>
            </div>
          </article>
        ))}
      </div>
      <HarvestMediaSection />
    </main>
  );
}
