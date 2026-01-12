'use client';

import { Truck, Award, RotateCcw, Shield, Headphones, BadgeCheck } from 'lucide-react';

export default function FifineValueProps({ content = {} }) {
    const {
        title = 'Why Choose FIFINE?',
        values = [
            {
                id: 1,
                icon: 'truck',
                title: 'Free Shipping',
                description: 'Free shipping on orders over $50'
            },
            {
                id: 2,
                icon: 'award',
                title: 'Quality Assurance',
                description: 'Premium audio equipment guaranteed'
            },
            {
                id: 3,
                icon: 'rotate',
                title: '30-Day Return',
                description: 'Easy returns within 30 days'
            },
            {
                id: 4,
                icon: 'shield',
                title: 'Secure Payment',
                description: '100% secure transactions'
            },
            {
                id: 5,
                icon: 'headphones',
                title: '24/7 Support',
                description: 'Always here to help you'
            },
            {
                id: 6,
                icon: 'badge',
                title: 'Warranty',
                description: '1-year manufacturer warranty'
            }
        ]
    } = content;

    const getIcon = (iconName) => {
        const iconProps = { className: 'w-8 h-8', strokeWidth: 1.5 };
        switch (iconName) {
            case 'truck':
                return <Truck {...iconProps} />;
            case 'award':
                return <Award {...iconProps} />;
            case 'rotate':
                return <RotateCcw {...iconProps} />;
            case 'shield':
                return <Shield {...iconProps} />;
            case 'headphones':
                return <Headphones {...iconProps} />;
            case 'badge':
                return <BadgeCheck {...iconProps} />;
            default:
                return <Award {...iconProps} />;
        }
    };

    return (
        <section className="bg-[#1c1c1c] py-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                {title && (
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white">{title}</h2>
                    </div>
                )}

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <div
                            key={value.id}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#252525] hover:bg-[#2a2a2a] transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center mb-4 text-white group-hover:text-[#d22730] group-hover:bg-[#d22730]/10 transition-all duration-300">
                                {getIcon(value.icon)}
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-semibold text-lg mb-2">
                                {value.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[#a1a1a1] text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
