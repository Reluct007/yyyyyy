import { redirect } from "next/navigation";
import { product } from "@/data/product";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";
import { generateProductMetadata } from '@/lib/product-metadata';
import ProductClient from './product-client';

// Enable dynamic rendering to avoid build-time memory issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Get Product Info from original data (for fallback)
const findProduct = (slug) => {
  try {
    return product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);
  } catch (error) {
    console.error('Error finding product:', error);
    return null;
  }
};

// Generate static params for popular products only (limit to reduce build time)
export async function generateStaticParams() {
  try {
    const supportedLocales = getSupportedLocales();
    const params = [];
    let count = 0;
    const MAX_STATIC_PAGES = 100; // Limit static generation to top 100 products
    
    for (const locale of supportedLocales) {
      for (const item of product) {
        if (count >= MAX_STATIC_PAGES) break;
        
        // Skip products with invalid image paths
        const img = item.image;
        const isInvalidImage = img && (
          img.match(/\.(SS40|_SX38|\.SX38)/) ||  // Amazon-style filenames
          img.match(/_BR-120_PKdp-play-icon-overlay__/) ||
          img.match(/\/product\/\d+$/) ||
          !img.startsWith('/product/')
        );
        
        const hasValidTitle = item.title && 
                             item.title.length > 3 && 
                             !(/^\d+$/.test(item.title));
        
        if (!isInvalidImage && hasValidTitle) {
          const slug = slugify(item.title, { lower: true, strict: true });
          if (slug && slug.length > 2 && !(/^\d+$/.test(slug))) {
            params.push({
              locale: locale,
              slug: slug,
            });
            count++;
          }
        }
      }
      if (count >= MAX_STATIC_PAGES) break;
    }
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { locale, slug } = params || {};
    
    if (!slug) {
      return {
        title: "Product Not Found - Labubu Wholesale",
        description: "The requested product could not be found",
        robots: {
          index: false,
          follow: false,
        },
      };
    }
    
    // Check if product exists
    const originalProduct = findProduct(slug);
    if (!originalProduct) {
      return {
        title: "Product Not Found - Labubu Wholesale",
        description: "The requested product could not be found",
        robots: {
          index: false,
          follow: false,
        },
      };
    }
    
    return generateProductMetadata(slug, locale || 'en');
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Product - Labubu Wholesale",
      description: "Premium designer collectible from Labubu Wholesale",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default function Product({ params }) {
  const { locale = 'en', slug } = params || {};
  
  if (!slug) {
    const target = locale === 'en' ? '/products' : `/${locale}/products`;
    return redirect(target);
  }
  
  // Get Product Info from original data
  const originalProduct = findProduct(slug);
  if (!originalProduct) {
    const target = locale === 'en' ? '/products' : `/${locale}/products`;
    return redirect(target);
  }

  return <ProductClient slug={slug} locale={locale} />;
}
