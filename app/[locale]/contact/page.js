import { contact } from "@/data/contact";
import ContactClient from './contact-client';
import { getSeoMeta } from "@/lib/metadata-translations";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/contact/' : `/${locale}/contact/`}`;
  const { title, description } = getSeoMeta('contact', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
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
