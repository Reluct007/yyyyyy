'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function ModernHeader({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const navLinks = [
        { name: 'Features', href: `${urlPrefix}/features/` },
        { name: 'Pricing', href: `${urlPrefix}/pricing/` },
        { name: 'Resources', href: `${urlPrefix}/resources/` },
        { name: 'Company', href: `${urlPrefix}/about/` }
    ];

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm">
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
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#4f46e5] bg-clip-text text-transparent">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-600 hover:text-[#6366f1] transition-colors duration-300 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Sign In Button */}
                        <Link
                            href={`${urlPrefix}/signin/`}
                            className="hidden md:block text-gray-600 hover:text-[#6366f1] transition-colors font-medium"
                        >
                            Sign In
                        </Link>

                        {/* Get Started CTA */}
                        <Link
                            href={`${urlPrefix}/signup/`}
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#6366f1] text-white rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/30"
                        >
                            Get Started
                        </Link>

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
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-6 py-6">
                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-4 mb-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-600 hover:text-[#6366f1] transition-colors font-medium py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Actions */}
                        <div className="flex flex-col gap-3">
                            <Link
                                href={`${urlPrefix}/signin/`}
                                className="flex items-center justify-center px-6 py-3 border-2 border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white rounded-lg transition-colors font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href={`${urlPrefix}/signup/`}
                                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white rounded-lg transition-all font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
