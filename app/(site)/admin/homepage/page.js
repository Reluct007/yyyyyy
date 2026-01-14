'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, ChevronDown, ChevronUp, Plus, Trash2, GripVertical, Palette } from 'lucide-react';
import { Reorder, useDragControls } from "framer-motion";
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/image-upload';
import { product as productData } from '@/data/product';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Template presets
const TEMPLATES = {
    classic: {
        name: 'Classic Business',
        description: 'AT&T Style Corporate',
        theme: { primaryColor: '#0057B8', accentColor: '#00388F' }, // AT&T Blue
        headerType: 'classic',
        footerType: 'classic',
        modules: {
            hero: {
                enabled: true, order: 1, title: 'Hero Banner', type: 'hero', containerWidth: 'full',
                content: {
                    heading: "Get our best deals on America's fastest and most reliable network",
                    variant: "att-style",
                    productCards: [
                        {
                            badge: "Get it for $0",
                            title: "iPhone 17 Pro (for $0)",
                            subtitle: "with eligible trade-in",
                            cta: "Shop iPhone"
                        },
                        {
                            badge: "Limited time",
                            title: "Get 6 months of Apple Music free",
                            subtitle: "with eligible unlimited plan",
                            cta: "Get started"
                        }
                    ]
                }
            },
            productCarousel: {
                enabled: true, order: 2, title: 'Product Deals', type: 'product-carousel', containerWidth: 'container',
                content: {
                    products: [
                        { name: 'iPhone 17', description: 'Get it for $0 with eligible trade-in', badge: 'Best Deal', cta: 'Shop now' },
                        { name: 'Google Pixel 10 Pro XL', description: 'Save up to $800', badge: 'New', cta: 'Shop now' },
                        { name: 'Samsung Galaxy S25', description: 'Pre-order now', badge: 'Pre-order', cta: 'Shop now' },
                        { name: 'Motorola razr+', description: 'Flip into savings', badge: 'Limited Time', cta: 'Shop now' }
                    ]
                }
            },
            promoBanner: {
                enabled: true, order: 3, title: 'Promotional Banner', type: 'promo-banner', containerWidth: 'full',
                content: {
                    heading: "We've got your back. Guaranteed.",
                    description: "Get the best wireless coverage and support when you need it most. Our network reliability is unmatched.",
                    ctas: ['Learn more', 'Shop deals']
                }
            },
            services: {
                enabled: true, order: 4, title: 'Service Grid', type: 'services', containerWidth: 'container',
                content: {
                    sectionTitle: "Let's get you connected",
                    variant: "att-grid",
                    services: [
                        { title: "Trade in your phone and get credit", description: "Get up to $1000 off when you trade in your old device.", icon: "building", cta: "Get started" },
                        { title: "Get Unlimited for the whole family", description: "Save more when you add more lines to your plan.", icon: "users", cta: "Explore plans" },
                        { title: "Bundle home internet and wireless", description: "Get the best value when you bundle services together.", icon: "ruler", cta: "Shop bundles" },
                        { title: "Check out our latest deals", description: "Don't miss out on limited-time offers and promotions.", icon: "hardhat", cta: "See offers" }
                    ]
                }
            }
        }
    },
    modern: {
        name: 'Modern SaaS',
        description: '现代科技风格',
        theme: { primaryColor: '#6366f1', accentColor: '#4f46e5' },
        headerType: 'modern',
        footerType: 'modern',
        modules: {
            hero: {
                enabled: true, order: 1, title: '主横幅', type: 'hero', containerWidth: 'full',
                content: {
                    badge: "Modern Tech Platform",
                    heading: "Build Better Products Faster",
                    description: "The all-in-one platform for modern teams to collaborate and ship amazing products.",
                    backgroundImage: "/home/banner-showcase.jpg",
                    ctaPrimary: "Start Free Trial",
                    ctaSecondary: "View Demo",
                    variant: "compact"
                }
            },
            services: {
                enabled: true, order: 2, title: '服务展示', type: 'services', containerWidth: 'container',
                content: {
                    sectionTitle: "Platform Features",
                    variant: "blocks",
                    services: [
                        { title: "Real-time Collaboration", description: "Work together seamlessly with your team.", icon: "users" },
                        { title: "Advanced Analytics", description: "Get insights with powerful analytics tools.", icon: "building" },
                        { title: "Secure Infrastructure", description: "Enterprise-grade security to protect your data.", icon: "hardhat" }
                    ]
                }
            },
            stats: {
                enabled: true, order: 3, title: '统计数据', type: 'stats', containerWidth: 'full',
                content: {
                    variant: "badges",
                    stats: [
                        { value: "10M+", label: "Users", icon: "users" },
                        { value: "99.9%", label: "Uptime", icon: "trophy" },
                        { value: "150+", label: "Countries", icon: "briefcase" },
                        { value: "24/7", label: "Support", icon: "thumbsup" }
                    ]
                }
            }
        }
    },
    creative: {
        name: 'Creative Portfolio',
        description: '创意作品集风格',
        theme: { primaryColor: '#f59e0b', accentColor: '#f97316' },
        headerType: 'creative',
        footerType: 'creative',
        modules: {
            hero: {
                enabled: true, order: 1, title: '主横幅', type: 'hero', containerWidth: 'container',
                content: {
                    badge: "Design Studio",
                    heading: "Less Is More",
                    description: "We create spaces that inspire and function in perfect harmony.",
                    backgroundImage: "/home/banner-showcase.jpg",
                    ctaPrimary: "View Portfolio",
                    ctaSecondary: "Our Story",
                    variant: "editorial"
                }
            },
            services: {
                enabled: true, order: 2, title: '服务展示', type: 'services', containerWidth: 'container',
                content: {
                    sectionTitle: "What We Do",
                    variant: "minimal",
                    services: [
                        { title: "Brand Identity", description: "Creating memorable brand experiences.", icon: "building" },
                        { title: "Digital Design", description: "Crafting beautiful digital products.", icon: "ruler" },
                        { title: "Art Direction", description: "Guiding visual narratives.", icon: "hardhat" }
                    ]
                }
            },
            stats: {
                enabled: true, order: 3, title: '统计数据', type: 'stats', containerWidth: 'container',
                content: {
                    variant: "inline",
                    stats: [
                        { value: "100+", label: "Projects" },
                        { value: "50+", label: "Clients" },
                        { value: "15", label: "Awards" },
                        { value: "10", label: "Years" }
                    ]
                }
            }
        }
    },
    wheree: {
        name: 'Wheree Style',
        description: 'Modern card-based layout',
        theme: { primaryColor: '#f97316', accentColor: '#ea580c' }, // Orange
        headerType: 'wheree',
        footerType: 'wheree',
        modules: {
            hero: {
                enabled: true, order: 1, title: 'Hero Section', type: 'hero', containerWidth: 'full',
                content: {
                    heading: "Find Your Perfect Poker Set",
                    description: "Browse our collection of professional poker equipment and accessories",
                    variant: "compact",
                    ctaPrimary: "Shop Now",
                    ctaSecondary: "Learn More"
                }
            },
            productCarousel: {
                enabled: true, order: 2, title: 'Featured Products', type: 'product-carousel', containerWidth: 'container',
                content: {
                    products: [
                        { name: 'Professional Poker Set', description: 'Complete 500-piece set', badge: 'Best Seller', cta: 'View Details' },
                        { name: 'Clay Poker Chips', description: 'Casino-grade quality', badge: 'Premium', cta: 'Shop now' },
                        { name: 'Folding Poker Table', description: 'Professional felt surface', badge: 'New', cta: 'Shop now' }
                    ]
                }
            },
            promoBanner: {
                enabled: true, order: 3, title: 'Feature Banner', type: 'promo-banner', containerWidth: 'full',
                content: {
                    heading: "Premium Quality Guaranteed",
                    description: "All our poker sets are carefully selected and tested to ensure the best gaming experience.",
                    ctas: ['Shop Collection', 'Learn More']
                }
            }
        }
    },
    maono: {
        name: 'Maono Style',
        description: 'Premium audio brand aesthetic',
        theme: { primaryColor: '#000000', accentColor: '#333333' }, // Black/Gray
        headerType: 'maono',
        footerType: 'maono',
        modules: {
            maonoHero: {
                enabled: true, order: 1, title: 'Hero Slider', type: 'maono-hero', containerWidth: 'full',
                content: {
                    slides: [
                        {
                            image: '/home/maono-hero-1.png',
                            productName: 'PD200W Hybrid',
                            tagline: 'New Product Launch',
                            cta: 'SHOP NOW'
                        },
                        {
                            image: '/home/maono-podcasting.png',
                            productName: 'Wave T5',
                            tagline: 'Wireless Freedom',
                            cta: 'SHOP NOW'
                        }
                    ]
                }
            },
            maonoTabbedProducts: {
                enabled: true, order: 2, title: 'Featured Products', type: 'maono-tabbed-products', containerWidth: 'full',
                content: {
                    categories: [
                        {
                            name: 'Microphone',
                            products: [
                                {
                                    label: 'Wave T5',
                                    description: 'Wireless Microphone for Content Creators',
                                    features: ['Noise Cancellation', 'XLR & USB', 'Dynamic'],
                                    image: '/home/maono-product-pd400x.png',
                                    price: '$299.99',
                                    learnMoreUrl: '#',
                                    orderNowUrl: '#'
                                },
                                {
                                    label: 'PD400X',
                                    description: 'Dynamic Microphone for Podcasting',
                                    features: ['XLR', 'USB', 'RGB Lighting'],
                                    image: '/home/banner-showcase.jpg',
                                    price: '$199.99',
                                    learnMoreUrl: '#',
                                    orderNowUrl: '#'
                                }
                            ]
                        },
                        {
                            name: 'Audio Mixer',
                            products: [
                                {
                                    label: 'Maonocaster E2',
                                    description: 'All-in-One Audio Mixer',
                                    features: ['4 Channels', 'Sound Effects', 'Bluetooth'],
                                    image: '/home/maono-product-mixer.png',
                                    price: '$149.99',
                                    learnMoreUrl: '#',
                                    orderNowUrl: '#'
                                }
                            ]
                        }
                    ]
                }
            },
            maonoInterestGrid: {
                enabled: true, order: 3, title: 'Shop By Interest', type: 'maono-interest-grid', containerWidth: 'full',
                content: {
                    title: 'Shop By Interest',
                    categories: [
                        { name: 'Gaming', image: '/home/maono-gaming.png', url: '#' },
                        { name: 'Podcasting', image: '/home/maono-podcasting.png', url: '#' },
                        { name: 'Streaming', image: '/home/maono-streaming.png', url: '#' },
                        { name: 'Music Production', image: '/home/maono-music.png', url: '#' }
                    ]
                }
            },
            maonoValueProps: {
                enabled: true, order: 4, title: 'Why Choose Us', type: 'maono-value-props', containerWidth: 'full',
                content: {
                    title: '5 Reasons Why Select Maono',
                    values: [
                        { icon: 'award', title: 'Premium Quality', description: 'Professional-grade audio equipment trusted by creators worldwide' },
                        { icon: 'shield', title: 'Warranty Protection', description: '2-year warranty on all products with hassle-free replacement' },
                        { icon: 'headphones', title: '24/7 Support', description: 'Expert technical support available whenever you need help' },
                        { icon: 'truck', title: 'Fast Shipping', description: 'Free shipping on orders over $50 with tracking' },
                        { icon: 'heart', title: 'Customer First', description: 'Your satisfaction is our top priority, always' }
                    ]
                }
            }
        }
    },
    fifine: {
        name: 'Fifine Style',
        description: 'Dark gaming aesthetic with vibrant red accents',
        theme: { primaryColor: '#d22730', accentColor: '#b01f28' }, // Fifine Red
        headerType: 'fifine',
        footerType: 'fifine',
        modules: {
            fifineHero: {
                enabled: true, order: 1, title: 'Hero Slider', type: 'fifine-hero', containerWidth: 'full',
                content: {
                    slides: [
                        {
                            image: '/home/fifine_hero_newyear.jpg',
                            title: '15% OFF',
                            subtitle: 'Find Your 2026 Audio Upgrade',
                            description: 'The new year deserves a new sound. Get 15% off on our best-selling microphones, mixers, and headsets.',
                            cta: 'Shop Bundle Deals',
                            ctaLink: '#'
                        }
                    ]
                }
            },
            fifineTabbedProducts: {
                enabled: true, order: 2, title: 'Amazing Products', type: 'fifine-tabbed-products', containerWidth: 'full',
                content: {
                    title: 'FIFINE Amazing Products',
                    subtitle: 'Try Them, You Might Like It',
                    categories: [
                        {
                            id: 'bundle',
                            name: 'MEGA Bundle Deal',
                            products: [
                                {
                                    id: 1,
                                    name: 'Wave T5',
                                    price: '$299.99',
                                    originalPrice: '$399.99',
                                    image: '/home/fifine_microphones.jpg',
                                    badge: 'HOT',
                                    features: ['RGB Lighting', 'USB-C', 'Mute Button']
                                },
                                {
                                    id: 2,
                                    name: 'SC8 Mixer',
                                    price: '$199.99',
                                    image: '/home/fifine_mixers.png',
                                    badge: 'NEW',
                                    features: ['4 Channels', 'Bluetooth', 'Sound Effects']
                                }
                            ]
                        },
                        {
                            id: 'bestselling',
                            name: 'Best Selling',
                            products: [
                                {
                                    id: 3,
                                    name: 'H13 Headset',
                                    price: '$79.99',
                                    image: '/home/fifine_headsets.jpg',
                                    features: ['7.1 Surround', 'RGB', 'Comfortable']
                                },
                                {
                                    id: 4,
                                    name: 'Boom Arm Stand',
                                    price: '$49.99',
                                    image: '/home/fifine_boom_arm.jpg',
                                    features: ['Heavy Duty', 'Cable Management', 'Adjustable']
                                }
                            ]
                        },
                        {
                            id: 'new',
                            name: "What's NEW",
                            products: [
                                {
                                    id: 5,
                                    name: 'Accessories Kit',
                                    price: '$39.99',
                                    image: '/home/fifine_accessories.jpg',
                                    badge: 'NEW',
                                    features: ['Pop Filter', 'Shock Mount', 'Windscreen']
                                }
                            ]
                        }
                    ]
                }
            },
            fifineCategoryGrid: {
                enabled: true, order: 3, title: 'Find Your Match', type: 'fifine-category-grid', containerWidth: 'full',
                content: {
                    title: 'Find Your Perfect Match',
                    subtitle: 'Explore our complete range of audio equipment',
                    categories: [
                        {
                            id: 1,
                            name: 'Microphones',
                            image: '/home/fifine_microphones.jpg',
                            link: '#',
                            size: 'large'
                        },
                        {
                            id: 2,
                            name: 'Audio Mixers',
                            image: '/home/fifine_mixers.png',
                            link: '#',
                            size: 'medium'
                        },
                        {
                            id: 3,
                            name: 'Gaming Headsets',
                            image: '/home/fifine_headsets.jpg',
                            link: '#',
                            size: 'medium'
                        },
                        {
                            id: 4,
                            name: 'Accessories',
                            image: '/home/fifine_accessories.jpg',
                            link: '#',
                            size: 'small'
                        },
                        {
                            id: 5,
                            name: 'Boom Arms & Stands',
                            image: '/home/fifine_boom_arm.jpg',
                            link: '#',
                            size: 'small'
                        }
                    ]
                }
            },
            fifineValueProps: {
                enabled: true, order: 4, title: 'Why Choose Us', type: 'fifine-value-props', containerWidth: 'full',
                content: {
                    title: 'Why Choose FIFINE?',
                    values: [
                        {
                            id: 1,
                            icon: 'truck',
                            title: 'Free Shipping',
                            description: 'Free shipping on orders over $50'
                        },
                        {
                            id: 2,
                            icon: 'award',
                            title: 'Quality Assurance',
                            description: 'Premium audio equipment guaranteed'
                        },
                        {
                            id: 3,
                            icon: 'rotate',
                            title: '30-Day Return',
                            description: 'Easy returns within 30 days'
                        },
                        {
                            id: 4,
                            icon: 'shield',
                            title: 'Secure Payment',
                            description: '100% secure transactions'
                        },
                        {
                            id: 5,
                            icon: 'headphones',
                            title: '24/7 Support',
                            description: 'Always here to help you'
                        },
                        {
                            id: 6,
                            icon: 'badge',
                            title: 'Warranty',
                            description: '1-year manufacturer warranty'
                        }
                    ]
                }
            }
        }
    }
};

