import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import CTA from "@/components/common/cta";
import Footer from "@/components/common/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // SEO: font-display: swap
  preload: true,
});

export const runtime = "edge";

export const metadata = {
  metadataBase: new URL('https://www.labubuwholesale.com'),
  title: {
    default: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
    template: "%s | Labubu Wholesale",
  },
  description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
  keywords: ["labubu", "wholesale", "designer toys", "collectibles", "vinyl figures", "plush toys", "blind box"],
  authors: [{ name: "Labubu Wholesale" }],
  creator: "Labubu Wholesale",
  publisher: "Labubu Wholesale",
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
    title: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
    description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
    url: "https://www.labubuwholesale.com",
    siteName: "Labubu Wholesale",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Labubu Wholesale - Premium Designer Collectibles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
    description: "Premium Labubu wholesale collectibles for distributors & retailers.",
    images: ["/opengraph-image.png"],
  },
  verification: {
    // 在这里添加 Google Search Console 验证码
    // google: 'your-google-verification-code',
  },
};

// Organization Structured Data (JSON-LD)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Labubu Wholesale",
  "url": "https://www.labubuwholesale.com",
  "logo": "https://www.labubuwholesale.com/logo1.png",
  "description": "Labubu Wholesale specializes in high-quality designer collectibles that blend art and trend culture. We offer customized Labubu products for distributors and retailers.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@labubuwholesale.com",
    "url": "https://www.labubuwholesale.com/contact"
  },
  "sameAs": [
    "https://www.labubuwholesale.com"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
};

// Website Structured Data
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Labubu Wholesale",
  "url": "https://www.labubuwholesale.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.labubuwholesale.com/products?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }) {
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
        <link rel="preload" href="/logo1.png" as="image" />
        <link rel="preload" href="/home/Cover-image.png" as="image" />
        
        {/* DNS prefetch & preconnect for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <CTA />
          <Footer />
          <ScrollToTop />
          <Toaster richColors position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
