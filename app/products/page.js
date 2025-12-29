import ProductsClient from './products-client';

export const metadata = {
  title: "Products Collection - Labubu Wholesale",
  description: "Browse our complete collection of premium Labubu collectibles. High-quality vinyl figures, plush toys, and designer collectibles for distributors and retailers.",
  alternates: {
    canonical: "https://www.labubuwholesale.com/products",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Products Collection - Labubu Wholesale",
    description: "Browse our complete collection of premium Labubu collectibles. High-quality vinyl figures, plush toys, and designer collectibles for distributors and retailers.",
    url: "https://www.labubuwholesale.com/products",
    type: "website",
  },
};

export default function Products() {
  return <ProductsClient />;
}
