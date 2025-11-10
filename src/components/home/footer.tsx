'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <Image 
                  src="/logo.png" 
                  alt="ePathsala Logo" 
                  width={24} 
                  height={24}
                  className="rounded"
                />
              </div>
              <span className="text-xl font-bold text-white">ePathsala</span>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Transforming education through innovative learning solutions and expert-led courses.
            </p>
            <div className="flex space-x-3">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-200"
                >
                  <i className={`fab fa-${platform} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About Us', 'Courses', 'Teachers', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular Courses</h3>
            <div className="space-y-2">
              {[
                'Web Development',
                'Data Science', 
                'UI/UX Design',
                'Mobile Development',
                'Digital Marketing'
              ].map((course) => (
                <Link 
                  key={course}
                  href={`/courses/${course.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                >
                  {course}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-green-500 mt-1 mr-3 w-4"></i>
                <span>123 Learning Street<br />Education City, 12345</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-green-500 mr-3 w-4"></i>
                <a href="tel:+15551234567" className="hover:text-green-400 transition-colors duration-200">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-green-500 mr-3 w-4"></i>
                <a href="mailto:contact@epathsala.com" className="hover:text-green-400 transition-colors duration-200">
                  contact@epathsala.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ePathsala. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-green-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-green-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-green-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;