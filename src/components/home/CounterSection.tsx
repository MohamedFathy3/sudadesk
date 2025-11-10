'use client';

import React, { useState, useEffect, useRef } from 'react';

const ElegantCounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const cards = [
    {
      id: 1,
      icon: '👨‍🏫',
      title: 'Expert Teachers',
      targetNumber: 100,
      suffix: '+',
      description: 'Professional educators',
      color: 'text-blue-600',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: '🎓',
      title: 'Happy Students',
      targetNumber: 10000,
      suffix: '+',
      description: 'Successful learners',
      color: 'text-green-600',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      icon: '📚',
      title: 'Courses',
      targetNumber: 200,
      suffix: '+',
      description: 'Learning materials',
      color: 'text-purple-600',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      icon: '🌍',
      title: 'Visitors',
      targetNumber: 50000,
      suffix: '+',
      description: 'Monthly visitors',
      color: 'text-orange-600',
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50'
    }
  ];

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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-green-600">Us?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for thousands of learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <ElegantCounterCard
              key={card.id}
              card={card}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
const ElegantCounterCard = ({ card, isVisible, delay }: { card: any; isVisible: boolean; delay: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        
        const duration = 1800;
        const steps = 50;
        const increment = card.targetNumber / steps;
        const stepTime = duration / steps;

        let current = 0;
        const counterTimer = setInterval(() => {
          current += increment;
          if (current >= card.targetNumber) {
            setCount(card.targetNumber);
            clearInterval(counterTimer);
          } else {
            setCount(Math.floor(current));
          }
        }, stepTime);

        return () => clearInterval(counterTimer);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, card.targetNumber, delay]);

  const formattedCount = count.toLocaleString();

  return (
    <div 
      className={`
        bg-white rounded-xl border-2 ${card.borderColor} p-6 
        transition-all duration-500 hover:shadow-lg hover:border-transparent
        hover:scale-105 group
        ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-xl">
          {card.icon}
        </span>
      </div>

      {/* Number */}
      <div className="mb-2">
        <span className="text-3xl font-bold text-gray-900">
          {formattedCount}
        </span>
        {card.suffix && (
          <span className={`text-3xl font-bold ${card.color}`}>
            {card.suffix}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">
        {card.description}
      </p>

      {/* Animated Line */}
      <div 
        className={`h-1 w-0 group-hover:w-full ${card.bgColor} transition-all duration-1000 mt-4 rounded-full`}
        style={{ 
          transitionDelay: `${delay + 800}ms`
        }}
      ></div>
    </div>
  );
};

export default ElegantCounterSection;