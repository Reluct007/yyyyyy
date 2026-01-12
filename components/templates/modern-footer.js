'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function ModernFooter({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const productLinks = [
        { name: 'Features', href: `${urlPrefix}/features/` },
        { name: 'Integrations', href: `${urlPrefix}/integrations/` },
        { name: 'Pricing', href: `${urlPrefix}/pricing/` },
        { name: 'API', href: `${urlPrefix}/api/` }
    ];

    const companyLinks = [
        { name: 'About', href: `${urlPrefix}/about/` },
        { name: 'Blog', href: `${urlPrefix}/blog/` },
        { name: 'Careers', href: `${urlPrefix}/careers/` },
        { name: 'Press', href: `${urlPrefix}/press/` }
    ];

    const resourceLinks = [
        { name: 'Documentation', href: `${urlPrefix}/docs/` },
        { name: 'Help Center', href: `${urlPrefix}/help/` },
        { name: 'Community', href: `${urlPrefix}/community/` },
        { name: 'Status', href: `${urlPrefix}/status/` }
    ];

    const legalLinks = [
        { name: 'Privacy', href: `${urlPrefix}/privacy-policy/` },
        { name: 'Terms', href: `${urlPrefix}/terms-of-service/` },
        { name: 'Security', href: `${urlPrefix}/security/` }
    ];

    const socialLinks = [
        { platform: 'Twitter', url: '#', icon: Twitter },
        { platform: 'GitHub', url: '#', icon: Github },
        { platform: 'LinkedIn', url: '#', icon: Linkedin },
        { platform: 'Facebook', url: '#', icon: Facebook }
    ];

    return (
        <footer className="bg-[#1e1b4b] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
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
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent">
                                {brandName}
                            </span>
                        </Link>
                        <p className="text-gray-300 mb-6 leading-relaxed max-w-sm">
                            Modern solutions for modern teams. Build faster, scale smarter.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-3">Stay updated</h4>
                            <form className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full bg-[#2d2a5a] text-white pl-10 pr-3 py-2.5 rounded-lg border border-[#3d3a6a] focus:border-[#6366f1] focus:outline-none transition-colors text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#6366f1] text-white rounded-lg transition-all font-semibold text-sm shadow-lg shadow-indigo-500/30"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        className="w-9 h-9 bg-[#2d2a5a] hover:bg-gradient-to-r hover:from-[#6366f1] hover:to-[#4f46e5] rounded-lg flex items-center justify-center transition-all duration-300"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Product</h3>
                        <ul className="space-y-2">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#a78bfa] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#a78bfa] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Resources</h3>
                        <ul className="space-y-2">
                            {resourceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#a78bfa] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#a78bfa] transition-colors text-sm"
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
            <div className="bg-[#15132b] border-t border-[#2d2a5a] py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>
                            © {new Date().getFullYear()} {brandName}. All rights reserved.
                        </p>
                        <p>
                            Built with ❤️ for modern teams
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
