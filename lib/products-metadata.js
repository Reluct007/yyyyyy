import { products } from "@/data/products";
import { getProductsByLanguage } from "@/data/auto-translate";
import slugify from "slugify";
import { basic } from "@/data/basic";

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

  // 构建 canonical URL
  const basePath = locale === 'en' 
    ? `/products/${slug}/`
    : `/${locale}/products/${slug}/`;
  
  // 第一页为分类页本身；后续页使用静态路径 /page/N/
  const canonicalUrl = page === 1
    ? `${ROOT_URL}${basePath}`
    : `${ROOT_URL}${basePath}page/${page}/`;

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
    },
    robots: {
      index: page === 1, // 只有第一页被索引
      follow: true,
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      type: "website",
    },
  };
}
