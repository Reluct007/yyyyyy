import { contact } from "@/data/contact";
import ContactClient from './contact-client';

export const metadata = {
  title: "Contact Us - Labubu Wholesale",
  description: "Get in touch with Labubu Wholesale. Contact us for inquiries about our premium designer collectibles, wholesale orders, and custom products.",
  alternates: {
    canonical: "https://www.labubuwholesale.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us - Labubu Wholesale",
    description: "Get in touch with Labubu Wholesale. Contact us for inquiries about our premium designer collectibles, wholesale orders, and custom products.",
    url: "https://www.labubuwholesale.com/contact",
    type: "website",
  },
};

export default function Contact({ data = contact }) {
  return <ContactClient data={data} />;
}
