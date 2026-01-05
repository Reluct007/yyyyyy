import { product } from "@/data/product";
import { getProductByLanguage } from "@/data/auto-translate";
import slugify from "slugify";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "./hreflang";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const BRAND_NAME = basic.info.brand;

// 查找产品
const findProduct = (slug) => product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);

// 为产品页面生成 metadata
export function generateProductMetadata(slug, locale = 'en') {
  try {
    if (!slug) {
      return {
        title: `Product Not Found - ${BRAND_NAME}`,
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const originalProduct = findProduct(slug);
    
    if (!originalProduct) {
      return {
        title: `Product Not Found - ${BRAND_NAME}`,
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const localizedProduct = getProductByLanguage(locale, slug);

    const productTitle = localizedProduct?.title || originalProduct.title;
    const productDescription = localizedProduct?.description || originalProduct.description;
    const productId = slug || slugify(originalProduct.title, { lower: true, strict: true });
    
    const { canonical, languages } = buildAlternates({
      siteUrl: ROOT_URL,
      logicalPath: `/product/${productId}/`,
      locale,
      locales: SUPPORTED_LOCALES,
      defaultLocale: DEFAULT_LOCALE,
    });

    // 构建描述
    const description = productDescription && productDescription.length > 160 
      ? productDescription.substring(0, 157) + '...' 
      : (productDescription || `Premium product from ${BRAND_NAME}`);

    return {
      title: `${productTitle} - ${BRAND_NAME}`,
      description: description,
      alternates: {
        canonical,
        languages,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: `${productTitle} - ${BRAND_NAME}`,
        description: description,
        url: canonical,
        type: "website",
        siteName: BRAND_NAME,
        images: originalProduct.image ? [{
          url: `${ROOT_URL}${originalProduct.image}`,
          width: 800,
          height: 600,
          alt: productTitle,
        }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${productTitle} - ${BRAND_NAME}`,
        description: description,
        images: originalProduct.image ? [`${ROOT_URL}${originalProduct.image}`] : undefined,
      },
    };
  } catch (error) {
    console.error('Error generating product metadata:', error);
    return {
      title: `Product - ${BRAND_NAME}`,
      description: `Premium product from ${BRAND_NAME}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}
