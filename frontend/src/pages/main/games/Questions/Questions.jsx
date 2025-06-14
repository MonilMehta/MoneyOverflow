import React, { useEffect, useState } from "react";
import { getQuestion, checkAnswer } from "../../../../apis/quiz.api";
import { motion, AnimatePresence } from 'framer-motion';
import RedirectPage from "../../components/RedirectPage";

const DifficultySlider = ({ onDifficultyChange }) => {
  const [difficulty, setDifficulty] = useState(1);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setDifficulty(value);
    onDifficultyChange(value);
  };

  return (
    <div className="mb-6 md:mb-8 px-3 md:px-0">
      <label className="block mb-3 md:mb-4 text-xl md:text-2xl text-black font-black tracking-wide">
        SELECT DIFFICULTY LEVEL
      </label>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="2"
          value={difficulty}
          onChange={handleSliderChange}
          className="slider w-full h-3 md:h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full appearance-none cursor-pointer"
          style={{
            backgroundSize: `${(difficulty / 2) * 100}% 100%`,
            transition: "background-size 0.3s ease",
            WebkitAppearance: 'none',
          }}
        />
        <style>
          {`
            .slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
              border: 3px solid #ff5722;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
            @media (min-width: 768px) {
              .slider::-webkit-slider-thumb {
                width: 24px;
                height: 24px;
              }
            }
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
              border: 3px solid #ff5722;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
            @media (min-width: 768px) {
              .slider::-moz-range-thumb {
                width: 24px;
                height: 24px;
              }
            }
          `}
        </style>
        <div className="flex justify-between w-full text-xs md:text-sm mt-2">
          <span
            className={
              difficulty === 0 
                ? "text-orange-500 font-black text-sm md:text-base" 
                : "text-gray-600 font-medium"
            }
          >
            EASY
          </span>
          <span
            className={
              difficulty === 1 
                ? "text-orange-500 font-black text-sm md:text-base" 
                : "text-gray-600 font-medium"
            }
          >
            MEDIUM
          </span>
          <span
            className={
              difficulty === 2 
                ? "text-red-500 font-black text-sm md:text-base" 
                : "text-gray-600 font-medium"
            }
          >
            HARD
          </span>
        </div>
      </div>
    </div>
  );
};

