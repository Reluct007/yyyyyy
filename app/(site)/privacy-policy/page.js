import PrivacyClient from './privacy-client';

export const metadata = {
  title: "Privacy Policy - Labubu Wholesale",
  description: "Privacy Policy for Labubu Wholesale. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.labubuwholesale.com/privacy-policy/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy - Labubu Wholesale",
    description: "Privacy Policy for Labubu Wholesale. Learn how we collect, use, and protect your personal information.",
    url: "https://www.labubuwholesale.com/privacy-policy/",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return <PrivacyClient />;
}
