import { generateProductMetadata } from "@/lib/product-metadata";
import ProductPageClient from "./page-client";

// Enable dynamic rendering for this page
export const dynamic = 'force-dynamic';

// 生成 metadata
export async function generateMetadata({ params }) {
  const { slug } = (await params) || {};
  return generateProductMetadata(slug, "en");
}

export default function ProductPage({ params }) {
  return <ProductPageClient params={params} />;
}
