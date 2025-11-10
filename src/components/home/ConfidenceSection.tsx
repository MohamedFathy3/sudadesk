'use client';

import React, { useState, useRef, useEffect } from 'react';

type Position = 'top' | 'right' | 'bottom' | 'left';

const AnimatedAboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const features = [
    { icon: '🎯', text: 'Personalized Learning' },
    { icon: '🚀', text: 'Fast Progress' },
    { icon: '💡', text: 'Innovative Methods' },
    { icon: '👥', text: 'Community Support' }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                ABOUT EPATHSALA
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                LEARN SOMETHING NEW,
                <span className="text-green-600 block mt-2">GROW YOUR SKILL</span>
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-8">
              <p className="text-xl text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dignissimos, 
                deleniti adipisci ut inventore commodi iure explicabo excepturi cumque 
                laudantium quis praesentium id nesciunt!
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed font-medium bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                Using our single innovative platform you can remove all your communication 
                dependencies and the messy rats nest of email, calls, texts, wikis, and apps you currently have.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${
                    isVisible ? 'animate-feature-enter' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg flex items-center justify-center group">
                Start Learning Now
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-green-600 hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1 text-lg">
                View Courses
              </button>
            </div>
          </div>

          {/* Right Content - Animated Circular Image */}
          <div className="relative flex justify-center">
            <div className="relative w-96 h-96">
              
              {/* Main Circular Image with Animation */}
              <div className={`relative w-full h-full transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-12'
              }`}>
                
                {/* Outer Animated Ring */}
                <div className="absolute inset-0 border-8 border-green-200 rounded-full animate-spin-slow"></div>
                
                {/* Middle Ring */}
                <div className="absolute inset-4 border-4 border-green-300 rounded-full animate-spin-slow-reverse"></div>
                
                {/* Main Image Container */}
                <div className="absolute inset-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://htmldesigntemplates.com/html/epathsala/images/inner/education-students-people-knowledge-concept-2021-04-02-19-49-59-utc.jpg"
                    alt="ePathsala Learning Platform"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-emerald-700/40"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                    <div>
                      <div className="text-4xl mb-4">🎓</div>
                      <h3 className="text-2xl font-bold mb-2">ePathsala</h3>
                      <p className="text-green-100">Learn • Grow • Succeed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <FloatingElement 
                position="top"
                text="Interactive Learning"
                delay={600}
                isVisible={isVisible}
              />
              
              <FloatingElement 
                position="right"
                text="Expert Teachers"
                delay={800}
                isVisible={isVisible}
              />
              
              <FloatingElement 
                position="bottom"
                text="24/7 Support"
                delay={1000}
                isVisible={isVisible}
              />
              
              <FloatingElement 
                position="left"
                text="Certified Courses"
                delay={1200}
                isVisible={isVisible}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes feature-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
        
        .animate-feature-enter {
          animation: feature-enter 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Fixed FloatingElement component with proper TypeScript typing
const FloatingElement = ({ 
  position, 
  text, 
  delay, 
  isVisible 
}: { 
  position: Position; 
  text: string; 
  delay: number; 
  isVisible: boolean; 
}) => {
  const positionStyles: Record<Position, string> = {
    top: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    right: 'top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2',
    bottom: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2',
    left: 'top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div 
      className={`absolute ${positionStyles[position]} bg-white rounded-2xl shadow-lg px-6 py-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      } animate-float`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="font-semibold text-gray-800 whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
};

export default AnimatedAboutSection;