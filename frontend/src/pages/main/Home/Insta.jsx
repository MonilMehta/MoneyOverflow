import React, { useState, useEffect, useRef } from 'react';

// JSON Data
const shortsData = [
  { id: 1, title: 'FIN 1', url: 'https://www.youtube.com/shorts/kpdNZmtMRB4' },
  { id: 2, title: 'FIN 2', url: 'https://www.youtube.com/shorts/gqJLd94QjHQ' },
  { id: 3, title: 'FIN 3', url: 'https://www.youtube.com/shorts/6Fjs9ZU1f1w' },
  { id: 4, title: 'FIN 4', url: 'https://www.youtube.com/shorts/Oj-UpJ2STC0' },
  { id: 5, title: 'FIN 5', url: 'https://www.youtube.com/shorts/A1MkGsIY-NQ' },
  { id: 6, title: 'FIN 6', url: 'https://www.youtube.com/shorts/0GxSnWSp3VM' },
  { id: 7, title: 'FIN 7', url: 'https://www.youtube.com/shorts/ekCqTvvMl3s' },
  { id: 8, title: 'FIN 8', url: 'https://www.youtube.com/shorts/UIBaghaRxaA' },
  { id: 9, title: 'FIN 9', url: 'https://www.youtube.com/shorts/yPlPACCTXv0' },
  { id: 10, title: 'FIN 10', url: 'https://www.youtube.com/shorts/R4psUPXzLSs' },
  { id: 11, title: 'FIN 11', url: 'https://www.youtube.com/shorts/0OB0yGijXE4' },
  { id: 12, title: 'FIN 12', url: 'https://www.youtube.com/shorts/n5pyBTNzxp4' },
  { id: 13, title: 'FIN 13', url: 'https://www.youtube.com/shorts/V9jWzbsQCuk' },
  { id: 14, title: 'FIN 14', url: 'https://www.youtube.com/shorts/NqWJXk700FA' },
  { id: 15, title: 'FIN15', url: 'https://www.youtube.com/shorts/tgeNZq-E-BE' },
  { id: 16, title: 'FIN 16', url: 'https://www.youtube.com/shorts/67GaoYVtCOI' }
];

const YouTubeShortsCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
            setTimeout(() => {
              setIsVisible(true);
            }, 50);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const selectedColors = [
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
    },
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
    }
  ];

  // Duplicate the array to create seamless loop
  const duplicatedData = [...shortsData, ...shortsData];

  return (
    <div ref={componentRef} className="bg-[#f6f6f6] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden w-full">
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollMobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-animation {
          animation: scroll ${isMobile ? '12s' : '15s'} linear infinite;
        }
        .scroll-animation:hover {
          animation-play-state: paused;
        }
        .scroll-animation-mobile {
          animation: scrollMobile 10s linear infinite;
        }
        .scroll-animation-mobile:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Dotted Grid Background with fade-in */}
      <div 
        className={`absolute inset-0 opacity-20 transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle, #000 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '20px 20px' : '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines with fade-in */}
      <div 
        className={`absolute inset-0 opacity-10 transition-opacity duration-400 ease-out ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
      >
        {[...Array(isMobile ? 6 : 10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * (100 / (isMobile ? 6 : 10))}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines with fade-in */}
      <div 
        className={`absolute inset-0 opacity-10 transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
      >
        {[...Array(isMobile ? 6 : 8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * (100 / (isMobile ? 6 : 8))}%` }}
          />
        ))}
      </div>

      <div className="max-w-full mx-auto relative z-10">
        {/* Header with staggered fade-in */}
        <div 
          className={`mb-6 sm:mb-10 text-left transition-all duration-400 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span 
              className={`block transition-all duration-300 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              QUICK
            </span>
            <span 
              className={`block text-[#ff5722] italic transition-all duration-400 delay-100 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              FINS
            </span>
          </h2>
          <p 
            className={`mt-4 text-base sm:text-lg text-gray-700 max-w-xl font-medium transition-all duration-400 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Watch short financial education videos and tips.
          </p>
          <div 
            className={`mt-4 flex items-center gap-4 transition-all duration-400 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="bg-black text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold">
              Videos 16+
            </div>
            <div className="text-xl sm:text-2xl">*</div>
          </div>
        </div>

        {/* Carousel Container with responsive padding */}
        <div 
          className={`overflow-hidden py-4 transition-all duration-400 delay-400 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`flex ${isMobile ? 'space-x-4' : 'space-x-8'} ${isMobile ? 'scroll-animation-mobile' : 'scroll-animation'}`}>
            {duplicatedData.map((short, index) => {
              const colorScheme = selectedColors[index % selectedColors.length];
              
              return (
                <div 
                  key={`${short.id}-${Math.floor(index / shortsData.length)}`}
                  className={`flex-none ${isMobile ? 'w-72' : 'w-96'} rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif',
                    opacity: isVisible ? 1 : 0.3,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${500 + (index % 6) * 50}ms`,
                    transitionDuration: '300ms'
                  }}
                >
                  <div className="p-3 sm:p-4 relative">
                    {/* Video iframe with responsive sizing */}
                    <div className="mb-3 sm:mb-4">
                      <iframe
                        width="100%"
                        height={isMobile ? "300" : "400"}
                        src={short.url.replace('/shorts/', '/embed/')}
                        title={short.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                    
                    {/* Content Section */}
                    <div className={`flex flex-col justify-between ${isMobile ? 'h-20' : 'h-32'} relative z-10`}>
                      {/* Title */}
                      <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`}>{short.title}</h3>
                      
                      {/* View button for mobile */}
                      {isMobile && (
                        <button 
                          className="bg-transparent border border-current px-3 py-1 rounded text-xs font-bold hover:bg-current hover:text-white transition-colors self-start"
                          onClick={() => window.open(short.url, '_blank')}
                        >
                          WATCH →
                        </button>
                      )}
                      
                      {/* Background Pattern */}
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[12px] sm:rounded-[16px] opacity-5">
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                            backgroundSize: isMobile ? '8px 8px' : '10px 10px',
                            backgroundPosition: '0 0, 0 5px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile scroll indicator */}
        {isMobile && (
          <div 
            className={`text-center mt-4 transition-all duration-300 delay-500 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-sm text-gray-600">← Swipe to explore more videos →</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeShortsCarousel;