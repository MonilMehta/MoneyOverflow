import React, { useState } from 'react';

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
      setError('Please enter valid positive values.');
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
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
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
            <span className="block italic">FIXED</span>
            <span className="block text-[#f5f5f5] italic" style={{ textShadow: '2px 2px 0px #000000' }}>DEPOSIT</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
             Calculate your FD maturity amount and interest earned based on principal, rate, and duration.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              FD Calculator
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>
        {/* Main Calculator Card */}
        <div 
          className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl"
          style={{
            backgroundColor: "#e8ddd4",
            color: "#000000",
            border: "2px solid #d7c4b0",
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="p-6 relative">
            <h3 className="text-2xl font-black tracking-tight uppercase mb-4 text-center">Fixed Deposit Calculator</h3>
            <p className="text-black/80 mb-6 text-center font-medium">
              Calculate your FD maturity amount and interest earned based on principal, rate, and duration.
            </p>
            
            <div className="page-container">
              <div className="input-container space-y-4">
                <div>
                  <label htmlFor='pri' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Principal Amount (₹):</label>
                  <input
                    type="number"
                    value={principal}
                    id='pri'
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="form-input block w-full bg-white/40 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter Principal Amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='ra' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Annual Interest Rate (%):</label>
                  <input
                    type="number"
                    value={rate}
                    id='ra'
                    step="0.01"
                    onChange={(e) => setRate(e.target.value)}
                    className="form-input block w-full bg-white/40 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter Annual Interest Rate"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='per' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Time Period (Years):</label>
                  <input
                    type="number"
                    value={years}
                    id='per'
                    onChange={(e) => setYears(e.target.value)}
                    className="form-input block w-full bg-white/40 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter Time Period"
                    required
                  />
                </div>
              </div>

              <div className="btn-calculate flex space-x-4 mt-6">
                <button
                  onClick={calculateFD}
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
                    {interestEarned && maturityAmount && !error && (
                      <div className="space-y-2">
                        <div className="text-lg"><span className="font-black uppercase tracking-wide">Interest Earned:</span> <span className="text-2xl font-black">₹{interestEarned}</span></div>
                        <div className="text-lg"><span className="font-black uppercase tracking-wide">Maturity Amount:</span> <span className="text-2xl font-black">₹{maturityAmount}</span></div>
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

export default FDCalculator;