import React, { useState } from 'react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterestPaid, setTotalInterestPaid] = useState('');

  const calculateEMI = () => {
    const loan = parseFloat(loanAmount);
    const interest = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    if (isNaN(loan) || isNaN(interest) || isNaN(tenure)) {
      alert('Please enter valid input values.');
      return;
    }

    // Calculate monthly interest rate
    const monthlyInterestRate = (interest / 12) / 100;

    // Calculate EMI
    const emi = loan * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);

    // Calculate total payment
    const totalPay = emi * tenure;

    // Calculate total interest paid
    const totalInterest = totalPay - loan;

    // Update state with results
    setMonthlyEMI(emi.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterestPaid(totalInterest.toFixed(2));
  };

  const clearAll = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setMonthlyEMI('');
    setTotalPayment('');
    setTotalInterestPaid('');
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="header bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">EMI Calculator</h3>
        <p className="text-gray-600 mb-6">
          The EMI (Equated Monthly Installment) Calculator assists in calculating the monthly installment amount for a loan based on the loan amount, interest rate, and loan tenure.
          It provides insights into the total payment and total interest paid over the loan period, helping you plan your finances better.
        </p>

        <div className="know-more mb-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Know More</button>
          <div className="bg-gray-100 p-4 mt-4 rounded-lg">
            <h6 className="text-left mb-2">Here's how it works:</h6>
            <ol className="list-decimal pl-8">
              <li><b>Loan Amount</b>: Enter the principal amount of the loan.</li>
              <li><b>Interest Rate</b>: Specify the annual interest rate.</li>
              <li><b>Loan Tenure (years)</b>: Enter the loan period in years.</li>
              <li><b>Calculate EMI</b>: Provides the monthly EMI, total payment, and total interest.</li>
            </ol>
          </div>
        </div>

        {/* Input Fields */}
        <div className="page-container bg-white p-6 shadow-lg rounded-lg">
          <div className="input-container space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Loan Amount (INR)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Interest Rate (%)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Loan Tenure (Months)</label>
              <input
                className="form-input block w-full border border-gray-300 rounded p-2"
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
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
          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg">
            <div className="text-gray-700 font-semibold">Result:</div>
            <div className="mt-2">
              <div className="mb-2"><b>Monthly EMI:</b> {monthlyEMI && `INR ${monthlyEMI}`}</div>
              <div className="mb-2"><b>Total Payment:</b> {totalPayment && `INR ${totalPayment}`}</div>
              <div><b>Total Interest Paid:</b> {totalInterestPaid && `INR ${totalInterestPaid}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
