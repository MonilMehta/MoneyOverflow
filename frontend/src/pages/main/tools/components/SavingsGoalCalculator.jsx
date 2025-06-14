import React, { useState } from 'react';

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
        setResult(`You need to save INR ${monthlySavings.toFixed(2)} per month to reach your goal.`);
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
            <span className="block italic">SAVINGS</span>
            <span className="block text-[#000000] italic">CALCULATOR</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-xl font-medium">
            Calculate how much you need to save monthly to reach your financial goal considering interest.
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-black text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold">
              Smart Calculator
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
            <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase mb-3 sm:mb-4 text-center">Savings Goal Calculator</h3>
            <p className="text-white/80 mb-4 sm:mb-6 text-center font-medium text-sm sm:text-base">
              Calculate how much you need to save monthly to reach your financial goal.
            </p>
            
            <div className="page-container">
              <div className="input-container space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor='goal' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Savings Goal Amount (INR):</label>
                  <input
                    type="number"
                    value={goalAmount}
                    id='goal'
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter goal amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='curr' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Current Savings (INR):</label>
                  <input
                    type="number"
                    value={currentSavings}
                    id='curr'
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter current savings"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='tim' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Years to Goal:</label>
                  <input
                    type="number"
                    value={timeYears}
                    id='tim'
                    onChange={(e) => setTimeYears(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter time period in years"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='inter' className="block text-white font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Interest Rate (%):</label>
                  <input
                    type="number"
                    value={interestRate}
                    id='inter'
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-white/30 focus:border-white/40 placeholder-white/60 font-bold text-sm sm:text-base"
                    placeholder="Enter annual interest rate"
                    required
                  />
                </div>
              </div>

              <div className="btn-calculate flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
                <button
                  onClick={calculateSavings}
                  className="bg-white text-black font-black py-3 px-6 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors duration-200 tracking-wide uppercase text-sm sm:text-base w-full sm:w-auto"
                >
                  Calculate →
                </button>
                <button
                  onClick={clearSavings}
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
                    {result && !error && (
                      <div className="text-base sm:text-lg">
                        <span className="font-black uppercase tracking-wide block sm:inline">Monthly Savings Required:</span> 
                        <span className="text-xl sm:text-2xl font-black block mt-2 sm:inline sm:ml-2">{result}</span>
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

export default SavingsGoalCalculator;