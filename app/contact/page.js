"use client";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { ui } from "@/utils/storefront";
import PageHeading from "@/components/PageHeading";
import FaqSection from "@/components/FaqSection";
export default function ContactPage() {
  const { language } = useLanguage();
  const t = ui[language];
  const contact = translations[language].footer.contactInfo;
  return (
    <main>
      <div className="shell page-content">
        <PageHeading
          eyebrow={t.contact}
          title={t.contact}
          description={t.contactBody}
        />
        <div className="contact-grid">
          <div>
            <h2>UNDRAM</h2>
            <div className="contact-row">
              <Phone size={22} />
              <a href="tel:+97691001393">{contact.phone}</a>
            </div>
            <div className="contact-row">
              <Mail size={22} />
              <a href="mailto:Undraabrand@gmail.com">{contact.email}</a>
            </div>
            <div className="contact-row">
              <MapPin size={22} />
              <p>{contact.address}</p>
            </div>
          </div>
          <div className="contact-panel">
            <span className="eyebrow">{t.delivery}</span>
            <h2>
              {language === "mn"
                ? "Амтат сонголтоо\nбидэнд даатгаарай."
                : language === "en"
                  ? "Let’s find your next jar."
                  : t.contact}
            </h2>
            <p>{t.deliveryBody}</p>
            <p>
              {language === "mn"
                ? "Сагсанд бүтээгдэхүүнээ нэмээд захиалгын мэдээллээ бөглөнө. Банкны шилжүүлгийн мэдээлэл дараагийн алхамд харагдана. Захиалга болон төлбөрийн баримтаа Messenger-ээр илгээн баталгаажуулна."
                : language === "en"
                  ? "Add products to your bag and enter delivery details. Bank transfer details are shown at checkout. Send your order and payment receipt through Messenger to confirm."
                  : t.contactBody}
            </p>
            <a
              className="button button-dark"
              href="https://m.me/mongolian.natural.honey"
              target="_blank"
              rel="noreferrer"
            >
              Messenger
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
      <FaqSection />
    </main>
  );
}
