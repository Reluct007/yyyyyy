'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function ImageUpload({ value, onChange, placeholder = "Upload image" }) {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('https://yyyyyy-upload-api.reluct007.workers.dev/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                // Worker returns full URL with /files/ prefix
                const fullUrl = `https://yyyyyy-upload-api.reluct007.workers.dev${data.url}`;
                onChange(fullUrl);
            } else {
                alert('Upload failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <Input
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Image URL or upload..."
                        className="pr-10"
                    />
                    <ImageIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                    <input
                        type="file"
                        id={`upload-${placeholder}`}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    <Button
                        variant="secondary"
                        size="icon"
                        className="relative"
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>

            {value && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    <img
                        src={value}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg'; // Fallback if regular Image fails (though we use img for simplicity in admin)
                        }}
                    />
                </div>
            )}
        </div>
    );
}
