import TermsClient from './terms-client';

export const metadata = {
  title: "Terms & Conditions - Labubu Wholesale",
  description: "Terms and Conditions for Labubu Wholesale. Read our terms of service and business policies.",
  alternates: {
    canonical: "https://www.labubuwholesale.com/terms-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions - Labubu Wholesale",
    description: "Terms and Conditions for Labubu Wholesale. Read our terms of service and business policies.",
    url: "https://www.labubuwholesale.com/terms-conditions",
    type: "website",
  },
};

export default function TermsAndConditions() {
  return <TermsClient />;
}
