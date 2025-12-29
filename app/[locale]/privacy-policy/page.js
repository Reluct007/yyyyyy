import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `https://www.labubuwholesale.com${locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`}`;
  const { title, description } = getSeoMeta('privacy', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com/privacy-policy',
        'es': 'https://www.labubuwholesale.com/es/privacy-policy',
        'fr': 'https://www.labubuwholesale.com/fr/privacy-policy',
        'de': 'https://www.labubuwholesale.com/de/privacy-policy',
        'ja': 'https://www.labubuwholesale.com/ja/privacy-policy',
        'ko': 'https://www.labubuwholesale.com/ko/privacy-policy'
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

export default function PrivacyPolicyPage({ params }) {
  const { locale } = params;
  const content = getContent('privacy', locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || 'Privacy Policy'}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
