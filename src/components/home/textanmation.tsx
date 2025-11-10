'use client';

import React, { useState, useRef, useEffect } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Text */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              ABOUT EPATHSALA
            </div>
            
            {/* Main Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              LEARN SOMETHING NEW, AND{' '}
              <span className="text-green-600">GROW YOUR SKILL</span>
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dignissimos, 
              deleniti adipisci ut inventore commodi iure explicabo excepturi cumque 
              laudantium quis praesentium id nesciunt! Soluta sunt obcaecati aspernatur nostrum ab.
            </p>
            
            {/* Additional Text */}
            <p className="text-gray-700 mb-8 leading-relaxed font-medium">
              Using our single innovative platform you can remove all your communication 
              dependencies and the messy rats nest of email, calls, texts, wikis, and apps you currently have.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg">
                Get Started
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <button className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-green-600 hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1 text-lg">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10K+</div>
                <div className="text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Teachers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Circular Image */}
          <div className="relative">
            {/* Main Circular Image Container */}
            <div className={`relative w-96 h-96 mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              
              {/* Outer Animated Ring */}
              <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-pulse"></div>
              
              {/* Main Image */}
              <div className="absolute inset-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full overflow-hidden shadow-2xl">
                <img
                  src="https://stackbros.in/eduport/landing/assets/images/element/05.png"
                  alt="ePathsala Learning Platform"
                  className="w-full h-full object-content"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-700/30"></div>
              </div>
              
              {/* Floating Elements */}
              <div className={`absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-6 py-4 transform rotate-6 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-800">Innovative Platform</span>
                </div>
              </div>
              
              <div className={`absolute -bottom-4 -left-4 bg-green-500 text-white rounded-2xl shadow-lg px-6 py-4 transform -rotate-6 transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-graduation-cap"></i>
                  <span className="font-semibold">Learn & Grow</span>
                </div>
              </div>
              
              {/* Animated Dots */}
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-bounce"></div>
              <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-green-400 rounded-full transform -translate-x-1/2 translate-y-1/2 animate-bounce delay-1000"></div>
              <div className="absolute top-1/2 right-0 w-4 h-4 bg-green-400 rounded-full transform translate-x-1/2 -translate-y-1/2 animate-bounce delay-500"></div>
              <div className="absolute top-1/2 left-0 w-4 h-4 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-bounce delay-1500"></div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 opacity-5">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-green-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;