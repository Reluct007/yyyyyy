'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ mainImage, images = [], title }) {
  // 合并主图和副图
  const allImages = mainImage ? [mainImage, ...images] : images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  if (allImages.length === 0) return null;
  
  const selectedImage = allImages[selectedIndex];
  
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto]">
      {/* 左侧大图 */}
      <div className="order-2 md:order-1">
        <div className="aspect-square bg-white border border-border rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt={`${title} - View ${selectedIndex + 1}`}
            className="w-full h-full object-contain"
            width={800}
            height={800}
            priority
          />
        </div>
      </div>
      
      {/* 右侧缩略图列表 */}
      <div className="order-1 md:order-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] pb-2 md:pb-0 md:pr-2">
        {allImages.slice(0, 7).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index 
                ? 'border-primary ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="w-full h-full object-contain bg-white"
              width={96}
              height={96}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
