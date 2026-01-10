'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { home } from '@/data/home';

const SettingsContext = createContext();

// Available module types
const AVAILABLE_MODULES = {
    hero: { name: 'Hero Banner', icon: 'layout', category: 'hero', description: '主横幅区域' },
    'product-carousel': { name: 'Product Carousel', icon: 'shopping-cart', category: 'content', description: '产品轮播' },
    'promo-banner': { name: 'Promo Banner', icon: 'megaphone', category: 'content', description: '宣传横幅' },
    about: { name: 'About Section', icon: 'info', category: 'content', description: '关于我们' },
    services: { name: 'Services', icon: 'grid', category: 'content', description: '服务展示' },
    stats: { name: 'Statistics', icon: 'bar-chart', category: 'content', description: '统计数据' },
    newsletter: { name: 'Newsletter', icon: 'mail', category: 'cta', description: '邮件订阅' },
    'request-samples': { name: 'Request Samples', icon: 'clipboard', category: 'cta', description: '样品请求' },
    banner: { name: 'CTA Banner', icon: 'megaphone', category: 'cta', description: 'CTA横幅' },
    contactForm: { name: 'Contact Form', icon: 'message-square', category: 'form', description: '联系表单' }
};

// Default settings with extended structure
const DEFAULT_SETTINGS = {
    theme: {
        primaryColor: '#f59e0b',
        accentColor: '#f97316'
    },
    header: {
        variant: 'classic',
        logoText: 'RNVX',
        ctaText: 'Get In Touch'
    },
    footer: {
        variant: 'classic',
        copyrightText: '© 2024 RNVX. All rights reserved.'
    },
    seo: {
        global: {
            siteName: 'RNVX',
            titleTemplate: '%s | RNVX',
            defaultDescription: 'Professional construction and renovation services',
            keywords: ['construction', 'renovation', 'building'],
            ogImage: '/og-image.jpg',
            twitterHandle: '@rnvx'
        },
        pages: {
            home: {
                title: 'Home',
                description: 'Welcome to RNVX - Professional construction services',
                keywords: ['home', 'construction'],
                ogImage: '/home-og.jpg'
            },
            about: {
                title: 'About Us',
                description: 'Learn more about RNVX and our team',
                keywords: ['about', 'team'],
                ogImage: '/about-og.jpg'
            },
            contact: {
                title: 'Contact Us',
                description: 'Get in touch with RNVX',
                keywords: ['contact', 'support'],
                ogImage: '/contact-og.jpg'
            }
        }
    },
    pages: {
        about: {
            title: 'About Us',
            slug: 'about',
            layout: 'default',
            status: 'published',
            content: {
                sections: []
            }
        },
        contact: {
            title: 'Contact Us',
            slug: 'contact',
            layout: 'default',
            status: 'published',
            content: {
                sections: []
            }
        }
    },
    products: {
        layout: {
            listView: 'grid',
            gridColumns: 3,
            showFilters: true,
            showSorting: true,
            showSearch: true
        },
        detailPage: {
            layout: 'default',
            showRelated: true,
            showReviews: true,
            showBreadcrumbs: true
        },
        settings: {
            itemsPerPage: 12,
            enableQuickView: true,
            enableWishlist: true,
            enableCompare: true
        }
    },
    homepageModules: {
        hero: {
            enabled: true,
            order: 1,
            title: '主横幅',
            type: 'hero',
            containerWidth: 'container',
            content: {
                badge: home.hero.badge,
                heading: home.hero.title,
                description: home.hero.description,
                backgroundImage: home.hero.image,
                ctaPrimary: "View Collection",
                ctaSecondary: "Contact Us",
                variant: "split"
            }
        },
        services: {
            enabled: true,
            order: 2,
            title: 'Our Process',
            type: 'services',
            containerWidth: 'container',
            content: {
                sectionTitle: home.process.title,
                variant: "grid",
                services: home.process.items.map((item, idx) => ({
                    title: item.title,
                    description: item.description,
                    icon: ["ruler", "building", "hardhat"][idx % 3]
                }))
            }
        },
        stats: {
            enabled: false,
            order: 3,
            title: '统计数据',
            type: 'stats',
            containerWidth: 'container',
            content: {
                variant: "bar",
                stats: [
                    { value: "250+", label: "Projects", icon: "trophy" },
                    { value: "150+", label: "Clients", icon: "thumbsup" },
                    { value: "50+", label: "Team", icon: "users" },
                    { value: "25+", label: "Years", icon: "briefcase" }
                ]
            }
        }
    }
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [theme, setTheme] = useState(DEFAULT_SETTINGS.theme);
    const [homepageModules, setHomepageModules] = useState(DEFAULT_SETTINGS.homepageModules);
    const [seo, setSeo] = useState(DEFAULT_SETTINGS.seo);
    const [pages, setPages] = useState(DEFAULT_SETTINGS.pages);
    const [products, setProducts] = useState(DEFAULT_SETTINGS.products);
    const [isLoading, setIsLoading] = useState(true);

    // Load settings from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('site-settings');
            if (stored) {
                const data = JSON.parse(stored);
                setSettings(data);
                setTheme(data.theme || DEFAULT_SETTINGS.theme);
                setHomepageModules(data.homepageModules || DEFAULT_SETTINGS.homepageModules);
                setSeo(data.seo || DEFAULT_SETTINGS.seo);
                setPages(data.pages || DEFAULT_SETTINGS.pages);
                setProducts(data.products || DEFAULT_SETTINGS.products);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save settings to localStorage
    const saveSettings = async (newSettings) => {
        try {
            console.log('🔧 saveSettings called with:', newSettings);
            const jsonString = JSON.stringify(newSettings);
            console.log('📝 JSON string length:', jsonString.length);

            localStorage.setItem('site-settings', jsonString);
            console.log('✅ localStorage.setItem completed');

            // Verify it was saved
            const saved = localStorage.getItem('site-settings');
            console.log('🔍 Verification - saved data exists:', !!saved);

            setSettings(newSettings);
            setTheme(newSettings.theme || DEFAULT_SETTINGS.theme);
            setHomepageModules(newSettings.homepageModules || DEFAULT_SETTINGS.homepageModules);
            setSeo(newSettings.seo || DEFAULT_SETTINGS.seo);
            setPages(newSettings.pages || DEFAULT_SETTINGS.pages);
            setProducts(newSettings.products || DEFAULT_SETTINGS.products);

            console.log('✅ All state updated');
            return true;
        } catch (error) {
            console.error('❌ Failed to save settings:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            return false;
        }
    };

    // Module management functions
    const addModule = (moduleType, position = null) => {
        const moduleInfo = AVAILABLE_MODULES[moduleType];
        if (!moduleInfo) return false;

        const newModuleKey = `${moduleType}_${Date.now()}`;
        const maxOrder = Math.max(...Object.values(settings.homepageModules).map(m => m.order), 0);

        const newModule = {
            enabled: true,
            order: position !== null ? position : maxOrder + 1,
            title: moduleInfo.name,
            type: moduleType,
            containerWidth: 'container',
            content: getDefaultContent(moduleType)
        };

        const updatedSettings = {
            ...settings,
            homepageModules: {
                ...settings.homepageModules,
                [newModuleKey]: newModule
            }
        };

        return saveSettings(updatedSettings);
    };

    const deleteModule = (moduleKey) => {
        const { [moduleKey]: removed, ...remainingModules } = settings.homepageModules;
        const updatedSettings = {
            ...settings,
            homepageModules: remainingModules
        };
        return saveSettings(updatedSettings);
    };

    const duplicateModule = (moduleKey) => {
        const moduleData = settings.homepageModules[moduleKey];
        if (!moduleData) return false;

        const newModuleKey = `${moduleData.type}_${Date.now()}`;
        const newModule = {
            ...JSON.parse(JSON.stringify(moduleData)),
            order: moduleData.order + 0.5,
            title: `${moduleData.title} (Copy)`
        };

        const updatedSettings = {
            ...settings,
            homepageModules: {
                ...settings.homepageModules,
                [newModuleKey]: newModule
            }
        };

        return saveSettings(updatedSettings);
    };

    const reorderModules = (newOrder) => {
        const updatedModules = { ...settings.homepageModules };
        newOrder.forEach((key, index) => {
            if (updatedModules[key]) {
                updatedModules[key].order = index + 1;
            }
        });

        const updatedSettings = {
            ...settings,
            homepageModules: updatedModules
        };

        return saveSettings(updatedSettings);
    };

    const value = {
        settings,
        theme,
        homepageModules,
        seo,
        pages,
        products,
        isLoading,
        saveSettings,
        setSettings,
        availableModules: AVAILABLE_MODULES,
        // Module management
        addModule,
        deleteModule,
        addModule,
        deleteModule,
        duplicateModule,
        reorderModules,
        getDefaultContent // Expose helper for admin usage
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

// Helper function to get default content for module types
function getDefaultContent(moduleType) {
    const defaults = {
        hero: {
            badge: "New Section",
            heading: "Your Heading Here",
            description: "Your description here",
            backgroundImage: "/home/banner-showcase.jpg",
            ctaPrimary: "Get Started",
            ctaSecondary: "Learn More",
            variant: "split"
        },
        'product-carousel': {
            products: [
                { name: 'Product 1', description: 'Product description', badge: 'New', cta: 'Shop now' },
                { name: 'Product 2', description: 'Product description', badge: 'Sale', cta: 'Shop now' }
            ]
        },
        'promo-banner': {
            heading: "Promotional Heading",
            description: "Promotional description text goes here",
            ctas: ['Learn more', 'Shop now']
        },
        services: {
            sectionTitle: "Our Services",
            variant: "grid",
            services: [
                { title: "Service 1", description: "Description", icon: "ruler" },
                { title: "Service 2", description: "Description", icon: "building" }
            ]
        },
        stats: {
            variant: "bar",
            stats: [
                { value: "100+", label: "Metric", icon: "trophy" },
                { value: "50+", label: "Metric", icon: "users" }
            ]
        },
        about: {
            sectionTitle: "About Us",
            description: "Learn more about our company",
            image: "/home/banner-showcase.jpg",
            experienceYears: "10+",
            features: [
                { title: "Feature 1", description: "Description" },
                { title: "Feature 2", description: "Description" }
            ]
        },
        newsletter: {
            title: "Stay Updated",
            description: "Subscribe to our newsletter",
            placeholder: "Enter your email",
            ctaText: "Subscribe",
            backgroundColor: "white"
        },
        'request-samples': {
            title: "Request Samples & Pricing",
            description: "Get a quote for bulk orders, OEM/ODM customization, and reliable delivery.",
            showBorder: true,
            backgroundColor: "white"
        },
        banner: {
            title: "Ready to Start?",
            description: "Let's work together",
            ctaText: "Get Started",
            ctaLink: "/contact"
        },
        contactForm: {
            title: "Get In Touch",
            description: "We'd love to hear from you",
            contactInfo: {
                email: "info@example.com",
                phone: "+1 (555) 123-4567",
                address: "123 Business St, City, State 12345"
            }
        }
    };

    return defaults[moduleType] || {};
}
