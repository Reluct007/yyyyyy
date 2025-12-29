'use client';

import Header from "@/components/common/header";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { getProductsByLanguage } from "@/data/auto-translate";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

export default function ProductsClient() {
  const { translations, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Get products data in current language
  const productsData = getProductsByLanguage(locale);

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": translations.nav?.home || "Home",
      "item": `https://www.labubuwholesale.com`
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": translations.nav?.products || "Products Collection",
      "item": `https://www.labubuwholesale.com/products`
    }]
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header */}
      <Header data={productsData.header} />
      {/* Products Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {productsData.products.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <Link href={`/products/${slugify(item.title, { lower: true, strict: true })}`} target="_blank">
                  <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={800} height={500} />
                </Link>
                <div className="p-4 space-y-2">
                  <Link href={`/products/${slugify(item.title, { lower: true, strict: true })}`} target="_blank">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">{item.description.length > 240 ? `${item.description.substring(0, 240)}...` : item.description}</p>
                  <Link href={`/products/${slugify(item.title, { lower: true, strict: true })}`} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank">
                    {translations.product?.learnMore || "Read More"} <ChevronRight className="w-4" />
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

