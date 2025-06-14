import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Home, MessageSquare, BookOpen, Mail, Calendar, Route, Wrench, Activity, Newspaper, FileText } from 'lucide-react';

const WebsiteFlow = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-element');
    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const sections = [
    {
      level: 1,
      cards: [
        {
          id: '1',
          title: 'Home Page',
          description: 'Main landing page and navigation hub for all site features',
          highlight: 'Entry Point',
          subtitle: 'Welcome & Overview',
          icon: Home,
          isRoot: true
        }
      ]
    },
    {
      level: 2,
      cards: [
        {
          id: '2',
          title: 'Forum',
          description: 'Community discussions and user interactions',
          highlight: 'Connect',
          subtitle: 'Community hub',
          icon: MessageSquare
        },
        {
          id: '3',
          title: 'Learning Bar',
          description: 'Educational content and learning materials',
          highlight: 'Learn',
          subtitle: 'Educational resources',
          icon: BookOpen
        },
        {
          id: '4',
          title: 'Newsletter',
          description: 'Subscribe to updates and announcements',
          highlight: 'Stay Updated',
          subtitle: 'Latest news & tips',
          icon: Mail
        },
        {
          id: '5',
          title: 'Quiz Calendar',
          description: 'Scheduled quizzes and assessment dates',
          highlight: 'Test Knowledge',
          subtitle: 'Interactive assessments',
          icon: Calendar
        }
      ]
    },
    {
      level: 3,
      cards: [
        {
          id: '6',
          title: 'Learning Path',
          description: 'Structured learning journey with progressive modules',
          highlight: 'Follow Path',
          subtitle: 'Guided progression',
          icon: Route,
          isParent: true
        }
      ]
    },
    {
      level: 4,
      cards: [
        {
          id: '7',
          title: 'Tools',
          description: 'Interactive calculators and utility functions',
          highlight: 'Use Tools',
          subtitle: 'Practical utilities',
          icon: Wrench
        },
        {
          id: '8',
          title: 'Simulation',
          description: 'Practice scenarios and virtual environments',
          highlight: 'Practice',
          subtitle: 'Hands-on experience',
          icon: Activity
        },
        {
          id: '9',
          title: 'News Section',
          description: 'Latest industry updates and trends',
          highlight: 'Stay Informed',
          subtitle: 'Current events',
          icon: Newspaper
        },
        {
          id: '10',
          title: 'Case Studies',
          description: 'Real-world examples and success stories',
          highlight: 'Learn From Examples',
          subtitle: 'Practical insights',
          icon: FileText
        }
      ]
    }
  ];

  const selectedColors = [
    {
      bg: "#ff5722",
      text: "#ffffff",
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
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
    },
    {
      bg: "#4caf50",
      text: "#ffffff",
      accent: "#66bb6a",
    },
    {
      bg: "#9c27b0",
      text: "#ffffff",
      accent: "#ba68c8",
    },
    {
      bg: "#ff9800",
      text: "#000000",
      accent: "#ffb74d",
    },
    {
      bg: "#607d8b",
      text: "#ffffff",
      accent: "#78909c",
    },
    {
      bg: "#795548",
      text: "#ffffff",
      accent: "#8d6e63",
    },
    {
      bg: "#f44336",
      text: "#ffffff",
      accent: "#ef5350",
    }
  ];

  const renderCard = (card, index, sectionIndex) => {
    const colorScheme = selectedColors[index % selectedColors.length];
    const Icon = card.icon;
    const isOrange = colorScheme.bg === "#ff5722";
    const isBeige = colorScheme.bg === "#e8ddd4";
    const isBlack = colorScheme.bg === "#000000";
    const isWhite = colorScheme.bg === "#ffffff";
    const delayClass = `delay-${Math.min((index + 1) * 100, 600)}`;
    
    return (
      <div 
        key={card.id} 
        className={`fade-in-element fade-in-scale ${delayClass} rounded-[16px] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
          card.isRoot ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
        } ${card.isParent ? 'ring-2 ring-purple-400 ring-opacity-50' : ''}`}
        style={{
          backgroundColor: colorScheme.bg,
          color: colorScheme.text,
          border: `2px solid ${colorScheme.accent}`,
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div className="p-6 h-64 flex flex-col justify-between relative">
          {/* Icon */}
          <div className="absolute top-4 right-4 opacity-20">
            <Icon size={40} />
          </div>
          
          {/* Main Content */}
          <div className="z-10">
            <h3 className="text-2xl font-black leading-tight tracking-wide uppercase mb-2">
              {card.title}
            </h3>
            {isOrange && (
              <div className="text-3xl font-black mb-2">
                {card.highlight}
              </div>
            )}
          </div>
          
          {/* Middle Content */}
          <div className="z-10 flex-1 flex items-center">
            {isBeige && (
              <div className="text-lg font-bold">
                {card.description}
              </div>
            )}
            {isBlack && (
              <div className="text-center">
                <div className="bg-orange-500 text-black px-3 py-1 rounded text-sm font-bold mb-2">
                  {card.highlight}
                </div>
                <div className="text-sm font-medium">
                  {card.description}
                </div>
              </div>
            )}
            {isWhite && (
              <div className="text-base font-medium text-gray-800 leading-snug">
                {card.description}
              </div>
            )}
            {!isBeige && !isBlack && !isOrange && !isWhite && (
              <div className="text-sm opacity-90 leading-snug">
                {card.description}
              </div>
            )}
          </div>
          
          {/* Bottom Content */}
          <div className="z-10">
            {isOrange && (
              <div className="text-sm font-medium opacity-80">
                {card.subtitle}
              </div>
            )}
            {isBeige && (
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  {card.highlight}
                </div>
                <ArrowRight size={16} />
              </div>
            )}
            {isWhite && (
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-gray-900">
                  {card.highlight}
                </div>
                <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                  →
                </div>
              </div>
            )}
            {(isBlack || (!isOrange && !isBeige && !isWhite)) && (
              <button className="bg-transparent border border-current px-4 py-2 rounded text-sm font-bold hover:bg-current hover:text-black transition-colors flex items-center gap-2">
                {card.highlight || "EXPLORE"} <ArrowRight size={14} />
              </button>
            )}
          </div>
          
          {/* Decorative Elements */}
          {isOrange && (
            <div className="absolute bottom-4 right-4 opacity-20">
              <div className="w-12 h-12 border-4 border-white rounded-full"></div>
            </div>
          )}
          
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
    );
  };

  return (
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden min-h-screen">
      {/* CSS Styles for animations */}
      <style jsx>{`
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-element.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-element.delay-100 {
          transition-delay: 0.1s;
        }
        
        .fade-in-element.delay-200 {
          transition-delay: 0.2s;
        }
        
        .fade-in-element.delay-300 {
          transition-delay: 0.3s;
        }
        
        .fade-in-element.delay-400 {
          transition-delay: 0.4s;
        }
        
        .fade-in-element.delay-500 {
          transition-delay: 0.5s;
        }
        
        .fade-in-element.delay-600 {
          transition-delay: 0.6s;
        }
        
        .fade-in-left {
          transform: translateX(-30px) translateY(0);
        }
        
        .fade-in-right {
          transform: translateX(30px) translateY(0);
        }
        
        .fade-in-up {
          transform: translateY(50px);
        }
        
        .fade-in-scale {
          transform: scale(0.9) translateY(20px);
        }
        
        .fade-in-bounce {
          transform: translateY(50px) scale(0.95);
        }
        
        .fade-in-element.animate-in.fade-in-left,
        .fade-in-element.animate-in.fade-in-right,
        .fade-in-element.animate-in.fade-in-up,
        .fade-in-element.animate-in.fade-in-scale,
        .fade-in-element.animate-in.fade-in-bounce {
          transform: translateX(0) translateY(0) scale(1);
        }
      `}</style>

      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
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
      
      {/* Vertical Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="fade-in-element fade-in-scale mb-10 text-left">
          <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">SITE</span>
            <span className="block text-[#ff5722] italic">FLOW</span>
          </h2>
          <p className="fade-in-element fade-in-up delay-200 mt-4 text-lg text-gray-700 max-w-xl font-medium">
            Interactive website navigation structure designed for optimal user experience.
          </p>
          <div className="fade-in-element fade-in-up delay-400 mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              10 Pages
            </div>
            <div className="bg-[#ff5722] text-white px-4 py-2 rounded-full text-sm font-bold">
              4 Levels
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>

        {/* Flow Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={section.level} className="mb-12">
            {/* Level Indicator */}
            <div className="fade-in-element fade-in-left flex items-center gap-4 mb-6">
              <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                Level {section.level}
              </div>
              {section.level === 1 && <span className="text-sm text-gray-600 font-medium">Entry Point</span>}
              {section.level === 2 && <span className="text-sm text-gray-600 font-medium">Main Features</span>}
              {section.level === 3 && <span className="text-sm text-gray-600 font-medium">Core Learning</span>}
              {section.level === 4 && <span className="text-sm text-gray-600 font-medium">Specialized Tools</span>}
            </div>
            
            {/* Cards Grid */}
            <div className={`grid gap-6 w-full ${
              section.cards.length === 1 ? 'grid-cols-1' :
              section.cards.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {section.cards.map((card, index) => renderCard(card, index, sectionIndex))}
            </div>
            
            {/* Flow Arrow */}
            {sectionIndex < sections.length - 1 && (
              <div className="fade-in-element fade-in-bounce delay-300 flex justify-center my-8">
                <div className="bg-blue-100 rounded-full p-3 hover:bg-blue-200 transition-colors">
                  <ArrowDown className="text-blue-600" size={24} />
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Footer Info */}
        <div className="fade-in-element fade-in-up mt-16 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Navigation Flow</h3>
            <p className="text-gray-600 text-sm">
              Users start at the Home Page and can navigate to main features. The Learning Bar leads to structured Learning Paths, 
              which then branch into specialized tools and resources for comprehensive learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFlow;