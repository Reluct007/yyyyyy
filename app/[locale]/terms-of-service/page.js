import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/terms-of-service/' : `/${locale}/terms-of-service/`}`;
  const { title, description } = getSeoMeta('terms', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${ROOT_URL}/terms-of-service/`,
        'es': `${ROOT_URL}/es/terms-of-service/`,
        'fr': `${ROOT_URL}/fr/terms-of-service/`,
        'de': `${ROOT_URL}/de/terms-of-service/`,
        'ja': `${ROOT_URL}/ja/terms-of-service/`,
        'ko': `${ROOT_URL}/ko/terms-of-service/`
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
