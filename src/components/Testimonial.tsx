// components/ActivitiesGallery.tsx
"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Activity {
  image: string;
  caption: string;
}

interface ActivitiesGalleryProps {
  activities: Activity[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
}

export const ActivitiesGallery = ({ 
  activities, 
  title = "School Activities",
  subtitle = "Explore our gallery of school events and activities",
  autoPlay = true 
}: ActivitiesGalleryProps) => {
  const [swiperConfig, setSwiperConfig] = useState({
    slidesPerView: 1,
    spaceBetween: 20,
  });

  // Update swiper config based on screen size
  useEffect(() => {
    const updateSwiperConfig = () => {
      if (window.innerWidth >= 1024) {
        setSwiperConfig({ slidesPerView: 3, spaceBetween: 30 });
      } else if (window.innerWidth >= 768) {
        setSwiperConfig({ slidesPerView: 2, spaceBetween: 20 });
      } else {
        setSwiperConfig({ slidesPerView: 1, spaceBetween: 10 });
      }
    };

    updateSwiperConfig();
    window.addEventListener('resize', updateSwiperConfig);
    
    return () => window.removeEventListener('resize', updateSwiperConfig);
  }, []);

  // إذا مفيش activities، نرجع null
  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <section className="ed-testimonial ed-testimonial--style3 section-gap pt-0 overflow-hidden">
      <div className="container ed-container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="ed-section-head text-center">
              <span className="ed-section-head__sm-title">SCHOOL GALLERY</span>
              <h3 className="ed-section-head__title ed-split-text left">
                {title}
              </h3>
              {subtitle && (
                <p className="ed-section-head__text mt-3">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-8">
        <div className="col-12">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={swiperConfig.slidesPerView}
            spaceBetween={swiperConfig.spaceBetween}
            loop={activities.length > 1}
            autoplay={autoPlay ? {
              delay: 3000,
              disableOnInteraction: false,
            } : false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={activities.length > swiperConfig.slidesPerView}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="swiper ed-testimonial__slider-2"
          >
            {activities.map((activity, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="ed-testimonial__slider-item bg-white shadow-lg rounded-xl overflow-hidden">
                  {/* Activity Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.caption}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Activity Caption */}
                  <div className="p-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">
                      {activity.caption}
                    </h5>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-blue-600 font-medium">
                        Activity {index + 1}
                      </span>
                      <button 
                        onClick={() => window.open(activity.image, '_blank')}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        View Full Size →
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* إذا مفيش activities كافية، نضيف empty slides */}
            {activities.length < 3 && (
              [...Array(3 - activities.length)].map((_, index) => (
                <SwiperSlide key={`empty-${index}`} className="swiper-slide">
                  <div className="ed-testimonial__slider-item bg-gray-100 rounded-xl h-full min-h-[300px] flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <i className="fi fi-rr-image text-4xl mb-3"></i>
                      <p>More activities coming soon</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
      
      {/* Custom CSS for gallery */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};