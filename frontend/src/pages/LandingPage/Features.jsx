import React, { useEffect, useRef, useState } from 'react';
import { BarChart, BookOpen, Users } from 'lucide-react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Updated color schemes to match the modern design
  const cardColors = [
    {
      bg: "#ff5722",
      text: "#ffffff",
      accent: "#ff7043",
      iconBg: "#ffffff",
      iconColor: "#ff5722"
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
      iconBg: "#000000",
      iconColor: "#ffffff"
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      iconBg: "#ff5722",
      iconColor: "#ffffff"
    }
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Learn and grow with peers",
      highlight: "CONNECT NOW",
      subtitle: "Join our community of learners",
      icon: Users
    },
    {
      title: "Comprehensive Curriculum", 
      description: "Complete learning pathways designed for success",
      highlight: "EXPLORE PATHS",
      subtitle: "Master every skill step by step",
      icon: BookOpen
    },
    {
      title: "Community Support",
      description: "Connect with like-minded learners and mentors",
      highlight: "GET SUPPORT",
      subtitle: "Never learn alone again",
      icon: BarChart
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when section goes out of view
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before the section comes into view
      }
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
    <div 
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden" 
      id='section'
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0'
          }}
        />
      </div>

      {/* Vertical Lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {features.map((feature, index) => {
          const colorScheme = cardColors[index % cardColors.length];
          const Icon = feature.icon;
          const marginTop = index === 0 ? '0vh' : index === 1 ? '10vh' : '20vh';
          const isOrange = colorScheme.bg === "#ff5722";
          const isBeige = colorScheme.bg === "#e8ddd4";
          const isBlack = colorScheme.bg === "#000000";
          
          return (
            <div
              key={index}
              className={`relative overflow-hidden shadow-xl rounded-[20px] transform transition-all duration-700 ease-out hover:scale-110 hover:shadow-2xl hover:-translate-y-8 hover:rotate-1 group cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{
                height: '75vh',
                marginTop: marginTop,
                backgroundColor: colorScheme.bg,
                color: colorScheme.text,
                border: `3px solid ${colorScheme.accent}`,
                fontFamily: 'Arial, sans-serif',
                animationDelay: isVisible ? `${index * 200}ms` : '0ms',
                animationFillMode: 'both',
                transformOrigin: 'center center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = '50';
                e.currentTarget.style.transform = 'scale(1.1) translateY(-2rem) rotate(1deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = '10';
                e.currentTarget.style.transform = 'scale(1) translateY(0) rotate(0deg)';
              }}
            >
              {/* Content Container */}
              <div className="px-6 py-8 sm:px-8 sm:py-12 relative z-10 flex flex-col justify-between h-full">
                {/* Top Section - Icon */}
                <div className="flex justify-center">
                  <div 
                    className="flex-shrink-0 rounded-full p-4 sm:p-6 shadow-lg transition-all duration-500 hover:scale-110 hover:rotate-12 group-hover:shadow-xl"
                    style={{
                      backgroundColor: colorScheme.iconBg,
                      border: `2px solid ${colorScheme.accent}`
                    }}
                  >
                    <Icon 
                      className="h-12 w-12 sm:h-16 sm:w-16 transition-transform duration-300" 
                      style={{ color: colorScheme.iconColor }}
                    />
                  </div>
                </div>
                
                {/* Middle Section - Main Content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 leading-tight uppercase break-words hyphens-auto transition-all duration-300 group-hover:scale-105">
                    {feature.title}
                  </h3>
                  
                  {/* Highlight Section - Different layouts based on color */}
                  {isOrange && (
                    <div className="text-2xl sm:text-3xl font-black text-black mb-4 bg-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
                      {feature.highlight}
                    </div>
                  )}
                  
                  {isBeige && (
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white animate-pulse"></div>
                          <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white animate-pulse" style={{animationDelay: '0.5s'}}></div>
                          <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                        <div className="text-lg font-bold">
                          {feature.highlight}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {isBlack && (
                    <div className="mb-4 text-center">
                      <div className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold mb-3 inline-block shadow-lg transform transition-all duration-300 group-hover:scale-105 hover:bg-orange-400">
                        {feature.highlight}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-lg sm:text-xl font-medium opacity-90 leading-relaxed break-words mb-4 transition-opacity duration-300 group-hover:opacity-100">
                    {feature.description}
                  </p>
                  
                  {/* Subtitle */}
                  <p className="text-sm sm:text-base opacity-75 font-medium italic transition-all duration-300 group-hover:opacity-90">
                    {feature.subtitle}
                  </p>
                </div>

                {/* Bottom Section - Action Button and Decorative Element */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Action Button */}
                  <button className="bg-transparent border-2 border-current px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:bg-current hover:text-white hover:scale-105 hover:shadow-lg group-hover:border-opacity-80 uppercase tracking-wide">
                    {isOrange ? "START LEARNING" : isBeige ? "EXPLORE NOW" : "JOIN COMMUNITY"} →
                  </button>
                  
                  {/* Decorative Element */}
                  <div className="flex justify-center">
                    <div 
                      className="w-16 h-1 rounded-full transition-all duration-500 group-hover:w-24"
                      style={{ backgroundColor: colorScheme.iconBg }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-4 right-4 opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110">
                <div 
                  className="w-8 h-8 border-2 rounded-full animate-spin-slow"
                  style={{ borderColor: colorScheme.text }}
                />
              </div>
              
              {/* Additional decorative element for orange cards */}
              {isOrange && (
                <div className="absolute bottom-6 right-6 opacity-20 transition-all duration-500 group-hover:opacity-40">
                  <div className="w-12 h-12 border-4 border-white rounded-full animate-pulse"></div>
                </div>
              )}

              {/* Background Pattern Overlay */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[20px] opacity-5 transition-opacity duration-500 group-hover:opacity-10">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                    backgroundSize: '15px 15px',
                    backgroundPosition: '0 0, 0 7.5px'
                  }}
                />
              </div>

              {/* Animated border glow effect with popup enhancement */}
              <div className="absolute inset-0 rounded-[20px] opacity-0 transition-all duration-500 group-hover:opacity-30 pointer-events-none group-hover:scale-105">
                <div 
                  className="w-full h-full rounded-[20px] animate-pulse"
                  style={{
                    background: `linear-gradient(45deg, ${colorScheme.accent}, transparent, ${colorScheme.accent})`,
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 3s ease infinite',
                    boxShadow: `0 0 30px ${colorScheme.accent}40, 0 0 60px ${colorScheme.accent}20`
                  }}
                />
              </div>

              {/* Floating popup effect overlay */}
              <div className="absolute inset-0 rounded-[20px] opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none">
                <div 
                  className="w-full h-full rounded-[20px]"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.bg}10, ${colorScheme.accent}20)`,
                    backdropFilter: 'blur(1px)',
                    boxShadow: `0 25px 50px -12px ${colorScheme.bg}40`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes popup-bounce {
          0% {
            transform: scale(1) translateY(0) rotate(0deg);
          }
          50% {
            transform: scale(1.05) translateY(-1rem) rotate(0.5deg);
          }
          100% {
            transform: scale(1.1) translateY(-2rem) rotate(1deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .hover-popup:hover {
          animation: popup-bounce 0.6s ease-out forwards;
          z-index: 50;
        }
      `}</style>
    </div>
  );
};

export default Features;