import Hero from "@/components/features/hero";
import ThreeColumn from "@/components/features/three-column";
import TwoColumn from "@/components/features/two-column";
import FourColumn from "@/components/features/four-column";
import Testimonials from "@/components/features/testimonials";
import FAQ from "@/components/features/faq";
import { home } from "@/data/home";
import { basic } from "@/data/basic";
import { getSeoMeta } from "@/lib/metadata-translations";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const alternates = buildAlternates({
    siteUrl: ROOT_URL,
    logicalPath: "/",
    locale,
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const { title, description } = getSeoMeta('home', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: alternates.canonical,
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
      url: alternates.canonical,
      type: "website",
    },
    twitter: {
      ...twitterMetadata,
      title,
      description,
    },
  };
}

export default function Home({ data = home }) {
  return (
    <>
      <Hero data={data.hero} />
      
      {data.categories && (
        <ThreeColumn data={data.categories} />
      )}
      
      {data.about && (
        <TwoColumn data={data.about} />
      )}
      
      {data.options && (
        <FourColumn data={data.options} />
      )}
      
      {data.process && (
        <ThreeColumn data={data.process} />
      )}
      
      {data.testimonials && (
        <Testimonials data={data.testimonials} />
      )}
      
      {data.faq && (
        <FAQ data={data.faq} />
      )}
    </>
  );
}
