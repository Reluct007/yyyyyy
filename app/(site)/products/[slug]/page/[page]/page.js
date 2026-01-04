import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { product } from "@/data/product";
import slugify from "slugify";
import { generateProductsMetadata } from "@/lib/products-metadata";
import ProductsClient from "../../products-client";

const ITEMS_PER_PAGE = 52;

const getCategoryBySlug = (slug) => (
  products.products.find((item) => slugify(item.title, { lower: true, strict: true }) === slug)
);

const getTotalPagesForCategory = (categoryTitle) => {
  const totalItems = product.filter((item) => item.category === categoryTitle).length;
  return Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
};

export async function generateStaticParams() {
  const params = [];

  for (const category of products.products) {
    const slug = slugify(category.title, { lower: true, strict: true });
    const totalPages = getTotalPagesForCategory(category.title);

    for (let page = 1; page <= totalPages; page += 1) {
      params.push({ slug, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { slug, page } = params;
  const pageNumber = Number(page);
  const baseMetadata = generateProductsMetadata(slug, "en", pageNumber);
  if (pageNumber === 1) {
    return {
      ...baseMetadata,
      robots: {
        index: false,
        follow: true,
      },
    };
  }
  return baseMetadata;
}

export default function ProductCategoryPage({ params }) {
  const { slug, page } = params;
  const pageNumber = Number(page);

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  if (!Number.isInteger(pageNumber) || pageNumber < 1) notFound();

  const totalPages = getTotalPagesForCategory(category.title);
  if (pageNumber > totalPages) notFound();

  return <ProductsClient params={{ slug }} page={pageNumber} />;
}
