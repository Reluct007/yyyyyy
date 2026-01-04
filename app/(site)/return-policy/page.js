import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

const SITE_URL = withTrailingSlash(basic.seo.url);
const { title, description } = getSeoMeta("return", "en");

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}return-policy/`,
    languages: {
      en: `${SITE_URL}return-policy/`,
      es: `${SITE_URL}es/return-policy/`,
      fr: `${SITE_URL}fr/return-policy/`,
      de: `${SITE_URL}de/return-policy/`,
      ja: `${SITE_URL}ja/return-policy/`,
      ko: `${SITE_URL}ko/return-policy/`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}return-policy/`,
    type: "website",
  },
};

export default function ReturnPolicyPage() {
  const content = getContent("return", "en");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.title || "Return Policy"}</h1>
      <div
        className="prose max-w-4xl"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  );
}
