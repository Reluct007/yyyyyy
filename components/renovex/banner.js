'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function RenovexBanner({ content, containerWidth = 'container' }) {
    const {
        title = "Ready to Start Your Project?",
        description = "Let's build something amazing together",
        ctaText = "Get Started",
        ctaLink = "/contact"
    } = content || {};

    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    return (
        <section className="py-16 bg-slate-900">
            <div className={getContainerClass()}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {title}
                        </h2>
                        <p className="text-xl text-slate-400">
                            {description}
                        </p>
                    </div>
                    <Button
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-semibold px-8 py-6 text-lg rounded-md shadow-lg hover:shadow-xl transition-all group"
                    >
                        {ctaText}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
