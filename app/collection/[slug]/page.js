import { notFound } from "next/navigation";
import { products } from "@/data/products";
import slugify from "slugify";
import { generateProductsMetadata } from '@/lib/products-metadata';
import ProductsClient from './products-client';

const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

export async function generateStaticParams() {
  return products.products.map((product) => ({
    slug: slugify(product.title, { lower: true, strict: true }),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generateProductsMetadata(slug, 'en', 1);
}

export default async function CollectionCategory({ params }) {
  const { slug } = await params;
  const originalHeader = headerInfo(slug);
  if (!originalHeader) notFound();

  return <ProductsClient params={{ slug }} />;
}
