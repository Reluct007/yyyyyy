import { redirect } from 'next/navigation';
import { products } from "@/data/products";
import slugify from "slugify";

export async function generateStaticParams() {
  return products.products.map((product) => ({
    slug: slugify(product.title, { lower: true, strict: true }),
  }));
}

// 重定向到新的 collection 路径
export default function ProductsSlugRedirect({ params }) {
  redirect(`/collection/${params.slug}/`);
}
