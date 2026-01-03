import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/features/navbar";
import CTA from "@/components/features/cta";
import Footer from "@/components/features/footer";
import ScrollToTop from "@/components/features/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";
import { SiteConfigProvider } from "@/lib/site-config-context";
import { getSiteConfig } from "@/lib/get-site-config";

// 强制动态渲染，确保每次请求都获取最新配置
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

// 动态生成 metadata
export async function generateMetadata() {
  const config = await getSiteConfig();
  
  const keywords = config.seoKeywords 
    ? config.seoKeywords.split(',').map(k => k.trim())
    : ["labubu", "wholesale", "designer toys", "collectibles"];

  return {
    metadataBase: new URL('https://www.labubuwholesale.com'),
    title: {
      default: config.seoTitle,
      template: `%s | ${config.siteName}`,
    },
    description: config.seoDescription,
    keywords: keywords,
    authors: [{ name: config.siteName }],
    creator: config.siteName,
    publisher: config.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://www.labubuwholesale.com',
      languages: {
        'en': 'https://www.labubuwholesale.com',
        'es': 'https://www.labubuwholesale.com/es',
        'fr': 'https://www.labubuwholesale.com/fr',
        'de': 'https://www.labubuwholesale.com/de',
        'ja': 'https://www.labubuwholesale.com/ja',
        'ko': 'https://www.labubuwholesale.com/ko',
        'x-default': 'https://www.labubuwholesale.com',
      },
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: "https://www.labubuwholesale.com",
      siteName: config.siteName,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${config.siteName} - Premium Designer Collectibles`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.seoDescription,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function RootLayout({ children }) {
  const config = await getSiteConfig();
  
  // Organization Structured Data (JSON-LD)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.siteName,
    "url": "https://www.labubuwholesale.com",
    "logo": "https://www.labubuwholesale.com/logo1.webp",
    "description": config.seoDescription,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@labubuwholesale.com",
      "url": "https://www.labubuwholesale.com/contact"
    },
    "sameAs": ["https://www.labubuwholesale.com"],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  // Website Structured Data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.siteName,
    "url": "https://www.labubuwholesale.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.labubuwholesale.com/products?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo1.webp" as="image" />
        <link rel="preload" href="/home/Cover-image.webp" as="image" />
        
        {/* DNS prefetch & preconnect for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <SiteConfigProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <CTA />
            <Footer />
            <ScrollToTop />
            <Toaster richColors position="top-right" />
          </LanguageProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
