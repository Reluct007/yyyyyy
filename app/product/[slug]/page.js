import { redirect } from "next/navigation";
import { product } from "@/data/product";
import slugify from "slugify";
import { generateProductMetadata } from '@/lib/product-metadata';
import ProductClient from './product-client';

// Get Product Info from original data (for fallback)
const findProduct = (slug) => product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);

// Generate static params for all products
export async function generateStaticParams() {
  return product
    .filter((item) => {
      // Skip products with invalid image paths (Amazon-style filenames only)
      const img = item.image;
      const isInvalidImage = img && (
        img.match(/\.(SS40|_SX38|\.SX38)/) ||  // Amazon-style filenames
        !img.startsWith('/product/')            // Invalid path format
      );
      return !isInvalidImage && item.title && item.title.length > 0;
    })
    .map((item) => ({
      slug: slugify(item.title, { lower: true, strict: true }),
    }));
}

export async function generateMetadata({ params }) {
  try {
    const slug = params?.slug;
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
    
    return generateProductMetadata(slug, 'en');
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
  // Get Product Info from original data
  const slug = params?.slug;
  if (!slug) {
    return redirect('/products');
  }
  
  const originalProduct = findProduct(slug);
  if (!originalProduct) {
    return redirect('/products');
  }

  return <ProductClient slug={slug} />;
}