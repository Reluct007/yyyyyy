import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";
import DynamicHome from "@/components/renovex/dynamic-home";

const alternates = buildAlternates({
  siteUrl: basic.seo.url,
  logicalPath: "/",
  locale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const metadata = {
  title: basic.seo.title,
  description: basic.seo.description,
  alternates: {
    canonical: alternates.canonical,
    languages: alternates.languages,
  },
  openGraph: {
    ...openGraphImage,
    title: basic.seo.title,
    description: basic.seo.description,
    url: alternates.canonical,
    type: "website",
  },
  twitter: {
    ...twitterMetadata,
    title: basic.seo.title,
    description: basic.seo.description,
  },
};

export default function Home() {
  return <DynamicHome />;
}
