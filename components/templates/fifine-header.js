'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ShoppingCart, User, X, ChevronDown } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function FifineHeader({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand,
        showCart = true,
        showAccount = true,
        searchPlaceholder = 'Search products...'
    } = config;

    const navLinks = [
        { name: 'Products', href: `${urlPrefix}/collection/` },
        { name: 'Microphones', href: `${urlPrefix}/collection/microphones/` },
        { name: 'Mixers', href: `${urlPrefix}/collection/mixers/` },
        { name: 'Headsets', href: `${urlPrefix}/collection/headsets/` },
        { name: 'Accessories', href: `${urlPrefix}/collection/accessories/` }
    ];

    return (
        <header className="bg-[#121212] text-white sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-6">
                {/* Main Navigation */}
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`${urlPrefix}/`} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <Image
                            src={logo}
                            alt={brandName}
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-2xl font-bold">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white hover:text-[#d22730] transition-colors duration-300 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Cart */}
                        {showCart && (
                            <Link
                                href={`${urlPrefix}/cart/`}
                                className="relative p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-[#d22730] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    0
                                </span>
                            </Link>
                        )}

                        {/* Account */}
                        {showAccount && (
                            <Link
                                href={`${urlPrefix}/account/`}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#d22730] hover:bg-[#b01f28] rounded-full transition-colors font-semibold"
                            >
                                <User className="w-4 h-4" />
                                <span>Sign In</span>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar (Desktop) */}
                {searchOpen && (
                    <div className="hidden md:block pb-4 animate-in slide-in-from-top">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1a1]" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="w-full bg-[#1c1c1c] text-white pl-12 pr-4 py-3 rounded-full border-2 border-transparent focus:border-[#d22730] focus:outline-none transition-colors"
                                autoFocus
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-[#1c1c1c] border-t border-white/10">
                    <div className="container mx-auto px-6 py-6">
                        {/* Mobile Search */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1a1]" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    className="w-full bg-[#121212] text-white pl-12 pr-4 py-3 rounded-full border-2 border-transparent focus:border-[#d22730] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-4 mb-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white hover:text-[#d22730] transition-colors font-medium py-2"
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
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#252525] hover:bg-[#2a2a2a] rounded-full transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Cart (0)</span>
                                </Link>
                            )}
                            {showAccount && (
                                <Link
                                    href={`${urlPrefix}/account/`}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#d22730] hover:bg-[#b01f28] rounded-full transition-colors font-semibold"
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
