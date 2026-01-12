'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, MapPin } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function WhereeHeader({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const navLinks = [
        { name: 'Explore', href: `${urlPrefix}/explore/` },
        { name: 'Categories', href: `${urlPrefix}/collection/` },
        { name: 'Deals', href: `${urlPrefix}/deals/` },
        { name: 'About', href: `${urlPrefix}/about/` }
    ];

    return (
        <header className="bg-white sticky top-0 z-50 shadow-md">
            {/* Orange Top Stripe */}
            <div className="h-1 bg-gradient-to-r from-[#f97316] to-[#ea580c]"></div>

            <div className="container mx-auto px-6">
                {/* Main Navigation */}
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`${urlPrefix}/`} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden lg:block flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for places, products, or services..."
                                className="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#f97316] focus:outline-none focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[#f97316] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Search Bar */}
                <div className="lg:hidden pb-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-50 text-gray-900 pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#f97316] focus:outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-6 py-6">
                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 hover:text-[#f97316] hover:bg-orange-50 transition-colors font-medium py-3 px-4 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
