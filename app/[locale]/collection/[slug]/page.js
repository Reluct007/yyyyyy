import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";
import { generateProductsMetadata } from '@/lib/products-metadata';
import ProductsClient from './products-client';

const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

export async function generateStaticParams() {
  const supportedLocales = getSupportedLocales();
  const params = [];
  
  supportedLocales.forEach(locale => {
    products.products.forEach((product) => {
      params.push({
        locale: locale,
        slug: slugify(product.title, { lower: true, strict: true }),
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  return generateProductsMetadata(slug, locale || 'en', 1);
}

export default async function CollectionCategory({ params }) {
  const { locale, slug } = await params;
  const originalHeader = headerInfo(slug);
  if (!originalHeader) notFound();

  return <ProductsClient params={{ slug }} locale={locale} />;
}
