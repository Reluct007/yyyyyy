'use client';

import Image from 'next/image';

export default function WhereeCard({
    image,
    category,
    title,
    subtitle,
    href = "#"
}) {
    return (
        <a
            href={href}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image || '/placeholder-image.jpg'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Tag */}
                {category && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                            {category}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-orange-500 transition-colors">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-slate-600 text-sm">
                        {subtitle}
                    </p>
                )}
            </div>
        </a>
    );
}
