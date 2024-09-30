import React from 'react';
import { Coins } from 'lucide-react';
import { Button } from './Button';
import ContinueLearning from './ContinueLearning';
import CompletedLearningPaths from './CompletedLearning';
import Blogs from './Blogs';
import Forum from './Forum';

const Home = () => {
  const xpBooster = 1.5;
  const coins = 500;

  return (
    <div className="p-6 space-y-12 bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">MoneyOverflow</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-lg font-semibold">XP Booster: {xpBooster}x</span>
            <div className="flex items-center">
              <Coins className="text-yellow-300 mr-2 h-6 w-6" />
              <span className="text-lg font-semibold">Coins: {coins}</span>
            </div>
          </div>
        </div>
      </header>

      <ContinueLearning />
      <CompletedLearningPaths />
      <Blogs />
      <Forum />
    </div>
  );
};

export default Home;