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
  // 右侧显示的副图（排除当前选中的图片）
  const sideImages = allImages.filter((_, i) => i !== selectedIndex).slice(0, 6);
  
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
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  // 点击副图切换
  const handleSideImageClick = (image) => {
    const index = allImages.findIndex(img => img === image);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };
  
  return (
    <>
      {/* 桌面端布局：左侧大图 + 右侧 2x3 网格 */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {/* 左侧大图 */}
        <div className="aspect-square bg-white border border-border rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt={`${title} - Main view`}
            className="w-full h-full object-contain cursor-pointer"
            width={800}
            height={800}
            priority
            onClick={nextImage}
          />
        </div>
        
        {/* 右侧 2x3 副图网格 */}
        <div className="grid grid-cols-2 gap-3">
          {sideImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleSideImageClick(image)}
              className="aspect-square bg-white border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              <Image
                src={image}
                alt={`${title} - View ${index + 2}`}
                className="w-full h-full object-contain"
                width={400}
                height={400}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 移动端布局：滑动切换 */}
      <div className="md:hidden relative">
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
        
        {allImages.length > 1 && (
          <>
            {/* 左右箭头 */}
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* 底部指示点 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
    </>
  );
}
