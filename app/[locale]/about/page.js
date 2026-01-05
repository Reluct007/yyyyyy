import { about } from "@/data/about";
import AboutClient from './about-client';
import { getSeoMeta } from "@/lib/metadata-translations";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const alternates = buildAlternates({
    siteUrl: ROOT_URL,
    logicalPath: "/about/",
    locale,
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const canonicalUrl = alternates.canonical;
  const { title, description } = getSeoMeta('about', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
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
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      ...twitterMetadata,
      title,
      description,
    },
  };
}

export default function About({ data = about }) {
  return <AboutClient data={data} />;
}
