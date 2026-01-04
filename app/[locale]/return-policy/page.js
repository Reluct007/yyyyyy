import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/return-policy/' : `/${locale}/return-policy/`}`;
  const { title, description } = getSeoMeta('return', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${ROOT_URL}/return-policy/`,
        'es': `${ROOT_URL}/es/return-policy/`,
        'fr': `${ROOT_URL}/fr/return-policy/`,
        'de': `${ROOT_URL}/de/return-policy/`,
        'ja': `${ROOT_URL}/ja/return-policy/`,
        'ko': `${ROOT_URL}/ko/return-policy/`
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
