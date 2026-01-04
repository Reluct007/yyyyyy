import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

const SITE_URL = withTrailingSlash(basic.seo.url);
const { title, description } = getSeoMeta("shipping", "en");

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}shipping-policy/`,
    languages: {
      en: `${SITE_URL}shipping-policy/`,
      es: `${SITE_URL}es/shipping-policy/`,
      fr: `${SITE_URL}fr/shipping-policy/`,
      de: `${SITE_URL}de/shipping-policy/`,
      ja: `${SITE_URL}ja/shipping-policy/`,
      ko: `${SITE_URL}ko/shipping-policy/`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}shipping-policy/`,
    type: "website",
  },
};

export default function ShippingPolicyPage() {
  const content = getContent("shipping", "en");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || "Shipping Policy"}</h1>
      <div
        className="prose max-w-4xl"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
}
