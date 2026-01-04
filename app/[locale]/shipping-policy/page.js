import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `https://www.labubuwholesale.com${locale === 'en' ? '/shipping-policy/' : `/${locale}/shipping-policy/`}`;
  const { title, description } = getSeoMeta('shipping', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com/shipping-policy/',
        'es': 'https://www.labubuwholesale.com/es/shipping-policy/',
        'fr': 'https://www.labubuwholesale.com/fr/shipping-policy/',
        'de': 'https://www.labubuwholesale.com/de/shipping-policy/',
        'ja': 'https://www.labubuwholesale.com/ja/shipping-policy/',
        'ko': 'https://www.labubuwholesale.com/ko/shipping-policy/'
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default function ShippingPolicyPage({ params }) {
  const { locale } = params;
  const content = getContent('shipping', locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || 'Shipping Policy'}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
