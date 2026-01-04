import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

const SITE_URL = withTrailingSlash(basic.seo.url);
const { title, description } = getSeoMeta("terms", "en");

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}terms-of-service/`,
    languages: {
      en: `${SITE_URL}terms-of-service/`,
      es: `${SITE_URL}es/terms-of-service/`,
      fr: `${SITE_URL}fr/terms-of-service/`,
      de: `${SITE_URL}de/terms-of-service/`,
      ja: `${SITE_URL}ja/terms-of-service/`,
      ko: `${SITE_URL}ko/terms-of-service/`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}terms-of-service/`,
    type: "website",
  },
};

export default function TermsOfServicePage() {
  const content = getContent("terms", "en");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || "Terms of Service"}</h1>
      <div
        className="prose max-w-4xl"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
}
