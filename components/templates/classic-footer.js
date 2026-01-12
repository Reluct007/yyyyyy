'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function ClassicFooter({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const companyLinks = [
        { name: 'About Us', href: `${urlPrefix}/about/` },
        { name: 'Careers', href: `${urlPrefix}/careers/` },
        { name: 'Press', href: `${urlPrefix}/press/` },
        { name: 'Investors', href: `${urlPrefix}/investors/` }
    ];

    const productLinks = [
        { name: 'All Products', href: `${urlPrefix}/collection/` },
        { name: 'Solutions', href: `${urlPrefix}/solutions/` },
        { name: 'Pricing', href: `${urlPrefix}/pricing/` },
        { name: 'Enterprise', href: `${urlPrefix}/enterprise/` }
    ];

    const supportLinks = [
        { name: 'Help Center', href: `${urlPrefix}/support/` },
        { name: 'Contact Us', href: `${urlPrefix}/contact/` },
        { name: 'Documentation', href: `${urlPrefix}/docs/` },
        { name: 'Community', href: `${urlPrefix}/community/` }
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: `${urlPrefix}/privacy-policy/` },
        { name: 'Terms of Service', href: `${urlPrefix}/terms-of-service/` },
        { name: 'Cookie Policy', href: `${urlPrefix}/cookies/` },
        { name: 'Accessibility', href: `${urlPrefix}/accessibility/` }
    ];

    const socialLinks = [
        { platform: 'Facebook', url: '#', icon: Facebook },
        { platform: 'Twitter', url: '#', icon: Twitter },
        { platform: 'LinkedIn', url: '#', icon: Linkedin },
        { platform: 'YouTube', url: '#', icon: Youtube }
    ];

    return (
        <footer className="bg-[#f5f5f5] text-gray-700 border-t border-gray-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href={`${urlPrefix}/`} className="flex items-center gap-3 mb-4">
                            <Image
                                src={logo}
                                alt={brandName}
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="text-xl font-bold text-[#0057B8]">{brandName}</span>
                        </Link>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Delivering professional solutions and exceptional service since 2025.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        className="w-9 h-9 bg-white border border-gray-300 hover:bg-[#0057B8] hover:text-white hover:border-[#0057B8] rounded-md flex items-center justify-center transition-all duration-300"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#0057B8] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
                        <ul className="space-y-2">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#0057B8] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#0057B8] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#0057B8] transition-colors"
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
            <div className="bg-white border-t border-gray-300 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                        <p>
                            © {new Date().getFullYear()} {brandName}. All rights reserved.
                        </p>
                        <p className="text-gray-500">
                            Trusted by businesses worldwide
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
