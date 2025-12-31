import Hero from "@/components/themes/labubu/hero";
import ThreeColumn from "@/components/themes/labubu/three-column";
import TwoColumn from "@/components/themes/labubu/two-column";
import FourColumn from "@/components/themes/labubu/four-column";
import Testimonials from "@/components/themes/labubu/testimonials";
import FAQ from "@/components/themes/labubu/faq";
import CTA from "@/components/themes/labubu/cta";
import { home } from "@/data/home";

export const metadata = {
  title: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
  description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
  alternates: {
    canonical: "https://www.labubuwholesale.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
    description: "Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.",
    url: "https://www.labubuwholesale.com",
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