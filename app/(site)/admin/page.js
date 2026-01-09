'use client';

import Link from 'next/link';
import { Home, Settings, FileText, Package, Palette, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
    const sections = [
        {
            title: '首页管理',
            description: '管理首页模块、模板和内容',
            icon: Home,
            href: '/admin/homepage',
            color: 'blue'
        },
        {
            title: 'SEO设置',
            description: '配置全局和页面级SEO优化',
            icon: Settings,
            href: '/admin/seo',
            color: 'green'
        },
        {
            title: '页面管理',
            description: '管理About、Contact等单页面',
            icon: FileText,
            href: '/admin/pages',
            color: 'purple'
        },
        {
            title: '产品设置',
            description: '配置产品页面布局和功能',
            icon: Package,
            href: '/admin/products',
            color: 'orange'
        },
        {
            title: '主题设置',
            description: '自定义网站颜色主题',
            icon: Palette,
            href: '/admin/theme',
            color: 'pink'
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
        green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
        purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
        orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
        pink: 'bg-pink-50 text-pink-600 group-hover:bg-pink-100'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">RNVX Admin</h1>
                    <p className="text-slate-600">欢迎使用内容管理系统</p>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${colorClasses[section.color]}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h3>
                                <p className="text-sm text-slate-600">{section.description}</p>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Stats */}
                <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">快速统计</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">3</div>
                            <div className="text-sm text-slate-600">首页模块</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">2</div>
                            <div className="text-sm text-slate-600">管理页面</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">3</div>
                            <div className="text-sm text-slate-600">可用模板</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">100%</div>
                            <div className="text-sm text-slate-600">系统就绪</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
