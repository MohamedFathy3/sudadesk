'use client';

import React, { useState, useRef, useEffect } from 'react';

const AnimatedAdvantagesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const advantages = [
    {
      icon: '⭐',
      title: 'Maximum Students get A+ in every year',
      description: 'Lorem ipsum dolor sit amet, ed do eiusmod tempor incididunt ut labore et dolore magna.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: '🎓',
      title: 'We give international certificate',
      description: 'Lorem ipsum dolor sit amet, ed do eiusmod tempor incididunt ut labore et dolore magna.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: '🌿',
      title: 'Healthful our school environment',
      description: 'Lorem ipsum dolor sit amet, ed do eiusmod tempor incididunt ut labore et dolore magna.',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: '📊',
      title: 'We teach all time using projector',
      description: 'Lorem ipsum dolor sit amet, ed do eiusmod tempor incididunt ut labore et dolore magna.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: '💡',
      title: 'We have all the new technologies',
      description: 'Lorem ipsum dolor sit amet, ed do eiusmod tempor incididunt ut labore et dolore magna.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      icon: '👨‍🏫',
      title: 'Our every teachers are qualified',
      description: 'Lorem ipsum dolor sit amet, ed do eiusmod tempor incididunt ut labore et dolore magna.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40 animate-float-slow"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-40 animate-float-slower"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-100 rounded-full opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-green-600">Advantages</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <SimpleAdvantageCard
              key={index}
              advantage={advantage}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-50%, -60%) rotate(180deg); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(33%, 33%) rotate(0deg); }
          50% { transform: translate(33%, 43%) rotate(-180deg); }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }

        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleAdvantageCard = ({ advantage, index, isVisible }: { advantage: any; index: number; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        ${advantage.bgColor} ${advantage.borderColor} border-2 rounded-xl p-6 
        transition-all duration-500 hover:shadow-lg group cursor-pointer
        ${isVisible ? 'animate-slide-in' : 'opacity-0 -translate-x-8'}
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className={`text-4xl mb-4 transition-all duration-500 ${isHovered ? 'animate-gentle-bounce' : ''}`}>
        {advantage.icon}
      </div>

      {/* Title */}
      <h3 className={`text-lg font-bold ${advantage.color} mb-3 transition-colors duration-300`}>
        {advantage.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300">
        {advantage.description}
      </p>

      {/* Animated Line */}
      <div 
        className={`h-1 w-0 ${advantage.bgColor} transition-all duration-1000 mt-4 rounded-full ${
          isVisible ? 'w-full' : 'w-0'
        }`}
        style={{
          transitionDelay: `${index * 100 + 300}ms`
        }}
      ></div>
    </div>
  );
};

export default AnimatedAdvantagesSection;