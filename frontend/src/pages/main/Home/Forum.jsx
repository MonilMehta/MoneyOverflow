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
  const [expandedQuestionId, setExpandedQuestionId] = useState(null); // State to track which question is expanded
  const [answers, setAnswers] = useState({}); // Store answers for each question
  
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

  return (
    <div>
      <Card>
        <CardContent>
          <h2 className="text-3xl font-bold mb-4">Ask the Community</h2>
          <textarea
            className="w-full p-3 border rounded-lg mb-4"
            rows="2"
            placeholder="What's your question?"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded-lg mb-4"
            rows="4"
            placeholder="Describe in detail.."
            value={d}
            onChange={(e) => setD(e.target.value)}
          />
          <Button
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-5 py-2 rounded-full shadow-lg"
            onClick={() => postQuestion()}
          >
            Post Your Question
          </Button>
        </CardContent>
      </Card>

      {/* Forum Questions */}
      <div className="space-y-4 mt-4">
        {questions.map((user) => (
          <div key={user.userId}>
            {user.quest.map((question) => (
              <Card
                key={question._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden mb-1"
              >
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {question.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="flex items-center mr-4">
                        <User className="mr-1 h-4 w-4" />
                        {question.author}
                      </span>
                      <span className="flex items-center mr-4">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {question.upvotes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare
                          className="mr-1 h-4 w-4 cursor-pointer"
                          onClick={() => toggleAnswers(question._id)}
                        />
                        {question.replies}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                    onClick={() => openModal(question)}
                  >
                    Post Answer
                  </Button>
                </CardContent>

                {/* Answers Dropdown */}
                {expandedQuestionId === question._id && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <h4 className="font-bold mb-2">Answers</h4>
                    {answers[question._id] ? (
                      answers[question._id].map((answer) => (
                        <p key={answer._id} className="text-gray-700 mb-2">
                          {answer.bodyA}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500">Loading answers...</p>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedQuestion && (
        <Modal onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {selectedQuestion.title}
            </h2>
            <p className="text-gray-700">{selectedQuestion.bodyQ}</p>
            <textarea
              className="w-full p-3 border rounded-lg mt-4"
              rows="4"
              placeholder="Write your reply..."
              value={writeAns}
              onChange={handleAnswerChange}
            />
            <Button
              className="mt-4 bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
              onClick={() => postAnswer(selectedQuestion._id)}
            >
              Post Reply
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Forum;
