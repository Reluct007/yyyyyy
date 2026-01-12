'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function ClassicHeader({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const navLinks = [
        { name: 'Home', href: `${urlPrefix}/` },
        { name: 'Products', href: `${urlPrefix}/collection/` },
        { name: 'Solutions', href: `${urlPrefix}/solutions/` },
        { name: 'Support', href: `${urlPrefix}/support/` },
        { name: 'About', href: `${urlPrefix}/about/` },
        { name: 'Contact', href: `${urlPrefix}/contact/` }
    ];

    return (
        <header className="bg-white border-b-4 border-[#0057B8] sticky top-0 z-50 shadow-sm">
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
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-[#0057B8]">
                                {brandName}
                            </span>
                            <span className="text-xs text-gray-600 -mt-1">
                                Professional Solutions
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[#0057B8] transition-colors duration-300 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* CTA Button */}
                        <Link
                            href={`${urlPrefix}/contact/`}
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0057B8] hover:bg-[#00388F] text-white rounded-md transition-colors font-semibold shadow-md"
                        >
                            Get Quote
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
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
                                    className="text-gray-700 hover:text-[#0057B8] transition-colors font-medium py-2 border-b border-gray-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile CTA */}
                        <Link
                            href={`${urlPrefix}/contact/`}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0057B8] hover:bg-[#00388F] text-white rounded-md transition-colors font-semibold"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Quote
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
