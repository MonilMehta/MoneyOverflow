import React, { useEffect, useState } from "react";
import axios from "axios";
import { getQuestion, checkAnswer } from "../../../../apis/quiz.api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RedirectPage from "../../components/RedirectPage";

const DifficultySlider = ({ onDifficultyChange }) => {
  const [difficulty, setDifficulty] = useState(1);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setDifficulty(value);
    onDifficultyChange(value);
  };

  return (
    <div className="mb-8">
      <label className="block mb-4 text-2xl text-black font-black tracking-wide">
        SELECT DIFFICULTY LEVEL
      </label>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="2"
          value={difficulty}
          onChange={handleSliderChange}
          className="slider w-full h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full appearance-none cursor-pointer"
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
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
              border: 3px solid #ff5722;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
            .slider::-moz-range-thumb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
              border: 3px solid #ff5722;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
          `}
        </style>
        <div className="flex justify-between w-full text-sm mt-2">
          <span
            className={
              difficulty === 0 
                ? "text-orange-500 font-black text-base" 
                : "text-gray-600 font-medium"
            }
          >
            EASY
          </span>
          <span
            className={
              difficulty === 1 
                ? "text-orange-500 font-black text-base" 
                : "text-gray-600 font-medium"
            }
          >
            MEDIUM
          </span>
          <span
            className={
              difficulty === 2 
                ? "text-red-500 font-black text-base" 
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
  const [render, setRender] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    let userId = document.cookie.split("userId=")[1]?.split(";")[0];
    if(userId != undefined){
      setUser(document.cookie.split("userId=")[1]?.split(";")[0]);
    }
  });

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let diff =
        difficulty === 1 ? "Medium" : difficulty === 2 ? "Hard" : "Easy";
      let cat = `${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;
      console.log(cat, diff);
      const response = await axios.post(getQuestion, {
        section: cat,
        difficulty: diff,
      });
      setQuestions(response.data);
      setSelectedAnswers(Array(response.data.length).fill(null));
      setScore(null);
      setCurrentQuestionIndex(0);
      setShowResults(false);
      setRender(true);
      setAnswerSubmitted(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching questions");
    } finally {
      setLoading(false);
    }
  };

  const checktheAnswer = async (questionId, selectedOptionIndex) => {
    try {
      const response = await axios.post(checkAnswer, {questionId, selectedAnswer: selectedOptionIndex, userId: user});
      
      const { isCorrect, correctAnswer } = response.data;
  
      if (isCorrect) {
        toast.success("Correct! Good job.");
      } else {
        toast.error(`Wrong! The correct answer was option ${correctAnswer + 1}`);
      }
  
      setAnswerSubmitted(true);
    } catch (error) {
      console.error("Error checking answer:", error);
      toast.error("Error checking answer");
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitAnswer = () => {
    const currentQuestionId = questions[currentQuestionIndex]._id;
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    if (selectedAnswer !== null) {
      console.log(currentQuestionId, selectedAnswer);
      checktheAnswer(currentQuestionId, selectedAnswer);
    } else {
      toast.warn("Please select an answer before submitting!");
    }
  };

  const handleNext = () => {
    if (answerSubmitted) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswerSubmitted(false);
      } else {
        handleSubmit();
      }
    } else {
      toast.warn("Please submit your answer before proceeding to the next question.");
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  if (!category) {
    return <div id="questions" />;
  }

  return (
    <div id="questions" className="w-full bg-[#f6f6f6] min-h-screen relative font-sans">
      <ToastContainer />
      
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-10">
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
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      {user !== '' ? (
        <div className="w-full p-8 relative z-10">
          <div className="max-w-4xl">
            {/* Header Section - Left Aligned */}
            <div className="mb-12">
              <h2 className="text-6xl font-black tracking-tight text-black leading-tight mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="inline italic">{category.toUpperCase()}</span>
                <span className="inline text-[#f5f5f5] italic ml-2" style={{ textShadow: '2px 2px 0px #000000' }}>QUIZ</span>
              </h2>
              <p className="text-lg text-gray-700 font-medium mb-8">
                Test your knowledge and boost your financial expertise
              </p>
            </div>

            {/* Quiz Setup Section - Left Aligned */}
            {!render && (
              <div className="bg-white rounded-[16px] shadow-lg border-2 border-gray-200 p-8 mb-8">
                <DifficultySlider onDifficultyChange={setDifficulty} />
                
                <button
                  onClick={fetchQuestions}
                  className="w-full bg-[#ff5722] text-white text-xl font-black rounded-[12px] py-4 px-8 transition-all duration-300 hover:bg-[#e64a19] hover:shadow-xl hover:-translate-y-1 transform tracking-wide"
                  disabled={loading}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {loading ? "LOADING..." : "START TEST →"}
                </button>
              </div>
            )}

            {/* Question Section */}
            {render && !showResults && questions.length > 0 && (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="bg-white rounded-[16px] shadow-lg border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-black text-gray-800">
                      QUESTION {currentQuestionIndex + 1} OF {questions.length}
                    </span>
                    <span className="text-lg font-black text-[#ff5722]">
                      {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ff5722] to-[#e64a19] rounded-full transition-all duration-500"
                      style={{
                        width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-[16px] shadow-lg border-2 border-gray-200 p-8">
                  <h3 className="text-2xl font-black text-gray-800 mb-6 leading-tight">
                    {questions[currentQuestionIndex].question}
                  </h3>
                  
                  <div className="space-y-4">
                    {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`w-full text-left border-2 rounded-[12px] py-4 px-6 transition-all duration-300 font-medium text-lg
                            ${
                              selectedAnswers[currentQuestionIndex] === optionIndex
                                ? "bg-[#ff5722] text-white border-[#ff5722] shadow-lg transform scale-[1.02]"
                                : "border-gray-300 text-gray-800 hover:border-[#ff5722] hover:bg-orange-50 hover:shadow-md"
                            }`}
                        onClick={() => handleAnswerSelect(optionIndex)}
                      >
                        <span className="font-black mr-3">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    onClick={handleSubmitAnswer}
                    className="bg-black text-white text-lg font-black rounded-[12px] py-3 px-8 transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transform tracking-wide"
                  >
                    SUBMIT ANSWER
                  </button>

                  <button
                    onClick={handleNext}
                    className={`bg-[#ff5722] text-white text-lg font-black rounded-[12px] py-3 px-8 transition-all duration-300 tracking-wide ${
                      answerSubmitted 
                        ? "hover:bg-[#e64a19] hover:shadow-lg hover:-translate-y-1 transform" 
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!answerSubmitted}
                  >
                    {currentQuestionIndex < questions.length - 1 ? "NEXT →" : "FINISH QUIZ"}
                  </button>
                </div>
              </div>
            )}

            {/* Results Section */}
            {showResults && (
              <div className="bg-white rounded-[16px] shadow-lg border-2 border-gray-200 p-8 text-center">
                <h2 className="text-4xl font-black text-gray-800 mb-4">
                  QUIZ COMPLETED!
                </h2>
                <div className="text-6xl font-black text-[#ff5722] mb-6">
                  {score} / {questions.length}
                </div>
                <div className="text-xl text-gray-600 font-medium mb-8">
                  You scored {Math.round((score / questions.length) * 100)}%
                </div>
                
                {/* Performance Badge */}
                <div className={`inline-block px-6 py-3 rounded-full text-white font-black text-lg ${
                  (score / questions.length) >= 0.8 ? 'bg-green-500' :
                  (score / questions.length) >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {(score / questions.length) >= 0.8 ? '🏆 EXCELLENT!' :
                   (score / questions.length) >= 0.6 ? '👍 GOOD JOB!' : '📚 KEEP LEARNING!'}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <RedirectPage />
      )}
    </div>
  );
};

export default Questions;