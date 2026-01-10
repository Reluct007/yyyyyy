import { product } from "@/data/product";
import slugify from "slugify";
import { generateProductMetadata } from "@/lib/product-metadata";
import ProductPageClient from "./page-client";

// 获取有效产品列表
const getValidProducts = () =>
  product.filter((item) => {
    const img = item.image;
    const isInvalidImage =
      img && (img.match(/\.(SS40|_SX38|\.SX38)/) || !img.startsWith("/product/"));
    return !isInvalidImage && item.title && item.title.length > 0;
  });

// 构建时生成所有产品页面的静态参数
export async function generateStaticParams() {
  return getValidProducts().map((item) => ({
    slug: slugify(item.title, { lower: true, strict: true }),
  }));
}

// 生成 metadata
export async function generateMetadata({ params }) {
  const { slug } = (await params) || {};
  return generateProductMetadata(slug, "en");
}

export default function ProductPage({ params }) {
  return <ProductPageClient params={params} />;
}
