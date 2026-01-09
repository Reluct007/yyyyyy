import ClientProviders from "@/components/layout/client-providers";
import { basic } from "@/data/basic";
import { getSupportedLocales } from "@/lib/i18n";
import { getSeoMeta } from "@/lib/metadata-translations";
import { withTrailingSlash } from "@/lib/seo-url";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";
import { notFound } from "next/navigation";

const SITE_URL = withTrailingSlash(basic.seo.url);

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const { title, description } = getSeoMeta("home", locale);

  const localeMap = {
    en: "en_US",
    es: "es_ES",
    fr: "fr_FR",
    de: "de_DE",
    ja: "ja_JP",
    ko: "ko_KR",
  };

  const canonicalUrl = `${SITE_URL}${locale}/`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      ...openGraphImage,
      title,
      description,
      url: canonicalUrl,
      siteName: basic.info.brand,
      locale: localeMap[locale] || "en_US",
      type: "website",
    },
    twitter: {
      ...twitterMetadata,
      title,
      description,
    },
  };
}

// Child layout should NOT have html/body - only wraps content
export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  const supportedLocales = getSupportedLocales();

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Organization Structured Data (JSON-LD)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: basic.info.brand,
    url: SITE_URL,
    logo: `${SITE_URL}logo1.webp`,
    description: basic.seo.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: basic.info.email,
      url: `${SITE_URL}contact/`,
    },
    sameAs: [SITE_URL],
  };

  // Website Structured Data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: basic.info.brand,
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ClientProviders locale={locale}>{children}</ClientProviders>
    </>
  );
}
