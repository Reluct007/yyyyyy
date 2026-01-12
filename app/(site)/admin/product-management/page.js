'use client';

import { useState, useMemo } from 'react';
import { useSettings } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Package,
    Plus,
    Search,
    Trash2,
    Edit,
    Copy,
    ChevronLeft,
    ChevronRight,
    Filter,
    Upload,
    Eye
} from 'lucide-react';
import { toast } from 'sonner';
import ProductEditor from '@/components/admin/product-editor';
import ProductImport from '@/components/admin/product-import';
import ProductPreview from '@/components/admin/product-preview';

export default function ProductManagement() {
    const { productList, addProduct, updateProduct, deleteProduct, deleteProducts, duplicateProduct } = useSettings();

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(productList?.map(p => p.category) || []);
        return ['all', ...Array.from(cats)];
    }, [productList]);

    // Filter and search products
    const filteredProducts = useMemo(() => {
        let filtered = productList || [];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }

        return filtered;
    }, [productList, searchTerm, categoryFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    // Handlers
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedProducts(paginatedProducts.map(p => p.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId, checked) => {
        if (checked) {
            setSelectedProducts(prev => [...prev, productId]);
        } else {
            setSelectedProducts(prev => prev.filter(id => id !== productId));
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowEditor(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowEditor(true);
    };

    const handleSaveProduct = async (productData) => {
        let success;

        if (editingProduct) {
            success = await updateProduct(editingProduct.id, productData);
            if (success) {
                toast.success('产品更新成功!');
            } else {
                toast.error('产品更新失败');
            }
        } else {
            success = await addProduct(productData);
            if (success) {
                toast.success('产品添加成功!');
            } else {
                toast.error('产品添加失败');
            }
        }

        if (success) {
            setShowEditor(false);
            setEditingProduct(null);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (confirm('确定要删除这个产品吗?')) {
            const success = await deleteProduct(productId);
            if (success) {
                toast.success('产品已删除');
                setSelectedProducts(prev => prev.filter(id => id !== productId));
            } else {
                toast.error('删除失败');
            }
        }
    };

    const handleBatchDelete = async () => {
        if (selectedProducts.length === 0) {
            toast.error('请先选择要删除的产品');
            return;
        }

        if (confirm(`确定要删除选中的 ${selectedProducts.length} 个产品吗?`)) {
            const success = await deleteProducts(selectedProducts);
            if (success) {
                toast.success(`已删除 ${selectedProducts.length} 个产品`);
                setSelectedProducts([]);
            } else {
                toast.error('批量删除失败');
            }
        }
    };

    const handleDuplicateProduct = async (productId) => {
        const success = await duplicateProduct(productId);
        if (success) {
            toast.success('产品已复制');
        } else {
            toast.error('复制失败');
        }
    };

    const handleBatchImport = async (products) => {
        try {
            // Add all products
            let successCount = 0;
            for (const product of products) {
                const success = await addProduct(product);
                if (success) successCount++;
            }

            if (successCount === products.length) {
                toast.success(`成功导入 ${successCount} 个产品`);
            } else {
                toast.warning(`导入完成: ${successCount}/${products.length} 个产品成功`);
            }

            setShowImport(false);
        } catch (error) {
            console.error('Batch import error:', error);
            toast.error('批量导入失败');
        }
    };

    if (!productList) {
        return <div className="p-8">加载中...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Package className="w-7 h-7 text-blue-600" />
                                产品管理
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">
                                共 {filteredProducts.length} 个产品
                                {selectedProducts.length > 0 && ` · 已选择 ${selectedProducts.length} 个`}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {selectedProducts.length > 0 && (
                                <Button
                                    onClick={handleBatchDelete}
                                    variant="destructive"
                                    size="sm"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    批量删除 ({selectedProducts.length})
                                </Button>
                            )}
                            <Button
                                onClick={() => setShowImport(true)}
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                批量导入
                            </Button>
                            <Button
                                onClick={handleAddProduct}
                                className="bg-gradient-to-r from-blue-600 to-blue-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                添加产品
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="搜索产品标题、分类或描述..."
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="border border-slate-300 rounded-md px-3 py-2 text-sm"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? '全部分类' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-left w-12">
                                        <Checkbox
                                            checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">产品</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">分类</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">描述</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">特性</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {paginatedProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {product.image && (
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div className="max-w-xs">
                                                    <div className="font-medium text-slate-900 truncate">{product.title}</div>
                                                    <div className="text-xs text-slate-500">{product.images?.length || 0} 张图片</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm text-slate-600 max-w-md truncate">
                                                {product.description}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-sm text-slate-600">
                                                {product.features?.length || 0} 个特性
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    onClick={() => setPreviewProduct(product)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    title="预览产品"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleEditProduct(product)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDuplicateProduct(product.id)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {paginatedProducts.length === 0 && (
                            <div className="text-center py-12 text-slate-400">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>没有找到产品</p>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                            <div className="text-sm text-slate-600">
                                显示 {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} / 共 {filteredProducts.length} 个产品
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    size="sm"
                                    variant="outline"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-sm text-slate-600">
                                    第 {currentPage} / {totalPages} 页
                                </span>
                                <Button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    size="sm"
                                    variant="outline"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showEditor && (
                <ProductEditor
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onCancel={() => {
                        setShowEditor(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            {showImport && (
                <ProductImport
                    onImport={handleBatchImport}
                    onCancel={() => setShowImport(false)}
                />
            )}

            {previewProduct && (
                <ProductPreview
                    product={previewProduct}
                    onClose={() => setPreviewProduct(null)}
                />
            )}
        </div>
    );
}
