import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `https://www.labubuwholesale.com${locale === 'en' ? '/terms-of-service/' : `/${locale}/terms-of-service/`}`;
  const { title, description } = getSeoMeta('terms', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com/terms-of-service/',
        'es': 'https://www.labubuwholesale.com/es/terms-of-service/',
        'fr': 'https://www.labubuwholesale.com/fr/terms-of-service/',
        'de': 'https://www.labubuwholesale.com/de/terms-of-service/',
        'ja': 'https://www.labubuwholesale.com/ja/terms-of-service/',
        'ko': 'https://www.labubuwholesale.com/ko/terms-of-service/'
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

export default function TermsOfServicePage({ params }) {
  const { locale } = params;
  const content = getContent('terms', locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || 'Terms of Service'}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
