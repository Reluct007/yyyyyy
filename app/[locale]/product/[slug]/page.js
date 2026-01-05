import { product } from "@/data/product";
import { basic } from "@/data/basic";
import { getNonDefaultLocales, getTranslations } from "@/lib/i18n";
import { getProductByLanguage, getAllProductsByLanguage } from "@/data/auto-translate";
import slugify from "slugify";
import Image from "next/image";
import Link from 'next/link';
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ContactForm from '@/components/features/contact-form';

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

const findProduct = (slug) => product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);

const getValidProducts = () => product.filter((item) => {
  const img = item.image;
  const isInvalidImage = img && (img.match(/\.(SS40|_SX38|\.SX38)/) || !img.startsWith('/product/'));
  return !isInvalidImage && item.title && item.title.length > 0;
});

// 静态生成所有语言版本的产品页面
export async function generateStaticParams() {
  const supportedLocales = getNonDefaultLocales();
  const validProducts = getValidProducts();
  const params = [];

  for (const locale of supportedLocales) {
    for (const item of validProducts) {
      const slug = slugify(item.title, { lower: true, strict: true });
      if (slug && slug.length > 2) {
        params.push({ locale, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = params || {};
  
  if (!slug) {
    return {
      title: `Product Not Found | ${basic.info.brand}`,
      description: "The requested product could not be found",
      robots: { index: false, follow: false },
    };
  }
  
  const originalProduct = findProduct(slug);
  
  if (!originalProduct) {
    return {
      title: `Product Not Found | ${basic.info.brand}`,
      description: "The requested product could not be found",
      robots: { index: false, follow: false },
    };
  }

  const translatedProduct = getProductByLanguage(locale || 'en', slug) || originalProduct;
  const urlPrefix = locale === 'en' ? '' : `/${locale}`;
  const description = translatedProduct.description?.length > 160 
    ? translatedProduct.description.substring(0, 157) + '...' 
    : translatedProduct.description;

  return {
    title: `${translatedProduct.title} | ${basic.info.brand}`,
    description,
    alternates: { canonical: `${ROOT_URL}${urlPrefix}/product/${slug}/` },
    openGraph: {
      title: translatedProduct.title,
      description,
      url: `${ROOT_URL}${urlPrefix}/product/${slug}/`,
      type: "website",
      images: originalProduct.image ? [{ url: `${ROOT_URL}${originalProduct.image}`, width: 800, height: 800, alt: translatedProduct.title }] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const { locale = 'en', slug } = await params;
  const translations = getTranslations(locale);
  const originalProduct = findProduct(slug);
  
  if (!originalProduct) {
    return (
      <section className="py-16 px-4 text-center">
        <h1 className="text-2xl font-semibold">{translations.product?.notFound || "Product Not Found"}</h1>
        <p className="text-muted-foreground mt-2">The requested product could not be found.</p>
        <Link href={locale === 'en' ? '/collection/' : `/${locale}/collection/`} className="text-primary mt-4 inline-block">
          {translations.nav?.products || "Browse All Products"}
        </Link>
      </section>
    );
  }

  const translatedProduct = getProductByLanguage(locale, slug) || originalProduct;
  const productId = slugify(originalProduct.title, { lower: true, strict: true });
  const productItem = {
    ...originalProduct,
    id: productId,
    title: translatedProduct.title || originalProduct.title,
    description: translatedProduct.description || originalProduct.description,
    features: translatedProduct.features || originalProduct.features || [],
  };

  const validProducts = getValidProducts();
  const allTranslatedProducts = getAllProductsByLanguage(locale);
  const relatedProducts = validProducts
    .filter(p => slugify(p.title, { lower: true, strict: true }) !== productId)
    .slice(0, 8)
    .map(p => {
      const pSlug = slugify(p.title, { lower: true, strict: true });
      const translated = allTranslatedProducts.find(tp => tp.id === pSlug);
      return { ...p, id: pSlug, title: translated?.title || p.title, description: translated?.description || p.description };
    });

  const urlPrefix = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${ROOT_URL}${urlPrefix}/product/${productId}/`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": translations.nav?.home || "Home",
      "item": `${ROOT_URL}/`
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": translations.nav?.products || "Products",
      "item": `${ROOT_URL}${urlPrefix}/collection/`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productItem.title,
      "item": canonicalUrl
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
    "url": canonicalUrl
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section className="py-8 px-2">
        <div className="container mx-auto space-y-8">
          <h1 className="text-pretty text-2xl font-semibold lg:text-4xl">{productItem.title}</h1>

          {/* 图片展示 */}
          <div className="grid gap-4 md:grid-cols-2">
            {productItem.image && (
              <Image
                src={productItem.image}
                alt={`${productItem.title} - ${basic.info.brand}`}
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

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                {productItem.features?.map((feature, index) => (
                  <div key={index} className="flex flex-col gap-2 border border-border rounded-lg p-8 bg-accent">
                    <ArrowDownRight className="size-6" />
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-base text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div><ContactForm locale={locale} /></div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold lg:text-2xl">{translations.product?.recommended || "Recommended Products"}</h2>
            <p className="max-w-4xl text-muted-foreground text-base">Discover more premium designer collectibles.</p>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link href={`${urlPrefix}/product/${item.id}/`}>
                    <Image src={item.image} alt={item.title} className="w-full rounded-t-lg object-cover aspect-square" width={400} height={400} />
                  </Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link
                      href={`${urlPrefix}/collection/${slugify(item.category, { lower: true, strict: true })}`}
                      aria-label={`Browse ${item.category} products`}
                    >
                      {item.category}
                    </Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={`${urlPrefix}/product/${item.id}/`}><h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3></Link>
                  <p className="text-base text-muted-foreground line-clamp-3">{item.description}</p>
                  <Link href={`${urlPrefix}/product/${item.id}/`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    {translations.product?.learnMore || "Learn More"} <ChevronRight className="w-4" />
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
