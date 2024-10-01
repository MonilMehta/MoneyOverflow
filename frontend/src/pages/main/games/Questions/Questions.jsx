import React, { useEffect, useState } from "react";
import axios from "axios";
import { getQuestion, checkAnswer } from "../../../../apis/quiz.api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import RedirectPage from "../../components/RedirectPage";

const DifficultySlider = ({ onDifficultyChange }) => {
  const [difficulty, setDifficulty] = useState(1);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setDifficulty(value);
    onDifficultyChange(value);
  };

  return (
    <div className="flex mb-4">
      <label className="block mb-2 text-lg text-white font-semibold">
        Select Difficulty Level:
      </label>
      <div className="relative ml-8">
        <input
          type="range"
          min="0"
          max="2"
          value={difficulty}
          onChange={handleSliderChange}
          className="slider w-64 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg appearance-none cursor-pointer"
          style={{
            backgroundSize: `${(difficulty / 2) * 100}% 100%`,
            transition: "background-size 0.3s ease",
          }}
        />
        <div className="flex justify-between w-64 text-sm text-gray-200">
          <span
            className={
              difficulty === 0 ? "text-white font-bold" : "text-gray-100"
            }
          >
            Easy
          </span>
          <span
            className={
              difficulty === 1 ? "text-white font-bold" : "text-gray-100"
            }
          >
            Medium
          </span>
          <span
            className={
              difficulty === 2 ? "text-white font-bold" : "text-gray-100"
            }
          >
            Hard
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
  
      setAnswerSubmitted(true); // Allow moving to the next question after answer is submitted
    } catch (error) {
      console.error("Error checking answer:", error);
      toast.error("Error checking answer");
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = optionIndex; // Save the selected answer for the current question
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitAnswer = () => {
    const currentQuestionId = questions[currentQuestionIndex]._id;
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    if (selectedAnswer !== null) {
      console.log(currentQuestionId, selectedAnswer);
      checktheAnswer(currentQuestionId, selectedAnswer); // Call API to check the selected answer
    } else {
      toast.warn("Please select an answer before submitting!");
    }
  };

  const handleNext = () => {
    if (answerSubmitted) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
        setAnswerSubmitted(false); // Reset answer submission state for the next question
      } else {
        handleSubmit(); // If last question, submit the quiz
      }
    } else {
      toast.warn("Please submit your answer before proceeding to the next question.");
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        calculatedScore += 1; // Increment score for correct answers
      }
    });
    setScore(calculatedScore); // Set the final score
    setShowResults(true);
  };

  if (!category) {
    return <div id="questions" />;
  }

  return (
    <div id="questions" className="w-full">
      <ToastContainer /> {/* Toast container to display toasts */}
      {user !== ''?
        <div className="w-full p-5">
          <h2 className="text-5xl font-mono mb-8 font-bold text-[#dbf4ff] text-center w-full">
            {category.toUpperCase()}
          </h2>

          <div className="flex justify-between w-11/12">
            <DifficultySlider onDifficultyChange={setDifficulty} />
            <button
              onClick={fetchQuestions}
              className="bg-yellow-500 text-white text-lg font-bold rounded-xl py-3 px-5 mb-4 transition duration-300 hover:bg-yellow-600 hover:border-yellow-600 border-yellow-400 border-2"
              disabled={loading}
            >
              {loading ? "Loading..." : "Start Test"}
            </button>
          </div>

          {render && !showResults && questions.length > 0 && (
            <div className="transition-opacity duration-500 ease-in-out w-1/2 mx-auto mt-5">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                <h3 className="text-xl mb-2">
                  {`${currentQuestionIndex + 1}/${questions.length}. ${questions[currentQuestionIndex].question}`}
                </h3>
                <div className="mt-2">
                  {questions[currentQuestionIndex].options.map(
                    (option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`border rounded-lg py-2 px-4 w-full mb-2 transition duration-300 
                              ${
                                selectedAnswers[currentQuestionIndex] ===
                                optionIndex
                                  ? "bg-yellow-500 text-white"
                                  : "border-yellow-300 text-red-800"
                              }`}
                        onClick={() => handleAnswerSelect(optionIndex)}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleSubmitAnswer}
                  className="bg-purple-500 text-white text-lg font-bold rounded-xl py-2 px-4 transition duration-300 hover:bg-purple-600"
                >
                  Submit Answer
                </button>

                <button
                  onClick={handleNext}
                  className={`bg-green-500 text-white text-lg font-bold rounded-xl py-2 px-4 transition duration-300 hover:bg-green-600 ${
                    answerSubmitted ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!answerSubmitted}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {showResults && (
            <div className="mt-5 text-xl font-bold">
              <h2>
                Your Score: {score} / {questions.length}
              </h2>
            </div>
          )}
        </div> : <RedirectPage/>
      }
    </div>
  );
};

export default Questions;
