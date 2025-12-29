import Header from "@/components/common/header";
import { ChevronRight } from "lucide-react";
import { getProductsByLanguage } from "@/data/auto-translate";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { getSeoMeta } from "@/lib/metadata-translations";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `https://www.labubuwholesale.com${locale === 'en' ? '/products' : `/${locale}/products`}`;
  const { title, description } = getSeoMeta('products', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com/products',
        'es': 'https://www.labubuwholesale.com/es/products',
        'fr': 'https://www.labubuwholesale.com/fr/products',
        'de': 'https://www.labubuwholesale.com/de/products',
        'ja': 'https://www.labubuwholesale.com/ja/products',
        'ko': 'https://www.labubuwholesale.com/ko/products'
      },
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

export default function Products({ params }) {
  const { locale } = params;

  // Get products data in current language
  const productsData = getProductsByLanguage(locale);

  return (
    <>
      {/* Header */}
      <Header data={productsData.header} />
      {/* Products Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {productsData.products.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <Link href={locale === 'en' ? `/products/${slugify(item.title, { lower: true, strict: true })}` : `/${locale}/products/${slugify(item.title, { lower: true, strict: true })}`} target="_blank">
                  <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={800} height={500} />
                </Link>
                <div className="p-4 space-y-2">
                  <Link href={locale === 'en' ? `/products/${slugify(item.title, { lower: true, strict: true })}` : `/${locale}/products/${slugify(item.title, { lower: true, strict: true })}`} target="_blank">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">{item.description.length > 240 ? `${item.description.substring(0, 240)}...` : item.description}</p>
                  <Link href={locale === 'en' ? `/products/${slugify(item.title, { lower: true, strict: true })}` : `/${locale}/products/${slugify(item.title, { lower: true, strict: true })}`} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank">
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