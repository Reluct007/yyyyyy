import { contact } from "@/data/contact";
import ContactClient from './contact-client';
import { getSeoMeta } from "@/lib/metadata-translations";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const alternates = buildAlternates({
    siteUrl: ROOT_URL,
    logicalPath: "/contact/",
    locale,
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const canonicalUrl = alternates.canonical;
  const { title, description } = getSeoMeta('contact', locale);
  
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
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default function Contact({ data = contact }) {
  return <ContactClient data={data} />;
}
