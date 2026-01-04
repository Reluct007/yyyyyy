import { product } from "@/data/product";
import { basic } from "@/data/basic";
import slugify from "slugify";
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ContactForm from '@/components/features/contact-form';
import ProductGallery from '@/components/features/product-gallery';
import { generateProductMetadata } from "@/lib/product-metadata";

const ROOT_URL = basic.seo.url;

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

// 生成 metadata
export async function generateMetadata({ params }) {
  const { slug } = (await params) || {};
  return generateProductMetadata(slug, "en");
}

export default async function ProductPage({ params }) {
  const { slug } = (await params) || {};
  const productItem = findProduct(slug);
  
  if (!productItem) {
    return (
      <section className="py-16 px-4 text-center">
        <h1 className="text-2xl font-semibold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested product could not be found.</p>
        <Link href="/collection" className="text-primary mt-4 inline-block">
          Browse All Products
        </Link>
      </section>
    );
  }

  const productId = slugify(productItem.title, { lower: true, strict: true });
  
  // 获取相关产品
  const allProducts = getValidProducts().map(p => ({
    ...p,
    id: slugify(p.title, { lower: true, strict: true })
  }));
  const relatedProducts = allProducts
    .filter(item => item.id !== productId)
    .slice(0, 8);

  // JSON-LD 结构化数据
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
      "item": `${ROOT_URL}/collection/`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productItem.title,
      "item": `${ROOT_URL}/product/${productId}/`
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
      "name": basic.info.brand
    },
    "url": `${ROOT_URL}/product/${productId}/`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <section className="py-8 px-2">
        <div className="container mx-auto space-y-8">
          {/* 标题 */}
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold lg:text-4xl">
              {productItem.title}
            </h1>
          </div>

          {/* 图片画廊 - 客户端组件 */}
          <ProductGallery 
            mainImage={productItem.image}
            images={productItem.images || []}
            title={productItem.title}
          />

          {/* 描述 */}
          <p className="max-w-4xl text-muted-foreground text-lg">
            {productItem.description}
          </p>

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
                  <Link href={`/product/${item.id}/`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-t-lg object-cover aspect-square"
                      width={400}
                      height={400}
                    />
                  </Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link href={`/collection/${slugify(item.category, { lower: true, strict: true })}/`}>
                      {item.category}
                    </Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={`/product/${item.id}/`}>
                    <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                  <Link
                    href={`/product/${item.id}/`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
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
