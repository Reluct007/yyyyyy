import { redirect } from 'next/navigation';
import { products } from "@/data/products";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";

export async function generateStaticParams() {
  const supportedLocales = getSupportedLocales();
  const params = [];
  supportedLocales.forEach(locale => {
    products.products.forEach((product) => {
      params.push({ locale, slug: slugify(product.title, { lower: true, strict: true }) });
    });
  });
  return params;
}

export default function ProductsSlugRedirect({ params }) {
  const { locale, slug } = params;
  const urlPrefix = locale === 'en' ? '' : `/${locale}`;
  redirect(`${urlPrefix}/collection/${slug}/`);
}
