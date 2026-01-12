'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function CreativeHeader({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const navLinks = [
        { name: 'Portfolio', href: `${urlPrefix}/portfolio/` },
        { name: 'Services', href: `${urlPrefix}/services/` },
        { name: 'About', href: `${urlPrefix}/about/` },
        { name: 'Blog', href: `${urlPrefix}/blog/` },
        { name: 'Contact', href: `${urlPrefix}/contact/` }
    ];

    return (
        <header className="bg-white border-b-4 border-gradient sticky top-0 z-50 shadow-md" style={{ borderImage: 'linear-gradient(to right, #f59e0b, #f97316) 1' }}>
            <div className="container mx-auto px-6">
                {/* Main Navigation */}
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`${urlPrefix}/`} className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                        <Image
                            src={logo}
                            alt={brandName}
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-2xl font-black bg-gradient-to-r from-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[#f59e0b] transition-all duration-300 font-semibold relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f59e0b] to-[#f97316] group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* CTA Button */}
                        <Link
                            href={`${urlPrefix}/contact/`}
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#f59e0b] to-[#f97316] hover:from-[#f97316] hover:to-[#f59e0b] text-white rounded-full transition-all duration-300 font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-105"
                        >
                            <Sparkles className="w-4 h-4" />
                            Let's Create
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-orange-50 rounded-full transition-colors"
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
                <div className="lg:hidden bg-gradient-to-br from-orange-50 to-amber-50 border-t border-orange-200">
                    <div className="container mx-auto px-6 py-6">
                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-4 mb-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 hover:text-[#f59e0b] transition-colors font-semibold py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile CTA */}
                        <Link
                            href={`${urlPrefix}/contact/`}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-white rounded-full transition-all font-bold shadow-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Sparkles className="w-4 h-4" />
                            Let's Create
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
