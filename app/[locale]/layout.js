import { Inter } from "next/font/google";
import "../globals.css";
import RootChrome from "@/components/layout/root-chrome";
import { basic } from "@/data/basic";
import { getNonDefaultLocales } from "@/lib/i18n";
import { getSeoMeta } from "@/lib/metadata-translations";
import { withTrailingSlash } from "@/lib/seo-url";
import { notFound } from "next/navigation";

const SITE_URL = withTrailingSlash(basic.seo.url);

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export async function generateStaticParams() {
  return getNonDefaultLocales().map((locale) => ({
    locale: locale,
  }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const { title, description } = getSeoMeta('home', locale);
  
  const localeMap = {
    'en': 'en_US',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
  };

  const canonicalUrl = `${SITE_URL}${locale}/`;
  
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: basic.info.brand,
      locale: localeMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${basic.info.brand} - Premium Designer Collectibles`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  const supportedLocales = getNonDefaultLocales();
  
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Organization Structured Data (JSON-LD)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": basic.info.brand,
    "url": SITE_URL,
    "logo": `${basic.seo.url}/logo1.webp`,
    "description": basic.seo.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": basic.info.email,
      "url": `${SITE_URL}contact/`
    },
    "sameAs": [SITE_URL],
  };

  // Website Structured Data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": basic.info.brand,
    "url": SITE_URL,
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="preload" href="/logo1.webp" as="image" />
        <link rel="preload" href="/home/Cover-image.webp" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <RootChrome>{children}</RootChrome>
      </body>
    </html>
  );
}
