'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Trash2, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import ImageUploadField from '@/components/admin/image-upload-field';
import { uploadToR2 } from '@/lib/r2-upload';
import { toast } from 'sonner';

export default function ProductEditor({ product, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: '',
        images: [],
        image_names: [],
        features: []
    });

    const [errors, setErrors] = useState({});
    const [isUploadingGallery, setIsUploadingGallery] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                category: product.category || '',
                description: product.description || '',
                image: product.image || '',
                images: product.images || [],
                image_names: product.image_names || [],
                features: product.features || []
            });
        }
    }, [product]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = '产品标题不能为空';
        }

        if (!formData.category.trim()) {
            newErrors.category = '产品分类不能为空';
        }

        if (!formData.description.trim()) {
            newErrors.description = '产品描述不能为空';
        }

        if (!formData.image.trim()) {
            newErrors.image = '主图片不能为空';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, { title: '', description: '' }]
        }));
    };

    const updateFeature = (index, field, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index][field] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const addImage = async () => {
        // Create file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            setIsUploadingGallery(true);
            try {
                const result = await uploadToR2(file, 'products');
                if (result.success) {
                    const imageName = result.path.split('/').pop();
                    setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, result.url],
                        image_names: [...prev.image_names, imageName]
                    }));
                    toast.success('图片上传成功');
                } else {
                    throw new Error(result.error);
                }
            } catch (error) {
                console.error('Upload error:', error);
                toast.error('图片上传失败: ' + error.message);
            } finally {
                setIsUploadingGallery(false);
            }
        };
        input.click();
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
            image_names: prev.image_names.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
                <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {product ? '编辑产品' : '添加新产品'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">基本信息</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                产品标题 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="输入产品标题"
                                className={errors.title ? 'border-red-500' : ''}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                产品分类 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                placeholder="输入产品分类"
                                className={errors.category ? 'border-red-500' : ''}
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                产品描述 <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="输入产品描述"
                                rows={4}
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">图片管理</h3>

                        <ImageUploadField
                            value={formData.image}
                            onChange={(value) => handleChange('image', value)}
                            label="主图片路径"
                            required={true}
                            error={errors.image}
                        />

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    图片库 ({formData.images.length})
                                </label>
                                <Button
                                    type="button"
                                    onClick={addImage}
                                    size="sm"
                                    variant="outline"
                                    disabled={isUploadingGallery}
                                >
                                    {isUploadingGallery ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                            上传中...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 mr-1" />
                                            添加图片
                                        </>
                                    )}
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative group border border-slate-200 rounded-lg p-2">
                                        <div className="flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-xs text-slate-600 truncate">{formData.image_names[index]}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">产品特性</h3>
                            <Button
                                type="button"
                                onClick={addFeature}
                                size="sm"
                                variant="outline"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                添加特性
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="border border-slate-200 rounded-lg p-4 relative">
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="space-y-3 pr-8">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                特性标题
                                            </label>
                                            <Input
                                                value={feature.title}
                                                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                                placeholder="输入特性标题"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                特性描述
                                            </label>
                                            <Textarea
                                                value={feature.description}
                                                onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                                placeholder="输入特性描述"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {formData.features.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    暂无产品特性，点击上方按钮添加
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                        <Button
                            type="button"
                            onClick={onCancel}
                            variant="outline"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-blue-700"
                        >
                            {product ? '保存更改' : '添加产品'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
