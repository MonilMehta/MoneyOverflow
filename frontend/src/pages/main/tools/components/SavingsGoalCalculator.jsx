import React, { useState } from 'react';

const SavingsGoalCalculator = () => {
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [timeYears, setTimeYears] = useState(''); // Number of years to reach the goal
  const [interestRate, setInterestRate] = useState(''); // Annual interest rate
  const [result, setResult] = useState('');

  const calculateSavings = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const years = parseFloat(timeYears);
    const annualInterest = parseFloat(interestRate);

    if (isNaN(goal) || isNaN(current) || isNaN(years) || isNaN(annualInterest)) {
      setResult('Please fill in all fields correctly.');
      return;
    }

    if (goal <= current) {
      setResult('You have already reached your savings goal!');
      return;
    }

    const months = years * 12; // Convert years to months
    const monthlyInterestRate = annualInterest / 100 / 12; // Convert annual rate to monthly decimal

    // Calculate the future value considering interest rate and periodic contributions
    const futureValue = goal;
    const presentValue = current;

    // The formula for the periodic payment (PMT) to achieve the future value
    const numerator = futureValue - (presentValue * Math.pow(1 + monthlyInterestRate, months));
    const denominator = (Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate;

    const monthlySavings = numerator / denominator;

    if (monthlySavings > 0) {
      setResult(`You need to save Rs. ${monthlySavings.toFixed(2)} per month to reach your goal.`);
    } else {
      setResult('The goal is not achievable with the current parameters.');
    }
  };

  const clearSavings = () => {
    setGoalAmount('');
    setCurrentSavings('');
    setTimeYears('');
    setInterestRate('');
    setResult('');
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="header bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Savings Goal Calculator</h3>
        <p className="text-gray-600 mb-6">
          Calculate how much you need to save monthly to reach your financial goal considering interest.
        </p>

        {/* Input Fields */}
        <div className="page-container bg-white p-6 shadow-lg rounded-lg">
          <div className="input-container space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Savings Goal Amount (INR)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Current Savings (INR)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Years to Goal</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={timeYears}
                onChange={(e) => setTimeYears(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Interest Rate (%)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-calculate flex space-x-4 mt-6">
            <button
              onClick={calculateSavings}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            <button
              onClick={clearSavings}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>

          {/* Result */}
          <div className="sresult-container bg-gray-100 p-4 mt-6 rounded-lg">
            <div className="text-gray-700 font-semibold">Result:</div>
            <div id="result" className="text-lg mt-2">{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;
