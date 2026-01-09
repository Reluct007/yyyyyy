'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';

export default function RenovexFooter() {
    const { settings } = useSettings();
    const config = settings?.footer || {
        variant: 'classic',
        copyrightText: '© 2024 RNVX. All rights reserved.'
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Instagram, href: '#', label: 'Instagram' }
    ];

    const quickLinks = [
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact', href: '/contact' }
    ];

    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white font-bold text-xl mb-4">RNVX</h3>
                        <p className="text-sm leading-relaxed mb-4">
                            Building excellence through innovation and dedication to quality craftsmanship.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 bg-slate-800 hover:bg-[var(--color-primary)] rounded-lg flex items-center justify-center transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-[var(--color-primary)] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Construction</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Renovation</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Design</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Consulting</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">123 Business St, Suite 100<br />City, State 12345</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">info@rnvx.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">{config.copyrightText}</p>
                    <div className="flex gap-6 text-sm">
                        <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
