import { contact } from "@/data/contact";
import { basic } from "@/data/basic";
import ContactClient from './contact-client';

const ROOT_URL = basic.seo.url.replace(/\/$/, "");
const PAGE_TITLE = `Contact Us | ${basic.info.brand}`;
const PAGE_DESCRIPTION = contact.header.description;
const CANONICAL_URL = `${ROOT_URL}/contact/`;

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

export default function Contact({ data = contact }) {
  return <ContactClient data={data} />;
}
