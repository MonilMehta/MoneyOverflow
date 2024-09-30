import React, { useState } from 'react';

const Quizz = ({ onSelectCategory }) => {
  const [quizCounters, setQuizCounters] = useState({
    savings: { solved: 0, total: 0 },
    retirement: { solved: 0, total: 0 },
    investing: { solved: 0, total: 0 },
    budgeting: { solved: 0, total: 0 },
  });

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="text-center p-5 w-full">
      <h4 className="text-4xl font-mono mb-8 font-bold text-[#dbf4ff]">Select a Category</h4>
      <div className="flex space-x-4 justify-around">
        {Object.keys(quizCounters).map((category) => (
          <div
            key={category}
            className="bg-white border border-gray-300 rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-500 h-40 w-64 flex flex-col justify-between p-4"
          >
            <div>
              <h5 className="text-2xl mb-2 font-medium text-[#31475e]">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h5>
              <p className="text-base mb-4">
                {quizCounters[category].solved}/{quizCounters[category].total} solved
              </p>
            </div>
            <button
              className={`py-2 px-4 rounded-lg text-white w-full transition duration-300 ${
                category === 'savings'
                  ? 'bg-red-500 hover:bg-red-700'
                  : category === 'retirement'
                  ? 'bg-purple-600 hover:bg-purple-800'
                  : category === 'investing'
                  ? 'bg-green-500 hover:bg-green-700'
                  : 'bg-yellow-400 hover:bg-yellow-600'
              }`}
              onClick={() => handleSelectCategory(category)} // Call the function when button is clicked
            >
              Select
            </button>
          </div>
        ))}
      </div>
      <hr className='mt-12 border-b-2 border-white' />
    </div>
  );
};

export default Quizz;
