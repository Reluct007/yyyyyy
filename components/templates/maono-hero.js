'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MaonoHero({ content = {} }) {
    const { slides = [
        {
            image: '/home/banner-showcase.jpg',
            productName: 'PD200W Hybrid',
            tagline: 'New Product Launch',
            cta: 'SHOP NOW'
        }
    ] } = content;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-[600px] bg-white overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                        <div className="text-white max-w-xl">
                            <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">
                                {slide.productName}
                            </h2>
                            <p className="text-xl mb-8 drop-shadow-md">
                                {slide.tagline}
                            </p>
                            <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                                {slide.cta}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