function SortableModuleItem({ uniqueKey, module, isExpanded, onExpand, onToggle, onDelete, onUpdateContainerWidth, children }) {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={uniqueKey}
            dragListener={false}
            dragControls={controls}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                <div
                    onPointerDown={(e) => controls.start(e)}
                    className="cursor-move p-1 hover:bg-slate-200 rounded touch-none"
                >
                    <GripVertical className="w-5 h-5 text-slate-400" />
                </div>

                <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-lg">
                        {module.title}
                    </h4>
                    <p className="text-sm text-slate-500">Order: {module.order}</p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600 font-medium">
                        {module.enabled ? '显示' : '隐藏'}
                    </span>
                    <Switch
                        checked={module.enabled}
                        onCheckedChange={onToggle}
                    />
                    <button
                        onClick={onDelete}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                        title="删除模块"
                    >
                        <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                    </button>
                    <button
                        onClick={onExpand}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {isExpanded ?
                            <ChevronUp className="w-5 h-5 text-slate-600" /> :
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                        }
                    </button>
                </div>
            </div>

            {isExpanded && (
                <>
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                            容器宽度 <span className="text-xs text-slate-400 font-normal">Container Width</span>
                        </label>
                        <select
                            value={module.containerWidth || 'container'}
                            onChange={(e) => onUpdateContainerWidth(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="container">容器宽度 (Container - max-w-7xl)</option>
                            <option value="full">全屏宽度 (Full Width)</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">
                            💡 容器宽度适合内容聚焦,全屏宽度适合大气展示
                        </p>
                    </div>
                    {children}
                </>
            )}
        </Reorder.Item>
    );
}

export default function AdminHomepage() {
    const { settings, saveSettings, availableModules, getDefaultContent } = useSettings();
    const [localSettings, setLocalSettings] = useState(null);
    const [expandedModule, setExpandedModule] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const [isSaving, setIsSaving] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null);
    const [productSelectorOpen, setProductSelectorOpen] = useState(false);
    const [currentModuleKey, setCurrentModuleKey] = useState(null);

    useEffect(() => {
        if (settings) {
            setLocalSettings(JSON.parse(JSON.stringify(settings)));

            // 检测当前使用的模板
            const currentTemplate = detectCurrentTemplate(settings);
            setSelectedTemplate(currentTemplate);
        }
    }, [settings]);

    // 根据 settings 检测当前模板
    const detectCurrentTemplate = (settings) => {
        const { theme, homepageModules } = settings;

        // 遍历所有模板，找到匹配的
        for (const [key, template] of Object.entries(TEMPLATES)) {
            // 比较主题色
            if (theme?.primaryColor === template.theme.primaryColor &&
                theme?.accentColor === template.theme.accentColor) {
                return key;
            }
        }

        // 默认返回 classic
        return 'classic';
    };

    const handleTemplateChange = (templateKey) => {
        setSelectedTemplate(templateKey);
        const template = TEMPLATES[templateKey];
        setLocalSettings({
            ...localSettings,
            theme: template.theme,
            headerType: template.headerType,
            footerType: template.footerType,
            homepageModules: template.modules
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        console.log('💾 Saving homepage template:', {
            selectedTemplate,
            theme: localSettings.theme,
            modulesCount: Object.keys(localSettings.homepageModules || {}).length
        });
        const success = await saveSettings(localSettings);
        setIsSaving(false);
        if (success) {
            console.log('✅ Homepage template saved successfully');
            toast.success('设置保存成功!');
        } else {
            console.error('❌ Failed to save homepage template');
            toast.error('保存失败,请重试');
        }
    };

    const handleToggle = (key, checked) => {
        setLocalSettings(prev => ({
            ...prev,
            homepageModules: {
                ...prev.homepageModules,
                [key]: {
                    ...prev.homepageModules[key],
                    enabled: checked
                }
            }
        }));
    };

    const handleModuleChange = (key, field, value) => {
        setLocalSettings(prev => ({
            ...prev,
            homepageModules: {
                ...prev.homepageModules,
                [key]: {
                    ...prev.homepageModules[key],
                    [field]: value
                }
            }
        }));
    };

    const handleContentChange = (moduleKey, field, value) => {
        setLocalSettings(prev => ({
            ...prev,
            homepageModules: {
                ...prev.homepageModules,
                [moduleKey]: {
                    ...prev.homepageModules[moduleKey],
                    content: {
                        ...prev.homepageModules[moduleKey].content,
                        [field]: value
                    }
                }
            }
        }));
    };

    const handleArrayItemChange = (moduleKey, arrayField, index, itemField, value) => {
        setLocalSettings(prev => {
            const newArray = [...prev.homepageModules[moduleKey].content[arrayField]];
            newArray[index] = {
                ...newArray[index],
                [itemField]: value
            };
            return {
                ...prev,
                homepageModules: {
                    ...prev.homepageModules,
                    [moduleKey]: {
                        ...prev.homepageModules[moduleKey],
                        content: {
                            ...prev.homepageModules[moduleKey].content,
                            [arrayField]: newArray
                        }
                    }
                }
            };
        });
    };

    const handleAddArrayItem = (moduleKey, arrayField, defaultItem) => {
        setLocalSettings(prev => ({
            ...prev,
            homepageModules: {
                ...prev.homepageModules,
                [moduleKey]: {
                    ...prev.homepageModules[moduleKey],
                    content: {
                        ...prev.homepageModules[moduleKey].content,
                        [arrayField]: [
                            ...(prev.homepageModules[moduleKey].content[arrayField] || []),
                            defaultItem
                        ]
                    }
                }
            }
        }));
    };

    const handleRemoveArrayItem = (moduleKey, arrayField, index) => {
        setLocalSettings(prev => {
            const newArray = prev.homepageModules[moduleKey].content[arrayField].filter((_, i) => i !== index);
            return {
                ...prev,
                homepageModules: {
                    ...prev.homepageModules,
                    [moduleKey]: {
                        ...prev.homepageModules[moduleKey],
                        content: {
                            ...prev.homepageModules[moduleKey].content,
                            [arrayField]: newArray
                        }
                    }
                }
            };
        });
    };
    const handleReorder = (newOrder) => {
        setLocalSettings(prev => {
            const newModules = { ...prev.homepageModules };
            newOrder.forEach((key, index) => {
                if (newModules[key]) {
                    newModules[key] = {
                        ...newModules[key],
                        order: index
                    };
                }
            });
            return {
                ...prev,
                homepageModules: newModules
            };
        });
    };

    const handleAddModule = (type) => {
        const newKey = `${type}_${Date.now()}`;
        // Find highest order
        const maxOrder = Object.values(localSettings.homepageModules || {}).reduce((max, m) => Math.max(max, m.order || 0), 0);

        setLocalSettings(prev => ({
            ...prev,
            homepageModules: {
                ...prev.homepageModules,
                [newKey]: {
                    enabled: true,
                    order: maxOrder + 1,
                    title: availableModules[type]?.name || type,
                    type: type,
                    containerWidth: 'container',
                    content: getDefaultContent(type)
                }
            }
        }));
        setExpandedModule(newKey);
    };

    const handleDeleteModule = (key) => {
        setModuleToDelete(key);
    };

    const confirmDeleteModule = () => {
        if (!moduleToDelete) return;

        setLocalSettings(prev => {
            const { [moduleToDelete]: deleted, ...rest } = prev.homepageModules;
            return {
                ...prev,
                homepageModules: rest
            };
        });

        if (expandedModule === moduleToDelete) setExpandedModule(null);
        setModuleToDelete(null);
        toast.success('模块已删除 (需保存以生效)');
    };

    const renderContentEditor = (moduleKey, content, moduleType) => {
        if (moduleType === 'hero') {
            return (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">徽章文字 <span className="text-xs text-slate-400 font-normal">Badge</span></label>
                            <Input value={content.badge || ''} onChange={(e) => handleContentChange(moduleKey, 'badge', e.target.value)} />
                            <p className="text-xs text-slate-500 mt-1">💡 建议 10-20 字符</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">变体 <span className="text-xs text-slate-400 font-normal">Variant</span></label>
                            <select
                                value={content.variant || 'split'}
                                onChange={(e) => handleContentChange(moduleKey, 'variant', e.target.value)}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
                            >
                                <option value="split">Split (经典)</option>
                                <option value="compact">Compact (现代)</option>
                                <option value="editorial">Editorial (创意)</option>
                                <option value="pure-image">Pure Image (纯图)</option>
                                <option value="att-style">AT&T Style (企业)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">主标题 <span className="text-xs text-slate-400 font-normal">Heading</span></label>
                        <Textarea value={content.heading || ''} onChange={(e) => handleContentChange(moduleKey, 'heading', e.target.value)} rows={2} />
                        <p className="text-xs text-slate-500 mt-1">💡 建议 30-60 字符，简洁有力</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
                        <p className="text-xs text-slate-500 mt-1">💡 建议 80-150 字符，突出核心价值</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">主按钮 <span className="text-xs text-slate-400 font-normal">Primary CTA</span></label>
                            <Input value={content.ctaPrimary || ''} onChange={(e) => handleContentChange(moduleKey, 'ctaPrimary', e.target.value)} />
                            <p className="text-xs text-slate-500 mt-1">💡 建议 10-20 字符，使用行动词</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">次按钮 <span className="text-xs text-slate-400 font-normal">Secondary CTA</span></label>
                            <Input value={content.ctaSecondary || ''} onChange={(e) => handleContentChange(moduleKey, 'ctaSecondary', e.target.value)} />
                            <p className="text-xs text-slate-500 mt-1">💡 建议 10-20 字符</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">背景图片 <span className="text-xs text-slate-400 font-normal">Background Image</span></label>
                        <ImageUpload
                            value={content.backgroundImage || ''}
                            onChange={(url) => handleContentChange(moduleKey, 'backgroundImage', url)}
                            placeholder="Upload banner image..."
                        />
                        <p className="text-xs text-slate-500 mt-1">💡 建议尺寸: 1920x1080px (16:9) 或 2560x1440px，格式: JPG/WebP</p>
                    </div>

                    {/* Product Cards Editor - Only for att-style variant */}
                    {content.variant === 'att-style' && (
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-semibold text-slate-900">产品卡片 <span className="text-xs text-slate-400 font-normal">Product Cards</span></label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAddArrayItem(moduleKey, 'productCards', {
                                        badge: 'New Badge',
                                        title: 'Product Title',
                                        subtitle: 'Product subtitle',
                                        cta: 'Learn More',
                                        image: ''
                                    })}
                                >
                                    <Plus className="w-3 h-3 mr-1" /> 添加卡片
                                </Button>
                            </div>
                            {(content.productCards || []).map((card, idx) => (
                                <div key={idx} className="flex gap-2 items-start border p-3 rounded bg-slate-50">
                                    <GripVertical className="w-4 h-4 text-slate-400 mt-2" />
                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <Input
                                                value={card.badge || ''}
                                                onChange={(e) => handleArrayItemChange(moduleKey, 'productCards', idx, 'badge', e.target.value)}
                                                placeholder="徽章文本 (如: Get it for $0)"
                                                className="text-sm"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">💡 徽章文本，建议 10-20 字符</p>
                                        </div>
                                        <div>
                                            <Input
                                                value={card.title || ''}
                                                onChange={(e) => handleArrayItemChange(moduleKey, 'productCards', idx, 'title', e.target.value)}
                                                placeholder="主标题 (如: iPhone 17 Pro for $0)"
                                                className="font-semibold"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">💡 产品标题，建议 20-40 字符</p>
                                        </div>
                                        <div>
                                            <Input
                                                value={card.subtitle || ''}
                                                onChange={(e) => handleArrayItemChange(moduleKey, 'productCards', idx, 'subtitle', e.target.value)}
                                                placeholder="副标题 (如: with eligible trade-in)"
                                                className="text-sm"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">💡 副标题说明，建议 20-40 字符</p>
                                        </div>
                                        <div>
                                            <Input
                                                value={card.cta || ''}
                                                onChange={(e) => handleArrayItemChange(moduleKey, 'productCards', idx, 'cta', e.target.value)}
                                                placeholder="按钮文本 (如: Shop iPhone)"
                                                className="text-sm"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">💡 按钮文本，建议 10-20 字符</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">产品图片</label>
                                            <ImageUpload
                                                value={card.image || ''}
                                                onChange={(url) => handleArrayItemChange(moduleKey, 'productCards', idx, 'image', url)}
                                                placeholder="Upload product card image..."
                                            />
                                            <p className="text-xs text-slate-500 mt-1">💡 建议尺寸: 800x800px (1:1 正方形)，格式: JPG/WebP</p>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleRemoveArrayItem(moduleKey, 'productCards', idx)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            {(!content.productCards || content.productCards.length === 0) && (
                                <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded border border-dashed">
                                    暂无产品卡片，点击"添加卡片"按钮创建
                                </p>
                            )}
                        </div>
                    )}
                </>
            );
        }

        if (moduleType === 'services') {
            return (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">标题 <span className="text-xs text-slate-400 font-normal">Section Title</span></label>
                            <Input value={content.sectionTitle || ''} onChange={(e) => handleContentChange(moduleKey, 'sectionTitle', e.target.value)} />
                            <p className="text-xs text-slate-500 mt-1">💡 建议 20-40 字符</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">变体 <span className="text-xs text-slate-400 font-normal">Variant</span></label>
                            <select
                                value={content.variant || 'grid'}
                                onChange={(e) => handleContentChange(moduleKey, 'variant', e.target.value)}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
                            >
                                <option value="grid">Grid (网格)</option>
                                <option value="blocks">Blocks (大卡片)</option>
                                <option value="minimal">Minimal (极简)</option>
                            </select>
                        </div>
                    </div>

                    {/* Services Array Editor */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-semibold text-slate-900">服务列表 <span className="text-xs text-slate-400 font-normal">Services</span></label>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddArrayItem(moduleKey, 'services', { title: 'New Service', description: 'Description', icon: 'ruler' })}
                            >
                                <Plus className="w-3 h-3 mr-1" /> 添加
                            </Button>
                        </div>
                        {(content.services || []).map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start border p-3 rounded bg-slate-50">
                                <GripVertical className="w-4 h-4 text-slate-400 mt-2" />
                                <div className="flex-1 space-y-2">
                                    <Input
                                        value={item.title}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'services', idx, 'title', e.target.value)}
                                        placeholder="服务标题"
                                        className="font-semibold"
                                    />
                                    <p className="text-xs text-slate-500">💡 建议 15-30 字符</p>
                                    <Textarea
                                        value={item.description}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'services', idx, 'description', e.target.value)}
                                        placeholder="服务描述"
                                        rows={2}
                                    />
                                    <p className="text-xs text-slate-500">💡 建议 40-80 字符</p>
                                    <select
                                        value={item.icon || 'ruler'}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'services', idx, 'icon', e.target.value)}
                                        className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
                                    >
                                        <option value="ruler">Ruler</option>
                                        <option value="building">Building</option>
                                        <option value="hardhat">Hard Hat</option>
                                        <option value="users">Users</option>
                                    </select>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveArrayItem(moduleKey, 'services', idx)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        if (moduleType === 'stats') {
            return (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">变体 <span className="text-xs text-slate-400 font-normal">Variant</span></label>
                        <select
                            value={content.variant || 'bar'}
                            onChange={(e) => handleContentChange(moduleKey, 'variant', e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="bar">Bar (卡片)</option>
                            <option value="badges">Badges (徽章)</option>
                            <option value="inline">Inline (内联)</option>
                        </select>
                    </div>

                    {/* Stats Array Editor */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-semibold text-slate-900">统计数据 <span className="text-xs text-slate-400 font-normal">Stats</span></label>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddArrayItem(moduleKey, 'stats', { value: '100+', label: 'New Stat', icon: 'trophy' })}
                            >
                                <Plus className="w-3 h-3 mr-1" /> 添加
                            </Button>
                        </div>
                        {(content.stats || []).map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-center border p-3 rounded bg-slate-50">
                                <GripVertical className="w-4 h-4 text-slate-400" />
                                <Input
                                    value={item.value}
                                    onChange={(e) => handleArrayItemChange(moduleKey, 'stats', idx, 'value', e.target.value)}
                                    placeholder="数值"
                                    className="w-24 font-bold"
                                />
                                <Input
                                    value={item.label}
                                    onChange={(e) => handleArrayItemChange(moduleKey, 'stats', idx, 'label', e.target.value)}
                                    placeholder="标签"
                                    className="flex-1"
                                />
                                <select
                                    value={item.icon || 'trophy'}
                                    onChange={(e) => handleArrayItemChange(moduleKey, 'stats', idx, 'icon', e.target.value)}
                                    className="border border-slate-300 rounded-md px-3 py-1.5 text-sm"
                                >
                                    <option value="trophy">Trophy</option>
                                    <option value="thumbsup">Thumbs Up</option>
                                    <option value="users">Users</option>
                                    <option value="briefcase">Briefcase</option>
                                </select>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveArrayItem(moduleKey, 'stats', idx)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        if (moduleType === 'request-samples') {
            return (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">标题 <span className="text-xs text-slate-400 font-normal">Title</span></label>
                        <Input value={content.title || ''} onChange={(e) => handleContentChange(moduleKey, 'title', e.target.value)} />
                        <p className="text-xs text-slate-500 mt-1">💡 建议 20-40 字符</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
                        <p className="text-xs text-slate-500 mt-1">💡 建议 60-120 字符</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">背景颜色 <span className="text-xs text-slate-400 font-normal">Background</span></label>
                            <select
                                value={content.backgroundColor || 'white'}
                                onChange={(e) => handleContentChange(moduleKey, 'backgroundColor', e.target.value)}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
                            >
                                <option value="white">White (白色)</option>
                                <option value="blue">Blue (蓝色)</option>
                                <option value="gradient">Gradient (渐变)</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Switch
                                    checked={content.showBorder !== false}
                                    onCheckedChange={(checked) => handleContentChange(moduleKey, 'showBorder', checked)}
                                />
                                <span className="text-sm font-semibold text-slate-900">显示顶部边框</span>
                            </label>
                        </div>
                    </div>
                </>
            );
        }

        if (moduleType === 'promo-banner') {
            return (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">标题 <span className="text-xs text-slate-400 font-normal">Heading</span></label>
                        <Input value={content.heading || ''} onChange={(e) => handleContentChange(moduleKey, 'heading', e.target.value)} />
                        <p className="text-xs text-slate-500 mt-1">💡 建议 30-50 字符，突出促销亮点</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
                        <p className="text-xs text-slate-500 mt-1">💡 建议 80-120 字符，说明促销详情</p>
                    </div>

                    {/* CTA Buttons Array */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-semibold text-slate-900">CTA按钮 <span className="text-xs text-slate-400 font-normal">CTA Buttons</span></label>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    const newCtas = [...(content.ctas || []), 'New CTA'];
                                    handleContentChange(moduleKey, 'ctas', newCtas);
                                }}
                            >
                                <Plus className="w-3 h-3 mr-1" /> 添加按钮
                            </Button>
                        </div>
                        {(content.ctas || []).map((cta, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <Input
                                    value={cta}
                                    onChange={(e) => {
                                        const newCtas = [...content.ctas];
                                        newCtas[idx] = e.target.value;
                                        handleContentChange(moduleKey, 'ctas', newCtas);
                                    }}
                                    placeholder={`按钮 ${idx + 1}`}
                                    className="flex-1"
                                />
                                <p className="text-xs text-slate-500 ml-2">💡 10-15 字符</p>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        const newCtas = content.ctas.filter((_, i) => i !== idx);
                                        handleContentChange(moduleKey, 'ctas', newCtas);
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">背景图片 <span className="text-xs text-slate-400 font-normal">Background Image (Optional)</span></label>
                        <ImageUpload
                            value={content.image || ''}
                            onChange={(url) => handleContentChange(moduleKey, 'image', url)}
                            placeholder="Upload promotional image..."
                        />
                    </div>
                </>
            );
        }

        if (moduleType === 'newsletter') {
            return (
                <>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">标题 <span className="text-xs text-slate-400 font-normal">Title</span></label>
                        <Input value={content.title || ''} onChange={(e) => handleContentChange(moduleKey, 'title', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">邮箱占位符 <span className="text-xs text-slate-400 font-normal">Email Placeholder</span></label>
                            <Input value={content.placeholder || ''} onChange={(e) => handleContentChange(moduleKey, 'placeholder', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">按钮文字 <span className="text-xs text-slate-400 font-normal">Button Text</span></label>
                            <Input value={content.ctaText || 'Subscribe'} onChange={(e) => handleContentChange(moduleKey, 'ctaText', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">背景颜色 <span className="text-xs text-slate-400 font-normal">Background</span></label>
                        <select
                            value={content.backgroundColor || 'white'}
                            onChange={(e) => handleContentChange(moduleKey, 'backgroundColor', e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="white">White (白色)</option>
                            <option value="blue">Blue (蓝色)</option>
                            <option value="gradient">Gradient (渐变)</option>
                        </select>
                    </div>
                </>
            );
        }

        if (moduleType === 'product-carousel') {
            return (
                <>
                    {/* Products Array Editor */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-semibold text-slate-900">产品列表 <span className="text-xs text-slate-400 font-normal">Products</span></label>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setCurrentModuleKey(moduleKey);
                                    setProductSelectorOpen(true);
                                }}
                            >
                                <Plus className="w-3 h-3 mr-1" /> 从商品库选择
                            </Button>
                        </div>
                        {(content.products || []).map((product, idx) => (
                            <div key={idx} className="border border-slate-200 p-4 rounded-lg bg-slate-50 space-y-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-slate-500">产品 #{idx + 1}</span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleRemoveArrayItem(moduleKey, 'products', idx)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">产品名称</label>
                                    <Input
                                        value={product.name || ''}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'name', e.target.value)}
                                        placeholder="Product Name"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">💡 建议 20-40 字符</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">产品描述</label>
                                    <Textarea
                                        value={product.description || ''}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'description', e.target.value)}
                                        placeholder="Product description"
                                        rows={2}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">💡 建议 30-60 字符</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">徽章</label>
                                        <Input
                                            value={product.badge || ''}
                                            onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'badge', e.target.value)}
                                            placeholder="e.g., New, Sale"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">💡 5-15 字符</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">按钮文字</label>
                                        <Input
                                            value={product.cta || ''}
                                            onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'cta', e.target.value)}
                                            placeholder="Shop now"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">💡 8-15 字符</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">产品图片 (可选)</label>
                                    <ImageUpload
                                        value={product.image || ''}
                                        onChange={(url) => handleArrayItemChange(moduleKey, 'products', idx, 'image', url)}
                                        placeholder="Upload product image..."
                                    />
                                    <p className="text-xs text-slate-500 mt-1">💡 建议尺寸: 800x800px (1:1 正方形)，格式: JPG/WebP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        return <div className="text-sm text-slate-500">此模块类型暂无编辑器</div>;
    };

    if (!localSettings) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">加载中...</p>
                </div>
            </div>
        );
    }

    const sortedKeys = Object.entries(localSettings.homepageModules || {})
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key]) => key);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Modern Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Palette className="w-7 h-7 text-blue-600" />
                                首页管理
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">管理您的首页模块和内容</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => window.open('/', '_blank')}
                                className="border-slate-300 hover:border-blue-500 hover:text-blue-600"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                预览
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isSaving ? '保存中...' : '保存更改'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-6xl">
                {/* Template Selector */}
                <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                        选择模板
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(TEMPLATES).map(([key, template]) => (
                            <button
                                key={key}
                                onClick={() => handleTemplateChange(key)}
                                className={`group relative p-6 rounded-xl border-2 transition-all duration-200 ${selectedTemplate === key
                                    ? 'border-blue-600 bg-blue-50 shadow-md scale-105'
                                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-bold text-lg text-slate-900">{template.name}</div>
                                    {selectedTemplate === key && (
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-slate-600 mb-3">{template.description}</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.theme.primaryColor }}></div>
                                    <div className="text-xs text-slate-500">{Object.keys(template.modules).length} 个模块</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modules List */}
                <div className="space-y-4">
                    <Reorder.Group axis="y" values={sortedKeys} onReorder={handleReorder} className="space-y-4">
                        {sortedKeys.map((key) => (
                            <SortableModuleItem
                                key={key}
                                uniqueKey={key}
                                module={localSettings.homepageModules[key]}
                                isExpanded={expandedModule === key}
                                onExpand={() => setExpandedModule(expandedModule === key ? null : key)}
                                onToggle={(checked) => handleToggle(key, checked)}
                                onDelete={() => handleDeleteModule(key)}
                                onUpdateContainerWidth={(val) => handleModuleChange(key, 'containerWidth', val)}
                            >
                                {expandedModule === key && localSettings.homepageModules[key].content && (
                                    <div className="p-6 space-y-6 bg-white">
                                        {renderContentEditor(key, localSettings.homepageModules[key].content, localSettings.homepageModules[key].type)}
                                    </div>
                                )}
                            </SortableModuleItem>
                        ))}
                    </Reorder.Group>
                </div>

                {/* Add Module Section */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">添加新模块</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(availableModules || {}).map(([type, info]) => (
                            <button
                                key={type}
                                onClick={() => handleAddModule(type)}
                                className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                                    <Plus className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                                </div>
                                <span className="font-semibold text-slate-700 group-hover:text-blue-700">{info.name}</span>
                                <span className="text-xs text-slate-500 mt-1">{info.description}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={!!moduleToDelete} onOpenChange={() => setModuleToDelete(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>确认删除?</DialogTitle>
                            <DialogDescription>
                                您确定要删除这个模块吗? 此操作无法撤销。
                                <br />
                                注意: 删除操作将在您点击右上角的 &ldquo;保存更改&rdquo; 后生效。
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setModuleToDelete(null)}>
                                取消
                            </Button>
                            <Button variant="destructive" onClick={confirmDeleteModule}>
                                确认删除
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Product Selector Dialog */}
                <Dialog open={productSelectorOpen} onOpenChange={setProductSelectorOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>选择产品</DialogTitle>
                            <DialogDescription>从现有商品库中选择要添加到轮播的产品</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {productData.map((product, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (currentModuleKey) {
                                            handleAddArrayItem(currentModuleKey, 'products', {
                                                name: product.title,
                                                description: product.description,
                                                badge: product.badge || 'New',
                                                cta: 'Shop now',
                                                image: product.image
                                            });
                                            setProductSelectorOpen(false);
                                            setCurrentModuleKey(null);
                                            toast.success(`已添加产品: ${product.title}`);
                                        }
                                    }}
                                    className="group border border-slate-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition-all text-left"
                                >
                                    {product.image && (
                                        <div className="aspect-square bg-slate-100 rounded-md mb-2 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}
                                    <h4 className="font-semibold text-sm text-slate-900 line-clamp-2 mb-1">
                                        {product.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 line-clamp-2">
                                        {product.description}
                                    </p>
                                    {product.badge && (
                                        <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                            {product.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
