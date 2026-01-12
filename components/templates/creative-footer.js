'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Globe, Palette, Twitter, Heart } from 'lucide-react';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { DEFAULT_LOCALE } from '@/data/i18n';

export default function CreativeFooter({ config = {} }) {
    const { translations, locale } = useLanguage();
    const urlPrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    const {
        logo = '/logo1.webp',
        brandName = basic.info.brand
    } = config;

    const workLinks = [
        { name: 'Portfolio', href: `${urlPrefix}/portfolio/` },
        { name: 'Case Studies', href: `${urlPrefix}/case-studies/` },
        { name: 'Testimonials', href: `${urlPrefix}/testimonials/` }
    ];

    const servicesLinks = [
        { name: 'Branding', href: `${urlPrefix}/branding/` },
        { name: 'Web Design', href: `${urlPrefix}/web-design/` },
        { name: 'Illustration', href: `${urlPrefix}/illustration/` }
    ];

    const companyLinks = [
        { name: 'About', href: `${urlPrefix}/about/` },
        { name: 'Blog', href: `${urlPrefix}/blog/` },
        { name: 'Contact', href: `${urlPrefix}/contact/` }
    ];

    const socialLinks = [
        { platform: 'Instagram', url: '#', icon: Instagram },
        { platform: 'Portfolio', url: '#', icon: Globe },
        { platform: 'Design', url: '#', icon: Palette },
        { platform: 'Twitter', url: '#', icon: Twitter }
    ];

    return (
        <footer className="bg-gradient-to-br from-[#f59e0b] via-[#f97316] to-[#ea580c] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column - Larger */}
                    <div className="lg:col-span-2">
                        <Link href={`${urlPrefix}/`} className="flex items-center gap-3 mb-6">
                            <Image
                                src={logo}
                                alt={brandName}
                                width={50}
                                height={50}
                                className="w-12 h-12"
                            />
                            <span className="text-3xl font-black text-white">
                                {brandName}
                            </span>
                        </Link>
                        <p className="text-white/90 mb-8 leading-relaxed text-lg max-w-md">
                            We craft bold, beautiful experiences that inspire and delight. Let's create something amazing together.
                        </p>

                        {/* Large Social Media Icons */}
                        <div className="flex gap-4 mb-8">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        className="w-12 h-12 bg-white/20 hover:bg-white hover:text-[#f59e0b] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-lg font-bold mb-3">Get Inspired Weekly</h4>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 bg-white/20 text-white placeholder-white/70 px-4 py-3 rounded-full border-2 border-white/30 focus:border-white focus:outline-none transition-colors backdrop-blur-sm"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-white text-[#f59e0b] hover:bg-white/90 rounded-full transition-all font-bold shadow-lg hover:scale-105"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Work Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Our Work</h3>
                        <ul className="space-y-3">
                            {workLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-bold mb-4 mt-8 text-white">Services</h3>
                        <ul className="space-y-3">
                            {servicesLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <h4 className="font-bold mb-2">Let's Talk</h4>
                            <a href="mailto:hello@example.com" className="text-white/90 hover:text-white underline">
                                hello@example.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-black/20 backdrop-blur-sm py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/90">
                        <p className="flex items-center gap-2">
                            © {new Date().getFullYear()} {brandName}. Made with <Heart className="w-4 h-4 fill-current" /> and creativity
                        </p>
                        <div className="flex gap-6">
                            <Link href={`${urlPrefix}/privacy-policy/`} className="hover:text-white transition-colors">
                                Privacy
                            </Link>
                            <Link href={`${urlPrefix}/terms-of-service/`} className="hover:text-white transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
