'use client';

import { ArrowRight } from 'lucide-react';

export default function FifineCategoryGrid({ content = {} }) {
    const {
        title = 'Find Your Perfect Match',
        subtitle = 'Explore our complete range of audio equipment',
        categories = [
            {
                id: 1,
                name: 'Microphones',
                image: '/home/fifine_microphones.jpg',
                link: '#',
                size: 'large' // large, medium, small
            },
            {
                id: 2,
                name: 'Audio Mixers',
                image: '/home/fifine_mixers.png',
                link: '#',
                size: 'medium'
            },
            {
                id: 3,
                name: 'Gaming Headsets',
                image: '/home/fifine_headsets.jpg',
                link: '#',
                size: 'medium'
            },
            {
                id: 4,
                name: 'Accessories',
                image: '/home/fifine_accessories.jpg',
                link: '#',
                size: 'small'
            },
            {
                id: 5,
                name: 'Boom Arms & Stands',
                image: '/home/fifine_boom_arm.jpg',
                link: '#',
                size: 'small'
            }
        ]
    } = content;

    // Grid layout classes based on size
    const getSizeClass = (size) => {
        switch (size) {
            case 'large':
                return 'md:row-span-2 md:col-span-2';
            case 'medium':
                return 'md:row-span-1 md:col-span-1';
            case 'small':
                return 'md:row-span-1 md:col-span-1';
            default:
                return '';
        }
    };

    return (
        <section className="bg-[#121212] py-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-3">{title}</h2>
                    <p className="text-[#a1a1a1] text-lg">{subtitle}</p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-fr">
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href={category.link}
                            className={`relative group overflow-hidden rounded-3xl aspect-square md:aspect-auto ${getSizeClass(category.size)} min-h-[300px]`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            </div>

                            {/* Category Label */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <h3 className="text-white text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                                    {category.name}
                                </h3>
                                <div className="flex items-center gap-2 text-[#d22730] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>Shop Now</span>
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d22730]/50 rounded-3xl transition-all duration-300"></div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
