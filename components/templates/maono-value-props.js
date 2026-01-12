'use client';

import { Shield, Award, Headphones, Truck, Heart } from 'lucide-react';

const iconMap = {
    shield: Shield,
    award: Award,
    headphones: Headphones,
    truck: Truck,
    heart: Heart
};

export default function MaonoValueProps({ content = {} }) {
    const {
        title = "5 Reasons Why Select Maono",
        values = [
            {
                icon: 'award',
                title: 'Premium Quality',
                description: 'Professional-grade audio equipment trusted by creators worldwide'
            },
            {
                icon: 'shield',
                title: 'Warranty Protection',
                description: '2-year warranty on all products with hassle-free replacement'
            },
            {
                icon: 'headphones',
                title: '24/7 Support',
                description: 'Expert technical support available whenever you need help'
            },
            {
                icon: 'truck',
                title: 'Fast Shipping',
                description: 'Free shipping on orders over $50 with tracking'
            },
            {
                icon: 'heart',
                title: 'Customer First',
                description: 'Your satisfaction is our top priority, always'
            }
        ]
    } = content;
    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center text-black mb-12">
                    {title}
                </h2>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {values.map((value, index) => {
                        const IconComponent = iconMap[value.icon] || Award;

                        return (
                            <div
                                key={index}
                                className="text-center"
                            >
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <IconComponent className="w-8 h-8 text-black" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-black mb-2">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
