import React, { useState } from 'react';

const FDCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [interestEarned, setInterestEarned] = useState('');
  const [maturityAmount, setMaturityAmount] = useState('');

  const calculateFD = () => {
    const principalAmount = parseFloat(principal);
    const interestRate = parseFloat(rate);
    const timePeriod = parseInt(years);

    if (isNaN(principalAmount) || isNaN(interestRate) || isNaN(timePeriod) || principalAmount <= 0 || interestRate <= 0 || timePeriod <= 0) {
      alert('Please enter valid values.');
      return;
    }

    const maturity = principalAmount * Math.pow((1 + interestRate / 100), timePeriod);
    const interest = maturity - principalAmount;

    setInterestEarned(interest.toFixed(2));
    setMaturityAmount(maturity.toFixed(2));
  };

  const clearAll = () => {
    setPrincipal('');
    setRate('');
    setYears('');
    setInterestEarned('');
    setMaturityAmount('');
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="header bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center">Fixed Deposit Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          The FD (Fixed Deposit) Calculator helps compute the maturity amount and interest earned on fixed deposits based on the principal, interest rate, and duration.
        </p>

        <div className="page-container bg-white p-6 shadow-lg rounded-lg">
          <div className="input-container space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Principal Amount (₹)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter Principal Amount"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Annual Interest Rate (%)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={rate}
                step="0.01"
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter Annual Interest Rate"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Time Period (in years)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Enter Time Period"
              />
            </div>
          </div>

          <div className="btn-calculate flex space-x-4 mt-6">
            <button
              onClick={calculateFD}
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
            {interestEarned && (
              <div className="mt-2">
                <div><b>Total Interest Earned:</b> ₹{interestEarned}</div>
                <div><b>Total Maturity Amount:</b> ₹{maturityAmount}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;
