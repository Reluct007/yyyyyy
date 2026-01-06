"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/features/header";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { about } from "@/data/about";
import { basic } from "@/data/basic";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";

export default function AboutClient({ data = about }) {
  const { translations: globalTranslations, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // About页面翻译映射
  const aboutTranslations = {
    "About Us": {
      en: "About Us",
      es: "Acerca de Nosotros",
      fr: "À Propos de Nous",
      de: "Über Uns",
      ja: "私たちについて",
      ko: "회사 소개",
    },
    "Our Story": {
      en: "Our Story",
      es: "Nuestra Historia",
      fr: "Notre Histoire",
      de: "Unsere Geschichte",
      ja: "私たちのストーリー",
      ko: "우리의 이야기",
    },
    "At Poker Kit, we manufacture and supply premium poker kits and accessories for B2B buyers. Our mission is to help distributors, retailers, and promotional partners launch reliable product lines with OEM/ODM customization, consistent quality control, and dependable delivery.":
      {
        en: "At Poker Kit, we manufacture and supply premium poker kits and accessories for B2B buyers. Our mission is to help distributors, retailers, and promotional partners launch reliable product lines with OEM/ODM customization, consistent quality control, and dependable delivery.",
        es: "En Poker Kit, fabricamos y suministramos kits de póker y accesorios premium para compradores B2B. Nuestra misión es ayudar a distribuidores, minoristas y socios promocionales a lanzar líneas de productos fiables con personalización OEM/ODM, control de calidad consistente y entregas confiables.",
        fr: "Chez Poker Kit, nous fabriquons et fournissons des kits de poker et des accessoires haut de gamme pour les acheteurs B2B. Notre mission est d'aider les distributeurs, détaillants et partenaires promotionnels à lancer des gammes fiables grâce à la personnalisation OEM/ODM, un contrôle qualité constant et une livraison fiable.",
        de: "Bei Poker Kit fertigen und liefern wir hochwertige Poker-Kits und Zubehör für B2B-Käufer. Unsere Mission ist es, Distributoren, Händlern und Promotion-Partnern zu helfen, zuverlässige Produktlinien mit OEM/ODM-Anpassung, konsistenter Qualitätskontrolle und verlässlicher Lieferung aufzubauen.",
        ja: "Poker Kit では、B2B 向けに高品質なポーカーキットとアクセサリーを製造・供給しています。私たちの使命は、ディストリビューター、リテーラー、プロモーションパートナーが OEM/ODM カスタマイズ、安定した品質管理、確実な納品で信頼できる商品ラインを立ち上げられるよう支援することです。",
        ko: "Poker Kit은 B2B 바이어를 위한 프리미엄 포커 키트 및 액세서리를 제조·공급합니다. 우리의 미션은 유통업체, 리테일러, 프로모션 파트너가 OEM/ODM 맞춤화, 일관된 품질 관리, 신뢰할 수 있는 납기를 통해 안정적인 제품 라인을 출시할 수 있도록 돕는 것입니다.",
      },
    "Efficient Production: Our factory is equipped with advanced machinery and smart technology, combining automated cutting and high-tech intelligent systems. With rapid response capabilities and scalable production, we ensure highly efficient and precise processes, guaranteeing timely and reliable delivery.":
      {
        en: "Efficient Production: Our factory is equipped with advanced machinery and smart technology, combining automated cutting and high-tech intelligent systems. With rapid response capabilities and scalable production, we ensure highly efficient and precise processes, guaranteeing timely and reliable delivery.",
        es: "Producción Eficiente: Nuestra fábrica está equipada con maquinaria avanzada y tecnología inteligente, combinando corte automatizado y sistemas inteligentes de alta tecnología. Con capacidades de respuesta rápida y producción escalable, garantizamos procesos altamente eficientes y precisos, asegurando entrega puntual y confiable.",
        fr: "Production Efficace: Notre usine est équipée de machines avancées et de technologie intelligente, combinant découpe automatisée et systèmes intelligents de haute technologie. Avec des capacités de réponse rapide et une production évolutive, nous garantissons des processus hautement efficaces et précis, assurant une livraison ponctuelle et fiable.",
        de: "Effiziente Produktion: Unsere Fabrik ist mit modernen Maschinen und intelligenter Technologie ausgestattet, die automatisierte Schneidtechnik und hochmoderne intelligente Systeme kombiniert. Mit schnellen Reaktionszeiten und skalierbarer Produktion gewährleisten wir hocheffiziente und präzise Prozesse für pünktliche und zuverlässige Lieferungen.",
        ja: "効率的な生産: 当社の工場は高度な機械とスマートテクノロジーを備え、自動切断とハイテクインテリジェントシステムを組み合わせています。迅速な対応能力とスケーラブルな生産により、高度に効率的で正確なプロセスを保証し、タイムリーで信頼性の高い配送を実現しています。",
        ko: "효율적인 생산: 우리 공장은 고급 기계와 스마트 기술을 갖추고 있으며, 자동 절단과 첨단 지능형 시스템을 결합합니다. 빠른 대응 능력과 확장 가능한 생산으로 고도로 효율적이고 정확한 프로세스를 보장하여 시기적절하고 신뢰할 수 있는 배송을 보장합니다.",
      },
    "Premium Quality: Each piece is crafted with precision and made to the highest standards, ensuring lasting durability and detail.":
      {
        en: "Premium Quality: Each piece is crafted with precision and made to the highest standards, ensuring lasting durability and detail.",
        es: "Calidad Premium: Cada pieza está elaborada con precisión y fabricada según los más altos estándares, garantizando durabilidad duradera y detalle.",
        fr: "Qualité Premium: Chaque pièce est fabriquée avec précision selon les plus hauts standards, garantissant durabilité et détail durables.",
        de: "Premium-Qualität: Jedes Stück wird mit Präzision gefertigt und nach höchsten Standards hergestellt, wodurch dauerhafte Haltbarkeit und Detailtreue gewährleistet werden.",
        ja: "プレミアム品質: 各作品は精密に作られ、最高の基準で作られており、持続的な耐久性と細部を保証しています。",
        ko: "프리미엄 품질: 각 작품은 정밀하게 제작되어 최고의 기준으로 만들어져 지속적인 내구성과 세부사항을 보장합니다.",
      },
    "Collector-Focused: We create with collectors in mind, delivering products that enrich collections and elevate the ownership experience.":
      {
        en: "Collector-Focused: We create with collectors in mind, delivering products that enrich collections and elevate the ownership experience.",
        es: "Enfocado en Coleccionistas: Creamos pensando en los coleccionistas, entregando productos que enriquecen las colecciones y elevan la experiencia de propiedad.",
        fr: "Axé sur les Collectionneurs: Nous créons en pensant aux collectionneurs, livrant des produits qui enrichissent les collections et élèvent l'expérience de propriété.",
        de: "Sammlerorientiert: Wir schaffen mit Sammlern im Blick und liefern Produkte, die Sammlungen bereichern und das Besitzerlebnis steigern.",
        ja: "コレクター重視: コレクターを念頭に置いて創作し、コレクションを豊かにし、所有体験を高める製品を提供します。",
        ko: "수집가 중심: 수집가를 염두에 두고 창작하여 컬렉션을 풍부하게 하고 소유 경험을 향상시키는 제품을 제공합니다.",
      },
    "Innovative Design: Through limited editions and exclusive collaborations, we introduce fresh ideas that set new trends in the art toy industry.":
      {
        en: "Innovative Design: Through limited editions and exclusive collaborations, we introduce fresh ideas that set new trends in the art toy industry.",
        es: "Diseño Innovador: A través de ediciones limitadas y colaboraciones exclusivas, introducimos ideas frescas que establecen nuevas tendencias en la industria de juguetes de arte.",
        fr: "Design Innovant: Grâce aux éditions limitées et aux collaborations exclusives, nous introduisons des idées fraîches qui établissent de nouvelles tendances dans l'industrie des jouets d'art.",
        de: "Innovatives Design: Durch limitierte Editionen und exklusive Kooperationen führen wir frische Ideen ein, die neue Trends in der Kunstspielzeugindustrie setzen.",
        ja: "革新的なデザイン: 限定版と独占コラボレーションを通じて、アートトイ業界に新しいトレンドを設定する新鮮なアイデアを導入します。",
        ko: "혁신적인 디자인: 한정판과 독점 콜라보레이션을 통해 아트 토이 업계에 새로운 트렌드를 설정하는 신선한 아이디어를 도입합니다.",
      },
    "Sustainable Commitment: We embrace eco-conscious materials and responsible production to reduce environmental impact while maintaining quality.":
      {
        en: "Sustainable Commitment: We embrace eco-conscious materials and responsible production to reduce environmental impact while maintaining quality.",
        es: "Compromiso Sostenible: Adoptamos materiales ecológicos y producción responsable para reducir el impacto ambiental mientras mantenemos la calidad.",
        fr: "Engagement Durable: Nous adoptons des matériaux écologiques et une production responsable pour réduire l'impact environnemental tout en maintenant la qualité.",
        de: "Nachhaltiges Engagement: Wir setzen auf umweltbewusste Materialien und verantwortungsvolle Produktion, um die Umweltauswirkungen zu reduzieren und gleichzeitig die Qualität zu erhalten.",
        ja: "持続可能な取り組み: 品質を維持しながら環境への影響を減らすため、エコ意識のある材料と責任ある生産を受け入れています。",
        ko: "지속가능한 약속: 품질을 유지하면서 환경 영향을 줄이기 위해 친환경 소재와 책임감 있는 생산을 채택합니다.",
      },
  };

  // 翻译函数
  const translateText = (text, locale) => {
    if (!text || typeof text !== "string") return text;
    return aboutTranslations[text]?.[locale] || text;
  };

  // 应用翻译到数据
  const translatedData = {
    ...data,
    header: {
      ...data.header,
      title: translateText(data.header.title, locale),
      description: translateText(data.header.description, locale),
      features: data.header.features.map((feature) => translateText(feature, locale)),
    },
    intro: {
      ...data.intro,
      title: translateText(data.intro.title, locale),
      descriptions: data.intro.descriptions.map((desc) => translateText(desc, locale)),
      features: data.intro.features.map((feature) => translateText(feature, locale)),
    },
  };

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: globalTranslations.nav?.home || "Home",
        item: basic.seo.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: globalTranslations.nav?.about || translatedData.header.title,
        item: `${basic.seo.url}/about/`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <Header data={translatedData.header} />

      {/* Our Story */}
      <section className="px-2 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-medium lg:text-2xl">{translatedData.intro.title}</h3>
              {translatedData.intro.descriptions.map((description, index) => (
                <p key={index} className="text-base text-muted-foreground">
                  {description}
                </p>
              ))}
              <ul className="space-y-2">
                {translatedData.intro.features.map((feature, index) => (
                  <li key={index} className="flex gap-x-2">
                    <CheckCircle className="mt-1 size-4 shrink-0" />
                    <p className="text-base text-muted-foreground">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src={translatedData.intro.image}
              className="rounded-lg"
              alt={translatedData.intro.title}
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-2 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, index) => (
              <div key={index} className="flex gap-4 rounded-lg border border-border p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  {feature.icon}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-2 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.gallery.map((image, index) => (
              <Image
                key={index}
                src={image.image}
                alt={image.alt}
                className="size-full rounded-lg"
                width={400}
                height={300}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-2 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                  <q>{testimonial.description}</q>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-4 leading-5">
                    <Avatar className="size-12 rounded-full ring-1 ring-input">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
