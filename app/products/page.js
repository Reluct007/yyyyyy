import Header from "@/components/themes/labubu/header";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

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

// JSON-LD 结构化数据
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.labubuwholesale.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Products Collection",
    "item": "https://www.labubuwholesale.com/products"
  }]
};

// 服务端组件 - 纯静态生成
export default function ProductsPage() {
  return (
    <>
      {/* JSON-LD 结构化数据 - 服务端输出 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header */}
      <Header data={products.header} />
      
      {/* Products Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.products.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <Link
                  href={`/products/${slugify(item.title, { lower: true, strict: true })}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-t-lg"
                    width={800}
                    height={500}
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <Link
                    href={`/products/${slugify(item.title, { lower: true, strict: true })}`}
                  >
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">
                    {item.description.length > 240
                      ? `${item.description.substring(0, 240)}...`
                      : item.description}
                  </p>
                  <Link
                    href={`/products/${slugify(item.title, { lower: true, strict: true })}`}
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
