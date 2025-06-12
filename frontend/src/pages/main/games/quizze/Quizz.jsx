import React, { useState } from 'react';

const Quizz = ({ onSelectCategory }) => {
  const [quizCounters, setQuizCounters] = useState({
    savings: { solved: 0, total: 20 },
    retirement: { solved: 0, total: 20 },
    investing: { solved: 0, total: 20 },
    budgeting: { solved: 0, total: 20 },
  });

  

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="p-5 w-full bg-gray-800">
      <div className="section-title pb-4">
        <div className="line ml-8"></div>
        <h2 className="title text-4xl font-extrabold pl-8 text-white mb-8 text-left">
          <span>Quiz Categories</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {Object.keys(quizCounters).map((category, index) => {
          const colors = [
            { bg: "bg-green-300", text: "text-black", button: "bg-gray-800" },
            { bg: "bg-gray-900", text: "text-white", button: "bg-gray-700" },
            { bg: "bg-purple-400", text: "text-black", button: "bg-purple-600" },
            { bg: "bg-yellow-200", text: "text-black", button: "bg-yellow-500" },
          ];
          const colorScheme = colors[index];

          return (
            <div
              key={category}
              className={`${colorScheme.bg} rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between p-8 min-h-[400px] w-full text-left`}
            >
              <div>
                <h5 className={`text-3xl mb-6 font-bold ${colorScheme.text} leading-tight`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h5>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-2 w-full bg-gray-200/50 rounded-full">
                    <div 
                      className="h-2 bg-gray-800 rounded-full"
                      style={{ 
                        width: `${(quizCounters[category].solved / quizCounters[category].total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${colorScheme.text}`}>
                    {Math.round((quizCounters[category].solved / quizCounters[category].total) * 100)}%
                  </span>
                </div>
                <p className={`text-lg ${colorScheme.text}`}>
                  {quizCounters[category].solved} of {quizCounters[category].total} questions completed
                </p>
              </div>
              {/* Added full-width button at the bottom */}
              <button
                className={`${colorScheme.button} w-full py-3 px-6 rounded-xl text-white font-semibold transition-opacity duration-200 hover:opacity-90 mt-6`}
                onClick={() => handleSelectCategory(category)}
              >
                Start Test
              </button>
            </div>
          )
        })}
      </div>
      <hr className='mt-12 border-b-2 border-white' />
    </div>
  );
};

export default Quizz;
