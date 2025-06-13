import React, { useState } from 'react';

const Quizz = ({ onSelectCategory }) => {
  const [quizCounters, setQuizCounters] = useState({
    savings: { solved: 0, total: 20 },
    retirement: { solved: 0, total: 20 },
    investing: { solved: 0, total: 20 },
    budgeting: { solved: 0, total: 20 },
  });

  // Updated card color schemes matching the finance idle style
  const cardColors = [
    {
      "bg": "#ff5722",
      "text": "#000000",
      "accent": "#ff7043",
      "highlight": "Quiz Time",
      "subtitle": "Boost your savings IQ & earn +50 points"
    },
    {
      "bg": "#e8ddd4",
      "text": "#000000",
      "accent": "#d7c4b0",
      "highlight": "Test your future planning skills",
      "subtitle": "Test your future planning skills"
    },
    {
      "bg": "#000000",
      "text": "#ffffff",
      "accent": "#333333",
      "highlight": "Invest Smart",
      "subtitle": "Sharpen your portfolio-building know-how"
    },
    {
      "bg": "#ffffff",
      "text": "#000000",
      "accent": "#e0e0e0",
      "highlight": "Master Your Money",
      "subtitle": "Learn effective budgeting strategies"
    }
  ];

  const cardData = [
    { title: "Savings", category: "savings" },
    { title: "Retirement", category: "retirement" },
    { title: "Investing", category: "investing" },
    { title: "Budgeting", category: "budgeting" }
  ];

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="p-6 bg-[#f6f6f6] relative font-sans w-full">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
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

      {/* Quiz Categories Section */}
      <div className="relative z-10 w-full">
        <div className="mb-10 text-left">
            <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="inline italic">FIN</span><span className="inline text-[#f5f5f5] italic" style={{ textShadow: '2px 2px 0px #000000' }}>TEST</span>
            </h2>
            <p className="text-lg text-gray-700 font-medium text-left">
              Comprehensive suite of questions to test your financial knwoledge.
            </p>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {cardData.map((card, index) => {
            const colors = cardColors[index];
            const isOrange = colors.bg === "#ff5722";
            const isBeige = colors.bg === "#e8ddd4";
            const isBlack = colors.bg === "#000000";
            const isWhite = colors.bg === "#ffffff";
            const categoryData = quizCounters[card.category];
            
            return (
              <div
                key={index}
                className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl relative cursor-pointer w-full"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  border: `2px solid ${colors.accent}`,
                  fontFamily: 'Arial, sans-serif',
                  minHeight: '400px'
                }}
                onClick={() => handleSelectCategory(card.category)}
              >
                <div className="p-8 h-full flex flex-col justify-between relative">
                  {/* Main Content */}
                  <div className="z-10">
                    <h3 className="text-xl font-black leading-tight tracking-wide uppercase mb-2">
                      {card.title}
                    </h3>
                    {isOrange && (
                      <div className="text-2xl font-black text-white mb-2">
                        {colors.highlight}
                      </div>
                    )}
                  </div>
                  
                  {/* Middle Content */}
                  <div className="z-10 flex-1 flex items-center">
                    {isBeige && (
                      <div className="text-lg font-bold text-black">
                        {colors.highlight}
                      </div>
                    )}
                    {isBlack && (
                      <div className="text-center">
                        <div className="bg-orange-500 text-black px-3 py-1 rounded text-xs font-bold mb-2">
                          {colors.highlight}
                        </div>
                        <div className="text-white text-sm font-medium">
                          {colors.subtitle}
                        </div>
                      </div>
                    )}
                    {isWhite && (
                      <div className="text-center">
                        <div className="bg-black text-white px-3 py-1 rounded text-xs font-bold mb-2">
                          {colors.highlight}
                        </div>
                        <div className="text-black text-sm font-medium">
                          {colors.subtitle}
                        </div>
                        <div className="absolute top-4 right-4 opacity-20">
                          <div className="w-8 h-8 border-2 border-black rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="z-10 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium opacity-80">
                        Progress
                      </span>
                      <span className="text-xs font-bold">
                        {Math.round((categoryData.solved / categoryData.total) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-black bg-opacity-20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-current opacity-60 rounded-full transition-all duration-300"
                        style={{
                          width: `${(categoryData.solved / categoryData.total) * 100}%`
                        }}
                      />
                    </div>
                    <div className="text-xs mt-1 opacity-70">
                      {categoryData.solved} of {categoryData.total} completed
                    </div>
                  </div>
                  
                  {/* Bottom Content - Start Test Button */}
                  <div className="z-10">
                    {isOrange && (
                      <div className="text-xs font-medium text-black opacity-80 mb-2">
                        {colors.subtitle}
                      </div>
                    )}
                    <button 
                      className="block w-full text-center bg-transparent border-2 border-current px-4 py-2 rounded text-sm font-bold hover:bg-current hover:text-white transition-all duration-300 transform hover:scale-105"
                      style={{
                        borderColor: isBlack ? '#ff5722' : 'currentColor',
                        color: isBlack ? '#ff5722' : 'currentColor'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCategory(card.category);
                      }}
                    >
                      START TEST →
                    </button>
                  </div>
                  
                  {/* Decorative Elements */}
                  {isOrange && (
                    <div className="absolute top-4 right-4 opacity-20">
                      <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                    </div>
                  )}
                  
                  {isBeige && (
                    <div className="absolute bottom-4 right-4 opacity-30">
                      <div className="flex -space-x-1">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Progress indicator */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="text-xs font-bold opacity-60">
                      {categoryData.solved}/{categoryData.total}
                    </div>
                  </div>
                  
                  {/* Background Pattern */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px'
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

export default Quizz;