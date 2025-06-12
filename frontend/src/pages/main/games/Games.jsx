import React, { useState, useEffect } from 'react';
import Quizz from './quizze/Quizz';
import Daily from './dailyq/Daily';
import Questions from './Questions/Questions';
import quiz1 from "../../../assets/quiz1.gif"

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() =>{
      setLoading(false);
    }, 3000)
  });

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    document.getElementById('questions').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='pt-6 bg-gray-800 min-h-screen'>
      {loading? <img src={quiz1} className='w-[45%] mx-auto' /> :
      <div className="flex flex-wrap justify-around gap-5 p-5 rounded-lg w-11/12 mx-auto">
        <Quizz onSelectCategory={handleSelectCategory} />
        {/* <Daily /> */}
      <Questions category={selectedCategory} />
      </div>
}
    </div>
  );
};

export default Games;
