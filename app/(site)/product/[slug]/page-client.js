"use client";

import { product } from "@/data/product";
import { basic } from "@/data/basic";
import slugify from "slugify";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/features/contact-form";
import ProductGallery from "@/components/features/product-gallery";
import TechnicalLayout from "@/components/product/technical-layout";
import EcommerceLayout from "@/components/product/ecommerce-layout";
import { useEffect, useState } from "react";
import { useSettings } from "@/lib/settings-context";
import MarkdownRenderer from '@/components/ui/markdown-renderer';

const ROOT_URL = basic.seo.url;

// 查找产品 - 支持静态产品和动态产品
const findProduct = (slug, productList = []) => {
    // 首先在静态产品中查找
    const staticProduct = product.find((item) => slugify(item.title, { lower: true, strict: true }) === slug);
    if (staticProduct) return staticProduct;
    
    // 如果没找到，在动态产品列表中查找
    return productList.find((item) => {
        const itemSlug = item.title
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return itemSlug === slug;
    });
};

// 获取有效产品列表
const getValidProducts = () =>
    product.filter((item) => {
        const img = item.image;
        const isInvalidImage =
            img && (img.match(/\.(SS40|_SX38|\.SX38)/) || !img.startsWith("/product/"));
        return !isInvalidImage && item.title && item.title.length > 0;
    });

export default function ProductPageClient({ params }) {
    const [slug, setSlug] = useState(null);
    const { settings } = useSettings();

    // 从 settings 读取布局，默认为 'default'
    let layout = settings?.products?.detailPage?.layout || 'default';

    // 兼容旧的布局值格式
    if (layout === 'full-width') layout = 'fullwidth';
    if (layout === 'split') layout = 'default'; // split 不再使用，回退到 default

    // 调试日志
    console.log('🔍 Product Page Debug:', {
        originalLayout: settings?.products?.detailPage?.layout,
        normalizedLayout: layout,
        settingsProducts: settings?.products,
        detailPage: settings?.products?.detailPage
    });

    useEffect(() => {
        // 解析 params
        params.then(p => setSlug(p?.slug));
    }, [params]);

    if (!slug) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    const productItem = findProduct(slug);

    if (!productItem) {
        return (
            <section className="px-4 py-16 text-center">
                <h1 className="text-2xl font-semibold">Product Not Found</h1>
                <p className="mt-2 text-muted-foreground">The requested product could not be found.</p>
                <Link href="/collection/" className="mt-4 inline-block text-primary">
                    Browse All Products
                </Link>
            </section>
        );
    }

    const productId = slugify(productItem.title, { lower: true, strict: true });

    // 获取相关产品
    const allProducts = getValidProducts().map((p) => ({
        ...p,
        id: slugify(p.title, { lower: true, strict: true }),
    }));
    const relatedProducts = allProducts.filter((item) => item.id !== productId).slice(0, 8);

    // JSON-LD 结构化数据
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: ROOT_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Collection",
                item: `${ROOT_URL}/collection/`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: productItem.title,
                item: `${ROOT_URL}/product/${productId}/`,
            },
        ],
    };

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productItem.title,
        description: productItem.description,
        image: productItem.image ? `${ROOT_URL}${productItem.image}` : undefined,
        brand: {
            "@type": "Brand",
            name: basic.info.brand,
        },
        url: `${ROOT_URL}/product/${productId}/`,
    };

    // 根据布局渲染不同组件
    if (layout === 'technical') {
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
                <TechnicalLayout product={productItem} relatedProducts={relatedProducts} />
            </>
        );
    }

    if (layout === 'ecommerce') {
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
                <EcommerceLayout product={productItem} relatedProducts={relatedProducts} />
            </>
        );
    }

    // 默认布局
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

            <section className="px-2 py-8">
                <div className="container mx-auto space-y-8">
                    {/* 标题 */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-pretty text-2xl font-semibold lg:text-4xl">{productItem.title}</h1>
                    </div>

                    {/* 图片画廊 - 使用布局设置 */}
                    <ProductGallery
                        mainImage={productItem.image}
                        images={productItem.images || []}
                        title={productItem.title}
                        layout={layout}
                    />

                    {/* 描述 */}
                    <p className="max-w-4xl text-lg text-muted-foreground">{productItem.description}</p>
                    <h2 className="sr-only">Key Features</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-2">
                            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
                                {productItem.features?.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 rounded-lg border border-border bg-accent p-8"
                                    >
                                        <ArrowDownRight className="size-6" />
                                        <h3 className="text-lg font-medium">{feature.title}</h3>
                                        <MarkdownRenderer 
                                            content={feature.description}
                                            className="text-base text-muted-foreground"
                                        />
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
                        <h2 className="text-xl font-semibold lg:text-2xl">Recommended Products</h2>
                        <p className="max-w-4xl text-base text-muted-foreground">
                            Discover more poker sets and accessories from our collection.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((item, index) => (
                            <div key={index} className="h-full rounded-lg border">
                                <div className="relative">
                                    <Link href={`/product/${item.id}/`}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="aspect-square w-full rounded-t-lg object-cover"
                                            width={400}
                                            height={400}
                                            loading="lazy"
                                            fetchPriority="low"
                                        />
                                    </Link>
                                    <Badge
                                        asChild
                                        variant="outline"
                                        className="absolute left-5 top-5 bg-primary-foreground"
                                    >
                                        <Link
                                            href={`/collection/${slugify(item.category, { lower: true, strict: true })}/`}
                                            aria-label={`Browse ${item.category} products`}
                                        >
                                            {item.category}
                                        </Link>
                                    </Badge>
                                </div>
                                <div className="space-y-2 p-4">
                                    <Link href={`/product/${item.id}/`}>
                                        <h3 className="line-clamp-2 text-lg font-semibold">{item.title}</h3>
                                    </Link>
                                    <p className="line-clamp-3 text-base text-muted-foreground">{item.description}</p>
                                    <Link
                                        href={`/product/${item.id}/`}
                                        aria-label={`Learn more about ${item.title}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Learn More <span className="sr-only">: {item.title}</span>{" "}
                                        <ChevronRight className="w-4" aria-hidden="true" />
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
