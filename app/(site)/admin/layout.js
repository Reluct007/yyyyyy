'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, FileText, Package, Palette } from 'lucide-react';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/homepage', label: '首页管理', icon: Home },
        { href: '/admin/seo', label: 'SEO设置', icon: Settings },
        { href: '/admin/pages', label: '页面管理', icon: FileText },
        { href: '/admin/products', label: '产品设置', icon: Package },
        { href: '/admin/theme', label: '主题设置', icon: Palette }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <h1 className="text-xl font-bold text-slate-900">RNVX Admin</h1>
                    <p className="text-sm text-slate-500 mt-1">内容管理系统</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700 font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                    >
                        ← 返回网站
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
                <Toaster position="top-right" richColors />
            </div>
        </div>
    );
}
