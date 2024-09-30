import React, { useState } from 'react';
import Quizz from './quizze/Quizz';
import Daily from './dailyq/Daily';
import Questions from './Questions/Questions';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    document.getElementById('questions').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='pt-6 bg-blue-600 min-h-screen'>
      <div className="flex flex-wrap justify-around gap-5 p-5 rounded-lg w-11/12 mx-auto">
        <Quizz onSelectCategory={handleSelectCategory} />
        {/* <Daily /> */}
      <Questions category={selectedCategory} />
      </div>
    </div>
  );
};

export default Games;
