import { NextResponse } from 'next/server';
import { products } from "@/data/products";
import { product } from "@/data/product";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";

const ROOT_URL = "https://www.labubuwholesale.com";

export async function GET(request, { params }) {
  const { locale } = params;
  
  // 构建基础URL
  const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
  
  // 基础页面
  const baseUrls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 产品分类页面
  const productsArray = products.products.map((p) => ({
    url: `${baseUrl}/products/${slugify(p.title, { lower: true, strict: true })}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 产品详情页面
  const productArray = product.map((p) => ({
    url: `${baseUrl}/product/${slugify(p.title, { lower: true, strict: true })}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const allUrls = [...baseUrls, ...productsArray, ...productArray];
  
  // 过滤掉无效的URL
  const validUrls = allUrls.filter(item => item && item.url);
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validUrls.map(item => `  <url>
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
