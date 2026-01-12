'use client';

import { useState } from 'react';

export default function MaonoTabbedProducts({ content = {} }) {
    const { categories = [
        {
            name: 'Microphone',
            products: [
                {
                    label: 'Wave T5',
                    description: 'Wireless Microphone for Content Creators',
                    features: ['Noise Cancellation', 'XLR & USB', 'Dynamic'],
                    image: '/home/banner-showcase.jpg',
                    price: '$299.99',
                    learnMoreUrl: '#',
                    orderNowUrl: '#'
                }
            ]
        }
    ] } = content;
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center text-black mb-12">
                    Featured Product
                </h2>

                {/* Category Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === index
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories[activeTab]?.products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Product Image */}
                            <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.label}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                {/* Label */}
                                <h3 className="text-2xl font-bold text-black mb-2">
                                    {product.label}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 text-sm">
                                    {product.description}
                                </p>

                                {/* Feature Chips */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.features?.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="text-2xl font-bold text-black mb-4">
                                    {product.price}
                                </div>

                                {/* Dual Action Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={product.learnMoreUrl}
                                        className="flex-1 text-center px-4 py-2.5 border-2 border-black text-black font-semibold rounded-full hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href={product.orderNowUrl}
                                        className="flex-1 text-center px-4 py-2.5 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all duration-300"
                                    >
                                        Order Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
