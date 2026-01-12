'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function MaonoFooter({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand,
        socialLinks = [
            { platform: 'facebook', url: '#', icon: Facebook },
            { platform: 'twitter', url: '#', icon: Twitter },
            { platform: 'instagram', url: '#', icon: Instagram },
            { platform: 'youtube', url: '#', icon: Youtube }
        ]
    } = config;

    const productLinks = [
        { name: 'Microphones', href: `${urlPrefix}/collection/microphones/` },
        { name: 'Audio Mixers', href: `${urlPrefix}/collection/mixers/` },
        { name: 'Accessories', href: `${urlPrefix}/collection/accessories/` }
    ];

    const supportLinks = [
        { name: 'Contact Us', href: `${urlPrefix}/contact/` },
        { name: 'FAQs', href: `${urlPrefix}/faq/` },
        { name: 'Shipping', href: `${urlPrefix}/shipping/` },
        { name: 'Returns', href: `${urlPrefix}/returns/` }
    ];

    const companyLinks = [
        { name: 'About Us', href: `${urlPrefix}/about/` },
        { name: 'Blog', href: `${urlPrefix}/blog/` },
        { name: 'Careers', href: `${urlPrefix}/careers/` }
    ];

    return (
        <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div>
                        <Link href={`${urlPrefix}/`} className="flex items-center gap-3 mb-4">
                            <Image
                                src={logo}
                                alt={brandName}
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="text-xl font-bold text-black">{brandName}</span>
                        </Link>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Professional audio solutions for creators worldwide.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        className="w-9 h-9 bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black rounded-md flex items-center justify-center transition-all duration-300"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Products</h3>
                        <ul className="space-y-2">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-black hover:underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-black hover:underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-black hover:underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-white border-t border-gray-200 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                        <p>
                            © {new Date().getFullYear()} {brandName}. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href={`${urlPrefix}/privacy-policy/`}
                                className="hover:text-black hover:underline transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href={`${urlPrefix}/terms-of-service/`}
                                className="hover:text-black hover:underline transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
