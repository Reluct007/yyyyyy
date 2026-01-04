import AboutClient from './about-client';
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `About Us | ${basic.info.brand}`;
const PAGE_DESCRIPTION = `Learn about ${basic.info.brand}. Our story, mission, and commitment to quality.`;
const alternates = buildAlternates({
  siteUrl: ROOT_URL,
  logicalPath: "/about/",
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

export default function AboutWrapper() {
  return <AboutClient />;
}
