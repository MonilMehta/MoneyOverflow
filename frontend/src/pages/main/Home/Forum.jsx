import React from 'react';
import { MessageSquare, ThumbsUp, User } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Button } from './Button';

const Forum = () => {
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
  ];

  return (
    <section className="mb-12">
      <h2 className="text-6xl font-bold mb-6">Community Forum</h2>
      <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
        <CardContent className="p-6">
          <input
            type="text"
            placeholder="Ask the community about personal finance..."
            className="w-full p-3 border rounded-lg mb-4"
          />
          <Button className="bg-blue-400 hover:bg-blue-700">Post Your Question</Button>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {questions.map((question) => (
          <Card key={question.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {question.author}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {question.upvotes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {question.replies} replies
                  </span>
                </div>
                <Button className="text-blue-600 hover:text-blue-700 bg-blue-400">View Discussion</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Forum;