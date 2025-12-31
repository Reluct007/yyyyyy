import { product } from "@/data/product";
import slugify from "slugify";
import { generateProductMetadata } from '@/lib/product-metadata';
import Image from "next/image";
import Link from 'next/link';
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ContactForm from '@/components/themes/labubu/contact-form';

const ROOT_URL = "https://www.labubuwholesale.com";

// 查找产品
const findProduct = (slug) => product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);

// 获取有效产品列表
const getValidProducts = () => product.filter((item) => {
  const img = item.image;
  const isInvalidImage = img && (
    img.match(/\.(SS40|_SX38|\.SX38)/) ||
    !img.startsWith('/product/')
  );
  return !isInvalidImage && item.title && item.title.length > 0;
});

// 构建时生成所有产品页面的静态参数
export async function generateStaticParams() {
  return getValidProducts().map((item) => ({
    slug: slugify(item.title, { lower: true, strict: true }),
  }));
}

// 生成 metadata（服务端）
export async function generateMetadata({ params }) {
  const slug = params?.slug;
  if (!slug) {
    return {
      title: "Product Not Found - Labubu Wholesale",
      description: "The requested product could not be found",
      robots: { index: false, follow: false },
    };
  }
  
  const originalProduct = findProduct(slug);
  if (!originalProduct) {
    return {
      title: "Product Not Found - Labubu Wholesale",
      description: "The requested product could not be found",
      robots: { index: false, follow: false },
    };
  }
  
  return generateProductMetadata(slug, 'en');
}

// 服务端组件 - 纯静态生成
export default function ProductPage({ params }) {
  const slug = params?.slug;
  const productItem = findProduct(slug);
  
  if (!productItem) {
    return (
      <section className="py-16 px-4 text-center">
        <h1 className="text-2xl font-semibold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested product could not be found.</p>
        <Link href="/products" className="text-primary mt-4 inline-block">
          Browse All Products
        </Link>
      </section>
    );
  }

  const productId = slugify(productItem.title, { lower: true, strict: true });
  
  // 获取相关产品（服务端计算）
  const allProducts = getValidProducts().map(p => ({
    ...p,
    id: slugify(p.title, { lower: true, strict: true })
  }));
  const relatedProducts = allProducts
    .filter(item => item.id !== productId)
    .slice(0, 8);

  // JSON-LD 结构化数据（服务端生成）
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": ROOT_URL
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": `${ROOT_URL}/products`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productItem.title,
      "item": `${ROOT_URL}/product/${productId}`
    }]
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productItem.title,
    "description": productItem.description,
    "image": productItem.image ? `${ROOT_URL}${productItem.image}` : undefined,
    "brand": {
      "@type": "Brand",
      "name": "Labubu Wholesale"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Organization",
        "name": "Labubu Wholesale"
      }
    },
    "url": `${ROOT_URL}/product/${productId}`
  };

  return (
    <>
      {/* JSON-LD 结构化数据 - 服务端输出 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* 产品详情 */}
      <section className="py-8 px-2">
        <div className="container mx-auto space-y-8">
          {/* 标题和描述 */}
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold lg:text-4xl">
              {productItem.title}
            </h1>
            <p className="max-w-4xl text-muted-foreground text-lg">
              {productItem.description}
            </p>
          </div>

          {/* 图片展示 */}
          <div className="grid gap-4 md:grid-cols-2">
            {productItem.image && (
              <Image
                src={productItem.image}
                alt={`${productItem.title} - Premium designer collectible from Labubu Wholesale`}
                className="w-full border border-border rounded-lg h-full object-cover"
                width={800}
                height={600}
                priority
              />
            )}
            {productItem.images && productItem.images.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {productItem.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${productItem.title} - View ${index + 1}`}
                    className="w-full border border-border rounded-lg object-cover"
                    width={400}
                    height={300}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 特性和联系表单 */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                {productItem.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 border border-border rounded-lg p-8 bg-accent"
                  >
                    <ArrowDownRight className="size-6" />
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-base text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ContactForm locale="en" />
            </div>
          </div>

          {/* 相关产品 */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold lg:text-2xl">
              Recommended Products
            </h2>
            <p className="max-w-4xl text-muted-foreground text-base">
              Discover more premium designer collectibles from our collection.
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link
                    href={`/product/${item.id}`}
                    aria-label={`View ${item.title} product details`}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} - Designer collectible product`}
                      className="w-full rounded-t-lg object-cover"
                      width={400}
                      height={300}
                    />
                  </Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link
                      href={`/products/${slugify(item.category, { lower: true, strict: true })}`}
                      aria-label={`Browse ${item.category} products`}
                    >
                      {item.category}
                    </Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link
                    href={`/product/${item.id}`}
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">
                    {item.description.length > 120
                      ? `${item.description.substring(0, 120)}...`
                      : item.description}
                  </p>
                  <Link
                    href={`/product/${item.id}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    aria-label={`Get details about ${item.title}`}
                  >
                    Learn More <ChevronRight className="w-4" />
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
