'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, ChevronDown, ChevronUp, Plus, Trash2, GripVertical, Palette } from 'lucide-react';
import { Reorder, useDragControls } from "framer-motion";
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/image-upload';
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

    useEffect(() => {
        if (settings) {
            setLocalSettings(JSON.parse(JSON.stringify(settings)));
        }
    }, [settings]);

    const handleTemplateChange = (templateKey) => {
        setSelectedTemplate(templateKey);
        const template = TEMPLATES[templateKey];
        setLocalSettings({
            ...localSettings,
            theme: template.theme,
            homepageModules: template.modules
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        const success = await saveSettings(localSettings);
        setIsSaving(false);
        if (success) {
            toast.success('设置保存成功!');
        } else {
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
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">主标题 <span className="text-xs text-slate-400 font-normal">Heading</span></label>
                        <Textarea value={content.heading || ''} onChange={(e) => handleContentChange(moduleKey, 'heading', e.target.value)} rows={2} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">主按钮 <span className="text-xs text-slate-400 font-normal">Primary CTA</span></label>
                            <Input value={content.ctaPrimary || ''} onChange={(e) => handleContentChange(moduleKey, 'ctaPrimary', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">次按钮 <span className="text-xs text-slate-400 font-normal">Secondary CTA</span></label>
                            <Input value={content.ctaSecondary || ''} onChange={(e) => handleContentChange(moduleKey, 'ctaSecondary', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">背景图片 <span className="text-xs text-slate-400 font-normal">Background Image</span></label>
                        <ImageUpload
                            value={content.backgroundImage || ''}
                            onChange={(url) => handleContentChange(moduleKey, 'backgroundImage', url)}
                            placeholder="Upload banner image..."
                        />
                    </div>
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
                                    <Textarea
                                        value={item.description}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'services', idx, 'description', e.target.value)}
                                        placeholder="服务描述"
                                        rows={2}
                                    />
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
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
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
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">描述 <span className="text-xs text-slate-400 font-normal">Description</span></label>
                        <Textarea value={content.description || ''} onChange={(e) => handleContentChange(moduleKey, 'description', e.target.value)} rows={3} />
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
                                onClick={() => handleAddArrayItem(moduleKey, 'products', {
                                    name: 'New Product',
                                    description: 'Product description',
                                    badge: 'New',
                                    cta: 'Shop now'
                                })}
                            >
                                <Plus className="w-3 h-3 mr-1" /> 添加产品
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
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">产品描述</label>
                                    <Textarea
                                        value={product.description || ''}
                                        onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'description', e.target.value)}
                                        placeholder="Product description"
                                        rows={2}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">徽章</label>
                                        <Input
                                            value={product.badge || ''}
                                            onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'badge', e.target.value)}
                                            placeholder="e.g., New, Sale"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">按钮文字</label>
                                        <Input
                                            value={product.cta || ''}
                                            onChange={(e) => handleArrayItemChange(moduleKey, 'products', idx, 'cta', e.target.value)}
                                            placeholder="Shop now"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">产品图片 (可选)</label>
                                    <ImageUpload
                                        value={product.image || ''}
                                        onChange={(url) => handleArrayItemChange(moduleKey, 'products', idx, 'image', url)}
                                        placeholder="Upload product image..."
                                    />
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
                                注意: 删除操作将在您点击右上角的 "保存更改" 后生效。
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
            </div>
        </div>
    );
}
