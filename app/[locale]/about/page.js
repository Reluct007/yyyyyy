import { about } from "@/data/about";
import AboutClient from './about-client';
import { getSeoMeta } from "@/lib/metadata-translations";
import { basic } from "@/data/basic";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = `${ROOT_URL}${locale === 'en' ? '/about/' : `/${locale}/about/`}`;
  const { title, description } = getSeoMeta('about', locale);
  
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

export default function About({ data = about }) {
  return <AboutClient data={data} />;
}
