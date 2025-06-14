import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

  // Triple the array to ensure seamless infinite scroll
  const triplicatedData = [...shortsData, ...shortsData, ...shortsData];

  return (
    <div className="bg-[#f6f6f6] py-6 sm:py-12 px-2 sm:px-6 lg:px-8 font-sans relative overflow-hidden w-full">
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .scroll-animation {
          animation: scroll 30s linear infinite;
          animation-play-state: ${isVisible ? 'running' : 'paused'};
        }
        .scroll-animation:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .scroll-animation {
            animation-duration: 20s;
          }
        }
      `}</style>

      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20 hidden sm:block">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
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
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block">QUICK</span>
            <span className="block text-[#ff5722] italic">FINS</span>
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-xl font-medium">
            Watch short financial education videos and tips.
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
              Videos 16+
            </div>
            <div className="text-xl sm:text-2xl">*</div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden py-4">
          <div className="flex space-x-4 sm:space-x-8 scroll-animation">
            {triplicatedData.map((short, index) => {
              const colorScheme = selectedColors[index % selectedColors.length];
              
              return (
                <div 
                  key={`${short.id}-${Math.floor(index / shortsData.length)}`}
                  className="flex-none w-72 sm:w-80 md:w-96 rounded-[16px] overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <div className="p-3 sm:p-4 relative">
                    {/* Video iframe */}
                    <div className="mb-3 sm:mb-4">
                      <iframe
                        width="100%"
                        height="320"
                        src={short.url.replace('/shorts/', '/embed/')}
                        title={short.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex flex-col justify-between h-24 sm:h-32 relative z-10">
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{short.title}</h3>
                      
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
      </div>
    </div>
  );
};

export default YouTubeShortsCarousel;