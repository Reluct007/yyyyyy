import Header from "@/components/features/header";
import { ChevronRight } from "lucide-react";
import { getProductsByLanguage } from "@/data/auto-translate";
import { getSupportedLocales, getTranslations } from "@/lib/i18n";
import { basic } from "@/data/basic";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { getSeoMeta } from "@/lib/metadata-translations";

const ROOT_URL = basic.seo.url;

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const urlPrefix = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${ROOT_URL}${urlPrefix}/collection/`;
  const { title, description } = getSeoMeta('products', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${ROOT_URL}/collection/`,
        'es': `${ROOT_URL}/es/collection/`,
        'fr': `${ROOT_URL}/fr/collection/`,
        'de': `${ROOT_URL}/de/collection/`,
        'ja': `${ROOT_URL}/ja/collection/`,
        'ko': `${ROOT_URL}/ko/collection/`
      },
    },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonicalUrl, type: "website" },
  };
}

export default function CollectionPage({ params }) {
  const { locale } = params;
  const translations = getTranslations(locale);
  const urlPrefix = locale === 'en' ? '' : `/${locale}`;
  const productsData = getProductsByLanguage(locale);

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
      "item": `${ROOT_URL}${urlPrefix}/collection/`
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header data={productsData.header} />
      
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {productsData.products.map((item, index) => {
              const itemSlug = slugify(item.title, { lower: true, strict: true });
              const itemUrl = `${urlPrefix}/collection/${itemSlug}/`;
              
              return (
                <div key={index} className="rounded-lg border">
                  <Link href={itemUrl}>
                    <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={800} height={500} />
                  </Link>
                  <div className="p-4 space-y-2">
                    <Link href={itemUrl}><h3 className="text-xl font-semibold">{item.title}</h3></Link>
                    <p className="text-base text-muted-foreground">
                      {item.description.length > 240 ? `${item.description.substring(0, 240)}...` : item.description}
                    </p>
                    <Link href={itemUrl} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {translations.product?.learnMore || "Read More"} <ChevronRight className="w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
