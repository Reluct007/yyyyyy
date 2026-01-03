'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ mainImage, images = [], title }) {
  // 合并主图和副图
  const allImages = mainImage ? [mainImage, ...images] : images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  if (allImages.length === 0) return null;
  
  const selectedImage = allImages[selectedIndex];
  
  // 切换到上一张
  const prevImage = () => {
    setSelectedIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
  };
  
  // 切换到下一张
  const nextImage = () => {
    setSelectedIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
  };
  
  // 触摸开始
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  // 触摸结束
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    // 滑动超过 50px 触发切换
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage(); // 左滑 -> 下一张
      } else {
        prevImage(); // 右滑 -> 上一张
      }
    }
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_120px]">
      {/* 主图区域 */}
      <div className="relative">
        <div 
          className="aspect-square bg-white border border-border rounded-lg overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={selectedImage}
            alt={`${title} - View ${selectedIndex + 1}`}
            className="w-full h-full object-contain"
            width={800}
            height={800}
            priority
          />
        </div>
        
        {/* 移动端指示器和箭头 */}
        {allImages.length > 1 && (
          <>
            {/* 左右箭头 - 仅移动端显示 */}
            <button 
              onClick={prevImage}
              className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* 底部指示点 - 仅移动端显示 */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.slice(0, 7).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedIndex === index 
                      ? 'bg-primary w-4' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* 右侧缩略图列表 - 仅桌面端显示 */}
      <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-2">
        {allImages.slice(0, 7).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`flex-shrink-0 w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index 
                ? 'border-primary ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="w-full h-full object-contain bg-white"
              width={120}
              height={120}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
