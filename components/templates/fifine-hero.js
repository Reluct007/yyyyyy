'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FifineHero({ content = {} }) {
    const { slides = [
        {
            image: '/home/fifine_hero_newyear.jpg',
            title: '15% OFF',
            subtitle: 'Find Your 2026 Audio Upgrade',
            description: 'The new year deserves a new sound. Get 15% off on our best-selling microphones, mixers, and headsets.',
            cta: 'Shop Bundle Deals',
            ctaLink: '#'
        }
    ] } = content;

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-[600px] bg-[#121212] overflow-hidden">
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
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full container mx-auto px-6 flex items-center">
                        <div className="max-w-xl text-white">
                            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <h2 className="text-3xl font-semibold mb-4 text-[#a1a1a1]">
                                {slide.subtitle}
                            </h2>
                            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                                {slide.description}
                            </p>
                            <a
                                href={slide.ctaLink}
                                className="inline-block px-8 py-4 bg-[#d22730] hover:bg-[#b01f28] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                {slide.cta}
                            </a>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-[#d22730] w-8'
                                    : 'bg-white/40 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
