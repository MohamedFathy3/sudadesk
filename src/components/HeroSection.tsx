// components/HeroSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

// 1. Define Types
interface ButtonProps {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

interface HeroSectionProps {
  // Images
  images: (string | StaticImageData)[];
  
  // Content
  title: string;
  subtitle?: string;
  highlightText?: string; // جزء من العنوان highlight
  
  // Buttons
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  
  // Styling
  overlay?: boolean;
  overlayColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  showScrollIndicator?: boolean;
  
  // Functionality
  autoSlide?: boolean;
  slideInterval?: number; // milliseconds
  fullHeight?: boolean;
  customHeight?: string;
  
  // Header adjustment (مهم)
  headerHeight?: number; // ارتفاع الـ Header
  
  // Custom ClassNames
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

// 2. Default Button Configs
const defaultPrimaryButton: ButtonProps = {
  text: "Browse Courses",
  link: "/courses",
  variant: "primary"
};

const defaultSecondaryButton: ButtonProps = {
  text: "Learn More",
  link: "/about",
  variant: "secondary"
};

// 3. Button Variant Styles
const buttonVariants = {
  primary: "bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg",
  secondary: "bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full text-lg transition-all",
  outline: "border-2 border-gray-300 text-gray-800 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-all"
};

// 4. Text Alignment Classes
const textAlignClasses = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto"
};

const HeroSection: React.FC<HeroSectionProps> = ({
  // Required
  images,
  title,
  
  // Optional with defaults
  subtitle = "Join thousands of students learning new skills every day",
  highlightText,
  
  primaryButton = defaultPrimaryButton,
  secondaryButton = defaultSecondaryButton,
  
  overlay = true,
  overlayColor = "from-black/60 to-transparent",
  textAlign = "center",
  showScrollIndicator = true,
  
  autoSlide = true,
  slideInterval = 5000,
  fullHeight = true,
  customHeight = "100vh",
  
  // Header adjustment default (تعديل)
  headerHeight = 80, // افتراضي 80px
  
  containerClassName = "",
  titleClassName = "",
  subtitleClassName = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [calculatedHeaderHeight, setCalculatedHeaderHeight] = useState<number>(headerHeight);

  // Calculate header height dynamically
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        setCalculatedHeaderHeight(height);
      }
    };

    calculateHeaderHeight();
    window.addEventListener('resize', calculateHeaderHeight);
    
    return () => window.removeEventListener('resize', calculateHeaderHeight);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, images.length, slideInterval]);

  // Handle image load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Render highlighted title
  const renderTitle = () => {
    if (!highlightText) {
      return <>{title}</>;
    }
    
    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-yellow-400">{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  // Calculate height with header adjustment
  const heightClass = fullHeight 
    ? `min-h-[calc(100vh-${calculatedHeaderHeight}px)] mt-[${calculatedHeaderHeight}px]` 
    : `min-h-[${customHeight}]`;

  return (
    <section 
      className={`relative ${heightClass} overflow-hidden ${containerClassName}`}
      role="banner"
      aria-label="Hero section"
      style={{
        marginTop: `${calculatedHeaderHeight}px`,
        minHeight: fullHeight ? `calc(100vh - ${calculatedHeaderHeight}px)` : customHeight
      }}
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {images.length === 0 ? (
          // Fallback gradient
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900"
            role="img"
            aria-label="Gradient background"
          />
        ) : images.length === 1 ? (
          // Single Image
          <div className="relative w-full h-full">
            <Image
              src={images[0]}
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className={`object-cover transition-opacity duration-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              quality={90}
              onLoadingComplete={() => setIsLoaded(true)}
            />
            {overlay && (
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`}
                aria-hidden="true"
              />
            )}
          </div>
        ) : (
          // Multiple Images Slider
          <>
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0'
                }`}
                aria-hidden={index !== currentSlide}
              >
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  quality={85}
                />
                {overlay && (
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
            
            {/* Navigation Dots */}
            <div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
              role="tablist"
              aria-label="Slider navigation"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                    index === currentSlide 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Go to slide ${index + 1}`}
                  tabIndex={0}
                />
              ))}
            </div>
            
            {/* Previous/Next Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide((prev) => 
                    prev === 0 ? images.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => 
                    (prev + 1) % images.length
                  )}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
                  aria-label="Next slide"
                >
                  →
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className={`max-w-6xl w-full ${textAlignClasses[textAlign]}`}>
          <h1 className={`
            text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 
            ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}
            ${titleClassName}
          `}>
            {renderTitle()}
          </h1>
          
          {subtitle && (
            <p className={`
              text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl 
              ${isLoaded ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}
              ${subtitleClassName}
            `}>
              {subtitle}
            </p>
          )}
          
          {/* Call to Action Buttons */}
          <div className={`
            flex flex-col sm:flex-row gap-4 ${textAlign === 'center' ? 'justify-center' : 'justify-start'}
            ${isLoaded ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}
          `}>
            <Link
              href={primaryButton.link}
              className={buttonVariants[primaryButton.variant || 'primary']}
            >
              {primaryButton.icon && (
                <span className="mr-2">{primaryButton.icon}</span>
              )}
              {primaryButton.text}
            </Link>
            
            {secondaryButton && (
              <Link
                href={secondaryButton.link}
                className={buttonVariants[secondaryButton.variant || 'secondary']}
              >
                {secondaryButton.icon && (
                  <span className="mr-2">{secondaryButton.icon}</span>
                )}
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          aria-hidden="true"
        >
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;