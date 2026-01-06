import slugify from "slugify";

import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { products } from "@/data/products";
import { product } from "@/data/product";
import { toLocalizedUrl } from "@/lib/hreflang";

export const dynamic = "force-static";

const STATIC_PAGES = [
  "about",
  "contact",
  "privacy-policy",
  "terms-of-service",
  "faq",
  "shipping-policy",
  "return-policy",
];

const toSlug = (text) => slugify(text ?? "", { lower: true, strict: true });

export default function sitemap() {
  const siteUrl = (basic?.seo?.url || basic?.info?.link || "").trim().replace(/\/+$/, "");
  if (!siteUrl) {
    throw new Error(
      "Missing site root URL: set `basic.seo.url` (or `basic.info.link`) in data/basic.js",
    );
  }

  const lastModified = new Date();
  const urls = [];

  // Homepage - all languages
  SUPPORTED_LOCALES.forEach((locale) => {
    urls.push({
      url: toLocalizedUrl({
        siteUrl,
        logicalPath: "/",
        locale,
        defaultLocale: DEFAULT_LOCALE,
      }),
      lastModified,
      changeFrequency: "weekly",
      priority: locale === DEFAULT_LOCALE ? 1.0 : 0.9,
    });
  });

  // Products page
  SUPPORTED_LOCALES.forEach((locale) => {
    urls.push({
      url: toLocalizedUrl({
        siteUrl,
        logicalPath: "/collection/",
        locale,
        defaultLocale: DEFAULT_LOCALE,
      }),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Product categories (use original titles to match static route params)
  const productCategories = products?.products || [];
  productCategories.forEach((category) => {
    const slug = toSlug(category?.title);
    if (!slug) return;

    SUPPORTED_LOCALES.forEach((locale) => {
      urls.push({
        url: toLocalizedUrl({
          siteUrl,
          logicalPath: `/collection/${slug}/`,
          locale,
          defaultLocale: DEFAULT_LOCALE,
        }),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  // Product details (use original titles to match static route params)
  const productItems = Array.isArray(product) ? product : [];
  productItems.forEach((item) => {
    const title = item?.title;
    if (!title || title.length < 3) return;

    const slug = toSlug(title);
    if (!slug || slug.length < 3) return;

    SUPPORTED_LOCALES.forEach((locale) => {
      urls.push({
        url: toLocalizedUrl({
          siteUrl,
          logicalPath: `/product/${slug}/`,
          locale,
          defaultLocale: DEFAULT_LOCALE,
        }),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  // Static pages
  STATIC_PAGES.forEach((page) => {
    SUPPORTED_LOCALES.forEach((locale) => {
      urls.push({
        url: toLocalizedUrl({
          siteUrl,
          logicalPath: `/${page}/`,
          locale,
          defaultLocale: DEFAULT_LOCALE,
        }),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });
  });

  return urls;
}
