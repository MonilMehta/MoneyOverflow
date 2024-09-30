import React from 'react';
import { Coins } from 'lucide-react';
import { Button } from './Button';
import ContinueLearning from './ContinueLearning';
import CompletedLearningPaths from './CompletedLearning';
import Blogs from './Blogs';
import Forum from './Forum';
import Calendar from './Calendar'; // Custom calendar component
import './home.css';

const Home = () => {
  const xpBooster = 1.5;
  const coins = 500;
  const user = "User"; // Replace with dynamic user data

  return (
    <div className="grid grid-cols-1 md:grid-cols-[75%_25%] gap-6 p-6 bg-gray-50">
      
      {/* Main Content (70%) */}
      <main className="space-y-12">
        <ContinueLearning />
        <CompletedLearningPaths />
        <Blogs />
        <Forum />
      </main>
      {/* Sidebar (30%) */}
      <aside className="bg-white shadow-lg rounded-lg p-6 space-y-6 sticky top-6">
        {/* Greeting and Coins */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Hello, {user} 👋</h2>
          <p className="text-gray-500">Keep up the great work!</p>
        </div>
        <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
          <span className="text-lg font-semibold">XP Booster: {xpBooster}x</span>
          <div className="flex items-center">
            <Coins className="text-yellow-500 mr-2 h-6 w-6" />
            <span className="text-lg font-semibold">Coins: {coins}</span>
          </div>
        </div>
        {/* LeetCode-style Streak Calendar */}
        <div>
          <h3 className="text-lg font-bold mb-2">Streak</h3>
          <Calendar />
          <Button className="mt-4 bg-blue-400 w-full">Solve Today's Quiz</Button>
        </div>
      </aside>

    </div>
  );
};

export default Home;
