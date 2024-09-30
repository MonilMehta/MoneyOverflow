import React, { useState } from 'react';
import tools2 from "../../../../assets/tools2.gif";
import tools3 from "../../../../assets/tools3.gif";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterestPaid, setTotalInterestPaid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateEMI = () => {
    const loan = parseFloat(loanAmount);
    const interest = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    if (isNaN(loan) || isNaN(interest) || isNaN(tenure)) {
      setError('Please enter valid input values.');
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
      const monthlyInterestRate = (interest / 12) / 100;
      const emi = loan * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);
      const totalPay = emi * tenure;
      const totalInterest = totalPay - loan;

      setMonthlyEMI(emi.toFixed(2));
      setTotalPayment(totalPay.toFixed(2));
      setTotalInterestPaid(totalInterest.toFixed(2));
      setLoading(false);
    }, 1500);
  };

  const clearAll = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setMonthlyEMI('');
    setTotalPayment('');
    setTotalInterestPaid('');
    setError('');
    setLoading(false);
  };

  return (
    <div className="container mx-auto">
      <div className="header bg-white p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">EMI Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          Calculate your EMI, total payment, and interest for your loan.
        </p>

        {/* Input Fields */}
        <div className="page-container bg-white">
          <div className="input-container space-y-4">
            <div>
              <label htmlFor='loan' className="block text-gray-700 font-semibold mb-1">Loan Amount (INR)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={loanAmount}
                id='loan'
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <label htmlFor='inte' className="block text-gray-700 font-semibold mb-1">Interest Rate (%)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={interestRate}
                id='inte'
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter annual interest rate"
              />
            </div>
            <div>
              <label htmlFor='loa' className="block text-gray-700 font-semibold mb-1">Loan Tenure (Months)</label>
              <input
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                type="number"
                value={loanTenure}
                id='loa'
                onChange={(e) => setLoanTenure(e.target.value)}
                placeholder="Enter loan tenure in months"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-calculate flex space-x-4 mt-6">
            <button
              onClick={calculateEMI}
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
          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg" style={{ minHeight: '200px', maxHeight: '200px' }}>
            {loading ? (
              <img src={error ? tools3 : tools2} alt="Loading" className="mx-auto h-40" />
            ) : (
              <div className="text-gray-700 font-semibold">
                <div className="mb-2">Result:</div>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                {monthlyEMI && <div className="mb-2"><b>Monthly EMI:</b> INR {monthlyEMI}</div>}
                {totalPayment && <div className="mb-2"><b>Total Payment:</b> INR {totalPayment}</div>}
                {totalInterestPaid && <div><b>Total Interest Paid:</b> INR {totalInterestPaid}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
