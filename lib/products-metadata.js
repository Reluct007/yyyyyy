import { products } from "@/data/products";
import { getProductsByLanguage } from "@/data/auto-translate";
import slugify from "slugify";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates, toLocalizedUrl } from "./hreflang";
import { openGraphImage, twitterMetadata } from "./shared-metadata";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const BRAND_NAME = basic.info.brand;

// 查找产品分类
const findProductCategory = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

// 为产品分类页面生成 metadata
export function generateProductsMetadata(slug, locale = 'en', page = 1) {
  const category = findProductCategory(slug);
  
  if (!category) {
    return {
      title: `Product Category Not Found - ${BRAND_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // 获取翻译后的分类数据
  const localizedProducts = getProductsByLanguage(locale);
  const localizedCategory = localizedProducts.products.find(
    p => slugify(p.title, { lower: true, strict: true }) === slug
  );
  const categoryTitle = localizedCategory?.title || category.title;

  const logicalPath =
    page === 1
      ? `/collection/${slug}/`
      : `/collection/${slug}/page/${page}/`;
  const canonicalUrl = toLocalizedUrl({
    siteUrl: ROOT_URL,
    logicalPath,
    locale,
    defaultLocale: DEFAULT_LOCALE,
  });
  const { languages } =
    page === 1
      ? buildAlternates({
          siteUrl: ROOT_URL,
          logicalPath,
          locale,
          locales: SUPPORTED_LOCALES,
          defaultLocale: DEFAULT_LOCALE,
        })
      : { languages: undefined };

  // 构建描述
  const descriptionTranslations = {
    en: `Browse ${categoryTitle} collection at ${BRAND_NAME}. Premium products for distributors and retailers.`,
    es: `Explora la colección ${categoryTitle} en ${BRAND_NAME}. Productos premium para distribuidores y minoristas.`,
    fr: `Parcourez la collection ${categoryTitle} chez ${BRAND_NAME}. Produits premium pour distributeurs et détaillants.`,
    de: `Durchsuchen Sie die ${categoryTitle} Kollektion bei ${BRAND_NAME}. Premium-Produkte für Händler und Einzelhändler.`,
    ja: `${BRAND_NAME}で${categoryTitle}コレクションをご覧ください。卸売業者や小売業者向けのプレミアム商品。`,
    ko: `${BRAND_NAME}에서 ${categoryTitle} 컬렉션을 둘러보세요. 유통업자 및 소매업자를 위한 프리미엄 제품.`
  };
  
  const description = descriptionTranslations[locale] || descriptionTranslations.en;
  const title = page === 1 
    ? `${categoryTitle} - ${BRAND_NAME}` 
    : `${categoryTitle} - Page ${page} - ${BRAND_NAME}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
      ...(languages ? { languages } : {}),
    },
    robots: {
      index: page === 1, // 只有第一页被索引
      follow: true,
    },
    openGraph: {
      ...openGraphImage,
      title: title,
      description: description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      ...twitterMetadata,
      title,
      description,
    },
  };
}
