'use client';

export default function MaonoInterestGrid({ content = {} }) {
    const {
        title = "Shop By Interest",
        categories = [
            {
                name: 'Gaming',
                image: '/home/banner-showcase.jpg',
                url: '#'
            },
            {
                name: 'Podcasting',
                image: '/home/banner-showcase.jpg',
                url: '#'
            },
            {
                name: 'Streaming',
                image: '/home/banner-showcase.jpg',
                url: '#'
            },
            {
                name: 'Music Production',
                image: '/home/banner-showcase.jpg',
                url: '#'
            }
        ]
    } = content;
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center text-black mb-12">
                    {title}
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href={category.url}
                            className="group relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            </div>

                            {/* Category Name */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                    {category.name}
                                </h3>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
