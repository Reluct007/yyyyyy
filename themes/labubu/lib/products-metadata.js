import { products } from "@/data/products";
import { getProductsByLanguage } from "@/data/auto-translate";
import slugify from "slugify";

const ROOT_URL = "https://www.labubuwholesale.com";

// 查找产品分类
const findProductCategory = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

// 为产品分类页面生成 metadata
export function generateProductsMetadata(slug, locale = 'en', page = 1) {
  const category = findProductCategory(slug);
  
  if (!category) {
    return {
      title: "Product Category Not Found - Labubu Wholesale",
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
    ? `/products/${slug}`
    : `/${locale}/products/${slug}`;
  
  // 第一页的 canonical 不包含 page 参数
  const canonicalUrl = page === 1
    ? `${ROOT_URL}${basePath}`
    : `${ROOT_URL}${basePath}?page=${page}`;

  // 构建描述
  const descriptionTranslations = {
    en: `Browse ${categoryTitle} collection at Labubu Wholesale. Premium designer collectibles for distributors and retailers.`,
    es: `Explora la colección ${categoryTitle} en Labubu Wholesale. Coleccionables de diseñador premium para distribuidores y minoristas.`,
    fr: `Parcourez la collection ${categoryTitle} chez Labubu Wholesale. Collectibles de designer premium pour distributeurs et détaillants.`,
    de: `Durchsuchen Sie die ${categoryTitle} Kollektion bei Labubu Wholesale. Premium Designer-Sammlerstücke für Händler und Einzelhändler.`,
    ja: `Labubu Wholesaleで${categoryTitle}コレクションをご覧ください。卸売業者や小売業者向けのプレミアムデザイナーコレクタブル。`,
    ko: `Labubu Wholesale에서 ${categoryTitle} 컬렉션을 둘러보세요. 유통업자 및 소매업자를 위한 프리미엄 디자이너 컬렉터블.`
  };
  
  const description = descriptionTranslations[locale] || descriptionTranslations.en;
  const title = page === 1 
    ? `${categoryTitle} - Labubu Wholesale` 
    : `${categoryTitle} - Page ${page} - Labubu Wholesale`;

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

