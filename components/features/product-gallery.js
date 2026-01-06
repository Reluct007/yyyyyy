"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function ProductGallery({ mainImage, images = [], title }) {
  const allImages = mainImage ? [mainImage, ...images] : images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const scrollContainerRef = useRef(null);

  // 检查是否需要显示滚动提示
  useEffect(() => {
    if (allImages.length === 0) {
      setShowScrollHint(false);
      return;
    }

    const container = scrollContainerRef.current;
    if (container) {
      setShowScrollHint(container.scrollHeight > container.clientHeight);
    }
  }, [allImages.length]);

  if (allImages.length === 0) return null;

  const selectedImage = allImages[selectedIndex] ?? allImages[0];

  // 滚动时隐藏提示
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container && container.scrollTop > 20) {
      setShowScrollHint(false);
    }
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

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
      {/* 桌面端布局 */}
      <div className="hidden gap-4 md:grid md:grid-cols-2">
        {/* 左侧大图 */}
        <div className="aspect-square overflow-hidden rounded-lg border border-border bg-white">
          <Image
            src={selectedImage}
            alt={`${title} - Main view`}
            className="h-full w-full cursor-pointer object-contain"
            width={800}
            height={800}
            loading="eager"
            fetchPriority="high"
            onClick={nextImage}
          />
        </div>

        {/* 右侧缩略图区域 */}
        <div className="relative aspect-square">
          {/* 滚动容器 - 隐藏滚动条 */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="scrollbar-hide h-full overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="grid grid-cols-2 gap-3 pb-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg bg-white transition-all ${
                    selectedIndex === index
                      ? "border-2 border-primary shadow-lg ring-4 ring-primary/20"
                      : "border border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} - View ${index + 1}`}
                    className={`h-full w-full object-contain transition-opacity ${
                      selectedIndex === index ? "opacity-100" : "opacity-80 hover:opacity-100"
                    }`}
                    width={400}
                    height={400}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 底部渐变遮罩和滚动提示 */}
          {showScrollHint && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0">
              <div className="h-24 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center">
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-primary backdrop-blur-sm">
                  <ChevronDown className="h-4 w-4 animate-bounce" />
                  <span className="text-xs font-medium">Scroll for more</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 移动端布局 */}
      <div className="relative md:hidden">
        <div
          className="aspect-square overflow-hidden rounded-lg border border-border bg-white"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={selectedImage}
            alt={`${title} - View ${selectedIndex + 1}`}
            className="h-full w-full object-contain"
            width={800}
            height={800}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              type="button"
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextImage}
              type="button"
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {allImages.slice(0, 7).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                  aria-label={`View image ${index + 1} of ${allImages.length}`}
                  aria-current={selectedIndex === index}
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 rounded-full transition-all ${
                      selectedIndex === index ? "w-4 bg-primary" : "w-2 bg-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 隐藏滚动条的全局样式 */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
