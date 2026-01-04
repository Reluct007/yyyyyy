import Header from "@/components/features/header";
import { ChevronRight } from "lucide-react";
import { getProductsByLanguage } from "@/data/auto-translate";
import { getNonDefaultLocales, getTranslations } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { getSeoMeta } from "@/lib/metadata-translations";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const SITE_URL = withTrailingSlash(basic.seo.url);

// 构建时生成所有语言版本
export async function generateStaticParams() {
  return getNonDefaultLocales().map(locale => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const alternates = buildAlternates({
    siteUrl: SITE_URL,
    logicalPath: "/collection/",
    locale,
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const canonicalUrl = alternates.canonical;
  const { title, description } = getSeoMeta('products', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

// 服务端组件 - 纯静态生成
export default function ProductsPage({ params }) {
  const { locale } = params;
  const translations = getTranslations(locale);
  const urlPrefix = `/${locale}`;

  // 获取当前语言的产品数据
  const productsData = getProductsByLanguage(locale);

  // JSON-LD 结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": translations.nav?.home || "Home",
      "item": SITE_URL
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": translations.nav?.products || "Products Collection",
      "item": `${SITE_URL}${locale}/collection/`
    }]
  };

  return (
    <>
      {/* JSON-LD 结构化数据 - 服务端输出 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header */}
      <Header data={productsData.header} />
      
      {/* Products Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {productsData.products.map((item, index) => {
              const itemSlug = slugify(item.title, { lower: true, strict: true });
              const itemUrl = `${urlPrefix}/collection/${itemSlug}`;
              
              return (
                <div key={index} className="rounded-lg border">
                  <Link href={itemUrl}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-t-lg"
                      width={800}
                      height={500}
                    />
                  </Link>
                  <div className="p-4 space-y-2">
                    <Link href={itemUrl}>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </Link>
                    <p className="text-base text-muted-foreground">
                      {item.description.length > 240
                        ? `${item.description.substring(0, 240)}...`
                        : item.description}
                    </p>
                    <Link
                      href={itemUrl}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
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
