'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const AdvancedTestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      comment: "This platform completely transformed my career. The quality of education is exceptional!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      course: "Full Stack Development"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "UI/UX Designer",
      comment: "The best investment I've made in my education. The instructors are world-class!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      course: "UI/UX Design Mastery"
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Data Scientist",
      comment: "Outstanding platform with incredible support. I landed my dream job after completing the course!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      course: "Data Science Pro"
    }
  ];

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Student <span className="text-green-600">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our students who transformed their careers with ePathsala
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Swiper with Cards Effect */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCards]}
            effect="cards"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            cardsEffect={{
              rotate: true,
              perSlideOffset: 12,
              perSlideRotate: 2,
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="advanced-testimonials-swiper h-96"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 h-full flex flex-col justify-between">
                  {/* Content */}
                  <div>
                    {/* Quote Icon */}
                    <div className="text-6xl text-green-100 mb-4"></div>
                    
                    {/* Comment */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      {testimonial.comment}
                    </p>
                    
                    {/* Course */}
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                      {testimonial.course}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-xl">{testimonial.name}</h4>
                          <p className="text-green-600">{testimonial.role}</p>
                        </div>
                        <div className="flex space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-16">
            <button
              ref={navigationPrevRef}
              className="w-14 h-14 bg-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center hover:bg-green-500 group transition-all duration-300 transform hover:-translate-x-1"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-green-600">{String(activeIndex + 1).padStart(2, '0')}</span>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <span className="text-2xl font-bold text-gray-400">{String(testimonials.length).padStart(2, '0')}</span>
            </div>
            
            <button
              ref={navigationNextRef}
              className="w-14 h-14 bg-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center hover:bg-green-500 group transition-all duration-300 transform hover:translate-x-1"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .advanced-testimonials-swiper {
          width: 100%;
          max-width: 500px;
        }
        
        .advanced-testimonials-swiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          background: white;
        }
        
        .custom-bullet {
          width: 12px;
          height: 12px;
          background: #D1D5DB;
          opacity: 0.7;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .custom-bullet.swiper-pagination-bullet-active {
          background: #10B981;
          opacity: 1;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};

export default AdvancedTestimonialsSection;