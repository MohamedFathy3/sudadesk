// src/app/[slug]/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { apiFetch } from '@/lib/api';
import '@/styles/globals.css'

interface SchoolData {
  id: number;
  school_id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  des: string;
  active: boolean;
  logo: string;
  manager_name: string;
  manager_email: string;
  created_at: string;
  updated_at: string;
}

// SVG Icons
const SVGIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const icons: { [key: string]: string } = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    graduation: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
    chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    contact: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    target: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    lightbulb: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    map: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    trophy: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    rocket: "M13 10V3L4 14h7v7l9-11h-7z",
    book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    arrowUp: "M5 10l7-7m0 0l7 7m-7-7v18"
  };

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[name]} />
    </svg>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Back to Top Component
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Back to top"
        >
          <SVGIcon name="arrowUp" className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default function SchoolPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // الحصول على السنة الحالية ديناميكياً
  const currentYear = new Date().getFullYear();

  // جلب البيانات باستخدام apiFetch
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/${slug}`);
        
        if (data && data.data) {
          setSchoolData(data.data);
        } else {
          setError('School not found');
        }
      } catch (err) {
        console.error('Error fetching school data:', err);
        setError('Failed to load school data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSchoolData();
    }
  }, [slug]);

  // Scroll effect للـ header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navigation = [
    { name: 'Home', href: '#home', icon: 'home' },
    { name: 'About', href: '#about', icon: 'info' },
    { name: 'Programs', href: '#programs', icon: 'graduation' },
    { name: 'Success', href: '#success', icon: 'chart' },
    { name: 'Contact', href: '#contact', icon: 'contact' },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading School Information</h2>
          <p className="text-gray-600">Preparing the best learning experience for you...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !schoolData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <SVGIcon name="info" className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">School Not Found</h2>
          <p className="text-gray-600 mb-6 text-lg">
            {error || "We couldn't find the school you're looking for."}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3 border-b border-gray-200' 
          : 'bg-transparent py-5'
      }`}>
        <nav className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4 group">
              {schoolData.logo && (
                <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 group-hover:border-blue-300 transition-all duration-300">
                  <Image
                    src={schoolData.logo}
                    alt={`${schoolData.name} logo`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{schoolData.name}</h1>
                <p className="text-xs text-gray-600 font-medium">Excellence in Education</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2.5 font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-transparent hover:border-blue-200"
                >
                  <SVGIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
          
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute block w-6 h-0.5 bg-gray-600 transform transition duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-gray-600 top-3 transition duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-gray-600 transform transition duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg mt-2">
              <div className="container mx-auto px-6 py-4">
                <div className="grid grid-cols-1 gap-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-blue-50 text-gray-700 border border-transparent hover:border-blue-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <SVGIcon name={item.icon} className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 transform skew-y-6"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 border border-blue-200 shadow-sm">
                <SVGIcon name="star" className="w-4 h-4 mr-2" />
                Premier Education Platform
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Excellence in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Education
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                {schoolData.des || 'Transform your future with our comprehensive educational programs designed for success in the modern world.'}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter value={50000} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter value={200} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
                  <div className="text-gray-600 text-sm">Rating</div>
                </div>
              </div>

             
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-500">
                {schoolData.logo ? (
                  <div className="w-full h-80 relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                    <Image
                      src={schoolData.logo}
                      alt={schoolData.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <SVGIcon name="graduation" className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-700 font-semibold text-xl">{schoolData.name}</p>
                      <p className="text-gray-600">Education Excellence</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">{schoolData.name}</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us the preferred choice for quality education and career success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <SVGIcon name="target" className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Focused</h3>
              <p className="text-gray-600 text-lg">Programs designed to meet industry demands and career goals with practical, real-world applications.</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-white to-green-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <SVGIcon name="users" className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Faculty</h3>
              <p className="text-gray-600 text-lg">Learn from experienced professionals and educators with years of industry expertise and teaching excellence.</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <SVGIcon name="lightbulb" className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovative Learning</h3>
              <p className="text-gray-600 text-lg">Modern teaching methods and cutting-edge curriculum designed for the digital age and future technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section id="success" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-yellow-400">Success</span> in Numbers
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Join thousands of students who have transformed their lives through quality education
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold mb-4 text-blue-300">
                <AnimatedCounter value={100} suffix="+" duration={2500} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Teachers</h3>
              <p className="text-blue-200">Professional educators</p>
            </div>

            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold mb-4 text-green-300">
                <AnimatedCounter value={10000} suffix="+" duration={3000} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Happy Students</h3>
              <p className="text-blue-200">Successful learners</p>
            </div>

            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold mb-4 text-purple-300">
                <AnimatedCounter value={200} suffix="+" duration={2000} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Courses</h3>
              <p className="text-blue-200">Learning programs</p>
            </div>

            <div className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold mb-4 text-orange-300">
                <AnimatedCounter value={50000} suffix="+" duration={3500} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visitors</h3>
              <p className="text-blue-200">Monthly engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning paths designed for every career stage and aspiration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <SVGIcon name="book" className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Certification Programs</h3>
              <p className="text-gray-600 mb-6 text-lg">Industry-recognized certifications that boost your career prospects and market value.</p>
              <div className="flex items-center text-gray-500 mb-4">
                <SVGIcon name="clock" className="w-5 h-5 mr-3" />
                <span className="font-medium">3-6 months</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                Explore Programs
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl border border-green-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <SVGIcon name="rocket" className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Development</h3>
              <p className="text-gray-600 mb-6 text-lg">Master in-demand skills with hands-on projects and real-world scenarios.</p>
              <div className="flex items-center text-gray-500 mb-4">
                <SVGIcon name="clock" className="w-5 h-5 mr-3" />
                <span className="font-medium">2-4 months</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                Explore Programs
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl border border-purple-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                <SVGIcon name="trophy" className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Advancement</h3>
              <p className="text-gray-600 mb-6 text-lg">Advanced programs designed for professional growth and leadership development.</p>
              <div className="flex items-center text-gray-500 mb-4">
                <SVGIcon name="clock" className="w-5 h-5 mr-3" />
                <span className="font-medium">6-12 months</span>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                Explore Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to start your educational journey? Were here to help you every step of the way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl text-center border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SVGIcon name="phone" className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
              <p className="text-gray-900 text-lg font-semibold mb-2">{schoolData.phone}</p>
              <p className="text-gray-500">Call us anytime</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SVGIcon name="mail" className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-900 text-lg font-semibold mb-2">{schoolData.email}</p>
              <p className="text-gray-500">Send us a message</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SVGIcon name="map" className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Address</h3>
              <p className="text-gray-900 text-lg font-semibold mb-2">{schoolData.address}</p>
              <p className="text-gray-500">Visit our campus</p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SVGIcon name="user" className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Manager</h3>
              <p className="text-gray-900 text-lg font-semibold mb-2">{schoolData.manager_name}</p>
              <p className="text-gray-500">Always available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              {schoolData.logo ? (
                <div className="w-16 h-16 relative">
                  <Image
                    src={schoolData.logo}
                    alt={schoolData.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <SVGIcon name="graduation" className="w-10 h-10 text-gray-900" />
              )}
            </div>
            <h3 className="text-3xl font-bold mb-4">{schoolData.name}</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Committed to excellence in education and empowering students to achieve their full potential in a rapidly evolving world.
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md">
                Start Learning Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Contact Admissions
              </button>
            </div>
            <div className="border-t border-gray-700 pt-8 mt-8">
              <p className="text-gray-400 text-sm">
                © {currentYear} {schoolData.name}. All rights reserved. | Excellence in Education
              </p>
            </div>
          </div>
        </div>
      </footer> 

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}