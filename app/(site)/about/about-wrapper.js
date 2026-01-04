import AboutClient from './about-client';
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `About Us | ${basic.info.brand}`;
const PAGE_DESCRIPTION = `Learn about ${basic.info.brand}. Our story, mission, and commitment to quality.`;
const CANONICAL_URL = `${ROOT_URL}/about/`;

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

export default function AboutWrapper() {
  return <AboutClient />;
}
