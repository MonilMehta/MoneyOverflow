import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, ThumbsUp, User } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import Modal from "./Modal";
import {
  getAns,
  getQuest,
  uploadAns,
  uploadQuest,
  aiAnswer
} from "../../../apis/forum.api";
import axios from "axios";

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [q, setQ] = useState();
  const [d, setD] = useState();
  const [questions, setQuestions] = useState([]);
  const [writeAns, setWriteAns] = useState("");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [aiLoading, setAiLoading] = useState({});
  const [aiAnswers, setAiAnswers] = useState({});
  const [aiErrors, setAiErrors] = useState({});

  const cardColors = [
    {
      bg: "#ff5722",
      text: "#ffffff",
      accent: "#ff7043",
      button: "#000000",
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      button: "#ff5722",
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
      button: "#000000",
    },
  ];

  const fetchQuest = async () => {
    try {
      const res = await axios.get(getQuest);
      console.log(res.data);
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuest();
  }, []);

  const fetchAnswers = async (questionId) => {
    try {
      const res = await axios.post(getAns, { questionId });
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: res.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAnswers = (questionId) => {
    if (expandedQuestionId === questionId) {
      setExpandedQuestionId(null);
    } else {
      setExpandedQuestionId(questionId);
      if (!answers[questionId]) {
        fetchAnswers(questionId);
      }
    }
  };

  const postAnswer = async (id) => {
    try {
      let userId = document.cookie.split("userId=")[1]?.split(";")[0];
      const res = await axios.post(uploadAns, {
        questionId: id,
        userId,
        bodyA: writeAns,
      });
      console.log(res.data);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerChange = (event) => {
    setWriteAns(event.target.value);
  };

  const postQuestion = async () => {
    try {
      let userId = document.cookie.split("userId=")[1]?.split(";")[0];
      const res = await axios.post(uploadQuest, { userId, bodyQ: d, title: q });
      console.log(res.data);
      setQ("");
      setD("");
      fetchQuest();
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const getColorScheme = (questionIndex) => {
    const scheme = cardColors[questionIndex % cardColors.length];
    return {
      ...scheme,
      isOrange: scheme.bg === "#ff5722",
      isBeige: scheme.bg === "#e8ddd4",
      isBlack: scheme.bg === "#000000",
      isWhite: scheme.bg === "#ffffff",
    };
  };

  // Component for question cards
  const QuestionCard = ({ user, question, globalQuestionIndex }) => {
    const colorScheme = getColorScheme(globalQuestionIndex);

    return (
      <div
        className="rounded-xl sm:rounded-[24px] overflow-hidden shadow-lg relative w-full hover:-translate-y-2 hover:shadow-xl"
        style={{
          backgroundColor: colorScheme.bg,
          color: colorScheme.bg === "#ffffff" ? "#000000" : "#ffffff",
          border: `2px solid ${colorScheme.accent}`,
          fontFamily: "Arial, sans-serif",
          minHeight: "200px",
          padding: "1rem sm:2rem",
        }}
      >
        <div className="p-4 sm:p-6 relative">
          {/* Background Pattern */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl sm:rounded-[16px] opacity-5"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 0 4px",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start relative z-10 gap-4 sm:gap-8">
            <div className="flex-1">
              <h3
                className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-wide uppercase mb-4 sm:mb-6"
              >
                {question.title}
              </h3>

              <div
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 text-sm sm:text-base font-medium mb-4"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">{question.author}</span>
                </span>
                <span className="flex items-center gap-2 sm:gap-3">
                  <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  {question.upvotes}
                </span>
                <span
                  className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-70"
                  onClick={() => toggleAnswers(question._id)}
                >
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  {question.replies} Replies
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                className="bg-transparent border-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:bg-current hover:text-white hover:scale-105 flex-1 sm:flex-none"
                style={{
                  borderColor: colorScheme.bg === "#ffffff" ? "#000000" : "#ffffff",
                  color: colorScheme.bg === "#ffffff" ? "#000000" : "#ffffff",
                }}
                onClick={() => openModal(question)}
              >
                <span className="hidden sm:inline">POST ANSWER →</span>
                <span className="sm:hidden">ANSWER</span>
              </button>
              <button
                className="bg-transparent border-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:bg-current hover:text-white hover:scale-105 flex-1 sm:flex-none"
                style={{
                  borderColor: colorScheme.bg === "#ffffff" ? "#000000" : "#ffffff",
                  color: colorScheme.bg === "#ffffff" ? "#000000" : "#ffffff",
                }}
                onClick={() => handleGetAiAnswer(question._id)}
                disabled={aiLoading[question._id]}
              >
                {aiLoading[question._id] ? (
                  <span>GENERATING...</span>
                ) : (
                  <span>AI ANSWER →</span>
                )}
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          {colorScheme.isOrange && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-20">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-full"></div>
            </div>
          )}

          {colorScheme.isBeige && (
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-30">
              <div className="flex -space-x-1">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-500 rounded-full"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Answers Dropdown */}
        {expandedQuestionId === question._id && (
          <div
            className="p-4 sm:p-6 border-t-2"
            style={{
              borderColor: colorScheme.accent,
              backgroundColor: colorScheme.bg,
            }}
          >
            <h4 className="text-lg sm:text-xl font-black mb-4 uppercase tracking-wide">
              ANSWERS
            </h4>
            {aiLoading[question._id] ? (
              <div className="mb-4 p-3 sm:p-4 rounded-lg sm:rounded-xl animate-pulse">
                <p className="font-medium text-sm sm:text-base">
                  AI is generating an answer...
                </p>
              </div>
            ) : aiAnswers[question._id] ? (
              <>
                <div
                  className="mb-4 p-3 sm:p-4 rounded-lg sm:rounded-xl"
                  style={{
                    backgroundColor: colorScheme.accent,
                    borderLeft: `4px solid ${colorScheme.bg === "#ffffff" ? "#000000" : "#ffffff"}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm sm:text-base">AI ANSWER</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base whitespace-pre-wrap">
                    {aiAnswers[question._id]}
                  </p>
                </div>
                {answers[question._id]?.map((answer, index) => (
                  <div
                    key={answer._id}
                    className="mb-4 p-3 sm:p-4 rounded-lg sm:rounded-xl"
                    style={{
                      backgroundColor: colorScheme.accent,
                    }}
                  >
                    <p className="font-medium text-sm sm:text-base">
                      {answer.bodyA}
                    </p>
                  </div>
                ))}
              </>
            ) : answers[question._id] ? (
              answers[question._id].map((answer, index) => (
                <div
                  key={answer._id}
                  className="mb-4 p-3 sm:p-4 rounded-lg sm:rounded-xl"
                  style={{
                    backgroundColor: colorScheme.accent,
                  }}
                >
                  <p className="font-medium text-sm sm:text-base">
                    {answer.bodyA}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-medium opacity-70 text-sm sm:text-base">
                Loading answers...
              </p>
            )}
            {aiErrors[question._id] && (
              <p className="text-red-500 text-sm sm:text-base mt-2">
                {aiErrors[question._id]}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleGetAiAnswer = async (questionId) => {
    setAiLoading(prev => ({ ...prev, [questionId]: true }));
    setAiErrors(prev => ({ ...prev, [questionId]: "" }));
    try {
      const res = await axios.post(aiAnswer, { questionId });
      setAiAnswers(prev => ({ ...prev, [questionId]: res.data.answer }));
      // Expand answers section if it's not already expanded
      if (expandedQuestionId !== questionId) {
        toggleAnswers(questionId);
      }
    } catch (err) {
      setAiErrors(prev => ({ ...prev, [questionId]: "Failed to get AI answer." }));
      console.error(err);
    } finally {
      setAiLoading(prev => ({ ...prev, [questionId]: false }));
    }
  };

  return (
    <div className="bg-[#f6f6f6] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      {/* Vertical Lines - Hidden on mobile */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>

      {/* Horizontal Lines - Hidden on mobile */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="w-full relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">
              Community
            </span>
            <span className="block text-[#ff5722] italic">
              FORUM
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 font-medium max-w-xl">
            Ask questions, share knowledge, and connect with fellow learners in our community.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-start">
            <div className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">
              Active Members 25K+
            </div>
            <div className="text-xl sm:text-2xl">*</div>
          </div>
        </div>

        {/* Ask Question Section */}
        <div className="bg-white rounded-xl sm:rounded-[24px] p-4 sm:p-8 shadow-2xl border-2 sm:border-4 border-[#ff5722] mb-8 sm:mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl sm:rounded-[24px] opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)",
                backgroundSize: "10px 10px",
                backgroundPosition: "0 0, 0 5px",
              }}
            />
          </div>

          <div className="relative z-10">
            <h3
              className="text-2xl sm:text-3xl font-black text-[#000000] mb-4 sm:mb-6 uppercase tracking-wide text-left"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Ask the Community
            </h3>

            <div className="space-y-4">
              <textarea
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium focus:border-[#ff5722] focus:outline-none resize-none text-left"
                rows="2"
                placeholder="What's your question?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{ fontFamily: "Arial, sans-serif" }}
              />

              <textarea
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium focus:border-[#ff5722] focus:outline-none resize-none text-left"
                rows="4"
                placeholder="Describe in detail..."
                value={d}
                onChange={(e) => setD(e.target.value)}
                style={{ fontFamily: "Arial, sans-serif" }}
              />

              <div className="flex justify-start">
                <button
                  className="bg-[#ff5722] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
                  onClick={() => postQuestion()}
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  <span className="hidden sm:inline">Post Your Question →</span>
                  <span className="sm:hidden">Post Question</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Forum Questions */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full px-0">
          {questions.map((user, userIndex) =>
            user.quest.map((question, questionIndex) => {
              const globalQuestionIndex = userIndex * user.quest.length + questionIndex;

              return (
                <QuestionCard
                  key={question._id}
                  user={user}
                  question={question}
                  globalQuestionIndex={globalQuestionIndex}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedQuestion && (
        <Modal onClose={closeModal}>
          <div className="p-4 sm:p-8 bg-white rounded-xl sm:rounded-[24px] relative overflow-hidden max-h-[90vh] overflow-y-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl sm:rounded-[24px] opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)",
                  backgroundSize: "10px 10px",
                  backgroundPosition: "0 0, 0 5px",
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black text-[#000000] mb-4 uppercase tracking-wide">
                {selectedQuestion.title}
              </h2>
              <p className="text-gray-700 mb-6 font-medium text-base sm:text-lg leading-relaxed">
                {selectedQuestion.bodyQ}
              </p>
              <textarea
                className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium focus:border-[#ff5722] focus:outline-none resize-none mb-6"
                rows="4"
                placeholder="Write your reply..."
                value={writeAns}
                onChange={handleAnswerChange}
              />
              <button
                className="bg-[#ff5722] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto mb-4"
                onClick={() => postAnswer(selectedQuestion._id)}
              >
                <span className="hidden sm:inline">Post Reply →</span>
                <span className="sm:hidden">Post Reply</span>
              </button>
              <button
                className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-black uppercase tracking-wide hover:bg-[#333] hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto flex items-center justify-center mb-2"
                onClick={() => handleGetAiAnswer(selectedQuestion._id)}
                disabled={aiLoading[selectedQuestion?._id]}
                style={{ minWidth: "180px" }}
              >
                {aiLoading[selectedQuestion?._id] ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span>Get AI Answer</span>
                )}
              </button>
              {aiErrors[selectedQuestion?._id] && (
                <div className="text-red-600 font-semibold mb-2">{aiErrors[selectedQuestion._id]}</div>
              )}
              {aiAnswers[selectedQuestion?._id] && (
                <div className="mt-2 p-4 rounded-xl bg-[#1a1a1a] border-2 border-[#ff5722] text-gray-100 shadow-lg w-full">
                  <div className="font-bold text-[#ff5722] mb-2">AI Answer</div>
                  <div className="whitespace-pre-line text-base leading-relaxed">
                    {aiAnswers[selectedQuestion._id]}
                  </div>
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-[#ff5722] rounded-full"></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Forum;