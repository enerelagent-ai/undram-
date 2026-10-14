"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  mn: {
    eyebrow: "Түгээмэл асуулт",
    title: "Зөгийн балын талаар",
    intro: "Сонголт хийхээс өмнө хамгийн их асуудаг зүйлс.",
    items: [
      [
        "Зөгийн балыг хэрхэн хадгалах вэ?",
        "Нарны шууд тусгалаас хол, хуурай сэрүүн орчинд тагийг нь сайтар таглаж хадгална. Хөргөгчинд хийх шаардлагагүй.",
      ],
      [
        "Бал талсжих нь муудсан гэсэн үг үү?",
        "Үгүй. Байгалийн зөгийн бал хугацааны явцад талсжих нь хэвийн үзэгдэл. Савыг бүлээн усанд зөөлөн халааж шингэлж болно.",
      ],
      [
        "Хүргэлт хэрхэн хийгдэх вэ?",
        "Захиалгын мэдээллээ Messenger-ээр баталгаажуулсны дараа хүргэлтийн хугацаа, байршлыг манай ажилтан тантай тохирно.",
      ],
      [
        "Бага насны хүүхдэд өгч болох уу?",
        "12 сараас доош насны хүүхдэд зөгийн бал өгөхгүй. Харшил болон эрүүл мэндийн онцгой нөхцөлтэй бол мэргэжлийн хүнээс зөвлөгөө авна уу.",
      ],
    ],
  },
  en: {
    eyebrow: "Frequently asked",
    title: "About our honey",
    intro: "Helpful answers before you choose your jar.",
    items: [
      [
        "How should honey be stored?",
        "Keep it tightly closed in a cool, dry place away from direct sunlight. Refrigeration is not required.",
      ],
      [
        "Does crystallization mean the honey is spoiled?",
        "No. Crystallization is natural. Place the closed jar in gently warm water if you prefer a liquid texture.",
      ],
      [
        "How does delivery work?",
        "After you confirm your order in Messenger, our team will arrange the delivery time and location with you.",
      ],
      [
        "Can young children eat honey?",
        "Do not give honey to children under 12 months. Seek professional advice for allergies or medical conditions.",
      ],
    ],
  },
  zh: {
    eyebrow: "常见问题",
    title: "关于我们的蜂蜜",
    intro: "选购前最常见的问题。",
    items: [
      ["蜂蜜应如何保存？", "请密封存放在阴凉干燥处，避免阳光直射，无需冷藏。"],
      [
        "结晶是否表示蜂蜜变质？",
        "不是。天然蜂蜜结晶是正常现象，可将密封瓶放入温水中缓慢融化。",
      ],
      [
        "如何配送？",
        "通过 Messenger 确认订单后，我们的工作人员会与您商定配送时间和地点。",
      ],
      [
        "幼儿可以食用蜂蜜吗？",
        "请勿给12个月以下的婴儿食用蜂蜜。如有过敏或健康问题，请咨询专业人士。",
      ],
    ],
  },
  ko: {
    eyebrow: "자주 묻는 질문",
    title: "언드람 꿀 안내",
    intro: "구매 전에 가장 많이 묻는 질문입니다.",
    items: [
      [
        "꿀은 어떻게 보관하나요?",
        "직사광선을 피해 서늘하고 건조한 곳에 밀봉하여 보관하세요. 냉장 보관은 필요하지 않습니다.",
      ],
      [
        "결정이 생기면 상한 것인가요?",
        "아닙니다. 천연 꿀의 결정화는 정상입니다. 밀봉한 병을 미지근한 물에 천천히 데워 주세요.",
      ],
      [
        "배송은 어떻게 진행되나요?",
        "Messenger에서 주문을 확인한 후 담당자가 배송 시간과 장소를 안내합니다.",
      ],
      [
        "어린아이도 먹을 수 있나요?",
        "12개월 미만 영아에게는 꿀을 주지 마세요. 알레르기나 질환이 있으면 전문가와 상담하세요.",
      ],
    ],
  },
};

export default function FaqSection() {
  const { language } = useLanguage();
  const t = content[language];
  return (
    <section className="section faq-section">
      <div className="shell faq-grid">
        <div>
          <p className="eyebrow">07 / {t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <div className="faq-items">
          {t.items.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
