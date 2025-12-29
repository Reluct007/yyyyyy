import { notFound } from "next/navigation";
import { products } from "@/data/products";
import slugify from "slugify";
import { generateProductsMetadata } from '@/lib/products-metadata';
import ProductsClient from './products-client';

// Get Header Info from original data (for fallback)
const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

// Generate static params for all product categories
export async function generateStaticParams() {
  return products.products.map((product) => ({
    slug: slugify(product.title, { lower: true, strict: true }),
  }));
}

export async function generateMetadata({ params, searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page, 10) || 1);
  return generateProductsMetadata(params.slug, 'en', page);
}

export default function Product({ params, searchParams }) {
  // Get Banner Header Info - always use original data for slug matching
  const originalHeader = headerInfo(params.slug);
  if (!originalHeader) notFound();

  return <ProductsClient params={params} searchParams={searchParams} />;
}
