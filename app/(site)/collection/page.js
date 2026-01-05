import Header from "@/components/features/header";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { basic } from "@/data/basic";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `Products Collection | ${basic.info.brand}`;
const PAGE_DESCRIPTION = products.header.description;
const alternates = buildAlternates({
  siteUrl: ROOT_URL,
  logicalPath: "/collection/",
  locale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
const CANONICAL_URL = alternates.canonical;

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: alternates.canonical,
    languages: alternates.languages,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    ...openGraphImage,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    type: "website",
  },
  twitter: {
    ...twitterMetadata,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

// JSON-LD 结构化数据
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": `${ROOT_URL}/`
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Products Collection",
    "item": CANONICAL_URL
  }]
};

// 服务端组件 - 纯静态生成
export default function ProductsPage() {
  return (
    <>
      {/* JSON-LD 结构化数据 - 服务端输出 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header */}
      <Header data={products.header} />
      
      {/* Products Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.products.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <Link
                  href={`/collection/${slugify(item.title, { lower: true, strict: true })}/`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-t-lg"
                    width={800}
                    height={500}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <Link
                    href={`/collection/${slugify(item.title, { lower: true, strict: true })}/`}
                  >
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">
                    {item.description.length > 240
                      ? `${item.description.substring(0, 240)}...`
                      : item.description}
                  </p>
                  <Link
                    href={`/collection/${slugify(item.title, { lower: true, strict: true })}/`}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    Read More <ChevronRight className="w-4" />
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
