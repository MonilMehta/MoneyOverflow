import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Progress } from './Progress';
import { Button } from './Button';

const ContinueLearning = () => {
  const currentCourse = {
    title: "Personal Finance Essentials",
    progress: 60,
    nextLesson: "Budgeting Strategies",
    timeLeft: "20 minutes"
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Continue Your Learning Journey</h2>
      <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-400 p-4 text-white">
          <h3 className="text-xl font-semibold">{currentCourse.title}</h3>
        </div>
        <CardContent className="p-6">
          <Progress value={currentCourse.progress} className="mb-4" />
          <p className="text-lg mb-4">{currentCourse.progress}% Complete</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Next: {currentCourse.nextLesson}</p>
              <p className="text-sm text-gray-600">{currentCourse.timeLeft} left</p>
            </div>
            <Button className="bg-blue-400 hover:bg-blue-700 flex">
              <PlayCircle className="mr-2 h-5 w-5" />
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContinueLearning;