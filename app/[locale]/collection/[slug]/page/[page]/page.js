import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { product } from "@/data/product";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";
import { generateProductsMetadata } from "@/lib/products-metadata";
import ProductsClient from "../../products-client";

const ITEMS_PER_PAGE = 52;

const getCategoryBySlug = (slug) =>
  products.products.find((item) => slugify(item.title, { lower: true, strict: true }) === slug);

const getTotalPagesForCategory = (categoryTitle) => {
  const totalItems = product.filter((item) => item.category === categoryTitle).length;
  return Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
};

export async function generateStaticParams() {
  const supportedLocales = getSupportedLocales();
  const params = [];

  for (const locale of supportedLocales) {
    for (const category of products.products) {
      const slug = slugify(category.title, { lower: true, strict: true });
      const totalPages = getTotalPagesForCategory(category.title);

      for (let page = 1; page <= totalPages; page += 1) {
        params.push({ locale, slug, page: String(page) });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug, page } = params;
  const pageNumber = Number(page);
  const baseMetadata = generateProductsMetadata(slug, locale || "en", pageNumber);
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
  const { locale, slug, page } = params;
  const pageNumber = Number(page);

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  if (!Number.isInteger(pageNumber) || pageNumber < 1) notFound();

  const totalPages = getTotalPagesForCategory(category.title);
  if (pageNumber > totalPages) notFound();

  return <ProductsClient params={{ slug }} locale={locale} page={pageNumber} />;
}
