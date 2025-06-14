import React, { useState } from 'react';

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

    if (isNaN(loan) || isNaN(interest) || isNaN(tenure) || loan <= 0 || interest <= 0 || tenure <= 0) {
      setError('Please enter valid positive values.');
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
    <div className="bg-[#f6f6f6] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden min-h-screen">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '20px 20px sm:30px sm:30px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 10}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-dotted border-black"
            style={{ top: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-6 sm:mb-10 text-left">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">EMI</span>
            <span className="block text-[#000000] italic">CALCULATOR</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-xl font-medium">
            Calculate your EMI, total payment, and interest for your loan with precision.
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-black text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold">
              EMI Calculator
            </div>
            <div className="text-xl sm:text-2xl">*</div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div 
          className="rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 sm:hover:-translate-y-2"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            border: "2px solid #333333",
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="p-4 sm:p-6 relative">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase mb-3 sm:mb-4 text-center">EMI Calculator</h3>
            <p className="text-white/80 mb-4 sm:mb-6 text-center font-medium text-sm sm:text-base">
              Calculate your EMI, total payment, and interest for your loan.
            </p>
            
            <div className="page-container">
              <div className="input-container space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor='loan' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Loan Amount (INR):</label>
                  <input
                    type="number"
                    value={loanAmount}
                    id='loan'
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter loan amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='inte' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Interest Rate (%):</label>
                  <input
                    type="number"
                    value={interestRate}
                    id='inte'
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter annual interest rate"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='loa' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Loan Tenure (Months):</label>
                  <input
                    type="number"
                    value={loanTenure}
                    id='loa'
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter loan tenure in months"
                    required
                  />
                </div>
              </div>

              <div className="btn-calculate flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
                <button
                  onClick={calculateEMI}
                  className="bg-white text-black font-black py-3 px-6 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors duration-200 tracking-wide uppercase text-sm sm:text-base w-full sm:w-auto"
                >
                  Calculate →
                </button>
                <button
                  onClick={clearAll}
                  className="bg-transparent border-2 border-white text-white font-black py-3 px-6 rounded-lg sm:rounded-xl hover:bg-white hover:text-black transition-colors duration-200 tracking-wide uppercase text-sm sm:text-base w-full sm:w-auto"
                >
                  Clear
                </button>
              </div>

              <div 
                className="result-container bg-white/10 backdrop-blur-sm border-2 border-white/20 p-4 sm:p-6 mt-4 sm:mt-6 rounded-lg sm:rounded-xl relative" 
                style={{ minHeight: '160px', maxHeight: '200px' }}
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-white border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="text-white font-bold">
                    <div className="mb-3 sm:mb-4 text-lg sm:text-xl font-black tracking-wide uppercase">Result:</div>
                    {error && <div className="text-red-400 mb-3 sm:mb-4 font-black text-base sm:text-lg">{error}</div>}
                    {monthlyEMI && (
                      <div className="mb-2 text-base sm:text-lg flex flex-col sm:flex-row sm:items-center">
                        <span className="font-black uppercase tracking-wide">Monthly EMI:</span> 
                        <span className="text-xl sm:text-2xl font-black sm:ml-2">INR {monthlyEMI}</span>
                      </div>
                    )}
                    {totalPayment && (
                      <div className="mb-2 text-base sm:text-lg flex flex-col sm:flex-row sm:items-center">
                        <span className="font-black uppercase tracking-wide">Total Payment:</span> 
                        <span className="text-xl sm:text-2xl font-black sm:ml-2">INR {totalPayment}</span>
                      </div>
                    )}
                    {totalInterestPaid && (
                      <div className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center">
                        <span className="font-black uppercase tracking-wide">Total Interest:</span> 
                        <span className="text-xl sm:text-2xl font-black sm:ml-2">INR {totalInterestPaid}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg sm:rounded-xl opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                      backgroundSize: '8px 8px sm:10px sm:10px',
                      backgroundPosition: '0 0, 0 4px sm:0 5px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-20">
              <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;