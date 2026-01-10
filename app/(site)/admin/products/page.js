'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, Package } from 'lucide-react';

export default function AdminProducts() {
    const { settings, saveSettings } = useSettings();
    const [localProducts, setLocalProducts] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (settings?.products) {
            setLocalProducts(JSON.parse(JSON.stringify(settings.products)));
        }
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);

        // 调试日志
        console.log('💾 Saving products settings:', {
            layout: localProducts.detailPage.layout,
            fullProducts: localProducts
        });

        const success = await saveSettings({
            ...settings,
            products: localProducts
        });
        setIsSaving(false);
        if (success) {
            console.log('✅ Settings saved successfully');
            alert('✅ 产品设置保存成功!');
        } else {
            console.error('❌ Failed to save settings');
            alert('❌ 保存失败,请重试');
        }
    };

    const handleLayoutChange = (field, value) => {
        setLocalProducts(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                [field]: value
            }
        }));
    };

    const handleDetailChange = (field, value) => {
        setLocalProducts(prev => ({
            ...prev,
            detailPage: {
                ...prev.detailPage,
                [field]: value
            }
        }));
    };

    const handleSettingChange = (field, value) => {
        setLocalProducts(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                [field]: value
            }
        }));
    };

    if (!localProducts) {
        return <div className="p-8">加载中...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Package className="w-7 h-7 text-blue-600" />
                                产品设置
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">管理产品页面的布局和功能</p>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-gradient-to-r from-blue-600 to-blue-700"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? '保存中...' : '保存更改'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-4xl space-y-6">
                {/* List Layout */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">产品列表布局</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">视图模式</label>
                            <select
                                value={localProducts.layout.listView}
                                onChange={(e) => handleLayoutChange('listView', e.target.value)}
                                className="w-full border border-slate-300 rounded-md px-3 py-2"
                            >
                                <option value="grid">网格视图</option>
                                <option value="list">列表视图</option>
                                <option value="masonry">瀑布流</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">网格列数</label>
                            <select
                                value={localProducts.layout.gridColumns}
                                onChange={(e) => handleLayoutChange('gridColumns', parseInt(e.target.value))}
                                className="w-full border border-slate-300 rounded-md px-3 py-2"
                            >
                                <option value="2">2列</option>
                                <option value="3">3列</option>
                                <option value="4">4列</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">显示筛选器</label>
                            <Switch
                                checked={localProducts.layout.showFilters}
                                onCheckedChange={(checked) => handleLayoutChange('showFilters', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">显示排序</label>
                            <Switch
                                checked={localProducts.layout.showSorting}
                                onCheckedChange={(checked) => handleLayoutChange('showSorting', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">显示搜索</label>
                            <Switch
                                checked={localProducts.layout.showSearch}
                                onCheckedChange={(checked) => handleLayoutChange('showSearch', checked)}
                            />
                        </div>
                    </div>
                </div>

                {/* Detail Page */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">产品详情页</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">布局</label>
                            <select
                                value={localProducts.detailPage.layout}
                                onChange={(e) => handleDetailChange('layout', e.target.value)}
                                className="w-full border border-slate-300 rounded-md px-3 py-2"
                            >
                                <option value="default">默认布局 - 经典产品展示</option>
                                <option value="technical">技术规格布局 - DigiKey风格 (B2B)</option>
                                <option value="ecommerce">电商视觉布局 - AllFilters风格 (B2C)</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">
                                选择适合您业务的产品详情页布局风格
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">显示相关产品</label>
                            <Switch
                                checked={localProducts.detailPage.showRelated}
                                onCheckedChange={(checked) => handleDetailChange('showRelated', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">显示评论</label>
                            <Switch
                                checked={localProducts.detailPage.showReviews}
                                onCheckedChange={(checked) => handleDetailChange('showReviews', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">显示面包屑</label>
                            <Switch
                                checked={localProducts.detailPage.showBreadcrumbs}
                                onCheckedChange={(checked) => handleDetailChange('showBreadcrumbs', checked)}
                            />
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">产品功能设置</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">每页显示数量</label>
                            <select
                                value={localProducts.settings.itemsPerPage}
                                onChange={(e) => handleSettingChange('itemsPerPage', parseInt(e.target.value))}
                                className="w-full border border-slate-300 rounded-md px-3 py-2"
                            >
                                <option value="6">6个</option>
                                <option value="12">12个</option>
                                <option value="24">24个</option>
                                <option value="48">48个</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">快速查看</label>
                            <Switch
                                checked={localProducts.settings.enableQuickView}
                                onCheckedChange={(checked) => handleSettingChange('enableQuickView', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">心愿单</label>
                            <Switch
                                checked={localProducts.settings.enableWishlist}
                                onCheckedChange={(checked) => handleSettingChange('enableWishlist', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-900">产品对比</label>
                            <Switch
                                checked={localProducts.settings.enableCompare}
                                onCheckedChange={(checked) => handleSettingChange('enableCompare', checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
