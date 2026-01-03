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
  const mainImageRef = useRef(null);
  
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
  
  // 触摸事件
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage() : prevImage();
    }
  };
  
  return (
    <>
      {/* 桌面端布局：左侧大图 + 右侧 2列网格（高度与左侧一致，超出滚动） */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {/* 左侧大图 */}
        <div ref={mainImageRef} className="aspect-square bg-white border border-border rounded-lg overflow-hidden">
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
        
        {/* 右侧 2列网格 - 高度与左侧一致，超出滚动 */}
        <div className="aspect-square overflow-y-auto pr-2 scrollbar-thin">
          <div className="grid grid-cols-2 gap-3">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`aspect-square bg-white rounded-lg overflow-hidden transition-all ${
                  selectedIndex === index 
                    ? 'border-2 border-primary ring-4 ring-primary/20 shadow-lg' 
                    : 'border border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} - View ${index + 1}`}
                  className={`w-full h-full object-contain transition-opacity ${
                    selectedIndex === index ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                  }`}
                  width={400}
                  height={400}
                />
              </button>
            ))}
          </div>
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
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.slice(0, 7).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedIndex === index ? 'bg-primary w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
