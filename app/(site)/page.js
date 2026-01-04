import Hero from "@/components/features/hero";
import ThreeColumn from "@/components/features/three-column";
import TwoColumn from "@/components/features/two-column";
import FourColumn from "@/components/features/four-column";
import Testimonials from "@/components/features/testimonials";
import FAQ from "@/components/features/faq";
import { home } from "@/data/home";
import { basic } from "@/data/basic";
import { withTrailingSlash } from "@/lib/seo-url";

const SITE_URL = withTrailingSlash(basic.seo.url);

export const metadata = {
  title: basic.seo.title,
  description: basic.seo.description,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      es: `${SITE_URL}es/`,
      fr: `${SITE_URL}fr/`,
      de: `${SITE_URL}de/`,
      ja: `${SITE_URL}ja/`,
      ko: `${SITE_URL}ko/`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: basic.seo.title,
    description: basic.seo.description,
    url: SITE_URL,
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
