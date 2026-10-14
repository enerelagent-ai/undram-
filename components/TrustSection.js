"use client";
import { Flower2, MapPin, HandHeart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
const copy = {
  mn: [
    "Зэрлэг цэцэгсийн шим",
    "Хатан Туулын хөндийгөөс",
    "Зөгийчний гараас таны гарт",
  ],
  en: [
    "From wildflowers",
    "From the Tuul River valley",
    "From our beekeepers to you",
  ],
  zh: ["野花精华", "源自图勒河谷", "蜂农用心呈现"],
  ko: ["야생화의 풍미", "툴강 계곡에서", "양봉가의 정성으로"],
};
export default function TrustSection() {
  const { language } = useLanguage();
  return (
    <div className="values-strip">
      <div className="shell">
        {[Flower2, MapPin, HandHeart].map((Icon, i) => (
          <div key={i}>
            <Icon size={21} strokeWidth={1.3} />
            <span>{copy[language][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
