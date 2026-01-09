'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useSettings } from '@/lib/settings-context';

export default function RenovexHeader() {
    const { settings } = useSettings();
    const config = settings?.header || {
        variant: 'classic',
        logoText: 'Renovex',
        ctaText: 'Get In Touch'
    };

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = ['Home', 'Pages', 'Services', 'Projects', 'Blog', 'Contact Us'];

    // Variant rendering logic
    const isModern = config.variant === 'modern';
    const isMinimal = config.variant === 'minimal';

    // Determine header background based on variant and scroll state
    const getHeaderClasses = () => {
        if (isMinimal) {
            // Minimal variant: Always white background with border
            return isScrolled
                ? 'bg-white shadow-md py-3 border-slate-200'
                : 'bg-white py-4 border-slate-200';
        }
        if (isModern) {
            // Modern variant: Solid background with blur
            return isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 border-slate-100'
                : 'bg-white/90 backdrop-blur-sm py-4 border-slate-100';
        }
        // Classic variant: Gradient background
        return isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-slate-200'
            : 'bg-gradient-to-r from-slate-50 to-blue-50 py-4 border-slate-200';
    };

    const getTextColor = () => {
        // All variants now use dark text since they have light backgrounds
        return 'text-slate-900';
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${getHeaderClasses()}`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex items-center justify-center w-10 h-10 bg-[var(--color-primary)] rounded-sm group-hover:rotate-12 transition-transform">
                        <span className="font-bold text-black text-xl">{config.logoText?.[0] || 'R'}</span>
                    </div>
                    <span className={`text-2xl font-bold tracking-tight transition-colors ${getTextColor()}`}>
                        {config.logoText || 'Renovex'}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className={`font-medium transition-colors hover:text-[var(--color-primary)] ${getTextColor()}`}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`hover:bg-slate-100 ${getTextColor()}`}
                    >
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-semibold px-6 rounded-md shadow-sm">
                        {config.ctaText || 'Get In Touch'}
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon" className={getTextColor()}>
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-6 mt-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-lg font-medium text-slate-900 hover:text-[var(--color-primary)] transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-semibold w-full mt-4">
                                {config.ctaText || 'Get In Touch'}
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
