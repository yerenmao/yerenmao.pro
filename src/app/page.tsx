'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // Set page title
  useEffect(() => {
    document.title = 'Tristan Chen';
  }, []);
  
  // Array of photos - you can add more photos here
  const photos = [
    { src: '/me1.jpg', alt: 'Tristan Chen - Google' },
    { src: '/me2.jpg', alt: 'Tristan Chen - HK1' },
    { src: '/me3.jpg', alt: 'Tristan Chen - HK2' },
    { src: '/me4.jpg', alt: 'Tristan Chen - HK3' },
    { src: '/me5.jpg', alt: 'Tristan Chen - Japan' },
  ];

  const handlePhotoClick = () => {
    setCurrentPhotoIndex((prevIndex) => 
      (prevIndex + 1) % photos.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg-light to-light-bg-dark dark:from-dark-bg-dark dark:to-dark-bg-light">
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section with Photo and Introduction */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Hi, I&apos;m{" "}
                  <span className="text-primary whitespace-nowrap">
                    Tristan Chen
                  </span>
                </h1>
              <p className="text-lg text-primary-light/80 mb-4">
                aka yerenmao
              </p>
              <div className="text-xl text-foreground/80 mb-6 space-y-2">
                <p>Senior Student at National Taiwan University</p>
                <p className="text-lg text-foreground/70">
                  Computer Science and Information Engineering
                </p>
              </div>
              <p className="text-lg text-foreground/90 mb-6 max-w-2xl">
                Welcome to my personal website!
                <br />
                I&apos;m passionate about software development, machine learning and stock market.
              </p>
              
              {/* Easter Egg Hint */}
              <div className="bg-primary-light/10 border border-primary-light/20 rounded-lg p-4 mb-8 max-w-2xl">
                <p className="text-sm text-primary-light/80 flex items-center gap-2">
                  <span>
                    <strong>Easter Egg:</strong> Try clicking on the floating circles to discover my cats! 
                    <span className="text-xs"> (Only on home page)</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Right Side - Photo Carousel */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md">
              <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
                {/* Photo Container with Glow Effect */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={photos[currentPhotoIndex].src}
                    alt={photos[currentPhotoIndex].alt}
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Click Indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to change
                  </div>
                </div>
                
                {/* Photo Counter
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {photos.length}
                </div> */}
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-light/30 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-dark/30 rounded-full animate-pulse" 
                     style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 -left-6 w-4 h-4 bg-primary-light/20 rounded-full animate-pulse" 
                     style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
