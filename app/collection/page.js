import Header from "@/components/features/header";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { basic } from "@/data/basic";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

const ROOT_URL = basic.seo.url;

export const metadata = {
  title: "Products Collection - Labubu Wholesale",
  description: "Browse our complete collection of premium Labubu collectibles. High-quality vinyl figures, plush toys, and designer collectibles for distributors and retailers.",
  alternates: {
    canonical: `${ROOT_URL}/collection/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Products Collection - Labubu Wholesale",
    description: "Browse our complete collection of premium Labubu collectibles.",
    url: `${ROOT_URL}/collection/`,
    type: "website",
  },
};

// JSON-LD 结构化数据
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": `${ROOT_URL}/`
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Products Collection",
    "item": `${ROOT_URL}/collection/`
  }]
};

export default function CollectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header data={products.header} />
      
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.products.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <Link href={`/collection/${slugify(item.title, { lower: true, strict: true })}/`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-t-lg"
                    width={800}
                    height={500}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <Link href={`/collection/${slugify(item.title, { lower: true, strict: true })}/`}>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">
                    {item.description.length > 240 ? `${item.description.substring(0, 240)}...` : item.description}
                  </p>
                  <Link
                    href={`/collection/${slugify(item.title, { lower: true, strict: true })}/`}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    Read More <ChevronRight className="w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
