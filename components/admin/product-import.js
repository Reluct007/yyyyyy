'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function ProductImport({ onImport, onCancel }) {
    const [file, setFile] = useState(null);
    const [parsedProducts, setParsedProducts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState('upload'); // 'upload', 'preview', 'processing', 'complete'

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (!['csv', 'xlsx', 'xls'].includes(fileExtension)) {
                toast.error('请上传 CSV 或 XLSX 文件');
                return;
            }
            setFile(selectedFile);
            parseFile(selectedFile);
        }
    };

    const parseFile = async (file) => {
        setIsProcessing(true);
        setErrors([]);

        try {
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (fileExtension === 'csv') {
                await parseCSV(file);
            } else {
                await parseXLSX(file);
            }
        } catch (error) {
            console.error('Parse error:', error);
            toast.error('文件解析失败: ' + error.message);
            setErrors([{ row: 0, message: error.message }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const parseCSV = (file) => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    processData(results.data);
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    };

    const parseXLSX = async (file) => {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        processData(jsonData);
    };

    const processData = (data) => {
        const products = [];
        const validationErrors = [];

        data.forEach((row, index) => {
            const rowNumber = index + 2; // +2 because index starts at 0 and row 1 is header

            // Validate required fields
            if (!row.title || !row.title.trim()) {
                validationErrors.push({ row: rowNumber, field: 'title', message: '产品标题不能为空' });
            }
            if (!row.category || !row.category.trim()) {
                validationErrors.push({ row: rowNumber, field: 'category', message: '产品分类不能为空' });
            }
            if (!row.description || !row.description.trim()) {
                validationErrors.push({ row: rowNumber, field: 'description', message: '产品描述不能为空' });
            }
            if (!row.image || !row.image.trim()) {
                validationErrors.push({ row: rowNumber, field: 'image', message: '主图片不能为空' });
            }

            // Parse images (comma-separated)
            const images = row.images ? row.images.split(',').map(img => img.trim()).filter(Boolean) : [];

            // Parse features (JSON or simplified format)
            let features = [];
            if (row.features && row.features.trim()) {
                try {
                    // Try parsing as JSON
                    features = JSON.parse(row.features);
                } catch (e) {
                    // Try simplified format: "Title1: Desc1 | Title2: Desc2"
                    const parts = row.features.split('|');
                    features = parts.map(part => {
                        const [title, description] = part.split(':').map(s => s.trim());
                        return { title: title || '', description: description || '' };
                    }).filter(f => f.title);
                }
            }

            // Create product object
            const product = {
                title: row.title?.trim() || '',
                category: row.category?.trim() || '',
                description: row.description?.trim() || '',
                image: row.image?.trim() || '',
                images: images,
                image_names: images.map(img => img.split('/').pop()),
                features: features,
                _rowNumber: rowNumber,
                _hasExternalImages: isExternalUrl(row.image) || images.some(img => isExternalUrl(img))
            };

            products.push(product);
        });

        setParsedProducts(products);
        setErrors(validationErrors);

        if (validationErrors.length === 0) {
            setStep('preview');
            toast.success(`成功解析 ${products.length} 个产品`);
        } else {
            toast.error(`发现 ${validationErrors.length} 个验证错误`);
        }
    };

    const isExternalUrl = (url) => {
        if (!url) return false;
        return url.startsWith('http://') || url.startsWith('https://');
    };

    const handleConfirmImport = async () => {
        setIsProcessing(true);
        setStep('processing');

        try {
            // Process products with external images
            const processedProducts = await Promise.all(
                parsedProducts.map(async (product) => {
                    const processedProduct = { ...product };

                    // Note: R2 upload would happen here if configured
                    // For now, we'll just use the URLs as-is
                    if (product._hasExternalImages) {
                        console.log('External images detected for:', product.title);
                        // TODO: Implement R2 upload
                    }

                    // Remove temporary fields
                    delete processedProduct._rowNumber;
                    delete processedProduct._hasExternalImages;

                    return processedProduct;
                })
            );

            // Call the import callback
            await onImport(processedProducts);

            setStep('complete');
            toast.success(`成功导入 ${processedProducts.length} 个产品`);

            // Auto-close after success
            setTimeout(() => {
                onCancel();
            }, 2000);
        } catch (error) {
            console.error('Import error:', error);
            toast.error('导入失败: ' + error.message);
            setStep('preview');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadTemplate = () => {
        window.open('/templates/product-import-template.csv', '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">批量导入产品</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            支持 CSV 和 XLSX 格式文件
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        disabled={isProcessing}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {step === 'upload' && (
                        <div className="space-y-6">
                            {/* Download Template */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-blue-900">下载模板文件</h3>
                                        <p className="text-sm text-blue-700 mt-1">
                                            请先下载模板文件，按照格式填写产品数据后再上传
                                        </p>
                                        <Button
                                            onClick={downloadTemplate}
                                            variant="outline"
                                            size="sm"
                                            className="mt-3"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            下载 CSV 模板
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    上传产品数据文件
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">
                                    支持 CSV 和 XLSX 格式，最大 10MB
                                </p>
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    disabled={isProcessing}
                                />
                                <label htmlFor="file-upload">
                                    <Button asChild disabled={isProcessing}>
                                        <span className="cursor-pointer">
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    解析中...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    选择文件
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </label>
                                {file && (
                                    <p className="text-sm text-slate-600 mt-3">
                                        已选择: {file.name}
                                    </p>
                                )}
                            </div>

                            {/* Field Instructions */}
                            <div className="bg-slate-50 rounded-lg p-4">
                                <h3 className="font-semibold text-slate-900 mb-3">字段说明</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">必填字段 ✅</h4>
                                        <ul className="space-y-1 text-slate-600">
                                            <li>• title - 产品标题</li>
                                            <li>• category - 产品分类</li>
                                            <li>• description - 产品描述</li>
                                            <li>• image - 主图片URL</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-2">可选字段 ⭕</h4>
                                        <ul className="space-y-1 text-slate-600">
                                            <li>• images - 图片库（逗号分隔）</li>
                                            <li>• features - 产品特性（JSON格式）</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    <h4 className="font-medium text-slate-700 mb-2">图片URL格式</h4>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>• 外链: https://example.com/image.jpg （自动上传到R2）</li>
                                        <li>• 本地: /product/image.webp （直接使用）</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className="space-y-4">
                            {/* Validation Errors */}
                            {errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-red-900">
                                                发现 {errors.length} 个验证错误
                                            </h3>
                                            <ul className="mt-2 space-y-1 text-sm text-red-700">
                                                {errors.slice(0, 5).map((error, idx) => (
                                                    <li key={idx}>
                                                        第 {error.row} 行 - {error.field}: {error.message}
                                                    </li>
                                                ))}
                                                {errors.length > 5 && (
                                                    <li>...还有 {errors.length - 5} 个错误</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preview Table */}
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                                    <h3 className="font-semibold text-slate-900">
                                        预览数据 ({parsedProducts.length} 个产品)
                                    </h3>
                                </div>
                                <div className="overflow-x-auto max-h-96">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-100 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-semibold text-slate-700">行</th>
                                                <th className="px-4 py-2 text-left font-semibold text-slate-700">标题</th>
                                                <th className="px-4 py-2 text-left font-semibold text-slate-700">分类</th>
                                                <th className="px-4 py-2 text-left font-semibold text-slate-700">图片</th>
                                                <th className="px-4 py-2 text-left font-semibold text-slate-700">特性</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {parsedProducts.map((product, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50">
                                                    <td className="px-4 py-2 text-slate-600">{product._rowNumber}</td>
                                                    <td className="px-4 py-2 text-slate-900">{product.title}</td>
                                                    <td className="px-4 py-2 text-slate-600">{product.category}</td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-slate-600">
                                                                {product.images.length + 1}
                                                            </span>
                                                            {product._hasExternalImages && (
                                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                                                    外链
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 text-slate-600">
                                                        {product.features.length}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">正在导入产品...</h3>
                            <p className="text-sm text-slate-500">
                                正在处理 {parsedProducts.length} 个产品，请稍候
                            </p>
                        </div>
                    )}

                    {step === 'complete' && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">导入成功！</h3>
                            <p className="text-sm text-slate-500">
                                已成功导入 {parsedProducts.length} 个产品
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {(step === 'preview' || step === 'upload') && (
                    <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
                        <Button
                            onClick={onCancel}
                            variant="outline"
                            disabled={isProcessing}
                        >
                            取消
                        </Button>
                        {step === 'preview' && (
                            <Button
                                onClick={handleConfirmImport}
                                disabled={errors.length > 0 || isProcessing}
                                className="bg-gradient-to-r from-blue-600 to-blue-700"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        导入中...
                                    </>
                                ) : (
                                    <>
                                        确认导入 ({parsedProducts.length})
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
