'use client';

import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Loader2, X } from 'lucide-react';
import { uploadToR2 } from '@/lib/r2-upload';
import { toast } from 'sonner';

export default function RichTextEditor({ value, onChange, placeholder, rows = 3 }) {
    const [isUploading, setIsUploading] = useState(false);
    const [images, setImages] = useState([]);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    // Handle paste event
    const handlePaste = async (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    await uploadImage(file);
                }
                break;
            }
        }
    };

    // Upload image to R2
    const uploadImage = async (file) => {
        setIsUploading(true);
        try {
            const result = await uploadToR2(file, 'products/features');
            if (result.success) {
                const imageUrl = result.url;
                const imageName = result.path.split('/').pop();

                // Insert image markdown at cursor position
                const textarea = textareaRef.current;
                const cursorPos = textarea.selectionStart;
                const textBefore = value.substring(0, cursorPos);
                const textAfter = value.substring(cursorPos);
                const imageMarkdown = `![${imageName}](${imageUrl})`;

                const newValue = textBefore + imageMarkdown + textAfter;
                onChange(newValue);

                // Track uploaded images
                setImages(prev => [...prev, { url: imageUrl, name: imageName }]);

                toast.success('图片上传成功');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('图片上传失败: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle file input change
    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            await uploadImage(file);
        }
    };

    // Trigger file input
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <div className="relative">
                <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onPaste={handlePaste}
                    placeholder={placeholder}
                    rows={rows}
                    className="pr-12"
                />

                {/* Image upload button */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    {isUploading && (
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    )}
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={triggerFileInput}
                        disabled={isUploading}
                        className="h-7 w-7 p-0"
                        title="插入图片"
                    >
                        <ImageIcon className="w-4 h-4" />
                    </Button>
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Help text */}
            <p className="text-xs text-slate-500">
                支持粘贴图片（Ctrl+V）或点击图标上传。使用 Markdown 格式：![描述](图片URL)
            </p>

            {/* Preview uploaded images */}
            {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                        >
                            <ImageIcon className="w-3 h-3" />
                            <span className="truncate max-w-[100px]">{img.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
