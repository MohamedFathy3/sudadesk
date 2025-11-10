'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // بيانات الـ slides
  const slides = [
    {
      title: "Learn From The",
      highlight: "Best",
      subtitle: "Educators",
      description: "Join thousands of students mastering new skills with our expert-led courses. Start your educational journey today and unlock your potential.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["50K+", "Students"],
      buttonText: "Explore Courses"
    },
    {
      title: "Advance Your",
      highlight: "Career",
      subtitle: "Today",
      description: "Gain in-demand skills with our comprehensive courses designed by industry professionals. Get certified and boost your career prospects.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["200+", "Courses"],
      buttonText: "View Courses"
    },
    {
      title: "Join Our",
      highlight: "Community",
      subtitle: "Of Learners",
      description: "Connect with peers, share knowledge, and grow together in our vibrant learning community. Collaborative learning for better results.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: ["100+", "Expert Teachers"],
      buttonText: "Join Now"
    }
  ];

  // Typing animation effect
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    const textToType = currentSlideData.highlight;
    
    if (isTransitioning) {
      // Wait before starting new animation
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setIsDeleting(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
    else if (isDeleting) {
      // Deleting text
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80); // سرعة المسح
        return () => clearTimeout(timeout);
      } else {
        // Start transition to next slide
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    } else {
      // Typing text
      if (currentIndex < textToType.length) {
        const timeout = setTimeout(() => {
          setDisplayText(textToType.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 150); // سرعة الكتابة
        return () => clearTimeout(timeout);
      } else {
        // Wait then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2500); // وقت الانتظار بعد اكتمال الكتابة
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, isDeleting, isTransitioning, displayText, currentSlide, slides]);

  // Auto slide change (للطوارئ فقط)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting && !isTransitioning && displayText === slides[currentSlide].highlight) {
        setIsDeleting(true);
      }
    }, 6000); // وقت أطول بين التغيرات
    
    return () => clearInterval(interval);
  }, [currentSlide, isDeleting, isTransitioning, displayText, slides]);

  const handleSlideChange = (index: number) => {
    if (index !== currentSlide) {
      setIsDeleting(true);
      setCurrentSlide(index);
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-green-50 via-white to-emerald-100 py-20 lg:py-40 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-30 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-emerald-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-100 rounded-full opacity-40 animate-ping"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Transform Your Learning Journey
            </div>
            
            {/* Animated Text Content */}
            <div className="h-64 lg:h-72 overflow-hidden relative">
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    {slide.title}{' '}
                    <span className="text-green-600 relative inline-block min-w-[100px]">
                      <span className={`bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent transition-all duration-300 ${
                        isTransitioning ? 'opacity-50' : 'opacity-100'
                      }`}>
                        {displayText}
                      </span>
                      {/* Cursor - يظهر فقط أثناء الكتابة */}
                      <span className={`inline-block w-1 h-12 bg-green-600 ml-1 transition-opacity duration-300 ${
                        !isDeleting && !isTransitioning && currentIndex < slide.highlight.length ? 'animate-blink opacity-100' : 'opacity-0'
                      }`}></span>
                    </span>{' '}
                    {slide.subtitle}
                  </h1>
                  
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed transition-opacity duration-500">
                    {slide.description}
                  </p>
                  
                  

                  {/* Stats */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 transition-opacity duration-500">
                    <div className="text-center transform hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">{slide.stats[0]}</div>
                      <div className="text-gray-600">{slide.stats[1]}</div>
                    </div>
                    <div className="text-center transform hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">6K+</div>
                      <div className="text-gray-600">Online Students</div>
                    </div>
                    <div className="text-center transform hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">6K+</div>
                      <div className="text-gray-600">Certified Courses</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center lg:justify-start space-x-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-green-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image Slider */}
          <div className="relative">
            <div className="relative z-10 h-80 lg:h-96 overflow-hidden rounded-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-2xl p-2 transform rotate-2 h-full">
                    <div 
                      className="bg-cover bg-center rounded-xl h-full flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="text-white text-center p-8 relative z-10">
                        <i className="fas fa-graduation-cap text-6xl mb-4 animate-bounce"></i>
                        <h3 className="text-2xl font-bold mb-2">Quality Education</h3>
                        <p className="text-green-100">Learn from industry experts</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow-lg transform -rotate-6 animate-float">
                <div className="flex items-center">
                  <i className="fas fa-star mr-2 animate-spin-slow"></i>
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg transform rotate-6 animate-float-delayed">
                <div className="flex items-center">
                  <i className="fas fa-users mr-2 text-green-600"></i>
                  <span className="font-semibold">Join 50K+ Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(-6deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-8px) rotate(6deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out 1.5s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;