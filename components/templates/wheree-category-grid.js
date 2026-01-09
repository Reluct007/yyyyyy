'use client';

import {
    ShoppingCart,
    Hotel,
    Coffee,
    Utensils,
    Moon,
    Plane,
    Heart,
    MoreHorizontal
} from 'lucide-react';

const defaultCategories = [
    { icon: Utensils, label: 'Restaurants', href: '/collection/restaurants' },
    { icon: Hotel, label: 'Hotels', href: '/collection/hotels' },
    { icon: Coffee, label: 'Coffee & Tea', href: '/collection/coffee' },
    { icon: ShoppingCart, label: 'Shopping', href: '/collection/shopping' },
    { icon: Moon, label: 'Nightlife', href: '/collection/nightlife' },
    { icon: Plane, label: 'Travel & Tours', href: '/collection/travel' },
    { icon: Heart, label: 'Pets', href: '/collection/pets' },
    { icon: MoreHorizontal, label: 'Others', href: '/collection/others' },
];

export default function WhereeCategoryGrid({ categories = defaultCategories }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-16">
            {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                    <a
                        key={index}
                        href={category.href}
                        className="group bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-slate-100"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-slate-50 rounded-full group-hover:bg-orange-50 transition-colors">
                                <Icon className="w-8 h-8 text-slate-700 group-hover:text-orange-500 transition-colors" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-orange-500 transition-colors">
                            {category.label}
                        </h3>
                    </a>
                );
            })}
        </div>
    );
}
