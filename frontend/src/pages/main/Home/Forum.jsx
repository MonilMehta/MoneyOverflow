import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, User } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import Modal from "./Modal";
import {
  getAns,
  getQuest,
  uploadAns,
  uploadQuest,
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
  
  const cardColors = [
    {
      bg: "#ff5722",
      text: "#ffffff",
      accent: "#ff7043",
      button: "#000000"
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
      button: "#ff5722"
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      button: "#ff5722"
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
      button: "#000000"
    }
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
      const res = await axios.post(getAns, {questionId});
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
      isWhite: scheme.bg === "#ffffff"
    };
  };

  return (
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
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

      <div className="w-full relative z-10">
        {/* Header */}
        <div className="mb-10 text-left"> {/* Changed from text-right */}
          <h2 className="text-7xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">Community</span>
            <span className="block text-[#ff5722] italic">FORUM</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 font-medium max-w-xl"> {/* Removed ml-auto */}
            Ask questions, share knowledge, and connect with fellow learners in our community.
          </p>
          <div className="mt-4 flex items-center gap-4 justify-start"> {/* Changed from justify-end */}
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              Active Members 25K+
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>

        {/* Ask Question Section */}
        <div className="bg-white rounded-[24px] p-8 shadow-2xl border-4 border-[#ff5722] mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[24px] opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px'
              }}
            />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-black text-[#000000] mb-6 uppercase tracking-wide text-left" style={{ fontFamily: 'Arial, sans-serif' }}> {/* Changed from text-right */}
              Ask the Community
            </h3>
            
            <div className="space-y-4">
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg font-medium focus:border-[#ff5722] focus:outline-none transition-colors resize-none text-left"
                rows="2"
                placeholder="What's your question?"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{ fontFamily: 'Arial, sans-serif' }}
              />
              
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg font-medium focus:border-[#ff5722] focus:outline-none transition-colors resize-none text-left"
                rows="4"
                placeholder="Describe in detail..."
                value={d}
                onChange={(e) => setD(e.target.value)}
                style={{ fontFamily: 'Arial, sans-serif' }}
              />
              
              <div className="flex justify-start">
                <button
                  className="bg-[#ff5722] text-white px-8 py-4 rounded-xl text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => postQuestion()}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Post Your Question →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Forum Questions */}
        <div className="grid grid-cols-1 gap-6">
          {questions.map((user, userIndex) => 
            user.quest.map((question, questionIndex) => {
              const globalQuestionIndex = userIndex * user.quest.length + questionIndex;
              const colorScheme = getColorScheme(globalQuestionIndex);
              
              return (
                <div
                  key={question._id}
                  className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl relative w-full"
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <div className="p-6 relative">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 0 4px'
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex-1">
                        <h3 className="text-2xl font-black leading-tight tracking-wide uppercase mb-4">
                          {question.title}
                        </h3>
                        
                        <div className="flex items-center gap-6 text-sm font-medium mb-4">
                          <span className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {question.author}
                          </span>
                          <span className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            {question.upvotes}
                          </span>
                          <span 
                            className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => toggleAnswers(question._id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            {question.replies} Replies
                          </span>
                        </div>
                      </div>
                      
                      <button
                        className="bg-transparent border-2 px-6 py-3 rounded-xl text-sm font-bold hover:bg-current hover:text-white transition-all duration-300 transform hover:scale-105 ml-4"
                        style={{
                          borderColor: colorScheme.button,
                          color: colorScheme.button
                        }}
                        onClick={() => openModal(question)}
                      >
                        POST ANSWER →
                      </button>
                    </div>

                    {/* Decorative Elements - Updated with colorScheme check */}
                    {colorScheme.isOrange && (
                      <div className="absolute top-4 right-4 opacity-20">
                        <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                      </div>
                    )}
                    
                    {colorScheme.isBeige && (
                      <div className="absolute bottom-4 right-4 opacity-30">
                        <div className="flex -space-x-1">
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Answers Dropdown */}
                  {expandedQuestionId === question._id && (
                    <div className="p-6 border-t-2" style={{ borderColor: colorScheme.accent, backgroundColor: colorScheme.bg }}>
                      <h4 className="text-xl font-black mb-4 uppercase tracking-wide">ANSWERS</h4>
                      {answers[question._id] ? (
                        answers[question._id].map((answer) => (
                          <div key={answer._id} className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colorScheme.accent }}>
                            <p className="font-medium">{answer.bodyA}</p>
                          </div>
                        ))
                      ) : (
                        <p className="font-medium opacity-70">Loading answers...</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedQuestion && (
        <Modal onClose={closeModal}>
          <div className="p-8 bg-white rounded-[24px] relative overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[24px] opacity-5">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                  backgroundSize: '10px 10px',
                  backgroundPosition: '0 0, 0 5px'
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-black text-[#000000] mb-4 uppercase tracking-wide">
                {selectedQuestion.title}
              </h2>
              <p className="text-gray-700 mb-6 font-medium text-lg leading-relaxed">
                {selectedQuestion.bodyQ}
              </p>
              
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg font-medium focus:border-[#ff5722] focus:outline-none transition-colors resize-none mb-6"
                rows="4"
                placeholder="Write your reply..."
                value={writeAns}
                onChange={handleAnswerChange}
              />
              
              <button
                className="bg-[#ff5722] text-white px-8 py-4 rounded-xl text-lg font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => postAnswer(selectedQuestion._id)}
              >
                Post Reply →
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 opacity-20">
              <div className="w-8 h-8 border-2 border-[#ff5722] rounded-full"></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Forum;