import "../globals.css";
import RootChrome from "@/components/layout/root-chrome";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const SITE_URL = withTrailingSlash(basic.seo.url);

// 静态 metadata - 从 basic.js 配置文件读取
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: basic.seo.title,
    template: `%s | ${basic.info.brand}`,
  },
  description: basic.seo.description,
  keywords: basic.seo.keywords,
  authors: [{ name: basic.info.brand }],
  creator: basic.info.brand,
  publisher: basic.info.brand,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    ...openGraphImage,
    title: basic.seo.title,
    description: basic.seo.description,
    url: SITE_URL,
    siteName: basic.info.brand,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    ...twitterMetadata,
    title: basic.seo.title,
    description: basic.seo.description,
  },
};

export default function RootLayout({ children }) {
  // Organization Structured Data (JSON-LD)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: basic.info.brand,
    url: SITE_URL,
    logo: `${basic.seo.url}/logo1.webp`,
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
    <html lang="en">
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <RootChrome locale="en">{children}</RootChrome>
      </body>
    </html>
  );
}
