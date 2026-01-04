'use client';

import ContactForm from "@/components/features/contact-form";
import Header from "@/components/features/header";
import { contact } from "@/data/contact";
import { basic } from "@/data/basic";
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

export default function ContactClient({ data = contact }) {
  const { translations: globalTranslations, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Contact页面翻译映射
  const contactTranslations = {
    "Contact Us": {
      en: "Contact Us",
      es: "Contáctanos",
      fr: "Nous Contacter",
      de: "Kontaktieren Sie Uns",
      ja: "お問い合わせ",
      ko: "문의하기"
    },
    "Have questions or need assistance? We're here to help! Reach out to our friendly team through any of the channels below.": {
      en: "Have questions or need assistance? We're here to help! Reach out to our friendly team through any of the channels below.",
      es: "¿Tienes preguntas o necesitas ayuda? ¡Estamos aquí para ayudarte! Ponte en contacto con nuestro equipo amigable a través de cualquiera de los canales a continuación.",
      fr: "Vous avez des questions ou besoin d'aide ? Nous sommes là pour vous aider ! Contactez notre équipe amicale via l'un des canaux ci-dessous.",
      de: "Haben Sie Fragen oder benötigen Sie Hilfe? Wir sind hier, um zu helfen! Wenden Sie sich an unser freundliches Team über einen der unten stehenden Kanäle.",
      ja: "ご質問やサポートが必要ですか？私たちがお手伝いします！下記のチャネルからお気軽にお問い合わせください。",
      ko: "질문이 있거나 도움이 필요하신가요? 저희가 도와드리겠습니다! 아래 채널을 통해 친절한 팀에 연락해 주세요."
    },
    "Our Location": {
      en: "Our Location",
      es: "Nuestra Ubicación",
      fr: "Notre Emplacement",
      de: "Unser Standort",
      ja: "所在地",
      ko: "위치"
    },
    "Call Us": {
      en: "Call Us",
      es: "Llámanos",
      fr: "Appelez-Nous",
      de: "Rufen Sie Uns An",
      ja: "お電話",
      ko: "전화"
    },
    "Get in Touch": {
      en: "Get in Touch",
      es: "Ponte en Contacto",
      fr: "Entrer en Contact",
      de: "Kontakt Aufnehmen",
      ja: "お問い合わせ",
      ko: "연락하기"
    },
    "Working Hours": {
      en: "Working Hours",
      es: "Horario de Trabajo",
      fr: "Heures de Travail",
      de: "Arbeitszeiten",
      ja: "営業時間",
      ko: "근무시간"
    },
    "Monday through Friday: 9:00 a.m. - 6:00 p.m. (UTC+8)": {
      en: "Monday through Friday: 9:00 a.m. - 6:00 p.m. (UTC+8)",
      es: "Lunes a Viernes: 9:00 a.m. - 6:00 p.m. (UTC+8)",
      fr: "Lundi au Vendredi: 9h00 - 18h00 (UTC+8)",
      de: "Montag bis Freitag: 9:00 - 18:00 Uhr (UTC+8)",
      ja: "月曜日から金曜日: 午前9:00 - 午後6:00 (UTC+8)",
      ko: "월요일부터 금요일: 오전 9:00 - 오후 6:00 (UTC+8)"
    },
    "Exceptional Quality: We ensure that every product meets the highest standards of quality and durability": {
      en: "Exceptional Quality: We ensure that every product meets the highest standards of quality and durability",
      es: "Calidad Excepcional: Nos aseguramos de que cada producto cumpla con los más altos estándares de calidad y durabilidad",
      fr: "Qualité Exceptionnelle: Nous nous assurons que chaque produit respecte les plus hauts standards de qualité et de durabilité",
      de: "Außergewöhnliche Qualität: Wir stellen sicher, dass jedes Produkt den höchsten Standards für Qualität und Haltbarkeit entspricht",
      ja: "卓越した品質: すべての製品が最高レベルの品質と耐久性基準を満たすことを保証します",
      ko: "탁월한 품질: 모든 제품이 최고 수준의 품질과 내구성 기준을 충족하도록 보장합니다"
    },
    "Customer-Centric Solutions: Our products are designed to brighten your daily life, adding creativity and joy to your home, workspace, and personal moments": {
      en: "Customer-Centric Solutions: Our products are designed to brighten your daily life, adding creativity and joy to your home, workspace, and personal moments",
      es: "Soluciones Centradas en el Cliente: Nuestros productos están diseñados para alegrar tu vida diaria, agregando creatividad y alegría a tu hogar, espacio de trabajo y momentos personales",
      fr: "Solutions Centrées sur le Client: Nos produits sont conçus pour égayer votre vie quotidienne, ajoutant créativité et joie à votre maison, espace de travail et moments personnels",
      de: "Kundenorientierte Lösungen: Unsere Produkte sind darauf ausgelegt, Ihr tägliches Leben zu erhellen und Kreativität und Freude in Ihr Zuhause, Arbeitsplatz und persönliche Momente zu bringen",
      ja: "お客様中心のソリューション: 私たちの製品は、あなたの日常生活を明るくし、家庭、職場、個人的な瞬間に創造性と喜びを加えるように設計されています",
      ko: "고객 중심 솔루션: 저희 제품은 귀하의 일상생활을 밝게 하고, 가정, 직장, 개인적인 순간에 창의성과 기쁨을 더하도록 설계되었습니다"
    },
    "Innovation at Heart: We continuously strive to bring you cutting-edge solutions that stay ahead of the curve": {
      en: "Innovation at Heart: We continuously strive to bring you cutting-edge solutions that stay ahead of the curve",
      es: "Innovación en el Corazón: Nos esforzamos continuamente por traerte soluciones de vanguardia que se mantengan a la vanguardia",
      fr: "Innovation au Cœur: Nous nous efforçons continuellement de vous apporter des solutions de pointe qui restent en avance sur la courbe",
      de: "Innovation im Herzen: Wir streben kontinuierlich danach, Ihnen wegweisende Lösungen zu bringen, die der Kurve voraus sind",
      ja: "心の革新: 私たちは常に時代の先を行く最先端のソリューションを提供するよう努めています",
      ko: "마음의 혁신: 저희는 시대를 앞서가는 최첨단 솔루션을 지속적으로 제공하기 위해 노력합니다"
    },
    "Sustainable Practices: Our commitment to environmental responsibility is reflected in our eco-friendly product designs": {
      en: "Sustainable Practices: Our commitment to environmental responsibility is reflected in our eco-friendly product designs",
      es: "Prácticas Sostenibles: Nuestro compromiso con la responsabilidad ambiental se refleja en nuestros diseños de productos ecológicos",
      fr: "Pratiques Durables: Notre engagement envers la responsabilité environnementale se reflète dans nos conceptions de produits écologiques",
      de: "Nachhaltige Praktiken: Unser Engagement für Umweltverantwortung spiegelt sich in unseren umweltfreundlichen Produktdesigns wider",
      ja: "持続可能な実践: 環境責任への私たちの取り組みは、エコフレンドリーな製品デザインに反映されています",
      ko: "지속 가능한 실천: 환경 책임에 대한 저희의 약속은 친환경 제품 디자인에 반영되어 있습니다"
    }
  };

  // 翻译函数
  const translateText = (text, locale) => {
    if (!text || typeof text !== 'string') return text;
    return contactTranslations[text]?.[locale] || text;
  };

  // 应用翻译到数据
  const translatedData = {
    ...data,
    header: {
      ...data.header,
      title: translateText(data.header.title, locale),
      description: translateText(data.header.description, locale),
      features: data.header.features.map(feature => translateText(feature, locale))
    },
    contact: data.contact.map(item => ({
      ...item,
      title: translateText(item.title, locale),
      content: translateText(item.content, locale)
    }))
  };

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": globalTranslations.nav?.home || "Home",
      "item": basic.seo.url
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": globalTranslations.nav?.contact || translatedData.header.title,
      "item": `${basic.seo.url}${locale === 'en' ? '/contact' : `/${locale}/contact`}`
    }]
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <Header data={translatedData.header} />

      {/* Contact Section */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Contact */}
            {translatedData.contact.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <div className="flex flex-col gap-4 p-6">
                  {item.icon}
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-base text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Map */}
            <div className="relative overflow-hidden rounded-lg col-span-1 md:col-span-2">
              <iframe src={translatedData.map} className="absolute top-0 left-0 w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe>
            </div>
            {/* Contact Form */}
            <div className="col-span-1 md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
