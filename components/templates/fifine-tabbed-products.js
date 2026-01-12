'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function FifineTabbedProducts({ content = {} }) {
    const {
        title = 'FIFINE Amazing Products',
        subtitle = 'Try Them, You Might Like It',
        categories = [
            {
                id: 'bundle',
                name: 'MEGA Bundle Deal',
                products: [
                    {
                        id: 1,
                        name: 'Wave T5',
                        price: '$299.99',
                        originalPrice: '$399.99',
                        image: '/home/fifine_microphones.jpg',
                        badge: 'HOT',
                        features: ['RGB Lighting', 'USB-C', 'Mute Button']
                    },
                    {
                        id: 2,
                        name: 'SC8 Mixer',
                        price: '$199.99',
                        image: '/home/fifine_mixers.png',
                        badge: 'NEW',
                        features: ['4 Channels', 'Bluetooth', 'Sound Effects']
                    }
                ]
            },
            {
                id: 'bestselling',
                name: 'Best Selling',
                products: [
                    {
                        id: 3,
                        name: 'H13 Headset',
                        price: '$79.99',
                        image: '/home/fifine_headsets.jpg',
                        features: ['7.1 Surround', 'RGB', 'Comfortable']
                    },
                    {
                        id: 4,
                        name: 'Boom Arm Stand',
                        price: '$49.99',
                        image: '/home/fifine_boom_arm.jpg',
                        features: ['Heavy Duty', 'Cable Management', 'Adjustable']
                    }
                ]
            },
            {
                id: 'new',
                name: "What's NEW",
                products: [
                    {
                        id: 5,
                        name: 'Accessories Kit',
                        price: '$39.99',
                        image: '/home/fifine_accessories.jpg',
                        badge: 'NEW',
                        features: ['Pop Filter', 'Shock Mount', 'Windscreen']
                    }
                ]
            }
        ]
    } = content;

    const [activeTab, setActiveTab] = useState(categories[0]?.id || 'bundle');

    const activeCategory = categories.find(cat => cat.id === activeTab) || categories[0];

    return (
        <section className="bg-[#121212] py-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-3">{title}</h2>
                    <p className="text-[#a1a1a1] text-lg">{subtitle}</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === category.id
                                    ? 'bg-[#d22730] text-white shadow-lg shadow-[#d22730]/30'
                                    : 'bg-transparent text-white border-2 border-white/30 hover:border-white/60'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activeCategory.products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#1c1c1c] rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-square overflow-hidden bg-[#252525]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-4 right-4 bg-[#d22730] text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {product.badge}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className="text-white font-semibold text-lg mb-2">
                                    {product.name}
                                </h3>

                                {/* Features */}
                                {product.features && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-[#2a2a2a] text-[#a1a1a1] px-3 py-1 rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-white font-bold text-xl">
                                        {product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-[#a1a1a1] line-through text-sm">
                                            {product.originalPrice}
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full bg-[#d22730] hover:bg-[#b01f28] text-white font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="inline-block text-white border-2 border-white/30 hover:border-[#d22730] hover:text-[#d22730] px-8 py-3 rounded-full font-semibold transition-all duration-300"
                    >
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    );
}
