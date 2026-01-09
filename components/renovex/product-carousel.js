'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ProductCarousel({ products = [], containerWidth = 'contained' }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const getContainerClass = () => {
        switch (containerWidth) {
            case 'full':
                return 'w-full px-6 md:px-12';
            case 'wide':
                return 'max-w-[1400px] mx-auto px-6 md:px-12';
            case 'contained':
            default:
                return 'max-w-7xl mx-auto px-6 md:px-12';
        }
    };

    const scroll = (direction) => {
        const container = document.getElementById('product-carousel-container');
        if (container) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Default products if none provided
    const defaultProducts = [
        {
            name: 'iPhone 17 Pro',
            description: 'Get it for $0 with eligible trade-in',
            image: '/products/iphone-placeholder.jpg',
            badge: 'Best Deal',
            cta: 'Shop now'
        },
        {
            name: 'Google Pixel 10 Pro XL',
            description: 'Save up to $800',
            image: '/products/pixel-placeholder.jpg',
            badge: 'New',
            cta: 'Shop now'
        },
        {
            name: 'Samsung Galaxy S25',
            description: 'Pre-order now',
            image: '/products/samsung-placeholder.jpg',
            badge: 'Pre-order',
            cta: 'Shop now'
        },
        {
            name: 'Motorola razr+',
            description: 'Flip into savings',
            image: '/products/motorola-placeholder.jpg',
            badge: 'Limited Time',
            cta: 'Shop now'
        }
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;

    return (
        <section className="py-12 bg-white">
            <div className={getContainerClass()}>
                {/* Navigation Buttons */}
                <div className="flex justify-end gap-2 mb-6">
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Product Cards Container */}
                <div
                    id="product-carousel-container"
                    className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-none w-[280px] md:w-[300px] bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Product Image */}
                            <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                {product.badge && (
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        {product.badge}
                                    </div>
                                )}
                                {product.image && (
                                    <div className="w-32 h-32 relative">
                                        <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                                            Product Image
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                                    {product.description}
                                </p>
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full h-11"
                                >
                                    {product.cta || 'Shop now'}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll Indicator Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {displayProducts.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
