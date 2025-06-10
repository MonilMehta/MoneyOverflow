import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Progress } from './Progress';
import { Button } from './Button';
import { Link } from "react-router-dom";

const ContinueLearning = ({ course }) => {
  const currentCourse = {
    progress: course * 10,
    timeLeft: `${70 - (course * 7)} minutes`,
  };

  const courseTitles = [
    "Financial Basics",
    "Budgeting",
    "Savings",
    "Debt Management",
    "Investing",
    "Retirement Planning",
    "Insurance and Protection",
    "Taxes and Legal Considerations",
    "Financial Tools and Resources",
    "Wealth Building"
  ];

  return (
    <section className="mb-12 mt-12">
      <h2 className="text-6xl font-extrabold mb-6 text-gray-800 text-center">
        <span className='text-blue-400'>Continue</span> Your Learning Journey
      </h2>
      <Card className="relative bg-gradient-to-br from-blue-500 to-blue-300 shadow-2xl rounded-3xl overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoDMtVDe5J81FLKaeQEOpE8FC20b5UcdfAjg&s"
          alt="Learning Visual"
          className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-30 pointer-events-none"
        />
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 text-white z-10">
            <h3 className="text-3xl font-semibold mb-4">{courseTitles[course]}</h3>
            <p className="text-xl font-medium mb-6">Next Lesson: {course < 9? courseTitles[course + 1] : ""}</p>
            <p className="text-m mb-4">Time Left: {currentCourse.timeLeft}</p>
            <Progress value={currentCourse.progress} className="mb-4" />
            <p className="text-xl font-semibold">{currentCourse.progress}% Complete</p>
          </div>
          <div className="flex flex-col justify-center md:w-1/2 p-8 z-10">
            <Link to='/main/learning' className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 hover:shadow-lg transition-all flex items-center justify-center space-x-2 py-3 px-6 text-lg rounded-lg font-semibold">
              <PlayCircle className="h-6 w-6" />
              <span>Continue Learning</span>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ContinueLearning;
