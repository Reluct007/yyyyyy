import { NextResponse } from 'next/server';
import { products } from "@/data/products";
import { product } from "@/data/product";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";

const ROOT_URL = "https://www.labubuwholesale.com";

export async function GET() {
  const supportedLocales = getSupportedLocales();
  
  // 基础页面URLs
  const baseUrls = [];
  
  // 为每种语言添加基础页面
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    
    baseUrls.push({
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: locale === 'en' ? 1.0 : 0.9,
    });
    
    baseUrls.push({
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    
    baseUrls.push({
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
    
    baseUrls.push({
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // 产品分类页面
  const productsArray = [];
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    
    products.products.forEach((p) => {
      productsArray.push({
        url: `${baseUrl}/products/${slugify(p.title, { lower: true, strict: true })}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  // 产品详情页面
  const productArray = [];
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    
    product.forEach((p) => {
      // Skip products with invalid image paths
      const img = p.image;
      const isInvalidImage = img && (
        img.match(/\.(SS40|_SX38|\.SX38)/) ||  // Amazon-style filenames
        img.match(/_BR-120_PKdp-play-icon-overlay__/) || // Invalid overlay images
        img.match(/\/product\/\d+$/) ||        // Just numbers like /product/0, /product/85
        !img.startsWith('/product/')            // Invalid path format
      );
      
      // Check if title is valid (not empty, not just numbers)
      const hasValidTitle = p.title && 
                           p.title.length > 3 && 
                           !(/^\d+$/.test(p.title));
      
      // Only include products with valid images and proper titles
      if (!isInvalidImage && hasValidTitle) {
        const slug = slugify(p.title, { lower: true, strict: true });
        // Skip if slug is just numbers or too short
        if (slug && slug.length > 2 && !(/^\d+$/.test(slug))) {
          productArray.push({
            url: `${baseUrl}/product/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...baseUrls, ...productsArray, ...productArray].map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
