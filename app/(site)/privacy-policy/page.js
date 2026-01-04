import PrivacyClient from './privacy-client';
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `Privacy Policy | ${basic.info.brand}`;
const PAGE_DESCRIPTION = `Privacy policy for ${basic.info.brand}. Learn how we collect, use, and protect your personal information.`;
const alternates = buildAlternates({
  siteUrl: ROOT_URL,
  logicalPath: "/privacy-policy/",
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

export default function PrivacyPolicy() {
  return <PrivacyClient />;
}
