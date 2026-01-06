import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const alternates = buildAlternates({
  siteUrl: basic.seo.url,
  logicalPath: "/terms-of-service/",
  locale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
const { title, description } = getSeoMeta("terms", "en");

export const metadata = {
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
    ...openGraphImage,
    title,
    description,
    url: alternates.canonical,
    type: "website",
  },
  twitter: {
    ...twitterMetadata,
    title,
    description,
  },
};

export default function TermsOfServicePage() {
  const content = getContent("terms", "en");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">{content.title || "Terms of Service"}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
