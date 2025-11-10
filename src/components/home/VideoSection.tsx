'use client';

import React, { useState, useRef } from 'react';

const AnimatedVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const features = [
    {
      icon: '🎯',
      text: 'Lorem ipsum dolor sit amet, consectetur.'
    },
    {
      icon: '⭐',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      icon: '🚀',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'
    },
    {
      icon: '🏆',
      text: 'Professional certified teachers'
    }
  ];

  // YouTube video ID from the URL
  const youtubeVideoId = "Hian4dM4GQo";
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:pr-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Welcome to Our School
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Our 
              <span className="text-green-600 block"> Amazing School</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-green-50 transition-all duration-300 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-base flex items-center justify-center">
                <i className="fas fa-play-circle mr-2"></i>
                Watch Full Story
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1 text-base">
                Explore Courses
              </button>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative">
            <div 
              ref={videoContainerRef}
              className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                {!isPlaying ? (
                  // Thumbnail with Play Button
                  <div className="relative w-full h-full">
                    {/* Thumbnail Image */}
                    <img
                      src={thumbnailUrl}
                      alt="School Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay with Play Button */}
                    <div 
                      className={`absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 backdrop-blur-sm transition-all duration-500 ${
                        isHovered ? 'bg-black/30' : 'bg-black/40'
                      }`}
                      onClick={handlePlayVideo}
                    >
                      <div className="text-center">
                        {/* Pulsing Rings */}
                        <div className="relative">
                          <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping play-button-glow"></div>
                          <div className="absolute inset-2 border-4 border-white/20 rounded-full animate-pulse"></div>
                          
                          {/* Main Button */}
                          <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all duration-300 transform hover:scale-110 shadow-2xl play-button-glow">
                            <svg 
                              className="w-8 h-8 text-white ml-1" 
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        
                        <p className="text-white font-semibold mt-3 text-base animate-pulse">
                          Watch School Tour
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // YouTube Iframe when playing
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                    title="Our School Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                )}
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 transform rotate-3 animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-800 text-sm">Live Tour</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg px-4 py-2 transform -rotate-3 animate-float-delayed">
              <div className="flex items-center space-x-2">
                <i className="fas fa-graduation-cap text-sm"></i>
                <span className="font-semibold text-sm">500+ Graduates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% { 
            box-shadow: 0 0 0 15px rgba(34, 197, 94, 0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-4px) rotate(-3deg); }
        }
        
        .play-button-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default AnimatedVideoSection;