import Hero from "@/components/common/hero";
import ThreeColumn from "@/components/common/three-column";
import TwoColumn from "@/components/common/two-column";
import FourColumn from "@/components/common/four-column";
import Testimonials from "@/components/common/testimonials";
import FAQ from "@/components/common/faq";
import CTA from "@/components/common/cta";
import { home } from "@/data/home";
import { getSeoMeta } from "@/lib/metadata-translations";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const canonicalUrl = locale === 'en' 
    ? 'https://www.labubuwholesale.com' 
    : `https://www.labubuwholesale.com/${locale}`;
  const { title, description } = getSeoMeta('home', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com',
        'es': 'https://www.labubuwholesale.com/es',
        'fr': 'https://www.labubuwholesale.com/fr',
        'de': 'https://www.labubuwholesale.com/de',
        'ja': 'https://www.labubuwholesale.com/ja',
        'ko': 'https://www.labubuwholesale.com/ko',
      },
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

export default function Home({ data = home, params }) {
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