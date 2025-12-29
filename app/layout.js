import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import CTA from "@/components/common/cta";
import Footer from "@/components/common/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({ subsets: ["latin"] });
export const runtime = "edge";

export const metadata = {
  metadataBase: new URL('https://www.labubuwholesale.com'),
  title: {
    default: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
    template: "%s - Labubu Wholesale",
  },
  description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
  alternates: {
    languages: {
      'en': 'https://www.labubuwholesale.com',
      'es': 'https://www.labubuwholesale.com/es',
      'fr': 'https://www.labubuwholesale.com/fr',
      'de': 'https://www.labubuwholesale.com/de',
      'ja': 'https://www.labubuwholesale.com/ja',
      'ko': 'https://www.labubuwholesale.com/ko',
    },
  },
  openGraph: {
    title: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
    description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
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
    title: {
      default: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
      template: "%s - Labubu Wholesale",
    },
    description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Labubu Wholesale - Premium Designer Collectibles",
      },
    ],
  },
};

// Organization Structured Data
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <link rel="preload" href="/logo1.png" as="image" />
        <link rel="preload" href="/home/Cover-image.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <CTA />
          <Footer />
          <ScrollToTop />
          <Toaster richColors position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
};
