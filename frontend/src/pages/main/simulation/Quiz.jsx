import React, { useState } from 'react';

const questions = [
  { question: 'What is the capital of France?', options: ['Paris', 'Rome', 'Berlin'], answer: 'Paris' },
  { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
  // Add more questions
];

function Quiz({ onResult }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const handleSubmit = () => {
    if (!currentQuestion || selectedOption === '') return;
    const isCorrect = selectedOption === currentQuestion.answer;
    onResult(isCorrect); // Pass result back to parent
    setSelectedOption('');
    getRandomQuestion();
  };

  return (
    <div className="quiz-container">
      {currentQuestion ? (
        <div>
          <h3>{currentQuestion.question}</h3>
          <div>
            {currentQuestion.options.map(option => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit Answer</button>
        </div>
      ) : (
        <button onClick={getRandomQuestion}>Start Quiz</button>
      )}
    </div>
  );
}

export default Quiz;
