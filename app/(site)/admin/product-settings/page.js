'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Layout } from 'lucide-react';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductSettingsPage() {
    const [layout, setLayout] = useState('default');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // 从 localStorage 读取设置
        const savedLayout = localStorage.getItem('productDetailLayout');
        if (savedLayout) {
            setLayout(savedLayout);
        }
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        try {
            localStorage.setItem('productDetailLayout', layout);
            toast.success('设置已保存');
        } catch (error) {
            toast.error('保存失败');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Layout className="w-7 h-7 text-blue-600" />
                                产品详情页设置
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">配置产品详情页的布局和显示选项</p>
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

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="space-y-6">
                            {/* 布局选择 */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    布局模式
                                </label>
                                <Select value={layout} onValueChange={setLayout}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="选择布局模式" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">
                                            <div className="flex flex-col">
                                                <span className="font-medium">默认布局</span>
                                                <span className="text-xs text-muted-foreground">
                                                    左侧大图 + 右侧2列缩略图网格
                                                </span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="split">
                                            <div className="flex flex-col">
                                                <span className="font-medium">分栏布局</span>
                                                <span className="text-xs text-muted-foreground">
                                                    左侧大图(65%) + 右侧垂直缩略图列表(35%)
                                                </span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="fullwidth">
                                            <div className="flex flex-col">
                                                <span className="font-medium">全覆布局</span>
                                                <span className="text-xs text-muted-foreground">
                                                    上部图片轮播 + 下部产品详情
                                                </span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-slate-500 mt-2">
                                    选择产品详情页的图片展示布局
                                </p>
                            </div>

                            {/* 布局预览 */}
                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="text-sm font-medium text-slate-700 mb-4">布局预览</h3>
                                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                    {layout === 'default' && (
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-slate-900">默认布局</div>
                                            <div className="grid grid-cols-2 gap-2 h-32">
                                                <div className="bg-blue-100 rounded flex items-center justify-center text-xs text-blue-700">
                                                    大图
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs">缩略图</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {layout === 'split' && (
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-slate-900">分栏布局</div>
                                            <div className="grid grid-cols-[2fr_1fr] gap-2 h-32">
                                                <div className="bg-blue-100 rounded flex items-center justify-center text-xs text-blue-700">
                                                    大图
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {layout === 'fullwidth' && (
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium text-slate-900">全覆布局</div>
                                            <div className="flex flex-col gap-2 h-32">
                                                <div className="bg-blue-100 rounded flex items-center justify-center text-xs text-blue-700 flex-1">
                                                    全宽图片轮播
                                                </div>
                                                <div className="flex gap-2 h-8">
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                    <div className="bg-slate-200 rounded flex items-center justify-center text-xs flex-1">缩略图</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 提示信息 */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        <p className="font-medium mb-1">提示</p>
                                        <p>布局设置将应用于所有产品详情页面。移动端将自动使用统一的轮播布局以确保最佳体验。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
