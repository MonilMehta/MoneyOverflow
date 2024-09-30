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
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
          flexDirection: 'row',
          padding: '20px',
          borderRadius: '10px',
          width: '90%',
          margin: 'auto',
          height: '100vh',
        }}
      >

          <Quizz onSelectCategory={handleSelectCategory} />
        <Daily />
      </div>
      <Questions category={selectedCategory} />
    </div>
  );
};

export default Games;
