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

    // 产品标题和描述翻译
    const productTranslations = {
      "Cute Clothes Fit for LABUBU Doll": {
        title: {
          en: "Cute Clothes Fit for LABUBU Doll",
          es: "Ropa Bonita para Muñeca LABUBU",
          fr: "Vêtements Mignons pour Poupée LABUBU", 
          de: "Süße Kleidung für LABUBU Puppe",
          ja: "ラブブ人形用かわいい服",
          ko: "라부부 인형용 귀여운 옷"
        },
        description: {
          en: "Boost your business with our high-quality labubu doll clothes set, designed specifically for distributors, retailers, and bulk purchasers seeking to enhance their product offerings.",
          es: "Impulse su negocio con nuestro conjunto de ropa para muñecas labubu de alta calidad, diseñado específicamente para distribuidores, minoristas y compradores al por mayor que buscan mejorar sus ofertas de productos.",
          fr: "Boostez votre entreprise avec notre ensemble de vêtements pour poupées labubu de haute qualité, conçu spécifiquement pour les distributeurs, détaillants et acheteurs en gros cherchant à améliorer leurs offres de produits.",
          de: "Steigern Sie Ihr Geschäft mit unserem hochwertigen Labubu-Puppenkleidungsset, das speziell für Distributoren, Einzelhändler und Großeinkäufer entwickelt wurde, die ihr Produktangebot verbessern möchten.",
          ja: "ディストリビューター、小売業者、大量購入者向けに特別に設計された高品質のラブブ人形服セットでビジネスを後押しし、製品提供を強化します。",
          ko: "유통업자, 소매업자 및 대량 구매자를 위해 특별히 설계된 고품질 라부부 인형 옷 세트로 비즈니스를 강화하고 제품 제공을 향상시키세요."
        }
      },
      "Wings of Fortune Vinyl Plush Hanging Card": {
        title: {
          en: "Wings of Fortune Vinyl Plush Hanging Card",
          es: "Tarjeta Colgante de Peluche Vinilo Alas de Fortuna",
          fr: "Carte Suspendue Peluche Vinyle Ailes de Fortune",
          de: "Wings of Fortune Vinyl Plüsch Hängende Karte",
          ja: "運命の翼ビニールぬいぐるみハンギングカード",
          ko: "운명의 날개 비닐 플러시 행잉 카드"
        },
        description: {
          en: "Premium vinyl plush pendant blind box collectibles featuring unique character designs.",
          es: "Coleccionables de caja sorpresa de colgante de peluche de vinilo premium con diseños de personajes únicos.",
          fr: "Figurines de boîte surprise pendentif peluche vinyle premium avec des designs de personnages uniques.",
          de: "Premium Vinyl Plüsch Anhänger Blind Box Sammlerstücke mit einzigartigen Charakterdesigns.",
          ja: "ユニークなキャラクターデザインを特徴とするプレミアムビニールぬいぐるみペンダントブラインドボックスコレクタブル。",
          ko: "독특한 캐릭터 디자인을 특징으로 하는 프리미엄 비닐 플러시 펜던트 블라인드 박스 수집품."
        }
      },
    };

    // 优先使用 productTranslations 中的翻译，因为它们是手动翻译的，更准确
    const productTitle = productTranslations[originalProduct.title]?.title?.[locale]
      || localizedProduct?.title
      || originalProduct.title;
    const productDescription = productTranslations[originalProduct.title]?.description?.[locale]
      || localizedProduct?.description 
      || originalProduct.description;
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
