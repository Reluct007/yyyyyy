import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/faq/' : `/${locale}/faq/`}`;
  const { title, description } = getSeoMeta('faq', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${ROOT_URL}/faq/`,
        'es': `${ROOT_URL}/es/faq/`,
        'fr': `${ROOT_URL}/fr/faq/`,
        'de': `${ROOT_URL}/de/faq/`,
        'ja': `${ROOT_URL}/ja/faq/`,
        'ko': `${ROOT_URL}/ko/faq/`
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

export default function FAQPage({ params }) {
  const { locale } = params;
  const content = getContent('faq', locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || 'Frequently Asked Questions'}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
