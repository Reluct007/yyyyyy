"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Package, Building2, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/features/contact-form";

export default function TechnicalLayout({ product, relatedProducts = [] }) {
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

    // 模拟技术规格数据
    const specifications = [
        { name: "Category", value: category },
        { name: "Manufacturer", value: "Premium Brand" },
        { name: "Part Number", value: "PKR-" + Math.random().toString(36).substr(2, 9).toUpperCase() },
        { name: "Package Type", value: "Standard" },
        { name: "Material", value: "High-Quality Composite" },
        { name: "Dimensions", value: "Standard Size" },
    ];

    const pricingTiers = [
        { quantity: 1, unitPrice: 99.99, extPrice: 99.99 },
        { quantity: 10, unitPrice: 89.99, extPrice: 899.90 },
        { quantity: 25, unitPrice: 79.99, extPrice: 1999.75 },
        { quantity: 100, unitPrice: 69.99, extPrice: 6999.00 },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 面包屑 */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link href="/collection" className="hover:text-primary">Products</Link>
                        <span>/</span>
                        <Link href={`/collection/${category.toLowerCase()}`} className="hover:text-primary">{category}</Link>
                        <span>/</span>
                        <span className="text-foreground">{title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* 主要内容区域 - 7:5 比例 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    {/* 左侧：产品图片画廊 - 7/12 */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-lg border p-4">
                            {/* 主图 */}
                            <div className="aspect-square relative bg-white rounded overflow-hidden mb-4">
                                <Image
                                    src={selectedImage}
                                    alt={title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* 缩略图列表 */}
                            {allImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
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
                            )}
                        </div>
                    </div>

                    {/* 右侧：产品信息 - 5/12 */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* 产品标题和制造商信息 */}
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    <span>Manufacturer: <strong>Premium Brand</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    <span>Part #: <strong>PKR-{Math.random().toString(36).substr(2, 6).toUpperCase()}</strong></span>
                                </div>
                            </div>
                        </div>

                        {/* 库存状态 */}
                        <div className="flex items-center gap-3">
                            <Badge variant="default" className="bg-green-600">
                                <Clock className="w-3 h-3 mr-1" />
                                In Stock
                            </Badge>
                            <span className="text-sm text-slate-600">Ships within 2-3 business days</span>
                        </div>

                        {/* 价格表格 */}
                        <div className="bg-white rounded-lg border overflow-hidden">
                            <div className="bg-slate-100 px-4 py-2 border-b">
                                <h3 className="font-semibold text-slate-900">Pricing</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-slate-700">Quantity</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-slate-700">Unit Price</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-slate-700">Ext. Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pricingTiers.map((tier, idx) => (
                                            <tr key={idx} className="border-b hover:bg-slate-50">
                                                <td className="px-4 py-3 text-sm">{tier.quantity}</td>
                                                <td className="px-4 py-3 text-sm text-right font-medium">${tier.unitPrice.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-sm text-right">${tier.extPrice.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 数量选择和购买按钮 */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <Button size="lg" className="flex-1 mt-6">
                                Request Quote
                            </Button>
                        </div>

                        {/* 产品描述 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-slate-700">{description}</p>
                        </div>
                    </div>
                </div>

                {/* 产品属性表格 */}
                <div className="bg-white rounded-lg border mb-8">
                    <div className="bg-slate-100 px-6 py-3 border-b">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Product Attributes
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {specifications.map((spec, idx) => (
                                <div key={idx} className="flex border-b pb-3">
                                    <div className="w-1/2 text-sm font-medium text-slate-700">{spec.name}</div>
                                    <div className="w-1/2 text-sm text-slate-900">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 详细描述 */}
                {features.length > 0 && (
                    <div className="bg-white rounded-lg border mb-8 p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Detailed Description</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-slate-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 联系表单 */}
                <div className="mb-8">
                    <ContactForm locale="en" />
                </div>

                {/* 相关产品 */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 4).map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={`/product/${item.id}`}
                                    className="bg-white rounded-lg border hover:shadow-lg transition-shadow"
                                >
                                    <div className="aspect-square relative bg-white">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
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
