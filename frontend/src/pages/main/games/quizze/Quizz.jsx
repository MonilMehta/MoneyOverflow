import React, { useState } from 'react';

const Quizz = ({ onSelectCategory }) => {
  const [quizCounters, setQuizCounters] = useState({
    savings: { solved: 0, total: 20 },
    retirement: { solved: 0, total: 20 },
    investing: { solved: 0, total: 20 },
    budgeting: { solved: 0, total: 20 },
  });

  // Array of image URLs for each category
  const categoryImages = {
    savings: "https://github.com/ayush-that/FinVeda/blob/main/assets/images/blog-1.jpg?raw=true",
    retirement: "https://github.com/ayush-that/FinVeda/blob/main/assets/images/blog-2.jpg?raw=true", // Replace with your image URL
    investing: "https://github.com/ayush-that/FinVeda/blob/main/assets/images/blog-3.jpg?raw=true", // Replace with your image URL
    budgeting: "https://github.com/ayush-that/FinVeda/blob/main/assets/images/fintech.jpeg?raw=true", // Replace with your image URL
  };

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="text-center p-5 w-full">
      <h4 className="text-4xl font-mono mb-4 font-bold text-[#dbf4ff]">Select a Category</h4>
      <div className="flex space-x-4 justify-around">
        {Object.keys(quizCounters).map((category) => (
          <div
            key={category}
            className="bg-white border border-gray-300 rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-500 h-120 w-96 flex flex-col justify-between p-4" // Increased height and width
          >
            {/* Image included in the card */}
            <img 
              src={categoryImages[category]} 
              alt={`${category.charAt(0).toUpperCase() + category.slice(1)} Image`} 
              className="mb-2 rounded-t-lg h-60 w-full object-cover" // Increased image height
            />
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
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : category === 'retirement'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : category === 'investing'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-600 hover:bg-blue-700'
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
