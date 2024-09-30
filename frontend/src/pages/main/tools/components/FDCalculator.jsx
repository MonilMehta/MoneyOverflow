import React, { useState } from 'react';
import tools2 from "../../../../assets/tools2.gif";
import tools3 from "../../../../assets/tools3.gif";

const FDCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [interestEarned, setInterestEarned] = useState('');
  const [maturityAmount, setMaturityAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateFD = () => {
    const principalAmount = parseFloat(principal);
    const interestRate = parseFloat(rate);
    const timePeriod = parseInt(years);

    if (isNaN(principalAmount) || isNaN(interestRate) || isNaN(timePeriod) || principalAmount <= 0 || interestRate <= 0 || timePeriod <= 0) {
      setError('Please enter valid values.');
      setInterestEarned('');
      setMaturityAmount('');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1500);
      return;
    }

    setLoading(true);
    setError('');
    setInterestEarned('');
    setMaturityAmount('');

    setTimeout(() => {
      const maturity = principalAmount * Math.pow((1 + interestRate / 100), timePeriod);
      const interest = maturity - principalAmount;

      setInterestEarned(interest.toFixed(2));
      setMaturityAmount(maturity.toFixed(2));
      setLoading(false);
    }, 1500);
  };

  const clearAll = () => {
    setPrincipal('');
    setRate('');
    setYears('');
    setInterestEarned('');
    setMaturityAmount('');
    setError('');
    setLoading(false);
  };

  return (
    <div className="container mx-auto">
      <div className="header bg-white pt-6 px-4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Fixed Deposit Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          The FD (Fixed Deposit) Calculator helps compute the maturity amount and interest earned on fixed deposits based on the principal, interest rate, and duration.
        </p>

        <div className="page-container bg-white">
          <div className="input-container space-y-4">
            <div>
              <label htmlFor='pri' className="block text-gray-700 font-semibold mb-1">Principal Amount (₹)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={principal}
                id='pri'
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter Principal Amount"
              />
            </div>
            <div>
              <label htmlFor='ra' className="block text-gray-700 font-semibold mb-1">Annual Interest Rate (%)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={rate}
                id='ra'
                step="0.01"
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter Annual Interest Rate"
              />
            </div>
            <div>
              <label htmlFor='per' className="block text-gray-700 font-semibold mb-1">Time Period (in years)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={years}
                id='per'
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

          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg" style={{ minHeight: '200px', maxHeight: '200px' }}>
            {loading ? (
              <img src={error ? tools3 : tools2} alt="Loading" className="mx-auto h-40" />
            ) : (
              <div className="text-gray-700 font-semibold">
                <div className="mb-2">Result:</div>
                {error && (
                  <div className="text-red-600 mb-2">{error}</div>
                )}
                {interestEarned && maturityAmount && !error && (
                  <div>
                    <div><b>Total Interest Earned:</b> ₹{interestEarned}</div>
                    <div><b>Total Maturity Amount:</b> ₹{maturityAmount}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;
