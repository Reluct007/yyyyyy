import PrivacyClient from './privacy-client';
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `Privacy Policy | ${basic.info.brand}`;
const PAGE_DESCRIPTION = `Privacy policy for ${basic.info.brand}. Learn how we collect, use, and protect your personal information.`;
const CANONICAL_URL = `${ROOT_URL}/privacy-policy/`;

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
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
