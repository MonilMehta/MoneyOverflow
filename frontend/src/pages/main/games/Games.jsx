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
    <div className='pt-6 bg-[#f6f6f6] min-h-screen relative'>
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

     
        <div className="relative z-10 flex flex-wrap justify-around gap-5 p-5 rounded-lg w-11/12 mx-auto">
          <Quizz onSelectCategory={handleSelectCategory} />
          {/* <Daily /> */}
          <Questions category={selectedCategory} />
        </div>
  
    </div>
  );
};

export default Games;