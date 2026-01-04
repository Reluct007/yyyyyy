import Hero from "@/components/features/hero";
import ThreeColumn from "@/components/features/three-column";
import TwoColumn from "@/components/features/two-column";
import FourColumn from "@/components/features/four-column";
import Testimonials from "@/components/features/testimonials";
import FAQ from "@/components/features/faq";
import { home } from "@/data/home";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";

const alternates = buildAlternates({
  siteUrl: basic.seo.url,
  logicalPath: "/",
  locale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const metadata = {
  title: basic.seo.title,
  description: basic.seo.description,
  alternates: {
    canonical: alternates.canonical,
    languages: alternates.languages,
  },
  openGraph: {
    title: basic.seo.title,
    description: basic.seo.description,
    url: alternates.canonical,
    type: "website",
  },
};

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
