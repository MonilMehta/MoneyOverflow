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
    <div className="p-3 md:p-6 bg-[#f6f6f6] relative font-sans w-full">
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
      <div className="absolute inset-0 opacity-10 hidden md:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 opacity-10 hidden md:block">
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
        <div className="mb-6 md:mb-10 text-left">
          <h2 className="text-3xl md:text-6xl font-black tracking-tight text-[#000000] leading-tight mb-2 md:mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="inline italic">FIN</span>
            <span className="inline text-[#f5f5f5] italic" style={{ textShadow: '2px 2px 0px #000000' }}>TEST</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 font-medium text-left">
            Comprehensive suite of questions to test your financial knowledge.
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cardData.map((card, index) => {
            const colorScheme = cardColors[index];
            const counter = quizCounters[card.category.toLowerCase()];

            return (
              <div
                key={card.title}
                onClick={() => handleSelectCategory(card.category)}
                className="bg-white rounded-[20px] p-4 md:p-6 border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer relative overflow-hidden group"
                style={{
                  backgroundColor: colorScheme.bg,
                  borderColor: colorScheme.accent,
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                      backgroundSize: '12px 12px',
                      backgroundPosition: '0 0, 0 6px',
                      color: colorScheme.text
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 
                      className="text-xl md:text-2xl font-black tracking-tight"
                      style={{ color: colorScheme.text }}
                    >
                      {card.title}
                    </h3>
                    <div
                      className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full"
                      style={{
                        backgroundColor: colorScheme.accent,
                        color: colorScheme.text
                      }}
                    >
                      <span className="text-sm md:text-base font-bold">{counter.solved}/{counter.total}</span>
                    </div>
                  </div>

                  <p 
                    className="text-sm md:text-base font-bold mb-4 opacity-80"
                    style={{ color: colorScheme.text }}
                  >
                    {colorScheme.subtitle}
                  </p>

                  <div
                    className="inline-flex items-center text-sm md:text-base font-bold mt-2 py-2 px-4 rounded-full group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundColor: colorScheme.text,
                      color: colorScheme.bg
                    }}
                  >
                    Start Quiz →
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