import { contact } from "@/data/contact";
import { basic } from "@/data/basic";
import ContactClient from './contact-client';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `Contact Us | ${basic.info.brand}`;
const PAGE_DESCRIPTION = contact.header.description;
const alternates = buildAlternates({
  siteUrl: ROOT_URL,
  logicalPath: "/contact/",
  locale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
const CANONICAL_URL = alternates.canonical;

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
    languages: alternates.languages,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    type: "website",
  },
};

export default function Contact({ data = contact }) {
  return <ContactClient data={data} />;
}
