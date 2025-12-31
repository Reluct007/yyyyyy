import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";
import { generateProductsMetadata } from '@/lib/products-metadata';
import ProductsClient from './products-client';

// Get Header Info from original data (for fallback)
const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

// Generate static params for all product categories and locales
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

export default async function Product({ params }) {
  const { locale, slug } = await params;
  
  // Get Banner Header Info - always use original data for slug matching
  const originalHeader = headerInfo(slug);
  if (!originalHeader) notFound();

  return <ProductsClient params={{ slug }} locale={locale} />;
}
