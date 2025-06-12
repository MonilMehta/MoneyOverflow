import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletedLearningPaths = ({ course }) => {
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
    "highlight": "Contact Our Experts",
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
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 text-left">
          <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">Fin</span>
            <span className="block text-[#ff5722] italic">LEARN</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
            Learning path designed to help you master financial skills and knowledge.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              Users 50K
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedPaths.map((path, index) => {
            const colorScheme = selectedColors[index % selectedColors.length];
            const isOrange = colorScheme.bg === "#ff5722";
            const isBeige = colorScheme.bg === "#e8ddd4";
            const isBlack = colorScheme.bg === "#000000";
            
            return (
              <div 
                key={index} 
                className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl" 
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  border: `2px solid ${colorScheme.accent}`,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                <div className="p-6 h-64 flex flex-col justify-between relative">
                  {/* Main Content */}
                  <div className="z-10">
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
                  <div className="z-10 flex-1 flex items-center">
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
                  <div className="z-10">
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
                      <button className="bg-transparent border border-current px-4 py-2 rounded text-sm font-bold hover:bg-current hover:text-white transition-colors">
                        {path.highlight || "LEARN MORE"} →
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
          })}
        </div>
      </div>
    </div>
  );
};

export default CompletedLearningPaths;