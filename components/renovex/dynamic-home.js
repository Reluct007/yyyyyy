'use client';

import RenovexHero from '@/components/renovex/hero';
import RenovexAbout from '@/components/renovex/about';
import RenovexServices from '@/components/renovex/services';
import RenovexStats from '@/components/renovex/stats';
import RenovexBanner from '@/components/renovex/banner';
import RenovexNewsletter from '@/components/renovex/newsletter';
import RenovexContactForm from '@/components/renovex/contact-form';
import ProductCarousel from '@/components/renovex/product-carousel';
import PromoBanner from '@/components/renovex/promo-banner';
import RenovexRequestSamples from '@/components/renovex/request-samples';
import CTA from "@/components/features/cta";
import { useSettings } from '@/lib/settings-context';

// Maono template components
import MaonoHero from '@/components/templates/maono-hero';
import MaonoTabbedProducts from '@/components/templates/maono-tabbed-products';
import MaonoInterestGrid from '@/components/templates/maono-interest-grid';
import MaonoValueProps from '@/components/templates/maono-value-props';
import FifineHero from '@/components/templates/fifine-hero';
import FifineTabbedProducts from '@/components/templates/fifine-tabbed-products';
import FifineCategoryGrid from '@/components/templates/fifine-category-grid';
import FifineValueProps from '@/components/templates/fifine-value-props';

export default function DynamicHome() {
    const { homepageModules, isLoading } = useSettings();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Get enabled modules sorted by order
    const enabledModules = Object.entries(homepageModules || {})
        .filter(([_, config]) => config.enabled)
        .sort((a, b) => a[1].order - b[1].order);

    const moduleComponents = {
        hero: RenovexHero,
        'product-carousel': ProductCarousel,
        'promo-banner': PromoBanner,
        about: RenovexAbout,
        services: RenovexServices,
        stats: RenovexStats,
        banner: RenovexBanner,
        newsletter: RenovexNewsletter,
        'request-samples': RenovexRequestSamples,
        contactForm: RenovexContactForm,
        // Maono template components
        'maono-hero': MaonoHero,
        'maono-tabbed-products': MaonoTabbedProducts,
        'maono-interest-grid': MaonoInterestGrid,
        'maono-value-props': MaonoValueProps,
        // Fifine template components
        'fifine-hero': FifineHero,
        'fifine-tabbed-products': FifineTabbedProducts,
        'fifine-category-grid': FifineCategoryGrid,
        'fifine-value-props': FifineValueProps
    };

    return (
        <>
            {enabledModules.map(([key, config]) => {
                const Component = moduleComponents[config.type] || moduleComponents[key];
                return Component ? (
                    <Component
                        key={key}
                        content={config.content}
                        containerWidth={config.containerWidth || 'container'}
                    />
                ) : null;
            })}
        </>
    );
}
