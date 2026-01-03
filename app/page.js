import Hero from "@/components/features/hero";
import ThreeColumn from "@/components/features/three-column";
import TwoColumn from "@/components/features/two-column";
import FourColumn from "@/components/features/four-column";
import Testimonials from "@/components/features/testimonials";
import FAQ from "@/components/features/faq";
import CTA from "@/components/features/cta";
import { home } from "@/data/home";
import { getSiteConfig } from "@/lib/get-site-config";

// 强制动态渲染
export const dynamic = 'force-dynamic';

// 动态生成首页 metadata
export async function generateMetadata() {
  const config = await getSiteConfig();
  
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: {
      canonical: "https://www.labubuwholesale.com",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: "https://www.labubuwholesale.com",
      type: "website",
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