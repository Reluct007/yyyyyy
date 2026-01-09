import ClientProviders from "@/components/layout/client-providers";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const SITE_URL = withTrailingSlash(basic.seo.url);

// 静态 metadata - 从 basic.js 配置文件读取
export const metadata = {
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

// Child layout should NOT have html/body - only wraps content
export default function SiteLayout({ children }) {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ClientProviders locale="en">{children}</ClientProviders>
    </>
  );
}
