'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function FifineFooter({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand,
        showNewsletter = true,
        socialLinks = [
            { platform: 'facebook', url: '#', icon: Facebook },
            { platform: 'twitter', url: '#', icon: Twitter },
            { platform: 'instagram', url: '#', icon: Instagram },
            { platform: 'youtube', url: '#', icon: Youtube }
        ]
    } = config;

    const productCategories = [
        { name: 'Microphones', href: `${urlPrefix}/collection/microphones/` },
        { name: 'Audio Mixers', href: `${urlPrefix}/collection/mixers/` },
        { name: 'Gaming Headsets', href: `${urlPrefix}/collection/headsets/` },
        { name: 'Accessories', href: `${urlPrefix}/collection/accessories/` },
        { name: 'Boom Arms', href: `${urlPrefix}/collection/boom-arms/` }
    ];

    const supportLinks = [
        { name: 'Contact Us', href: `${urlPrefix}/contact/` },
        { name: 'FAQs', href: `${urlPrefix}/faq/` },
        { name: 'Shipping Info', href: `${urlPrefix}/shipping/` },
        { name: 'Returns', href: `${urlPrefix}/returns/` },
        { name: 'Warranty', href: `${urlPrefix}/warranty/` }
    ];

    const companyLinks = [
        { name: 'About Us', href: `${urlPrefix}/about/` },
        { name: 'Blog', href: `${urlPrefix}/blog/` },
        { name: 'Careers', href: `${urlPrefix}/careers/` },
        { name: 'Press', href: `${urlPrefix}/press/` }
    ];

    return (
        <footer className="bg-[#121212] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href={`${urlPrefix}/`} className="flex items-center gap-3 mb-4">
                            <Image
                                src={logo}
                                alt={brandName}
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="text-2xl font-bold">{brandName}</span>
                        </Link>
                        <p className="text-[#a1a1a1] mb-6 leading-relaxed max-w-sm">
                            Professional audio equipment for content creators, gamers, and podcasters.
                            Elevate your sound with our premium microphones, mixers, and accessories.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        className="w-10 h-10 bg-[#1c1c1c] hover:bg-[#d22730] rounded-full flex items-center justify-center transition-colors duration-300"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Products</h3>
                        <ul className="space-y-3">
                            {productCategories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[#a1a1a1] hover:text-[#d22730] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            {supportLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[#a1a1a1] hover:text-[#d22730] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[#a1a1a1] hover:text-[#d22730] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                {showNewsletter && (
                    <div className="mt-12 pt-12 border-t border-white/10">
                        <div className="max-w-2xl mx-auto text-center">
                            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                            <p className="text-[#a1a1a1] mb-6">
                                Subscribe to our newsletter for exclusive deals, new product launches, and audio tips.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1a1]" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full bg-[#1c1c1c] text-white pl-12 pr-4 py-3 rounded-full border-2 border-transparent focus:border-[#d22730] focus:outline-none transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#d22730] hover:bg-[#b01f28] text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Copyright Bar */}
            <div className="bg-[#0a0a0a] py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a1a1a1]">
                        <p>
                            © {new Date().getFullYear()} {brandName}. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href={`${urlPrefix}/privacy-policy/`}
                                className="hover:text-[#d22730] transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href={`${urlPrefix}/terms-of-service/`}
                                className="hover:text-[#d22730] transition-colors"
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
