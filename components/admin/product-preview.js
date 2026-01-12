'use client';

import { X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductPreview({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Package className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-900">产品预览</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">产品标题</h3>
                            <p className="text-lg font-semibold text-slate-900">{product.title}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">分类</h3>
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {product.category}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">特性数量</h3>
                                <p className="text-slate-900">{product.features?.length || 0} 个特性</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">产品描述</h3>
                            <p className="text-slate-700 leading-relaxed">{product.description}</p>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-3">主图片</h3>
                        <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-64 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div
                                className="w-full h-64 flex items-center justify-center text-slate-400"
                                style={{ display: product.image ? 'none' : 'flex' }}
                            >
                                <div className="text-center">
                                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">图片加载失败或未设置</p>
                                    <p className="text-xs mt-1">{product.image}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Images */}
                    {product.images && product.images.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-3">
                                图片库 ({product.images.length})
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 aspect-square"
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div
                                            className="w-full h-full flex items-center justify-center text-slate-400 text-xs"
                                            style={{ display: 'none' }}
                                        >
                                            加载失败
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-3">产品特性</h3>
                            <div className="space-y-3">
                                {product.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                                    >
                                        <h4 className="font-semibold text-slate-900 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="border-t border-slate-200 pt-4">
                        <h3 className="text-sm font-medium text-slate-500 mb-3">元数据</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500">产品 ID:</span>
                                <span className="ml-2 text-slate-700 font-mono text-xs">
                                    {product.id}
                                </span>
                            </div>
                            {product.createdAt && (
                                <div>
                                    <span className="text-slate-500">创建时间:</span>
                                    <span className="ml-2 text-slate-700">
                                        {new Date(product.createdAt).toLocaleString('zh-CN')}
                                    </span>
                                </div>
                            )}
                            {product.updatedAt && (
                                <div>
                                    <span className="text-slate-500">更新时间:</span>
                                    <span className="ml-2 text-slate-700">
                                        {new Date(product.updatedAt).toLocaleString('zh-CN')}
                                    </span>
                                </div>
                            )}
                            <div>
                                <span className="text-slate-500">图片数量:</span>
                                <span className="ml-2 text-slate-700">
                                    {(product.images?.length || 0) + 1}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                    <Button
                        onClick={() => {
                            // Generate product URL slug from title
                            const slug = product.title
                                .toLowerCase()
                                .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
                                .replace(/^-+|-+$/g, '');
                            window.open(`/product/${slug}`, '_blank');
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                        查看前端页面
                    </Button>
                    <Button onClick={onClose} variant="outline">
                        关闭
                    </Button>
                </div>
            </div>
        </div>
    );
}
