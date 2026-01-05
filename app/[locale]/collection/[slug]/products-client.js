'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/features/header";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import { getAllProductsByLanguage } from "@/data/auto-translate";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useLanguage } from '@/lib/language-context';
import { basic } from "@/data/basic";

// Get Header Info from original data (for fallback)
const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

function ProductsContent({ params, locale: routeLocale, page = 1 }) {
  const { translations, locale: contextLocale } = useLanguage();
  const locale = routeLocale || contextLocale || 'en';
  const currentPage = Math.max(1, Number(page) || 1);

  // Get Banner Header Info - always use original data for slug matching
  // Note: Server-side page.js already checks if header exists, so we can safely assume it exists here
  const originalHeader = headerInfo(params.slug);
  if (!originalHeader) return null;
  
  // Features翻译映射
  const featuresTranslations = {
    "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": {
      en: "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved",
      es: "Calidad Excepcional: Nos aseguramos de que cada figura de caja ciega esté elaborada con materiales premium y detalles precisos, construida para durar y ser amada",
      fr: "Qualité Exceptionnelle: Nous nous assurons que chaque figurine de boîte à surprise est fabriquée avec des matériaux premium et des détails précis, construite pour durer et être aimée",
      de: "Außergewöhnliche Qualität: Wir stellen sicher, dass jede Blind Box Figur mit Premium-Materialien und präzisen Details gefertigt wird, gebaut um zu halten und geliebt zu werden",
      ja: "卓越した品質: すべてのブラインドボックスフィギュアがプレミアム素材と精密なディテールで作られ、長持ちし愛されるように作られています",
      ko: "탁월한 품질: 모든 블라인드 박스 피규어가 프리미엄 소재와 정밀한 디테일로 제작되어 오래 지속되고 사랑받을 수 있도록 보장합니다"
    },
    "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": {
      en: "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike",
      es: "Comodidad y Estilo: Nuestras cajas ciegas combinan la emoción del misterio con un diseño de personajes audaz y artístico, perfecto para coleccionistas y fanáticos por igual",
      fr: "Confort et Style: Nos boîtes à surprise combinent le frisson du mystère avec un design de personnage audacieux et artistique – parfait pour les collectionneurs et les fans",
      de: "Komfort und Stil: Unsere Blind Boxes kombinieren den Nervenkitzel des Geheimnisses mit kühnem, künstlerischem Charakterdesign – perfekt für Sammler und Fans gleichermaßen",
      ja: "快適さとスタイル: 私たちのブラインドボックスは、謎のスリルと大胆で芸術的なキャラクターデザインを組み合わせ、コレクターとファンの両方に最適です",
      ko: "편안함과 스타일: 우리의 블라인드 박스는 신비의 스릴과 대담하고 예술적인 캐릭터 디자인을 결합하여 수집가와 팬 모두에게 완벽합니다"
    },
    "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": {
      en: "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts",
      es: "Atractivo Versátil: Desde exhibiciones en estantes hasta decoración de escritorio, nuestras figuras aportan encanto a cualquier espacio y crean regalos inolvidables",
      fr: "Appel Polyvalent: Des présentoirs d'étagère à la décoration de bureau, nos figurines apportent du charme à tout espace et créent des cadeaux inoubliables",
      de: "Vielseitige Anziehungskraft: Von Regal-Displays bis zur Schreibtisch-Dekoration bringen unsere Figuren Charme in jeden Raum und schaffen unvergessliche Geschenke",
      ja: "多目的な魅力: 棚のディスプレイからデスクの装飾まで、私たちのフィギュアはあらゆる空間に魅力をもたらし、忘れられないギフトを作ります",
      ko: "다용도 매력: 선반 디스플레이부터 책상 장식까지, 우리의 피규어는 모든 공간에 매력을 더하고 잊을 수 없는 선물을 만듭니다"
    },
    "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": {
      en: "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet",
      es: "Prácticas Sostenibles: Estamos comprometidos con empaques conscientes del medio ambiente y producción responsable, agregando alegría a tu colección con menos impacto en el planeta",
      fr: "Pratiques Durables: Nous nous engageons en faveur d'emballages écologiques et d'une production responsable, ajoutant de la joie à votre collection avec moins d'impact sur la planète",
      de: "Nachhaltige Praktiken: Wir verpflichten uns zu umweltbewusster Verpackung und verantwortungsvoller Produktion und fügen Ihrer Sammlung Freude mit weniger Auswirkungen auf den Planeten hinzu",
      ja: "持続可能な実践: 私たちは環境に配慮した包装と責任ある生産に取り組み、地球への影響を少なくしながらあなたのコレクションに喜びを加えています",
      ko: "지속가능한 실천: 우리는 친환경 포장과 책임감 있는 생산에 전념하여 지구에 미치는 영향을 줄이면서 당신의 컬렉션에 기쁨을 더합니다"
    }
  };

  // UI文本翻译
  const uiTranslations = {
    learnMore: {
      en: "Learn More",
      es: "Leer Más",
      fr: "En Savoir Plus",
      de: "Mehr Erfahren",
      ja: "詳細を見る",
      ko: "더 알아보기"
    },
    previous: {
      en: "Previous",
      es: "Anterior",
      fr: "Précédent",
      de: "Zurück",
      ja: "前へ",
      ko: "이전"
    },
    next: {
      en: "Next",
      es: "Siguiente",
      fr: "Suivant",
      de: "Weiter",
      ja: "次へ",
      ko: "다음"
    }
  };

  // 翻译函数
  const translateFeature = (feature, locale) => {
    if (!feature || typeof feature !== 'string') return feature;
    return featuresTranslations[feature]?.[locale] || feature;
  };
  
  const t = (key) => uiTranslations[key]?.[locale] || uiTranslations[key]?.en || key;
  
  // 创建翻译后的header数据
  const header = {
    ...originalHeader,
    features: originalHeader.features.map(feature => translateFeature(feature, locale))
  };

  const ROOT_URL = basic.seo.url.replace(/\/$/, "");
  const urlPrefix = `/${locale}`;

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": translations.nav?.home || "Home",
      "item": `${ROOT_URL}${urlPrefix}/`
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": translations.nav?.products || "Products Collection",
      "item": `${ROOT_URL}${urlPrefix}/collection/`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": header.title,
      "item": `${ROOT_URL}${urlPrefix}/collection/${params.slug}/`
    }]
  };

  // Filter Product Data - use i18n data if available
  // Get all products in the current locale
  const allProducts = getAllProductsByLanguage(locale);
  
  // Map translated category names back to English for filtering
  const categoryToEnglish = {
    // English
    "Poker Equipment": "Poker Equipment",
    "Poker Chips": "Poker Chips",
    "Poker Table": "Poker Table",
    // Spanish
    "Equipo de póker": "Poker Equipment",
    "Fichas de póker": "Poker Chips",
    "Mesa de póker": "Poker Table",
    // French
    "Équipement de poker": "Poker Equipment",
    "Jetons de poker": "Poker Chips",
    "Table de poker": "Poker Table",
    // German
    "Poker-Ausrüstung": "Poker Equipment",
    "Pokerchips": "Poker Chips",
    "Pokertisch": "Poker Table",
    // Japanese
    "ポーカー用品": "Poker Equipment",
    "ポーカーチップ": "Poker Chips",
    "ポーカーテーブル": "Poker Table",
    // Korean
    "포커 장비": "Poker Equipment",
    "포커 칩": "Poker Chips",
    "포커 테이블": "Poker Table",
  };
  
  // Filter products by matching the translated category back to original English category
  const productArray = allProducts.filter(item => {
    const englishCategory = categoryToEnglish[item.category] || item.category;
    return englishCategory === originalHeader.title;
  }).map(item => ({
    image: item.image,
    category: item.category,
    title: item.title,
    description: item.description,
    id: item.id
  }));

  // Pagination
  const itemsPerPage = 52;
  const maxPageNumbers = 5;
  const totalPages = Math.max(1, Math.ceil(productArray.length / itemsPerPage)); // Ensure at least 1 page
  const isPageOutOfRange = productArray.length > 0 && currentPage > totalPages; // Only out of range if there are products
  if (isPageOutOfRange) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const productsPage = productArray.slice(startIndex, startIndex + itemsPerPage);
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = currentPage + 1;
  const categoryBasePath = `/${locale}/collection/${params.slug}/`;
  const getPageHref = (pageNumber) => (
    pageNumber === 1 ? categoryBasePath : `${categoryBasePath}page/${pageNumber}/`
  );
  const startPage = Math.max(1, Math.min(
    currentPage - Math.floor(maxPageNumbers / 2),
    totalPages - maxPageNumbers + 1
  ));
  const pageNumbers = Array.from(
    { length: Math.min(maxPageNumbers, totalPages - startPage + 1) },
    (_, i) => startPage + i
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": productsPage.map((item, index) => {
      const productSlug = item.id || slugify(item.title, { lower: true, strict: true });
      return {
        "@type": "ListItem",
        "position": startIndex + index + 1,
        "name": item.title,
        "url": `${ROOT_URL}${urlPrefix}/product/${productSlug}/`,
      };
    }),
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Banner Header */}
      <Header data={header} />

      {/* Product Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          {/* Products */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {productsPage.map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link href={`${urlPrefix}/product/${item.id || slugify(item.title, { lower: true, strict: true })}/`}>
                    <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={400} height={300} />
                  </Link>
                  <Badge asChild variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link
                      href={`${urlPrefix}/collection/${slugify(item.category, { lower: true, strict: true })}/`}
                      aria-label={`Browse ${item.category} products`}
                    >
                      {item.category}
                    </Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={`${urlPrefix}/product/${item.id || slugify(item.title, { lower: true, strict: true })}/`}>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">
                    {item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description}
                  </p>
                  <Link
                    href={`${urlPrefix}/product/${item.id || slugify(item.title, { lower: true, strict: true })}/`}
                    aria-label={`${t('learnMore')}: ${item.title}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    {t("learnMore")} <span className="sr-only">: {item.title}</span>{" "}
                    <ChevronRight className="w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!isPageOutOfRange ? (
            <Pagination className="mt-8">
              <PaginationContent className="w-full">
                <PaginationItem>
                  <PaginationLink 
                    href={currentPage !== 1 ? getPageHref(prevPage) : undefined} 
                    aria-disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    size="default"
                    className="gap-1 pl-2.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t('previous')}</span>
                  </PaginationLink>
                </PaginationItem>
                {pageNumbers.map(pageNumber => (
                  <PaginationItem key={pageNumber}><PaginationLink href={getPageHref(pageNumber)} isActive={currentPage === pageNumber}>{pageNumber}</PaginationLink></PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink 
                    href={currentPage !== totalPages ? getPageHref(nextPage) : undefined} 
                    aria-disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    size="default"
                    className="gap-1 pr-2.5"
                  >
                    <span>{t('next')}</span>
                    <ChevronRight className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : (
            null
          )}
        </div>
      </section>
    </>
  );
}

export default function ProductsClient({ params, locale, page = 1 }) {
  return <ProductsContent params={params} locale={locale} page={page} />;
}
