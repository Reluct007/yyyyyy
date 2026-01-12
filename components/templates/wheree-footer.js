'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function WhereeFooter({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const exploreLinks = [
        { name: 'All Categories', href: `${urlPrefix}/collection/` },
        { name: 'Popular Places', href: `${urlPrefix}/popular/` },
        { name: 'New Listings', href: `${urlPrefix}/new/` },
        { name: 'Top Rated', href: `${urlPrefix}/top-rated/` }
    ];

    const companyLinks = [
        { name: 'About Us', href: `${urlPrefix}/about/` },
        { name: 'Blog', href: `${urlPrefix}/blog/` },
        { name: 'Careers', href: `${urlPrefix}/careers/` },
        { name: 'Contact', href: `${urlPrefix}/contact/` }
    ];

    const supportLinks = [
        { name: 'Help Center', href: `${urlPrefix}/help/` },
        { name: 'Safety', href: `${urlPrefix}/safety/` },
        { name: 'Terms', href: `${urlPrefix}/terms-of-service/` },
        { name: 'Privacy', href: `${urlPrefix}/privacy-policy/` }
    ];

    const socialLinks = [
        { platform: 'Facebook', url: '#', icon: Facebook },
        { platform: 'Twitter', url: '#', icon: Twitter },
        { platform: 'Instagram', url: '#', icon: Instagram },
        { platform: 'LinkedIn', url: '#', icon: Linkedin }
    ];

    return (
        <footer className="bg-white text-gray-700 border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200">
                        <Link href={`${urlPrefix}/`} className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">{brandName}</span>
                        </Link>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Discover amazing places and experiences near you.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4 text-[#f97316]" />
                                <span>hello@example.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4 text-[#f97316]" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                        </div>
                    </div>

                    {/* Explore Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-orange-300 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore</h3>
                        <ul className="space-y-2">
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#f97316] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-orange-300 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-[#f97316] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Card */}
                    <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] p-6 rounded-2xl text-white">
                        <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                        <p className="text-white/90 mb-4 text-sm">
                            Get the latest updates and offers.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-white/20 text-white placeholder-white/70 px-4 py-2.5 rounded-xl border-2 border-white/30 focus:border-white focus:outline-none transition-colors backdrop-blur-sm"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2.5 bg-white text-[#f97316] hover:bg-white/90 rounded-xl transition-all font-semibold"
                            >
                                Subscribe
                            </button>
                        </form>

                        {/* Social Media */}
                        <div className="flex gap-2 mt-6">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        className="w-9 h-9 bg-white/20 hover:bg-white hover:text-[#f97316] rounded-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Support Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {supportLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-gray-600 hover:text-[#f97316] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-gray-50 border-t border-gray-200 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                        <p>
                            © {new Date().getFullYear()} {brandName}. All rights reserved.
                        </p>
                        <p className="text-gray-500">
                            Connecting communities worldwide
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
