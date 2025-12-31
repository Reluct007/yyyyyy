import { NextResponse } from 'next/server';
import { products } from "@/data/products";
import { product } from "@/data/product";
import { getSupportedLocales } from "@/lib/i18n";
import slugify from "slugify";

const ROOT_URL = "https://www.labubuwholesale.com";

// 获取有效产品列表
const getValidProducts = () => product.filter((p) => {
  const img = p.image;
  const isInvalidImage = img && (
    img.match(/\.(SS40|_SX38|\.SX38)/) ||
    img.match(/_BR-120_PKdp-play-icon-overlay__/) ||
    img.match(/\/product\/\d+$/) ||
    !img.startsWith('/product/')
  );
  const hasValidTitle = p.title && 
                       p.title.length > 3 && 
                       !(/^\d+$/.test(p.title));
  const slug = slugify(p.title || '', { lower: true, strict: true });
  return !isInvalidImage && hasValidTitle && slug && slug.length > 2;
});

// 生成 hreflang 标签
const generateHreflangTags = (path, locales) => {
  return locales.map(locale => {
    const url = locale === 'en' ? `${ROOT_URL}${path}` : `${ROOT_URL}/${locale}${path}`;
    return `      <xhtml:link rel="alternate" hreflang="${locale}" href="${url}" />`;
  }).join('\n') + `\n      <xhtml:link rel="alternate" hreflang="x-default" href="${ROOT_URL}${path}" />`;
};

export async function GET() {
  const supportedLocales = getSupportedLocales();
  const validProducts = getValidProducts();
  const currentDate = new Date().toISOString();
  
  const urls = [];
  
  // 首页 - 所有语言版本
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    urls.push({
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: locale === 'en' ? "1.0" : "0.9",
      hreflang: generateHreflangTags('', supportedLocales),
    });
  });
  
  // 产品列表页
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    urls.push({
      loc: `${baseUrl}/products`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
      hreflang: generateHreflangTags('/products', supportedLocales),
    });
  });
  
  // 产品分类页面
  products.products.forEach((p) => {
    const slug = slugify(p.title, { lower: true, strict: true });
    supportedLocales.forEach(locale => {
      const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
      urls.push({
        loc: `${baseUrl}/products/${slug}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.7",
        hreflang: generateHreflangTags(`/products/${slug}`, supportedLocales),
      });
    });
  });
  
  // 产品详情页面
  validProducts.forEach((p) => {
    const slug = slugify(p.title, { lower: true, strict: true });
    supportedLocales.forEach(locale => {
      const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
      urls.push({
        loc: `${baseUrl}/product/${slug}`,
        lastmod: currentDate,
        changefreq: "monthly",
        priority: "0.6",
        hreflang: generateHreflangTags(`/product/${slug}`, supportedLocales),
      });
    });
  });
  
  // 关于页面
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    urls.push({
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.5",
      hreflang: generateHreflangTags('/about', supportedLocales),
    });
  });
  
  // 联系页面
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    urls.push({
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.5",
      hreflang: generateHreflangTags('/contact', supportedLocales),
    });
  });
  
  // 隐私政策
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    urls.push({
      loc: `${baseUrl}/privacy-policy`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.3",
      hreflang: generateHreflangTags('/privacy-policy', supportedLocales),
    });
  });
  
  // 服务条款
  supportedLocales.forEach(locale => {
    const baseUrl = locale === 'en' ? ROOT_URL : `${ROOT_URL}/${locale}`;
    urls.push({
      loc: `${baseUrl}/terms-conditions`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.3",
      hreflang: generateHreflangTags('/terms-conditions', supportedLocales),
    });
  });

  // 生成 XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
${item.hreflang}
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
