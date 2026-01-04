import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/privacy-policy/' : `/${locale}/privacy-policy/`}`;
  const { title, description } = getSeoMeta('privacy', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${ROOT_URL}/privacy-policy/`,
        'es': `${ROOT_URL}/es/privacy-policy/`,
        'fr': `${ROOT_URL}/fr/privacy-policy/`,
        'de': `${ROOT_URL}/de/privacy-policy/`,
        'ja': `${ROOT_URL}/ja/privacy-policy/`,
        'ko': `${ROOT_URL}/ko/privacy-policy/`
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
