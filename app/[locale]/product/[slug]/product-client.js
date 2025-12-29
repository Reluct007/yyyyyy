'use client';

import ContactForm from '@/components/common/contact-form';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { product } from "@/data/product";
import slugify from "slugify";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';

// Get Product Info from original data (for fallback)
const findProduct = (slug) => product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);

export default function ProductClient({ slug, locale: routeLocale }) {
  const { translations: globalTranslations, locale: contextLocale } = useLanguage();
  const locale = routeLocale || contextLocale || 'en';
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get Product Info from original data
  const originalProduct = findProduct(slug);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }

  if (!originalProduct) {
    return <div>Product not found</div>;
  }

  // 完整翻译映射
  const productTranslations = {
    "Cute Clothes Fit for LABUBU Doll": {
      en: "Cute Clothes Fit for LABUBU Doll",
      es: "Ropa Bonita para Muñeca LABUBU",
      fr: "Vêtements Mignons pour Poupée LABUBU", 
      de: "Süße Kleidung für LABUBU Puppe",
      ja: "ラブブ人形用かわいい服",
      ko: "라부부 인형용 귀여운 옷"
    },
    "Wings of Fortune Vinyl Plush Hanging Card": {
      en: "Wings of Fortune Vinyl Plush Hanging Card",
      es: "Tarjeta Colgante de Peluche Vinilo Alas de Fortuna",
      fr: "Carte Suspendue Peluche Vinyle Ailes de Fortune",
      de: "Wings of Fortune Vinyl Plüsch Hängende Karte",
      ja: "運命の翼ビニールぬいぐるみハンギングカード",
      ko: "운명의 날개 비닐 플러시 행잉 카드"
    },
    
    "Boost your business with our high-quality labubu doll clothes set, designed specifically for distributors, retailers, and bulk purchasers seeking to enhance their product offerings.": {
      en: "Boost your business with our high-quality labubu doll clothes set, designed specifically for distributors, retailers, and bulk purchasers seeking to enhance their product offerings.",
      es: "Impulsa tu negocio con nuestro conjunto de ropa para muñecas labubu de alta calidad, diseñado específicamente para distribuidores, minoristas y compradores al por mayor que buscan mejorar sus ofertas de productos.",
      fr: "Boostez votre entreprise avec notre ensemble de vêtements pour poupées labubu de haute qualité, conçu spécifiquement pour les distributeurs, détaillants et acheteurs en gros qui cherchent à améliorer leurs offres de produits.",
      de: "Steigern Sie Ihr Geschäft mit unserem hochwertigen Labubu-Puppenkleidungsset, das speziell für Händler, Einzelhändler und Großkäufer entwickelt wurde, die ihre Produktangebote verbessern möchten.",
      ja: "高品質なラブブ人形の衣装セットでビジネスを後押しし、製品提供を向上させたい卸売業者、小売業者、大口購入者向けに特別に設計されています。",
      ko: "제품 제공을 향상시키고자 하는 유통업체, 소매업체 및 대량 구매자를 위해 특별히 설계된 고품질 라부부 인형 의류 세트로 비즈니스를 촉진하세요."
    },
    "Labubu manufacturing factory offers unique, high-quality vinyl plush toys designed for distributors and retailers looking to enhance their product lines.": {
      en: "Labubu manufacturing factory offers unique, high-quality vinyl plush toys designed for distributors and retailers looking to enhance their product lines.",
      es: "La fábrica de fabricación de Labubu ofrece juguetes de peluche de vinilo únicos y de alta calidad diseñados para distribuidores y minoristas que buscan mejorar sus líneas de productos.",
      fr: "L'usine de fabrication Labubu offre des jouets en peluche vinyle uniques et de haute qualité conçus pour les distributeurs et détaillants cherchant à améliorer leurs gammes de produits.",
      de: "Die Labubu-Fabrik bietet einzigartige, hochwertige Vinyl-Plüschspielzeuge für Händler und Einzelhändler, die ihre Produktlinien erweitern möchten.",
      ja: "ラブブ製造工場は、製品ラインを強化しようとする卸売業者や小売業者向けに設計されたユニークで高品質なビニールぬいぐるみを提供しています。",
      ko: "라부부 제조 공장은 제품 라인을 강화하려는 유통업자와 소매업자를 위해 설계된 독특하고 고품질의 비닐 플러시 장난감을 제공합니다."
    },

    "Versatile Doll Compatibility": {
      en: "Versatile Doll Compatibility",
      es: "Compatibilidad Versátil con Muñecas",
      fr: "Compatibilité Polyvalente avec les Poupées",
      de: "Vielseitige Puppenkompatibilität", 
      ja: "多様な人形の互換性",
      ko: "다양한 인형 호환성"
    },
    "Durable & High-Quality Material": {
      en: "Durable & High-Quality Material",
      es: "Material Duradero y de Alta Calidad",
      fr: "Matériau Durable et de Haute Qualité",
      de: "Langlebiges und Hochwertiges Material",
      ja: "耐久性のある高品質素材", 
      ko: "내구성 있는 고품질 소재"
    },
    "Compact Collectible Toys": {
      en: "Compact Collectible Toys",
      es: "Juguetes Coleccionables Compactos",
      fr: "Jouets de Collection Compacts",
      de: "Kompakte Sammler-Spielzeuge",
      ja: "コンパクトなコレクタブルトイ",
      ko: "컴팩트한 컬렉터블 토이"
    },
    "Versatile Gifting Solution": {
      en: "Versatile Gifting Solution",
      es: "Solución de Regalo Versátil",
      fr: "Solution de Cadeau Polyvalente",
      de: "Vielseitige Geschenklösung",
      ja: "多目的ギフトソリューション",
      ko: "다용도 선물 솔루션"
    },
    "Safe and Non-toxic Materials": {
      en: "Safe and Non-toxic Materials",
      es: "Materiales Seguros y No Tóxicos",
      fr: "Matériaux Sûrs et Non Toxiques",
      de: "Sichere und Ungiftige Materialien",
      ja: "安全で無毒の素材",
      ko: "안전하고 무독성 소재"
    },
    "Vibrant and High-Quality Finish": {
      en: "Vibrant and High-Quality Finish",
      es: "Acabado Vibrante y de Alta Calidad",
      fr: "Finition Vibrante et de Haute Qualité",
      de: "Lebendige und Hochwertige Oberfläche",
      ja: "鮮やかで高品質な仕上げ",
      ko: "생생하고 고품질 마감"
    },

    "Crafted to fit both 4-inch cotton dolls and 6.69-inch labubu dolls, our clothing sets ensure that each doll has a fashionable and exquisite look, appealing to a broad market and increasing sales opportunities for your business.": {
      en: "Crafted to fit both 4-inch cotton dolls and 6.69-inch labubu dolls, our clothing sets ensure that each doll has a fashionable and exquisite look, appealing to a broad market and increasing sales opportunities for your business.",
      es: "Diseñado para ajustarse tanto a muñecas de algodón de 4 pulgadas como a muñecas labubu de 6.69 pulgadas, nuestros conjuntos de ropa aseguran que cada muñeca tenga un aspecto elegante y exquisito, atrayendo a un mercado amplio y aumentando las oportunidades de ventas para su negocio.",
      fr: "Conçu pour s'adapter aux poupées en coton de 4 pouces et aux poupées labubu de 6,69 pouces, nos ensembles de vêtements garantissent que chaque poupée ait un look élégant et exquis, attrayant pour un large marché et augmentant les opportunités de vente pour votre entreprise.",
      de: "Hergestellt, um sowohl 4-Zoll-Baumwollpuppen als auch 6,69-Zoll-Labubu-Puppen zu passen, stellen unsere Kleidungssets sicher, dass jede Puppe ein modisches und exquisites Aussehen hat, das einen breiten Markt anspricht und Verkaufsmöglichkeiten für Ihr Unternehmen erhöht.",
      ja: "4インチの綿人形と6.69インチのラブブ人形の両方にフィットするように作られた私たちの衣装セットは、各人形がファッショナブルで上品な外観を持つことを保証し、幅広い市場にアピールし、あなたのビジネスの販売機会を増やします。",
      ko: "4인치 면 인형과 6.69인치 라부부 인형 모두에 맞도록 제작된 우리의 의류 세트는 각 인형이 패셔너블하고 정교한 외관을 갖도록 보장하여 광범위한 시장에 어필하고 귀하의 비즈니스 판매 기회를 증가시킵니다."
    },
    "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": {
      en: "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.",
      es: "Construido con tela de algodón premium, esta ropa para muñecas no solo es duradera y resistente al desgaste, sino que también mantiene sus colores vibrantes y diseños exquisitos con el tiempo, permitiendo que sus clientes inviertan en artículos que durarán y mantendrán su atractivo.",
      fr: "Construit en tissu de coton premium, ces vêtements de poupée sont non seulement durables et résistants à l'usure, mais maintiennent également leurs couleurs vives et leurs designs exquis au fil du temps, permettant à vos clients d'investir dans des articles qui dureront et conserveront leur attrait.",
      de: "Aus hochwertigem Baumwollstoff hergestellt, sind diese Puppenkleider nicht nur langlebig und verschleißfest, sondern behalten auch ihre lebendigen Farben und exquisiten Designs im Laufe der Zeit bei, sodass Ihre Kunden in Artikel investieren können, die Bestand haben und ihre Anziehungskraft behalten.",
      ja: "プレミアムコットン生地で作られたこれらの人形の服は、耐久性があり摩耗に強いだけでなく、時間が経っても鮮やかな色と精巧なデザインを維持し、お客様が長持ちし魅力を保つアイテムに投資できるようにします。",
      ko: "프리미엄 면직물로 제작된 이 인형 의류는 내구성이 있고 마모에 강할 뿐만 아니라 시간이 지나도 생생한 색상과 정교한 디자인을 유지하여 고객이 오래 지속되고 매력을 유지하는 아이템에 투자할 수 있게 합니다."
    },
    "Each Labubu figure stands at a perfect 8.7 inches, making them an ideal size for various retail displays, appealing to customers who appreciate collectible, manageable-sized items for their homes or gifts.": {
      en: "Each Labubu figure stands at a perfect 8.7 inches, making them an ideal size for various retail displays, appealing to customers who appreciate collectible, manageable-sized items for their homes or gifts.",
      es: "Cada figura de Labubu mide perfectamente 8.7 pulgadas, lo que las convierte en un tamaño ideal para varias exhibiciones minoristas, atrayendo a clientes que aprecian artículos coleccionables de tamaño manejable para sus hogares o regalos.",
      fr: "Chaque figurine Labubu mesure parfaitement 8,7 pouces, ce qui en fait une taille idéale pour diverses présentations de vente au détail, attrayant les clients qui apprécient les articles de collection de taille gérable pour leurs maisons ou cadeaux.",
      de: "Jede Labubu-Figur ist perfekt 8,7 Zoll groß, was sie zu einer idealen Größe für verschiedene Einzelhandelsauslagen macht und Kunden anspricht, die sammelbare, handliche Artikel für ihre Häuser oder Geschenke schätzen.",
      ja: "各ラブブフィギュアは完璧な8.7インチの高さで、様々な小売ディスプレイに理想的なサイズとなり、家庭やギフト用のコレクタブルで管理しやすいサイズのアイテムを好むお客様にアピールします。",
      ko: "각 라부부 피규어는 완벽한 8.7인치 높이로, 다양한 소매 디스플레이에 이상적인 크기이며, 가정이나 선물용으로 수집 가능하고 관리하기 쉬운 크기의 아이템을 선호하는 고객에게 어필합니다."
    },
    "These collectible toys make excellent gifts for both boys and girls, serving as stylish home decor, unique party favors, and charming desk accessories, enabling businesses to attract a diverse clientele seeking thoughtful and artistic gift options.": {
      en: "These collectible toys make excellent gifts for both boys and girls, serving as stylish home decor, unique party favors, and charming desk accessories, enabling businesses to attract a diverse clientele seeking thoughtful and artistic gift options.",
      es: "Estos juguetes coleccionables son excelentes regalos tanto para niños como para niñas, sirviendo como decoración elegante para el hogar, favores únicos para fiestas y encantadores accesorios de escritorio, permitiendo a las empresas atraer una clientela diversa que busca opciones de regalo reflexivas y artísticas.",
      fr: "Ces jouets de collection font d'excellents cadeaux pour les garçons et les filles, servant de décoration élégante pour la maison, de faveurs uniques pour les fêtes et d'accessoires de bureau charmants, permettant aux entreprises d'attirer une clientèle diversifiée recherchant des options de cadeaux réfléchies et artistiques.",
      de: "Diese Sammler-Spielzeuge sind ausgezeichnete Geschenke für Jungen und Mädchen, dienen als stilvolle Wohnaccessoires, einzigartige Party-Favors und charmante Schreibtisch-Accessoires und ermöglichen es Unternehmen, eine vielfältige Kundschaft anzuziehen, die nach durchdachten und künstlerischen Geschenkoptionen sucht.",
      ja: "これらのコレクタブルトイは、男の子と女の子の両方にとって素晴らしいギフトとなり、スタイリッシュなホームデコレーション、ユニークなパーティーフェイバー、魅力的なデスクアクセサリーとして機能し、思いやりがあり芸術的なギフトオプションを求める多様な顧客を引き付けることができます。",
      ko: "이러한 컬렉터블 토이는 남녀 아이 모두에게 훌륭한 선물이 되며, 스타일리시한 홈 데코, 독특한 파티 페이버, 매력적인 데스크 액세서리로 기능하여 사려 깊고 예술적인 선물 옵션을 찾는 다양한 고객층을 끌어들일 수 있습니다."
    }
  };

  // 翻译函数
  const translateText = (text, locale) => {
    if (!text || typeof text !== 'string') return text;
    return productTranslations[text]?.[locale] || text;
  };

  // 应用翻译
  const productItem = {
    ...originalProduct,
    id: slugify(originalProduct.title, { lower: true, strict: true }),
    title: translateText(originalProduct.title, locale),
    description: translateText(originalProduct.description, locale),
    images: originalProduct.images || [],
    features: (originalProduct.features || []).map(feature => ({
      ...feature,
      title: translateText(feature.title, locale),
      description: translateText(feature.description, locale)
    }))
  };

  // Get related products from original data (optimized to reduce memory usage)
  const relatedProducts = [];
  const maxRelated = 8;
  const sameCategory = product.filter(p => {
    const slug = slugify(p.title, { lower: true, strict: true });
    return p.category === originalProduct.category && slug !== productItem.id;
  }).slice(0, maxRelated);
  
  relatedProducts.push(...sameCategory.map(p => ({
    ...p,
    id: slugify(p.title, { lower: true, strict: true })
  })));
  
  // If we need more products, add random ones
  if (relatedProducts.length < maxRelated) {
    const remaining = maxRelated - relatedProducts.length;
    const otherProducts = product
      .filter(p => {
        const slug = slugify(p.title, { lower: true, strict: true });
        return slug !== productItem.id && !relatedProducts.some(rp => rp.id === slug);
      })
      .slice(0, remaining * 2) // Get more than needed for randomization
      .sort(() => 0.5 - Math.random())
      .slice(0, remaining)
      .map(p => ({
        ...p,
        id: slugify(p.title, { lower: true, strict: true })
      }));
    relatedProducts.push(...otherProducts);
  }

  const ROOT_URL = "https://www.labubuwholesale.com";

  // Structured Data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": ROOT_URL
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Product",
      "item": `${ROOT_URL}/product`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productItem.title,
      "item": `${ROOT_URL}${locale === 'en' ? `/product/${productItem.id}` : `/${locale}/product/${productItem.id}`}`
    }]
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productItem.title,
    "description": productItem.description,
    "image": productItem.image ? `${ROOT_URL}${productItem.image}` : undefined,
    "brand": {
      "@type": "Brand",
      "name": "Labubu Wholesale"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Organization",
        "name": "Labubu Wholesale"
      }
    },
    "url": `${ROOT_URL}${locale === 'en' ? `/product/${productItem.id}` : `/${locale}/product/${productItem.id}`}`
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      {/* Product Details */}
      <section className="py-8 px-2">
        <div className="container mx-auto space-y-8">
          {/* Title & Desc */}
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold lg:text-4xl">{productItem.title}</h1>
            <p className="max-w-4xl text-muted-foreground text-lg">{productItem.description}</p>
          </div>

          {/* Images */}
          <div className="grid gap-4 md:grid-cols-2">
            {productItem.image && (
              <Image src={productItem.image} alt={`${productItem.title} - Premium designer collectible from Labubu Wholesale`} className="w-full border border-border rounded-lg h-full" width={800} height={600} />
            )}
            {productItem.images && productItem.images.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {productItem.images.map((image, index) => (
                  <Image key={index} src={image} alt={`${productItem.title} - Additional view ${index + 1}`} className="w-full border border-border rounded-lg" width={400} height={300} />
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                {productItem.features.map((feature, index) => (
                  <div key={index} className="flex flex-col gap-2 border border-border rounded-lg p-8 bg-accent">
                    <ArrowDownRight className="size-6" />
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-base text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div><ContactForm /></div>
          </div>

          {/* Related Products */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold lg:text-2xl">
              Recommended Products
            </h2>
            <p className="max-w-4xl text-muted-foreground text-base">
              Discover more premium designer collectibles from our collection.
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link href={locale === 'en' ? `/product/${item.id || slugify(item.title, { lower: true, strict: true })}` : `/${locale}/product/${item.id || slugify(item.title, { lower: true, strict: true })}`} target="_blank" aria-label={`View ${item.title} product details`}><Image src={item.image} alt={`${item.title} - Designer collectible product`} className="w-full rounded-t-lg" width={400} height={300} /></Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link href={locale === 'en' ? `/products/${slugify(item.category, { lower: true, strict: true })}` : `/${locale}/products/${slugify(item.category, { lower: true, strict: true })}`} target="_blank" aria-label={`Browse ${item.category} products`}>{item.category}</Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={locale === 'en' ? `/product/${item.id || slugify(item.title, { lower: true, strict: true })}` : `/${locale}/product/${item.id || slugify(item.title, { lower: true, strict: true })}`} target="_blank" aria-label={`Learn more about ${item.title}`}><h3 className="text-lg font-semibold">{item.title}</h3></Link>
                  <p className="text-base text-muted-foreground">{item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description}</p>
                  <Link href={locale === 'en' ? `/product/${item.id || slugify(item.title, { lower: true, strict: true })}` : `/${locale}/product/${item.id || slugify(item.title, { lower: true, strict: true })}`} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank" aria-label={`Get details about ${item.title}`}>
                    Learn More <ChevronRight className="w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

