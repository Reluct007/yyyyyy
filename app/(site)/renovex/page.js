'use client';

import RenovexHero from '@/components/renovex/hero';
import RenovexAbout from '@/components/renovex/about';
import RenovexServices from '@/components/renovex/services';
import RenovexStats from '@/components/renovex/stats';
import RenovexBanner from '@/components/renovex/banner';
import RenovexNewsletter from '@/components/renovex/newsletter';
import RenovexContactForm from '@/components/renovex/contact-form';
import CTA from "@/components/features/cta";
import { useSettings } from '@/lib/settings-context';

export default function RenovexHome() {
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
        about: RenovexAbout,
        services: RenovexServices,
        stats: RenovexStats,
        banner: RenovexBanner,
        newsletter: RenovexNewsletter,
        contactForm: RenovexContactForm
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

            <RenovexAwaitingCTA />
        </>
    );
}

function RenovexAwaitingCTA() {
    return (
        <div className="border-t border-slate-100">
            <CTA
                className="bg-blue-50/30"
                buttonClassName="bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
            />
        </div>
    );
}
