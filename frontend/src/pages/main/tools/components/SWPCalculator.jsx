import React, { useState } from 'react';

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState('');
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState('');
  const [totalPeriod, setTotalPeriod] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');

  const calculateSWP = () => {
    const investment = parseFloat(totalInvestment);
    const withdrawal = parseFloat(withdrawalPerMonth);
    const returnRate = parseFloat(expectedReturnRate);
    const period = parseFloat(totalPeriod);

    if (isNaN(investment) || isNaN(withdrawal) || isNaN(returnRate) || isNaN(period)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    const monthlyInterestRate = (returnRate / 100) / 12;
    const totalMonths = period * 12;

    let finalValue = investment;
    for (let i = 0; i < totalMonths; i++) {
      finalValue = finalValue * (1 + monthlyInterestRate) - withdrawal;
      if (finalValue < 0) {
        finalValue = 0;
        break;
      }
    }

    setRemainingAmount(finalValue.toFixed(2));
  };

  const clearAll = () => {
    setTotalInvestment('');
    setWithdrawalPerMonth('');
    setExpectedReturnRate('');
    setTotalPeriod('');
    setRemainingAmount('');
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="header bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center">Systematic Withdrawal Plan Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          The SWP (Systematic Withdrawal Plan) calculator helps investors plan and manage regular withdrawals from their investment corpus, typically mutual funds, providing a steady income stream.
        </p>

        <div className="page-container bg-white p-6 shadow-lg rounded-lg">
          <div className="input-container space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Total Investment (INR)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={totalInvestment}
                onChange={(e) => setTotalInvestment(e.target.value)}
                placeholder="Enter total investment amount"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Withdrawal Per Month (INR)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={withdrawalPerMonth}
                onChange={(e) => setWithdrawalPerMonth(e.target.value)}
                placeholder="Enter withdrawal per month"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Expected Return Rate (p.a.)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={expectedReturnRate}
                onChange={(e) => setExpectedReturnRate(e.target.value)}
                placeholder="Enter expected return rate"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Total Period (Years)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={totalPeriod}
                onChange={(e) => setTotalPeriod(e.target.value)}
                placeholder="Enter time period in years"
              />
            </div>
          </div>

          <div className="btn-calculate flex space-x-4 mt-6">
            <button
              onClick={calculateSWP}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            <button
              onClick={clearAll}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>

          {/* Result */}
          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg">
            <div className="text-gray-700 font-semibold">Result:</div>
            {remainingAmount && (
              <div className="mt-2">
                <div><b>Remaining Amount:</b> ₹{remainingAmount}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;
