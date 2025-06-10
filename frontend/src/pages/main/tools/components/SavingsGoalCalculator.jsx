import React, { useState } from 'react';
import tools2 from "../../../../assets/tools2.gif";
import tools3 from "../../../../assets/tools3.gif";

const SavingsGoalCalculator = () => {
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [timeYears, setTimeYears] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateSavings = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const years = parseFloat(timeYears);
    const annualInterest = parseFloat(interestRate);

    if (isNaN(goal) || isNaN(current) || isNaN(years) || isNaN(annualInterest)) {
      setError('Please fill in all fields correctly.');
      setResult('');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1500);
      return;
    }

    if (goal <= current) {
      setError('You have already reached your savings goal!');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1500);
      return;
    }

    setLoading(true);
    setError('');
    setTimeout(() => {
      const months = years * 12;
      const monthlyInterestRate = annualInterest / 100 / 12;
      const futureValue = goal;
      const presentValue = current;
      const numerator = futureValue - (presentValue * Math.pow(1 + monthlyInterestRate, months));
      const denominator = (Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate;
      const monthlySavings = numerator / denominator;

      if (monthlySavings > 0) {
        setResult(`You need to save Rs. ${monthlySavings.toFixed(2)} per month to reach your goal.`);
      } else {
        setError('The goal is not achievable with the current parameters.');
      }

      setLoading(false);
    }, 1500);
  };

  const clearSavings = () => {
    setGoalAmount('');
    setCurrentSavings('');
    setTimeYears('');
    setInterestRate('');
    setResult('');
    setError('');
    setLoading(false);
  };

  return (
    <div className="container mx-auto">
      <div className="header bg-white p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">Savings Goal Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          Calculate how much you need to save monthly to reach your financial goal considering interest.
        </p>

        <div className="page-container bg-white">
          <div className="input-container space-y-4">
            <div>
              <label htmlFor='goal' className="block text-gray-700 font-semibold mb-1">Savings Goal Amount (INR)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={goalAmount}
                id='goal'
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="Enter goal amount"
              />
            </div>
            <div>
              <label htmlFor='curr' className="block text-gray-700 font-semibold mb-1">Current Savings (INR)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={currentSavings}
                id='curr'
                onChange={(e) => setCurrentSavings(e.target.value)}
                placeholder="Enter current savings"
              />
            </div>
            <div>
              <label htmlFor='tim' className="block text-gray-700 font-semibold mb-1">Years to Goal</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={timeYears}
                id='tim'
                onChange={(e) => setTimeYears(e.target.value)}
                placeholder="Enter time period in years"
              />
            </div>
            <div>
              <label htmlFor='inter' className="block text-gray-700 font-semibold mb-1">Interest Rate (%)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={interestRate}
                id='inter'
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter annual interest rate"
              />
            </div>
          </div>

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

          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg" style={{ minHeight: '200px', maxHeight: '200px' }}>
            {loading ? (
              <img src={error ? tools3 : tools2} alt="Loading" className="mx-auto h-40" />
            ) : (
              <div className="text-gray-700 font-semibold">
                <div className="mb-2">Result:</div>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                {result && !error && <div>{result}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;
