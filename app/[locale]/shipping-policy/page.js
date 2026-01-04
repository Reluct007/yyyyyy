import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/shipping-policy/' : `/${locale}/shipping-policy/`}`;
  const { title, description } = getSeoMeta('shipping', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${ROOT_URL}/shipping-policy/`,
        'es': `${ROOT_URL}/es/shipping-policy/`,
        'fr': `${ROOT_URL}/fr/shipping-policy/`,
        'de': `${ROOT_URL}/de/shipping-policy/`,
        'ja': `${ROOT_URL}/ja/shipping-policy/`,
        'ko': `${ROOT_URL}/ko/shipping-policy/`
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
