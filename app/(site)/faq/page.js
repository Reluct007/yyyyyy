import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

const SITE_URL = withTrailingSlash(basic.seo.url);
const { title, description } = getSeoMeta("faq", "en");

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}faq/`,
    languages: {
      en: `${SITE_URL}faq/`,
      es: `${SITE_URL}es/faq/`,
      fr: `${SITE_URL}fr/faq/`,
      de: `${SITE_URL}de/faq/`,
      ja: `${SITE_URL}ja/faq/`,
      ko: `${SITE_URL}ko/faq/`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}faq/`,
    type: "website",
  },
};

export default function FAQPage() {
  const content = getContent("faq", "en");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {content.title || "Frequently Asked Questions"}
      </h1>
      <div
        className="prose max-w-4xl"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
}
