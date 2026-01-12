'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function MaonoHeader({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand,
        showCart = true,
        showAccount = true
    } = config;

    const navLinks = [
        { name: 'Products', href: `${urlPrefix}/collection/` },
        { name: 'Microphone', href: `${urlPrefix}/collection/microphones/` },
        { name: 'Audio Mixer', href: `${urlPrefix}/collection/mixers/` },
        { name: 'Support', href: `${urlPrefix}/support/` },
        { name: 'About', href: `${urlPrefix}/about/` }
    ];

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-6">
                {/* Main Navigation */}
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`${urlPrefix}/`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Image
                            src={logo}
                            alt={brandName}
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-2xl font-bold text-black">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-black transition-colors duration-300 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Cart */}
                        {showCart && (
                            <Link
                                href={`${urlPrefix}/cart/`}
                                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-5 h-5 text-gray-700" />
                                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    0
                                </span>
                            </Link>
                        )}

                        {/* Account */}
                        {showAccount && (
                            <Link
                                href={`${urlPrefix}/account/`}
                                className="hidden md:flex items-center gap-2 px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-colors font-medium"
                            >
                                <User className="w-4 h-4" />
                                <span>Sign In</span>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-6 py-6">
                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-4 mb-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 hover:text-black transition-colors font-medium py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Actions */}
                        <div className="flex flex-col gap-3">
                            {showCart && (
                                <Link
                                    href={`${urlPrefix}/cart/`}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Cart (0)</span>
                                </Link>
                            )}
                            {showAccount && (
                                <Link
                                    href={`${urlPrefix}/account/`}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-black hover:bg-gray-800 text-white rounded-md transition-colors font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
