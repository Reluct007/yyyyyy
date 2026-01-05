'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/features/header";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import { getAllProductsByLanguage } from "@/data/auto-translate";
import { basic } from "@/data/basic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useEffect, useState, Suspense } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useSearchParams } from 'next/navigation';

const ROOT_URL = basic.seo.url;
const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

function ProductsContent({ params, locale: routeLocale }) {
  const { translations, locale: contextLocale } = useLanguage();
  const locale = routeLocale || contextLocale || 'en';
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams?.get('page'), 10) || 1);
  
  useEffect(() => { setMounted(true); }, []);

  const originalHeader = headerInfo(params.slug);
  
  const featuresTranslations = {
    "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": {
      en: "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved",
      es: "Calidad Excepcional: Nos aseguramos de que cada figura de caja ciega esté elaborada con materiales premium y detalles precisos",
      fr: "Qualité Exceptionnelle: Nous nous assurons que chaque figurine est fabriquée avec des matériaux premium",
      de: "Außergewöhnliche Qualität: Wir stellen sicher, dass jede Blind Box Figur mit Premium-Materialien gefertigt wird",
      ja: "卓越した品質: すべてのブラインドボックスフィギュアがプレミアム素材で作られています",
      ko: "탁월한 품질: 모든 블라인드 박스 피규어가 프리미엄 소재로 제작됩니다"
    }
  };

  const uiTranslations = {
    learnMore: { en: "Learn More", es: "Leer Más", fr: "En Savoir Plus", de: "Mehr Erfahren", ja: "詳細を見る", ko: "더 알아보기" },
    previous: { en: "Previous", es: "Anterior", fr: "Précédent", de: "Zurück", ja: "前へ", ko: "이전" },
    next: { en: "Next", es: "Siguiente", fr: "Suivant", de: "Weiter", ja: "次へ", ko: "다음" }
  };

  const translateFeature = (feature, locale) => featuresTranslations[feature]?.[locale] || feature;
  const t = (key) => uiTranslations[key]?.[locale] || uiTranslations[key]?.en || key;
  
  const header = {
    ...originalHeader,
    features: originalHeader.features.map(feature => translateFeature(feature, locale))
  };

  if (!mounted) return <div>Loading...</div>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": translations.nav?.home || "Home",
      "item": `${ROOT_URL}/`
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": translations.nav?.products || "Products Collection",
      "item": `${ROOT_URL}${locale === 'en' ? '' : `/${locale}`}/collection/`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": header.title,
      "item": `${ROOT_URL}${locale === 'en' ? '' : `/${locale}`}/collection/${params.slug}/`
    }]
  };

  const allProducts = getAllProductsByLanguage(locale);
  const categoryToEnglish = {
    "Labubu": "Labubu", "Dolls": "Dolls", "Animals Toy": "Animals Toy",
    "Muñecas": "Dolls", "Juguetes de Animales": "Animals Toy",
    "Poupées": "Dolls", "Jouets d'Animaux": "Animals Toy",
    "Puppen": "Dolls", "Tier-Spielzeug": "Animals Toy",
    "ドール": "Dolls", "アニマルトイ": "Animals Toy", "ラブブ": "Labubu",
    "인형": "Dolls", "동물 장난감": "Animals Toy", "라부부": "Labubu"
  };
  
  const productArray = allProducts.filter(item => {
    const englishCategory = categoryToEnglish[item.category] || item.category;
    return englishCategory === originalHeader.title;
  }).map(item => ({ image: item.image, category: item.category, title: item.title, description: item.description, id: item.id }));

  const itemsPerPage = 52;
  const maxPageNumbers = 5;
  const totalPages = Math.max(1, Math.ceil(productArray.length / itemsPerPage));
  const startIndex = (page - 1) * itemsPerPage;
  const productsPage = productArray.slice(startIndex, startIndex + itemsPerPage);
  const prevPage = Math.max(1, page - 1);
  const nextPage = page + 1;
  const isPageOutOfRange = productArray.length > 0 && page > totalPages;
  const startPage = Math.max(1, Math.min(page - Math.floor(maxPageNumbers / 2), totalPages - maxPageNumbers + 1));
  const pageNumbers = Array.from({ length: Math.min(maxPageNumbers, totalPages - startPage + 1) }, (_, i) => startPage + i);

  const urlPrefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header data={header} />

      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {productsPage.map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link href={`${urlPrefix}/product/${item.id || slugify(item.title, { lower: true, strict: true })}/`}>
                    <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={400} height={300} />
                  </Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link href={`${urlPrefix}/collection/${slugify(item.category, { lower: true, strict: true })}/`}>{item.category}</Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={`${urlPrefix}/product/${item.id || slugify(item.title, { lower: true, strict: true })}/`}>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">{item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description}</p>
                  <Link href={`${urlPrefix}/product/${item.id || slugify(item.title, { lower: true, strict: true })}/`} className="flex items-center gap-2 text-sm text-muted-foreground">
                    {t('learnMore')} <ChevronRight className="w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {!isPageOutOfRange ? (
            <Pagination className="mt-8">
              <PaginationContent className="w-full">
                <PaginationItem>
                  <PaginationLink href={page !== 1 ? `?page=${prevPage}` : undefined} aria-disabled={page === 1} className="gap-1 pl-2.5">
                    <ChevronLeft className="h-4 w-4" /><span>{t('previous')}</span>
                  </PaginationLink>
                </PaginationItem>
                {pageNumbers.map(pageNumber => (
                  <PaginationItem key={pageNumber}><PaginationLink href={`?page=${pageNumber}`} isActive={page === pageNumber}>{pageNumber}</PaginationLink></PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink href={page !== totalPages ? `?page=${nextPage}` : undefined} aria-disabled={page === totalPages} className="gap-1 pr-2.5">
                    <span>{t('next')}</span><ChevronRight className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : notFound()}
        </div>
      </section>
    </>
  );
}

export default function ProductsClient({ params, locale }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent params={params} locale={locale} />
    </Suspense>
  );
}
