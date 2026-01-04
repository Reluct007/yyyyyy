import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const alternates = buildAlternates({
    siteUrl: ROOT_URL,
    logicalPath: "/shipping-policy/",
    locale,
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const { title, description } = getSeoMeta('shipping', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: alternates.canonical,
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
