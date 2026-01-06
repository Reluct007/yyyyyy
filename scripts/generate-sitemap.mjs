import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../data/i18n.js";
import { toLocalizedUrl } from "../lib/hreflang.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = SUPPORTED_LOCALES;

// Import data
const { basic } = await import("../data/basic.js");
const { products } = await import("../data/products.js");
const { product } = await import("../data/product.js");

const rootUrlFromConfig = basic?.seo?.url || basic?.info?.link;
if (!rootUrlFromConfig) {
  throw new Error(
    "Missing site root URL: set `basic.seo.url` (or `basic.info.link`) in data/basic.js",
  );
}

const ROOT_URL = rootUrlFromConfig.replace(/\/$/, "");
const toSlug = (text) => slugify(text ?? "", { lower: true, strict: true });

function generateSitemap() {
  const urls = [];
  const currentDate = new Date().toISOString().split("T")[0];

  // Homepage - all languages
  locales.forEach((locale) => {
    urls.push(`  <url>
    <loc>${toLocalizedUrl({ siteUrl: ROOT_URL, logicalPath: "/", locale, defaultLocale: DEFAULT_LOCALE })}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${locale === "en" ? "1.0" : "0.9"}</priority>
  </url>`);
  });

  // Products page
  locales.forEach((locale) => {
    urls.push(`  <url>
    <loc>${toLocalizedUrl({ siteUrl: ROOT_URL, logicalPath: "/collection/", locale, defaultLocale: DEFAULT_LOCALE })}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // Product categories
  const productCategories = products?.products || [];
  productCategories.forEach((p) => {
    const slug = toSlug(p.title);
    locales.forEach((locale) => {
      urls.push(`  <url>
    <loc>${toLocalizedUrl({ siteUrl: ROOT_URL, logicalPath: `/collection/${slug}/`, locale, defaultLocale: DEFAULT_LOCALE })}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
    });
  });

  // Product details
  const productItems = product || [];
  productItems.forEach((p) => {
    if (!p.title || p.title.length < 3) return;
    const slug = p.id || toSlug(p.title);
    if (!slug || slug.length < 3) return;

    locales.forEach((locale) => {
      urls.push(`  <url>
    <loc>${toLocalizedUrl({ siteUrl: ROOT_URL, logicalPath: `/product/${slug}/`, locale, defaultLocale: DEFAULT_LOCALE })}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    });
  });

  // Static pages
  const staticPages = [
    "about",
    "contact",
    "privacy-policy",
    "terms-of-service",
    "faq",
    "shipping-policy",
    "return-policy",
  ];
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      urls.push(`  <url>
    <loc>${toLocalizedUrl({ siteUrl: ROOT_URL, logicalPath: `/${page}/`, locale, defaultLocale: DEFAULT_LOCALE })}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  // Write to public folder
  const outputPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, sitemap);
  console.log("Sitemap generated:", outputPath);
}

generateSitemap();