const Questions = ({ category }) => {
  const [difficulty, setDifficulty] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(0);
  const [user, setUser] = useState('');

  useEffect(() => {
    let userId = document.cookie.split("userId=")[1]?.split(";")[0];
    if(userId !== undefined) {
      setUser(userId);
    }
  }, []);

  useEffect(() => {
    // Reset quiz when category changes
    if (category) {
      resetQuiz();
    }
  }, [category]);

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswered(false);
    setCorrectAnswer(null);
    setSelectedAnswer(null);
    setCorrect(false);
    setScore(0);
    setScoreChange(0);
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const diff = difficulty === 1 ? "Medium" : difficulty === 2 ? "Hard" : "Easy";
      const cat = `${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;
      const response = await getQuestion({
        section: cat,
        difficulty: diff,
      });
      
      resetQuiz();
      setQuestions(response.data);
      
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (index) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    try {
      const response = await checkAnswer({
        questionId: questions[currentQuestionIndex]._id,
        selectedAnswer: index,
        userId: user
      });
      
      const { isCorrect, correctAnswer, newScore } = response.data;
      setCorrect(isCorrect);
      setCorrectAnswer(correctAnswer);
      
      if (newScore !== undefined) {
        const scoreIncrease = newScore - score;
        setScore(newScore);
        setScoreChange(scoreIncrease);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  const handleNext = () => {
    if (!answered) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setCorrect(false);
    } else {
      // Quiz completed - reset for a new round
      fetchQuestions();
    }
  };

  // Question card animation variants
  const cardVariants = {
    initial: { 
      opacity: 0, 
      x: 100,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      scale: 0.95,
      transition: { 
        duration: 0.3 
      }
    }
  };

  if (!category) {
    return <div id="questions" />;
  }

  return (
    <>
      {user ? (
        <div className="w-full" id="questions">
          {category ? (
            <div className="bg-white rounded-[20px] p-4 md:p-8 shadow-xl border-2 border-[#ff5722] relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                    backgroundSize: '12px 12px',
                    backgroundPosition: '0 0, 0 6px'
                  }}
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-black mb-6 md:mb-8">
                  {category.toUpperCase()} QUIZ
                </h2>

                <DifficultySlider onDifficultyChange={setDifficulty} />

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff5722] border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading questions...</p>
                  </div>
                ) : questions.length > 0 ? (
                  <div className="space-y-6 md:space-y-8">
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                        <span className="text-sm font-bold text-gray-600">
                          Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <div className="w-full md:w-48 bg-gray-200 h-2 rounded-full">
                          <div 
                            className="bg-[#ff5722] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#ff5722]">
                          Score: {score || 0}
                        </span>
                        <AnimatePresence>
                          {scoreChange > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-green-500 font-bold"
                            >
                              +{scoreChange}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestionIndex}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="bg-white rounded-[20px] shadow-xl border-2 border-[#ff5722] overflow-hidden"
                      >
                        <div className="bg-[#ff5722] p-4 md:p-6">
                          <h3 className="text-lg md:text-xl font-black text-white">
                            {questions[currentQuestionIndex].question}
                          </h3>
                        </div>

                        <div className="p-4 md:p-6 space-y-3">
                          {questions[currentQuestionIndex].options.map((option, index) => (
                            <motion.button
                              key={index}
                              whileHover={!answered && { scale: 1.02 }}
                              whileTap={!answered && { scale: 0.98 }}
                              onClick={() => handleAnswer(index)}
                              disabled={answered}
                              className={`w-full p-4 text-left rounded-xl text-base md:text-lg font-bold transition-all duration-300 border-2 
                                ${answered 
                                  ? index === correctAnswer
                                    ? "bg-green-50 border-green-500 text-green-700 ring-4 ring-green-100"
                                    : index === selectedAnswer
                                      ? "bg-red-50 border-red-500 text-red-700 ring-4 ring-red-100"
                                      : "bg-white border-gray-200 text-gray-700"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-[#ff5722] hover:bg-orange-50"
                                } ${!answered && "hover:shadow-lg hover:-translate-y-1"}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 
                                  ${answered 
                                    ? index === correctAnswer
                                      ? "bg-green-500 text-white scale-110"
                                      : index === selectedAnswer
                                        ? "bg-red-500 text-white scale-110"
                                        : "bg-gray-200 text-gray-700"
                                    : "bg-[#ff5722] text-white"
                                  }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                {option}
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        <div className="bg-gray-50 p-4 md:p-6 border-t-2 border-gray-200">
                          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <AnimatePresence>
                              {answered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  className={`text-base font-bold flex items-center gap-2 
                                    ${correct ? "text-green-600" : "text-red-600"}`}
                                >
                                  {correct ? (
                                    <>
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.2, 1] }}
                                        className="text-2xl"
                                      >
                                        🎉
                                      </motion.span>
                                      <span>Great job! That's correct!</span>
                                    </>
                                  ) : (
                                    <>
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.2, 1] }}
                                        className="text-2xl"
                                      >
                                        💡
                                      </motion.span>
                                      <span>Keep learning! The correct answer was option {String.fromCharCode(65 + correctAnswer)}</span>
                                    </>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <motion.button
                              whileHover={answered ? { scale: 1.05 } : {}}
                              whileTap={answered ? { scale: 0.95 } : {}}
                              onClick={handleNext}
                              className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center gap-2
                                ${answered 
                                  ? "bg-[#ff5722] hover:bg-[#e64a19] shadow-lg hover:shadow-xl" 
                                  : "bg-gray-400 cursor-not-allowed opacity-75"}`}
                            >
                              {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                              <motion.span 
                                animate={answered ? { x: [0, 5, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="text-xl"
                              >
                                →
                              </motion.span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <button
                      onClick={fetchQuestions}
                      className="px-6 py-3 bg-[#ff5722] text-white rounded-xl font-bold hover:bg-[#e64a19] transition-colors duration-300"
                    >
                      Start Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[20px] p-4 md:p-8 shadow-xl border-2 border-[#ff5722] relative overflow-hidden text-center">
              <div className="absolute inset-0 opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                    backgroundSize: '12px 12px',
                    backgroundPosition: '0 0, 0 6px'
                  }}
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-4">Select a category to start the quiz!</h2>
                <p className="text-base md:text-lg text-gray-600">Choose from the quiz categories above to begin your financial knowledge journey.</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <RedirectPage />
      )}
    </>
  );
};

export default Questions;