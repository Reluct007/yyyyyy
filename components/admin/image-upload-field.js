'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadToR2 } from '@/lib/r2-upload';
import { toast } from 'sonner';

export default function ImageUploadField({ value, onChange, label, required = false, error = null }) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(value || '');

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Create preview
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);

            // Upload to R2
            const result = await uploadToR2(file, 'products');

            if (result.success) {
                onChange(result.url);
                toast.success('图片上传成功');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('图片上传失败: ' + error.message);
            setPreviewUrl(value || '');
        } finally {
            setIsUploading(false);
        }
    };

    const handleUrlChange = (url) => {
        setPreviewUrl(url);
        onChange(url);
    };

    const handleClear = () => {
        setPreviewUrl('');
        onChange('');
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Preview */}
            {previewUrl && (
                <div className="mb-3 relative inline-block">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-slate-200"
                        onError={() => setPreviewUrl('')}
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Upload Button */}
            <div className="flex gap-2">
                <div className="flex-1">
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        placeholder="/product/image.webp 或 https://example.com/image.jpg"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-slate-300'
                            }`}
                        disabled={isUploading}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id={`file-${label}`}
                        disabled={isUploading}
                    />
                    <label htmlFor={`file-${label}`}>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isUploading}
                            asChild
                        >
                            <span className="cursor-pointer">
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        上传中...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4 mr-2" />
                                        上传
                                    </>
                                )}
                            </span>
                        </Button>
                    </label>
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            <p className="text-xs text-slate-500 mt-1">
                支持 JPG, PNG, WEBP, GIF 格式，最大 10MB
            </p>
        </div>
    );
}
