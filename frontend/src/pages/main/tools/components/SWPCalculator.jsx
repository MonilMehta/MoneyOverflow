import React, { useState } from 'react';

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState('');
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState('');
  const [expectedReturnRate, setExpectedReturnRate] = useState('');
  const [totalPeriod, setTotalPeriod] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('₹');

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

  const currencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden min-h-screen">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
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
        <div className="mb-10 text-left">
          <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">SYSTEMATIC</span>
            <span className="block text-[#f5f5f5] italic" style={{ textShadow: '2px 2px 0px #000000' }}>WITHDRAWAL</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
            Plan and manage regular withdrawals from your investment corpus for a steady income stream.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              SWP Calculator
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div 
          className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl"
          style={{
            backgroundColor: "#f5f5f5",
            color: "#000000",
            border: "2px solid #e0e0e0",
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="p-6 relative">
            <h3 className="text-2xl font-black tracking-tight uppercase mb-4 text-center">Systematic Withdrawal Plan Calculator</h3>
            <p className="text-black/80 mb-6 text-center font-medium">
              The SWP calculator helps investors plan and manage regular withdrawals from their investment corpus.
            </p>
            
            <div className="page-container">
              {/* Currency Selection */}
              <div className="flex items-center justify-center mb-6">
                <label className="text-black font-black tracking-wide uppercase text-sm mr-4">Currency:</label>
                <select
                  className="form-select bg-white/80 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-2 focus:ring-2 focus:ring-black/30 focus:border-black/40 font-bold"
                  onChange={currencyChange}
                  value={currency}
                >
                  <option value="₹">₹ INR</option>
                  <option value="$">$ USD</option>
                </select>
              </div>

              <div className="input-container space-y-4">
                <div>
                  <label htmlFor='investment2' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Total Investment:</label>
                  <input
                    type="number"
                    value={totalInvestment}
                    id='investment2'
                    onChange={(e) => setTotalInvestment(e.target.value)}
                    className="form-input block w-full bg-white/80 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter total investment amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='withdraw' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Withdrawal Per Month:</label>
                  <input
                    type="number"
                    value={withdrawalPerMonth}
                    id='withdraw'
                    onChange={(e) => setWithdrawalPerMonth(e.target.value)}
                    className="form-input block w-full bg-white/80 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter withdrawal per month"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='return2' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Expected Return Rate (%):</label>
                  <input
                    type="number"
                    value={expectedReturnRate}
                    id='return2'
                    onChange={(e) => setExpectedReturnRate(e.target.value)}
                    className="form-input block w-full bg-white/80 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter expected return rate"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='period' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Total Period (Years):</label>
                  <input
                    type="number"
                    value={totalPeriod}
                    id='period'
                    onChange={(e) => setTotalPeriod(e.target.value)}
                    className="form-input block w-full bg-white/80 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter time period in years"
                    required
                  />
                </div>
              </div>

              <div className="btn-calculate flex space-x-4 mt-6">
                <button
                  onClick={calculateSWP}
                  className="bg-black text-white font-black py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200 tracking-wide uppercase"
                >
                  Calculate →
                </button>
                <button
                  onClick={clearAll}
                  className="bg-transparent border-2 border-black text-black font-black py-3 px-6 rounded-xl hover:bg-black hover:text-white transition-colors duration-200 tracking-wide uppercase"
                >
                  Clear
                </button>
              </div>

              <div 
                className="result-container bg-black/10 backdrop-blur-sm border-2 border-black/20 p-6 mt-6 rounded-xl relative" 
                style={{ minHeight: '200px', maxHeight: '200px' }}
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="text-black font-bold">
                    <div className="mb-4 text-xl font-black tracking-wide uppercase">Result:</div>
                    {error && <div className="text-red-600 mb-4 font-black text-lg">{error}</div>}
                    {remainingAmount && !error && (
                      <div className="text-lg">
                        <span className="font-black uppercase tracking-wide">Remaining Amount:</span> 
                        <span className="text-2xl font-black ml-2">{currency}{parseFloat(remainingAmount).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-6 right-6 opacity-20">
              <div className="w-12 h-12 border-4 border-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;