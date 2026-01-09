'use client';

import SubscribeForm from "@/components/features/subscribe-form";
import { useLanguage } from "@/lib/language-context";

export default function RenovexRequestSamples({ content, containerWidth = 'container' }) {
    const { translations } = useLanguage();

    const {
        title = translations.home?.cta?.title || "Request Samples & Pricing",
        description = translations.home?.cta?.description || "Get a quote for bulk orders, OEM/ODM customization, and reliable delivery.",
        showBorder = true,
        backgroundColor = "white"
    } = content || {};

    const getContainerClass = () => {
        if (containerWidth === 'full') {
            return 'w-full px-4';
        }
        return 'container mx-auto px-4 max-w-7xl';
    };

    const getBgClass = () => {
        if (backgroundColor === 'gradient') {
            return 'bg-gradient-to-r from-primary/5 to-primary/10';
        }
        if (backgroundColor === 'blue') {
            return 'bg-blue-50/30';
        }
        return 'bg-white';
    };

    return (
        <section className={`py-8 ${getBgClass()} ${showBorder ? 'border-t border-slate-100' : ''}`}>
            <div className={getContainerClass()}>
                <div className="flex w-full flex-col gap-8 overflow-hidden rounded-2xl border border-border/50 bg-card p-8 shadow-lg lg:flex-row lg:items-center lg:gap-12 lg:p-12">
                    <div className="flex-1">
                        <h3 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                            {title}
                        </h3>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <SubscribeForm buttonClassName="bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200" />
                    </div>
                </div>
            </div>
        </section>
    );
}
