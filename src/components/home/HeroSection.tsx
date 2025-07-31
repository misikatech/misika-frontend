import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';
import { BannerSlide } from '../../types';

const heroSlides: BannerSlide[] = [
  {
    id: '1',
    title: 'Summer Sale Up to 70% Off',
    subtitle: 'Limited Time Offer',
    description: 'Discover amazing deals on electronics, fashion, and home goods',
    image: '/images/hero-1.jpg',
    mobileImage: '/images/hero-1-mobile.jpg',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    title: 'New Arrivals Collection',
    subtitle: 'Fresh & Trendy',
    description: 'Explore the latest products from top brands',
    image: '/images/hero-2.jpg',
    mobileImage: '/images/hero-2-mobile.jpg',
    ctaText: 'Explore',
    ctaLink: '/products?sort=newest',
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Free Shipping Worldwide',
    subtitle: 'No Minimum Order',
    description: 'Get your favorite products delivered to your doorstep',
    image: '/images/hero-3.jpg',
    mobileImage: '/images/hero-3-mobile.jpg',
    ctaText: 'Learn More',
    ctaLink: '/shipping',
    isActive: true,
    order: 3,
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const activeSlides = heroSlides.filter((slide: BannerSlide) => slide.isActive)
    .sort((a: BannerSlide, b: BannerSlide) => a.order - b.order);

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev: number) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeSlides.length]);

  const handleMouseEnter = (): void => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = (): void => {
    setIsAutoPlaying(true);
  };

  if (activeSlides.length === 0) {
    return null;
  }

  const currentSlideData = activeSlides[currentSlide];

  return (
    <section 
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet={currentSlideData.mobileImage || currentSlideData.image} 
          />
          <img
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-lg">
              {currentSlideData.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-2 font-medium drop-shadow-md">
              {currentSlideData.subtitle}
            </p>
            <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">
              {currentSlideData.description}
            </p>
            {currentSlideData.ctaText && currentSlideData.ctaLink && (
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                leftIcon={<ShoppingBag className="w-5 h-5" />}
                onClick={() => window.location.href = currentSlideData.ctaLink!}
              >
                {currentSlideData.ctaText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {activeSlides.map((_, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
