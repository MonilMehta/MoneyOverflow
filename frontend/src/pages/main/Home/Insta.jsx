import React, { useEffect, useState, useRef } from 'react';

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
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);
  const smoothScrollRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth continuous scrolling effect
  useEffect(() => {
    if (!isMobile && isVisible && !isDragging && !isPaused) {
      const startSmoothScroll = () => {
        const scroll = () => {
          if (carouselRef.current && !isDragging && !isPaused) {
            const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
            
            setScrollPosition(prev => {
              const newPos = prev + 0.5; // Adjust speed here (lower = slower)
              
              // Reset to beginning when reaching the end
              if (newPos >= maxScroll) {
                carouselRef.current.scrollLeft = 0;
                return 0;
              }
              
              carouselRef.current.scrollLeft = newPos;
              return newPos;
            });
          }
        };

        smoothScrollRef.current = setInterval(scroll, 16); // ~60fps
      };

      startSmoothScroll();
    }
    
    return () => {
      if (smoothScrollRef.current) {
        clearInterval(smoothScrollRef.current);
      }
    };
  }, [isMobile, isVisible, isDragging, isPaused]);

  // Auto-advance functionality (discrete jumps every few seconds)
  useEffect(() => {
    if (!isMobile && isVisible && !isDragging && !isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % shortsData.length);
      }, 4000); // Change slide every 4 seconds
    }
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isMobile, isVisible, isDragging, isPaused]);

  // Touch/Mouse event handlers
  const handleStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    const x = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setStartX(x);
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
      setScrollPosition(carouselRef.current.scrollLeft);
    }
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    if (smoothScrollRef.current) {
      clearInterval(smoothScrollRef.current);
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      const newScrollLeft = scrollLeft - walk;
      carouselRef.current.scrollLeft = newScrollLeft;
      setScrollPosition(newScrollLeft);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Resume auto-scroll after a short delay
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
    
    // Snap to nearest card on mobile
    if (isMobile && carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth + 16; // card width + gap
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setCurrentIndex(Math.min(Math.max(newIndex, 0), shortsData.length - 1));
      
      // Smooth scroll to the snapped position
      carouselRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
      setScrollPosition(newIndex * cardWidth);
    }
  };

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth + 16;
      const targetScroll = index * cardWidth;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setScrollPosition(targetScroll);
    }
    
    // Resume auto-scroll after navigation
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % shortsData.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? shortsData.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isDragging) {
      setIsPaused(false);
    }
  };

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

  return (
    <div className="bg-[#f6f6f6] py-6 sm:py-12 px-2 sm:px-6 lg:px-8 font-sans relative overflow-hidden w-full">
      {/* Dotted Grid Background - Hidden on mobile */}
      <div className="absolute inset-0 opacity-20 hidden md:block">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines - Hidden on mobile */}
      <div className="absolute inset-0 opacity-10 hidden md:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines - Hidden on mobile */}
      <div className="absolute inset-0 opacity-10 hidden md:block">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto relative z-10">
        <div className="mb-6 sm:mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block">QUICK</span>
            <span className="block text-[#ff5722] italic">FINS</span>
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-700 max-w-xl font-medium">
            Watch short financial education videos and tips.
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-4">
            <div className="bg-black text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
              Videos 16+
            </div>
            <div className="text-lg sm:text-xl md:text-2xl">*</div>
            {!isMobile && (
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPaused ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {isPaused ? 'PAUSED' : 'AUTO-MOVING'}
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons for desktop */}
        {!isMobile && (
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Previous video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Next video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2 rounded-full transition-colors ${
                isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className={`flex gap-4 overflow-x-auto scrollbar-hide py-4 ${
              isMobile ? 'snap-x snap-mandatory' : ''
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {/* Duplicate cards for seamless loop */}
            {[...shortsData, ...shortsData].map((short, index) => {
              const originalIndex = index % shortsData.length;
              const colorScheme = selectedColors[originalIndex % selectedColors.length];
              
              return (
                <div 
                  key={`${short.id}-${index}`}
                  className={`flex-none rounded-[16px] overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isMobile ? 'w-80 snap-center' : 'w-72 sm:w-80 md:w-96'
                  }`}
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif'
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="p-3 sm:p-4 relative">
                    {/* Video iframe */}
                    <div className="mb-3 sm:mb-4">
                      <iframe
                        width="100%"
                        height={isMobile ? "240" : "320"}
                        src={short.url.replace('/shorts/', '/embed/')}
                        title={short.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                        loading="lazy"
                      ></iframe>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex flex-col justify-between h-16 sm:h-24 md:h-32 relative z-10">
                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{short.title}</h3>
                      
                      {/* Background Pattern */}
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                            backgroundSize: '10px 10px',
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

        {/* Pagination dots for mobile */}
        {isMobile && (
          <div className="flex justify-center mt-6 gap-2">
            {shortsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#ff5722] w-6' : 'bg-gray-400'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Instructions */}
        {isMobile ? (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              ← Swipe to browse videos →
            </p>
          </div>
        ) : (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Cards auto-move • Hover to pause • Use controls to navigate
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default YouTubeShortsCarousel;