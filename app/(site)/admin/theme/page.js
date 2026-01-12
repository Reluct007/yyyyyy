'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTheme() {
    const { settings, saveSettings } = useSettings();
    const [localTheme, setLocalTheme] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (settings?.theme) {
            setLocalTheme(JSON.parse(JSON.stringify(settings.theme)));
        }
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);
        const success = await saveSettings({
            ...settings,
            theme: localTheme
        });
        setIsSaving(false);
        if (success) {
            toast.success('主题设置保存成功!');
        } else {
            toast.error('保存失败,请重试');
        }
    };

    const handleChange = (field, value) => {
        setLocalTheme(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!localTheme) {
        return <div className="p-8">加载中...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Palette className="w-7 h-7 text-blue-600" />
                                主题设置
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">自定义网站的颜色主题</p>
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

            <div className="container mx-auto px-6 py-8 max-w-4xl">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">颜色配置</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                主色调 <span className="text-xs text-slate-400 font-normal">Primary Color</span>
                            </label>
                            <div className="flex gap-4 items-center">
                                <Input
                                    type="color"
                                    value={localTheme.primaryColor}
                                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                                    className="w-20 h-12"
                                />
                                <Input
                                    value={localTheme.primaryColor}
                                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                                    placeholder="#2563eb"
                                    className="flex-1"
                                />
                                <div
                                    className="w-24 h-12 rounded-lg border-2 border-slate-200"
                                    style={{ backgroundColor: localTheme.primaryColor }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">用于按钮、链接等主要元素</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                                强调色 <span className="text-xs text-slate-400 font-normal">Accent Color</span>
                            </label>
                            <div className="flex gap-4 items-center">
                                <Input
                                    type="color"
                                    value={localTheme.accentColor}
                                    onChange={(e) => handleChange('accentColor', e.target.value)}
                                    className="w-20 h-12"
                                />
                                <Input
                                    value={localTheme.accentColor}
                                    onChange={(e) => handleChange('accentColor', e.target.value)}
                                    placeholder="#1d4ed8"
                                    className="flex-1"
                                />
                                <div
                                    className="w-24 h-12 rounded-lg border-2 border-slate-200"
                                    style={{ backgroundColor: localTheme.accentColor }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">用于悬停状态和强调元素</p>
                        </div>

                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4">预设主题</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => {
                                        handleChange('primaryColor', '#2563eb');
                                        handleChange('accentColor', '#1d4ed8');
                                    }}
                                    className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 transition-colors"
                                >
                                    <div className="flex gap-2 mb-2">
                                        <div className="w-8 h-8 rounded bg-blue-600" />
                                        <div className="w-8 h-8 rounded bg-blue-700" />
                                    </div>
                                    <div className="text-sm font-semibold">蓝色</div>
                                </button>

                                <button
                                    onClick={() => {
                                        handleChange('primaryColor', '#6366f1');
                                        handleChange('accentColor', '#4f46e5');
                                    }}
                                    className="p-4 border-2 border-slate-200 rounded-lg hover:border-indigo-500 transition-colors"
                                >
                                    <div className="flex gap-2 mb-2">
                                        <div className="w-8 h-8 rounded bg-indigo-500" />
                                        <div className="w-8 h-8 rounded bg-indigo-700" />
                                    </div>
                                    <div className="text-sm font-semibold">紫色</div>
                                </button>

                                <button
                                    onClick={() => {
                                        handleChange('primaryColor', '#f59e0b');
                                        handleChange('accentColor', '#f97316');
                                    }}
                                    className="p-4 border-2 border-slate-200 rounded-lg hover:border-orange-500 transition-colors"
                                >
                                    <div className="flex gap-2 mb-2">
                                        <div className="w-8 h-8 rounded bg-amber-500" />
                                        <div className="w-8 h-8 rounded bg-orange-500" />
                                    </div>
                                    <div className="text-sm font-semibold">橙色</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
