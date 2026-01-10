"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Truck, Shield, Star, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";

export default function EcommerceLayout({ product, relatedProducts = [] }) {
    const {
        title,
        image,
        images = [],
        description,
        features = [],
        category = "Products",
    } = product;

    // 合并所有图片
    const allImages = image ? [image, ...images] : images;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const selectedImage = allImages[selectedImageIndex] || image;
    const thumbnailsRef = useRef(null);

    // 缩略图滚动
    const scrollThumbnails = (direction) => {
        if (thumbnailsRef.current) {
            const scrollAmount = 100;
            thumbnailsRef.current.scrollBy({
                top: direction === 'up' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // 产品亮点
    const highlights = [
        "Professional Grade Quality",
        "Premium Materials & Construction",
        "Suitable for Business & Personal Use",
        "Durable & Long-lasting Design",
    ];

    // 规格参数
    const specifications = [
        { label: "Category", value: category },
        { label: "Material", value: "High-Quality Composite" },
        { label: "Dimensions", value: "Standard Size" },
        { label: "Weight", value: "Varies by configuration" },
        { label: "Color Options", value: "Multiple" },
        { label: "Package Includes", value: "Complete set with accessories" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* 产品标题 */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            Best Seller
                        </Badge>
                        <Badge variant="outline">In Stock</Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h1>
                </div>

                {/* 主要内容区域 - 7:5 比例 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    {/* 左侧：图片画廊 - 7/12 */}
                    <div className="lg:col-span-7">
                        <div className="flex gap-4">
                            {/* 缩略图列表 - 垂直排列 */}
                            {allImages.length > 1 && (
                                <div className="flex flex-col items-center gap-2">
                                    {/* 向上箭头 */}
                                    <button
                                        onClick={() => scrollThumbnails('up')}
                                        className="p-1 rounded hover:bg-slate-100 transition-colors"
                                        aria-label="Scroll up"
                                    >
                                        <ChevronUp className="w-5 h-5 text-slate-600" />
                                    </button>

                                    {/* 缩略图容器 */}
                                    <div
                                        ref={thumbnailsRef}
                                        className="flex flex-col gap-2 overflow-y-auto max-h-[500px] hide-scrollbar"
                                        style={{
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none'
                                        }}
                                    >
                                        {allImages.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImageIndex(idx)}
                                                className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-all ${selectedImageIndex === idx
                                                    ? 'border-primary ring-2 ring-primary/20'
                                                    : 'border-slate-200 hover:border-primary/50'
                                                    }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${title} - view ${idx + 1}`}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain w-full h-full p-1"
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* 向下箭头 */}
                                    <button
                                        onClick={() => scrollThumbnails('down')}
                                        className="p-1 rounded hover:bg-slate-100 transition-colors"
                                        aria-label="Scroll down"
                                    >
                                        <ChevronDown className="w-5 h-5 text-slate-600" />
                                    </button>
                                </div>
                            )}

                            {/* 主图 */}
                            <div className="flex-1 bg-white rounded-lg border">
                                <div className="aspect-square relative">
                                    <Image
                                        src={selectedImage}
                                        alt={title}
                                        fill
                                        className="object-contain p-8"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：购买信息 - 5/12 (Sticky) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-4 h-fit">
                        <div className="bg-slate-50 rounded-lg border p-6 space-y-6">
                            {/* 价格信息 */}
                            <div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-sm text-slate-500 line-through">$199.99</span>
                                    <Badge variant="destructive" className="bg-red-600">Save 50%</Badge>
                                </div>
                                <div className="text-4xl font-bold text-slate-900">$99.99</div>
                                <p className="text-sm text-slate-600 mt-1">Price includes all accessories</p>
                            </div>

                            {/* 库存状态 */}
                            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-md">
                                <Check className="w-5 h-5" />
                                <span className="font-medium">In Stock - Ships within 2-3 days</span>
                            </div>

                            {/* 数量选择 */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>

                            {/* 购买按钮 */}
                            <div className="space-y-3">
                                <Button size="lg" className="w-full text-lg py-6">
                                    Request Quote
                                </Button>
                                <Button size="lg" variant="outline" className="w-full">
                                    Add to Wishlist
                                </Button>
                            </div>

                            {/* 产品亮点 */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold text-slate-900 mb-3">Product Highlights</h3>
                                <ul className="space-y-2">
                                    {highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 配送信息 */}
                            <div className="border-t pt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-700">
                                    <Truck className="w-5 h-5 text-slate-400" />
                                    <span>Free shipping on orders over $150</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-700">
                                    <Shield className="w-5 h-5 text-slate-400" />
                                    <span>30-day money-back guarantee</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-700">
                                    <Star className="w-5 h-5 text-slate-400" />
                                    <span>Rated 4.8/5 by customers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 产品详情标签页 */}
                <div className="mb-12">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                            <TabsTrigger
                                value="overview"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                            >
                                Product Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="specifications"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                            >
                                Specifications
                            </TabsTrigger>
                            <TabsTrigger
                                value="features"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                            >
                                Features
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                            <div className="prose max-w-none">
                                <p className="text-lg text-slate-700 leading-relaxed">{description}</p>

                                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Why Choose This Product?</h3>
                                    <p className="text-slate-700">
                                        This premium poker set is designed specifically for B2B buyers seeking quality gaming solutions.
                                        Crafted from premium materials, this set not only enhances the gaming experience for clients but
                                        also offers reliable durability and convenient storage for any business setting.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="specifications" className="mt-6">
                            <div className="bg-slate-50 rounded-lg border">
                                <div className="divide-y">
                                    {specifications.map((spec, idx) => (
                                        <div key={idx} className="grid grid-cols-2 gap-4 px-6 py-4">
                                            <div className="font-medium text-slate-900">{spec.label}</div>
                                            <div className="text-slate-700">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="features" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="bg-slate-50 rounded-lg border p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-bold">{idx + 1}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                                <p className="text-sm text-slate-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* 相关产品 */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 4).map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={`/product/${item.id}`}
                                    className="group bg-white rounded-lg border hover:shadow-lg transition-all"
                                >
                                    <div className="aspect-square relative bg-white overflow-hidden rounded-t-lg">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 text-sm">
                                            {item.title}
                                        </h3>
                                        <div className="text-lg font-bold text-primary">$99.99</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
