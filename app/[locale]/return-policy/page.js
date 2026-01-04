import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `https://www.labubuwholesale.com${locale === 'en' ? '/return-policy/' : `/${locale}/return-policy/`}`;
  const { title, description } = getSeoMeta('return', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com/return-policy/',
        'es': 'https://www.labubuwholesale.com/es/return-policy/',
        'fr': 'https://www.labubuwholesale.com/fr/return-policy/',
        'de': 'https://www.labubuwholesale.com/de/return-policy/',
        'ja': 'https://www.labubuwholesale.com/ja/return-policy/',
        'ko': 'https://www.labubuwholesale.com/ko/return-policy/'
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

export default function ReturnPolicyPage({ params }) {
  const { locale } = params;
  const content = getContent('return', locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || 'Return Policy'}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
