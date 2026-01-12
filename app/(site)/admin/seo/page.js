'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSEO() {
    const { settings, saveSettings } = useSettings();
    const [localSEO, setLocalSEO] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('global');

    useEffect(() => {
        if (settings?.seo) {
            setLocalSEO(JSON.parse(JSON.stringify(settings.seo)));
        }
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);
        const success = await saveSettings({
            ...settings,
            seo: localSEO
        });
        setIsSaving(false);
        if (success) {
            toast.success('SEO设置保存成功!');
        } else {
            toast.error('保存失败,请重试');
        }
    };

    const handleGlobalChange = (field, value) => {
        setLocalSEO(prev => ({
            ...prev,
            global: {
                ...prev.global,
                [field]: value
            }
        }));
    };

    const handlePageChange = (page, field, value) => {
        setLocalSEO(prev => ({
            ...prev,
            pages: {
                ...prev.pages,
                [page]: {
                    ...prev.pages[page],
                    [field]: value
                }
            }
        }));
    };

    if (!localSEO) {
        return <div className="p-8">加载中...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Globe className="w-7 h-7 text-blue-600" />
                                SEO设置
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">管理网站的搜索引擎优化设置</p>
                        </div>
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

            <div className="container mx-auto px-6 py-8 max-w-4xl">
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('global')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'global'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            全局SEO
                        </button>
                        <button
                            onClick={() => setActiveTab('pages')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'pages'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            页面SEO
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'global' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        网站名称 <span className="text-xs text-slate-400 font-normal">Site Name</span>
                                    </label>
                                    <Input
                                        value={localSEO.global.siteName || ''}
                                        onChange={(e) => handleGlobalChange('siteName', e.target.value)}
                                        placeholder="RNVX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        标题模板 <span className="text-xs text-slate-400 font-normal">Title Template</span>
                                    </label>
                                    <Input
                                        value={localSEO.global.titleTemplate || ''}
                                        onChange={(e) => handleGlobalChange('titleTemplate', e.target.value)}
                                        placeholder="%s | RNVX"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">使用 %s 作为页面标题占位符</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        默认描述 <span className="text-xs text-slate-400 font-normal">Default Description</span>
                                    </label>
                                    <Textarea
                                        value={localSEO.global.defaultDescription || ''}
                                        onChange={(e) => handleGlobalChange('defaultDescription', e.target.value)}
                                        rows={3}
                                        placeholder="网站的默认描述"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        关键词 <span className="text-xs text-slate-400 font-normal">Keywords (逗号分隔)</span>
                                    </label>
                                    <Input
                                        value={(localSEO.global.keywords || []).join(', ')}
                                        onChange={(e) => handleGlobalChange('keywords', e.target.value.split(',').map(k => k.trim()))}
                                        placeholder="construction, renovation, building"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                                            OG图片 <span className="text-xs text-slate-400 font-normal">Open Graph Image</span>
                                        </label>
                                        <Input
                                            value={localSEO.global.ogImage || ''}
                                            onChange={(e) => handleGlobalChange('ogImage', e.target.value)}
                                            placeholder="/og-image.jpg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                                            Twitter账号 <span className="text-xs text-slate-400 font-normal">Twitter Handle</span>
                                        </label>
                                        <Input
                                            value={localSEO.global.twitterHandle || ''}
                                            onChange={(e) => handleGlobalChange('twitterHandle', e.target.value)}
                                            placeholder="@rnvx"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'pages' && (
                            <div className="space-y-8">
                                {Object.entries(localSEO.pages || {}).map(([pageKey, pageData]) => (
                                    <div key={pageKey} className="border-b border-slate-200 pb-8 last:border-0">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 capitalize">{pageKey} Page</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">标题</label>
                                                <Input
                                                    value={pageData.title || ''}
                                                    onChange={(e) => handlePageChange(pageKey, 'title', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">描述</label>
                                                <Textarea
                                                    value={pageData.description || ''}
                                                    onChange={(e) => handlePageChange(pageKey, 'description', e.target.value)}
                                                    rows={2}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">关键词</label>
                                                <Input
                                                    value={(pageData.keywords || []).join(', ')}
                                                    onChange={(e) => handlePageChange(pageKey, 'keywords', e.target.value.split(',').map(k => k.trim()))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
