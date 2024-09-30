import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, User } from 'lucide-react';
import { Card, CardContent } from './Card';
import {Button} from './Button';
import Modal from './Modal';

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [q, setQ] = useState(['']);

  const questions = [
    {
      id: 1,
      title: "How do I start building an emergency fund?",
      author: "SaverSam",
      upvotes: 24,
      replies: 7,
    },
    {
      id: 2,
      title: "What's the best way to pay off credit card debt?",
      author: "DebtFreeDan",
      upvotes: 31,
      replies: 12,
    },
    // Add more questions as needed
  ];

  const openModal = (question) => {
    console.log('openModal called');
    console.log('Question:', question);
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('closeModal called');
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div>
      <Card>
        <CardContent>
            <h2 className="text-3xl font-bold mb-4">Ask the Community</h2>
            <textarea className="w-full p-3 border rounded-lg mb-4" rows="4" placeholder="What's your question?" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-5 py-2 rounded-full shadow-lg">
            Post Your Question
          </Button>
        </CardContent>
      </Card>

      {/* Forum Questions */}
      <div className="space-y-4 mt-4">
        {questions.map((question) => (
          <Card
            key={question.id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden"
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
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
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {question.replies}
                  </span>
                </div>
              </div>
              <Button
                className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={() => openModal(question)}
              >
                Open Discussion
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedQuestion && (
        <Modal onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedQuestion.title}</h2>
            <p className="text-gray-700">Author: {selectedQuestion.author}</p>
            <p className="text-gray-700">Upvotes: {selectedQuestion.upvotes}</p>
            <p className="text-gray-700">Replies: {selectedQuestion.replies}</p>
            <textarea
              className="w-full p-3 border rounded-lg mt-4"
              rows="4"
              placeholder="Write your reply..."
            />
            <Button className="mt-4 bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
              Post Reply
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Forum;