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

export async function generateMetadata({ params, searchParams }) {
  const { locale, slug } = params;
  const page = Math.max(1, parseInt(searchParams?.page, 10) || 1);
  return generateProductsMetadata(slug, locale || 'en', page);
}

export default function Product({ params, searchParams }) {
  const { locale, slug } = params;
  
  // Get Banner Header Info - always use original data for slug matching
  const originalHeader = headerInfo(slug);
  if (!originalHeader) notFound();

  return <ProductsClient params={{ slug }} searchParams={searchParams} locale={locale} />;
}
