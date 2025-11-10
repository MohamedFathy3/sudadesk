// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    
    setIsScrolled(scrollTop > 50);
    setScrollProgress(progress);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // تحديث أولي عند التحميل

  return () => window.removeEventListener('scroll', handleScroll);
}, []);


 const navigation = [
  { name: 'Home', href: '#home', icon: 'fas fa-home' },
  { name: 'Courses', href: '#courses', icon: 'fas fa-book-open' },
  { name: 'Teachers', href: '#teachers', icon: 'fas fa-chalkboard-teacher' },
  { name: 'Programs', href: '#programs', icon: 'fas fa-graduation-cap' },
  { name: 'About', href: '#about', icon: 'fas fa-info-circle' },
  { name: 'Contact', href: '#contact', icon: 'fas fa-envelope' },
];

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-green-900/10 py-2' 
        : 'bg-transparent py-4'
    }`}>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center font-medium">
                <i className="fas fa-star text-yellow-400 mr-2 animate-pulse"></i>
                Rated 4.9/5 by 10,000+ Students
              </span>
              <span className="hidden md:flex items-center font-medium">
                <i className="fas fa-medal text-yellow-400 mr-2"></i>
                Premium Learning Platform
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-medium">Follow Us:</span>
              <div className="flex space-x-3">
                {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((social) => (
                  <button
                    key={social}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <i className={`fab fa-${social} text-xs`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              {/* الصورة بالحجم المطلوب */}
              {/* <div className="w-16 h-16 relative">
                <Image
                  src="/logo.png" 
                  alt="Madars Logo"
                  width={528}   
                  height={352}  
                  className="object-contain group-hover:scale-105 transition-transform duration-500 animate-float"
                  priority
                />
              </div> */}
            </div>
            <div className={`transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-100'}`}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                SUDAESK
              </h1>
              <p className="text-xs text-gray-600 font-medium tracking-wider">EXCELLENCE IN EDUCATION</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center space-x-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 group hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-green-700 bg-green-50 shadow-lg shadow-green-200 border border-green-200'
                    : 'text-gray-700 hover:text-green-700 hover:bg-green-50/80 hover:shadow-md'
                }`}
              >
                <i className={`${item.icon} ${
                  isActive(item.href) 
                    ? 'text-green-600 animate-bounce' 
                    : 'text-gray-400 group-hover:text-green-500 group-hover:animate-pulse'
                } text-sm transition-all duration-300`}></i>
                <span className="relative">
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 animate-pulse"></span>
                  )}
                </span>
                {isActive(item.href) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/auth"
              className="group relative px-6 py-3 text-green-700 font-semibold border border-green-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:shadow-lg flex items-center space-x-2 overflow-hidden"
            >
              <i className="fas fa-sign-in-alt group-hover:rotate-12 transition-transform duration-300"></i>
              <span>Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
            </Link>
            
            
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${
                isMenuOpen ? 'rotate-45 top-3 bg-green-600' : 'top-1 group-hover:bg-green-600'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-gray-700 top-3 transition duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100 group-hover:bg-green-600'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${
                isMenuOpen ? '-rotate-45 top-3 bg-green-600' : 'top-5 group-hover:bg-green-600'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl rounded-b-3xl animate-slideDown">
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 gap-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-fadeIn`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`${item.icon} ${
                      isActive(item.href) 
                        ? 'text-green-600 animate-bounce' 
                        : 'text-gray-400 group-hover:text-green-500'
                    } w-5 text-center transition-all duration-300`}></i>
                    <span className={`font-semibold transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'text-green-700' 
                        : 'text-gray-700'
                    }`}>{item.name}</span>
                    {isActive(item.href) && (
                      <i className="fas fa-chevron-right text-green-600 ml-auto animate-pulse"></i>
                    )}
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 pt-4 mt-2 animate-fadeIn" style={{ animationDelay: '600ms' }}>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/auth"
                      className="px-4 py-3 text-green-700 font-semibold border border-green-200 rounded-xl text-center hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-emerald-600 transform origin-left transition-transform duration-300"
           style={{ transform: `scaleX(${isScrolled ? (typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0) : 0})` }}>
      </div>
    </header>
  );
};

export default Header;