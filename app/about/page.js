import { about } from "@/data/about";
import AboutClient from './about-client';

export const metadata = {
  title: "About Us - Labubu Wholesale",
  description: "Learn about Labubu Wholesale - Premium designer collectibles manufacturer. Our story, mission, and commitment to quality craftsmanship.",
  alternates: {
    canonical: "https://www.labubuwholesale.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us - Labubu Wholesale",
    description: "Learn about Labubu Wholesale - Premium designer collectibles manufacturer. Our story, mission, and commitment to quality craftsmanship.",
    url: "https://www.labubuwholesale.com/about",
    type: "website",
  },
};

export default function About({ data = about }) {
  return <AboutClient data={data} />;
}
