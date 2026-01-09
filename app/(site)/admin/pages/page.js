'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Save, FileText, Plus } from 'lucide-react';

export default function AdminPages() {
    const { settings, saveSettings } = useSettings();
    const [localPages, setLocalPages] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (settings?.pages) {
            setLocalPages(JSON.parse(JSON.stringify(settings.pages)));
        }
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);
        const success = await saveSettings({
            ...settings,
            pages: localPages
        });
        setIsSaving(false);
        if (success) {
            alert('✅ 页面设置保存成功!');
        } else {
            alert('❌ 保存失败,请重试');
        }
    };

    const handlePageChange = (pageKey, field, value) => {
        setLocalPages(prev => ({
            ...prev,
            [pageKey]: {
                ...prev[pageKey],
                [field]: value
            }
        }));
    };

    if (!localPages) {
        return <div className="p-8">加载中...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <FileText className="w-7 h-7 text-blue-600" />
                                页面管理
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">管理网站的单页面内容</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                新建页面
                            </Button>
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
            </div>

            <div className="container mx-auto px-6 py-8 max-w-6xl">
                <div className="grid gap-6">
                    {Object.entries(localPages).map(([pageKey, pageData]) => (
                        <div key={pageKey} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{pageData.title}</h3>
                                    <p className="text-sm text-slate-500">/{pageData.slug}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-600">
                                        {pageData.status === 'published' ? '已发布' : '草稿'}
                                    </span>
                                    <Switch
                                        checked={pageData.status === 'published'}
                                        onCheckedChange={(checked) =>
                                            handlePageChange(pageKey, 'status', checked ? 'published' : 'draft')
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">页面标题</label>
                                    <Input
                                        value={pageData.title || ''}
                                        onChange={(e) => handlePageChange(pageKey, 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">URL路径</label>
                                    <Input
                                        value={pageData.slug || ''}
                                        onChange={(e) => handlePageChange(pageKey, 'slug', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">布局</label>
                                    <select
                                        value={pageData.layout || 'default'}
                                        onChange={(e) => handlePageChange(pageKey, 'layout', e.target.value)}
                                        className="w-full border border-slate-300 rounded-md px-3 py-2"
                                    >
                                        <option value="default">默认布局</option>
                                        <option value="full-width">全宽布局</option>
                                        <option value="sidebar">侧边栏布局</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
