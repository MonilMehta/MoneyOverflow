import React, { useState } from 'react';
import tools2 from "../../../../assets/tools2.gif";
import tools3 from "../../../../assets/tools3.gif";

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState('');
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState('');
  const [totalPeriod, setTotalPeriod] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateSWP = () => {
    let investment = parseFloat(totalInvestment) || 0;
    let withdrawal = parseFloat(withdrawalPerMonth) || 0;
    let returnRate = parseFloat(expectedReturnRate) || 0;
    let period = parseFloat(totalPeriod) || 0;

    if (investment <= 0 || withdrawal <= 0 || returnRate <= 0 || period <= 0) {
      setError('Please enter valid values for all fields.');
      setRemainingAmount('');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1500);
      return;
    }

    setLoading(true);
    setError('');
    setRemainingAmount('');

    setTimeout(() => {
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
      setLoading(false); 
    }, 1500);
  };

  const clearAll = () => {
    setTotalInvestment('');
    setWithdrawalPerMonth('');
    setExpectedReturnRate('');
    setTotalPeriod('');
    setRemainingAmount('');
    setError(''); 
    setLoading(false); 
  };

  return (
    <div className="container mx-auto">
      <div className="header bg-white pt-6 px-4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Systematic Withdrawal Plan Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          The SWP (Systematic Withdrawal Plan) calculator helps investors plan and manage regular withdrawals from their investment corpus, typically mutual funds, providing a steady income stream.
        </p>

        <div className="page-container bg-white">
          <div className="input-container space-y-4">
            <div>
              <label htmlFor='investment2' className="block text-gray-700 font-semibold mb-1">Total Investment (INR)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={totalInvestment}
                id='investment2'
                onChange={(e) => setTotalInvestment(e.target.value)}
                placeholder="Enter total investment amount"
              />
            </div>
            <div>
              <label htmlFor='withdraw' className="block text-gray-700 font-semibold mb-1">Withdrawal Per Month (INR)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={withdrawalPerMonth}
                id='withdraw'
                onChange={(e) => setWithdrawalPerMonth(e.target.value)}
                placeholder="Enter withdrawal per month"
              />
            </div>
            <div>
              <label htmlFor='return2' className="block text-gray-700 font-semibold mb-1">Expected Return Rate (p.a.)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={expectedReturnRate}
                id='return2'
                onChange={(e) => setExpectedReturnRate(e.target.value)}
                placeholder="Enter expected return rate"
              />
            </div>
            <div>
              <label htmlFor='period' className="block text-gray-700 font-semibold mb-1">Total Period (Years)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={totalPeriod}
                id='period'
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

          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg" style={{ minHeight: '200px', maxHeight: '200px' }}>
            {loading ? (
              <img src={error ? tools3 : tools2} alt="Loading" className="mx-auto h-40" />
            ) : (
              <div className="text-gray-700 font-semibold">
                <div className="mb-2">Result:</div>
                {error && (
                  <div className="text-red-600 mb-2">{error}</div>
                )}
                {remainingAmount && !error && (
                  <div><b>Remaining Amount:</b> ₹{remainingAmount}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;
