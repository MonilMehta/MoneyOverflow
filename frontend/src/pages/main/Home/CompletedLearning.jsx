import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const CompletedLearningPaths = ({ course }) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation state first
            setIsVisible(false);
            // Small delay to ensure reset, then trigger animation
            setTimeout(() => {
              setIsVisible(true);
            }, 50);
          } else {
            // Reset when component leaves viewport
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '50px 0px -50px 0px' // Start animation slightly before/after entering viewport
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const completedPaths = [
     {
    "title": "Financial Basics",
    "description": "Build a strong foundation in personal finance",
    "highlight": "Master Money Skills",
    "subtitle": "Learn essential money concepts"
  },
  {
    "title": "Budgeting",
    "description": "Create effective plans to manage and track your spending",
    "highlight": "Contact The Experts",
    "subtitle": "Master your monthly budget"
  },
  {
    "title": "Savings",
    "description": "Start saving smart for both short and long-term goals",
    "highlight": "Build Wealth",
    "subtitle": "Emergency funds & smart saving tips"
  },
  {
    "title": "Debt Management",
    "description": "Clear your debts faster and boost your credit score",
    "highlight": "Get Rich Now",
    "subtitle": "Tactics for credit health"
  },
  {
    "title": "Investing",
    "description": "Learn how to grow your money through smart investments",
    "highlight": "Invest Now",
    "subtitle": "Build long-term wealth"
  },
  {
    "title": "Retirement Planning",
    "description": "Prepare now for a financially free future",
    "highlight": "Secure Future",
    "subtitle": "Steps to retirement security"
  }
  ];

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
    <div ref={componentRef} className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Dotted Grid Background with fade-in */}
      <div 
        className={`absolute inset-0 opacity-20 transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle, #000 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines with fade-in */}
      <div 
        className={`absolute inset-0 opacity-10 transition-opacity duration-1200 ease-out ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines with fade-in */}
      <div 
        className={`absolute inset-0 opacity-10 transition-opacity duration-1400 ease-out ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with staggered fade-in */}
        <div 
          className={`mb-10 text-left transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span 
              className={`block italic transition-all duration-800 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              FIN
            </span>
            <span 
              className={`block text-[#ff5722] italic transition-all duration-1000 delay-200 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              LEARN
            </span>
          </h2>
          <p 
            className={`mt-4 text-lg text-gray-700 max-w-xl font-medium transition-all duration-1200 delay-400 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Learning path designed to help you master financial skills and knowledge.
          </p>
          <div 
            className={`mt-4 flex items-center gap-4 transition-all duration-1000 delay-600 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              Users 50K
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>
        
        {/* Cards Grid with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedPaths.map((path, index) => {
            const colorScheme = selectedColors[index % selectedColors.length];
            const isOrange = colorScheme.bg === "#ff5722";
            const isBeige = colorScheme.bg === "#e8ddd4";
            const isBlack = colorScheme.bg === "#000000";
            
            return (
              <div 
                key={index} 
                className={`rounded-[16px] overflow-hidden shadow-lg transition-all duration-1000 ease-out hover:-translate-y-2 hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  border: `2px solid ${colorScheme.accent}`,
                  fontFamily: 'Arial, sans-serif',
                  transitionDelay: `${800 + index * 150}ms`
                }}
              >
                <div className="p-6 h-64 flex flex-col justify-between relative">
                  {/* Main Content */}
                  <div 
                    className={`z-10 transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
                    style={{ transitionDelay: `${1000 + index * 150}ms` }}
                  >
                    <h3 className="text-2xl font-black leading-tight tracking-wide uppercase mb-2">
                      {path.title}
                    </h3>
                    {isOrange && (
                      <div className="text-4xl font-black text-white mb-2">
                        {path.highlight}
                      </div>
                    )}
                  </div>
                  
                  {/* Middle Content */}
                  <div 
                    className={`z-10 flex-1 flex items-center transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${1200 + index * 150}ms` }}
                  >
                    {isBeige && (
                      <div className="text-xl font-bold text-black">
                        {path.description}
                      </div>
                    )}
                    {isBlack && (
                      <div className="text-center">
                        <div className="bg-orange-500 text-black px-3 py-1 rounded text-sm font-bold mb-2">
                          {path.highlight}
                        </div>
                        <div className="text-white text-lg font-medium">
                          {path.description}
                        </div>
                      </div>
                    )}
                    {!isBeige && !isBlack && !isOrange && (
                      <div className="text-base opacity-90 leading-snug">
                        {path.description}
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom Content */}
                  <div 
                    className={`z-10 transition-all duration-800 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${1400 + index * 150}ms` }}
                  >
                    {isOrange && (
                      <div className="text-sm font-medium text-black opacity-80">
                        {path.subtitle}
                      </div>
                    )}
                    {isBeige && (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                          <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white"></div>
                          <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="text-sm font-medium">
                          {path.highlight}
                        </div>
                      </div>
                    )}
                    {(isBlack || (!isOrange && !isBeige)) && (
                      <button className="bg-transparent border border-current px-4 py-2 rounded text-sm font-bold hover:bg-current hover:text-white transition-all duration-300 hover:scale-105">
                        {path.highlight || "LEARN MORE"} →
                      </button>
                    )}
                  </div>
                  
                  {/* Decorative Elements */}
                  {isOrange && (
                    <div 
                      className={`absolute bottom-4 right-4 opacity-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-0'
                      }`}
                      style={{ transitionDelay: `${1600 + index * 150}ms` }}
                    >
                      <div className="w-12 h-12 border-4 border-white rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Background Pattern with fade-in */}
                  <div 
                    className={`absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5 transition-opacity duration-1500 ease-out ${
                      isVisible ? 'opacity-5' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${1800 + index * 150}ms` }}
                  >
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompletedLearningPaths;