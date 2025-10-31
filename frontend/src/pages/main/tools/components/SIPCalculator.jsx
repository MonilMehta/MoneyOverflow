import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const SIPCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [years, setYears] = useState('');
  const [returnRate, setReturnRate] = useState('');
  const [total, setTotal] = useState('₹00.00');
  const [wealthGained, setWealthGained] = useState('₹00.00');
  const [maturityValue, setMaturityValue] = useState('₹00.00');
  const [currency, setCurrency] = useState('₹');
  const [mode, setMode] = useState('SIP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  const calculateResult = () => {
    let amount = parseInt(investment.replace(/,/g, '')) || 0;
    let duration = parseInt(years) || 0;
    let rate = parseInt(returnRate) || 0;

    if (amount <= 0 || duration <= 0 || rate <= 0) {
      setError('Please enter valid values for all fields.');
      setTotal('₹00.00');
      setWealthGained('₹00.00');
      setMaturityValue('₹00.00');
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
      let wealthGainedCalc = 0;
      let totalInvested = 0;

      if (mode === 'SIP') {
        wealthGainedCalc = Math.round(
          ((Math.pow(1 + (Math.pow(1 + rate / 100, 1 / 12) - 1), duration * 12) - 1) /
            (Math.pow(1 + rate / 100, 1 / 12) - 1)) *
            amount
        );
        totalInvested = amount * 12 * duration;
      } else {
        wealthGainedCalc = Math.round(Math.pow(1 + rate / 100, duration) * amount);
        totalInvested = amount;
      }

      const maturity = wealthGainedCalc - totalInvested;
      setTotal(`${currency}${totalInvested.toLocaleString()}`);
      setWealthGained(`${currency}${wealthGainedCalc.toLocaleString()}`);
      setMaturityValue(`${currency}${maturity.toLocaleString()}`);
      setLoading(false);

      // Get AI Analysis
      getAIAnalysis(totalInvested, wealthGainedCalc, maturity, mode, amount, duration, rate);
    }, 1500);
  };

  const getAIAnalysis = async (totalInvested, wealthGained, maturity, mode, monthlyAmount, duration, returnRate) => {
    setIsLoadingAnalysis(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Quick analysis of this SIP investment (respond in exactly 4 lines):
Investment: ₹${monthlyAmount}/month for ${duration} years at ${returnRate}% return
Total Invested: ₹${totalInvested.toLocaleString()} → Final Amount: ₹${wealthGained.toLocaleString()}

Give exactly 4 points: 1) Return quality 2) Risk level 3) One improvement tip 4) Tax benefit`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setAiAnalysis(text);
    } catch (error) {
      console.error("Error getting AI analysis:", error);
      setAiAnalysis("Unable to generate analysis at this time. Please refresh and try again.");
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const clearFields = () => {
    setInvestment('');
    setYears('');
    setReturnRate('');
    setTotal('₹00.00');
    setWealthGained('₹00.00');
    setMaturityValue('₹00.00');
    setError('');
    setLoading(false);
    setAiAnalysis('');
    setIsLoadingAnalysis(false);
  };

  const currencyChange = (e) => {
    setCurrency(e.target.value);
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
            <span className="block italic">MUTUAL</span>
            <span className="block text-[#ff5722] italic">FUND</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-xl font-medium">
            Calculate the potential returns of your investments through SIP or LumpSum.
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-black text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold">
              Investment Calculator
            </div>
            <div className="text-xl sm:text-2xl">*</div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div 
          className="rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 sm:hover:-translate-y-2"
          style={{
            backgroundColor: "#ff5722",
            color: "#000000",
            border: "2px solid #ff7043",
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="p-4 sm:p-6 relative">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase mb-3 sm:mb-4 text-center">Mutual Fund Investment Calculator</h3>
            <p className="text-black/80 mb-4 sm:mb-6 text-center font-medium text-sm sm:text-base">
              The Mutual Fund Investment Calculator helps you estimate the potential returns of your investments.
            </p>
            
            <div className="page-container">
              {/* Mode Selection */}
              <div className="flex items-center mb-4 sm:mb-6 space-x-4 sm:space-x-6 justify-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="SIP"
                    id="SIP"
                    checked={mode === 'SIP'}
                    onChange={() => setMode('SIP')}
                    className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-black accent-black"
                  />
                  <label htmlFor='SIP' className="text-black ml-2 font-black tracking-wide uppercase text-xs sm:text-sm">SIP</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="LumpSum"
                    id="LumpSum"
                    checked={mode === 'LumpSum'}
                    onChange={() => setMode('LumpSum')}
                    className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-black accent-black"
                  />
                  <label htmlFor='LumpSum' className="text-black ml-2 font-black tracking-wide uppercase text-xs sm:text-sm">LumpSum</label>
                </div>
              </div>

              {/* Currency Selection */}
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                <label className="text-black font-black tracking-wide uppercase text-xs sm:text-sm sm:mr-4">Currency:</label>
                <select
                  className="form-select bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-lg sm:rounded-xl p-2 focus:ring-2 focus:ring-black/30 focus:border-black/40 font-bold text-sm sm:text-base w-full sm:w-auto"
                  onChange={currencyChange}
                  value={currency}
                >
                  <option value="₹">₹ INR</option>
                  <option value="$">$ USD</option>
                </select>
              </div>

              <div className="input-container space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor='investment' className="block text-black font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Monthly Investment:</label>
                  <input
                    type="number"
                    value={investment}
                    id='investment'
                    onChange={(e) => setInvestment(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold text-sm sm:text-base"
                    placeholder="Enter Investment Amount"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='years' className="block text-black font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Time Period (Years):</label>
                  <input
                    type="number"
                    value={years}
                    id='years'
                    onChange={(e) => setYears(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold text-sm sm:text-base"
                    placeholder="Enter Time Period"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='return' className="block text-black font-black mb-2 tracking-wide uppercase text-xs sm:text-sm">Expected Return Rate (%):</label>
                  <input
                    type="number"
                    value={returnRate}
                    id='return'
                    onChange={(e) => setReturnRate(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-lg sm:rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold text-sm sm:text-base"
                    placeholder="Enter Expected Return Rate"
                    required
                  />
                </div>
              </div>

              <div className="btn-calculate flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
                <button
                  onClick={calculateResult}
                  className="bg-black text-white font-black py-3 px-6 rounded-lg sm:rounded-xl hover:bg-gray-800 transition-colors duration-200 tracking-wide uppercase text-sm sm:text-base w-full sm:w-auto"
                >
                  Calculate →
                </button>
                <button
                  onClick={clearFields}
                  className="bg-transparent border-2 border-black text-black font-black py-3 px-6 rounded-lg sm:rounded-xl hover:bg-black hover:text-white transition-colors duration-200 tracking-wide uppercase text-sm sm:text-base w-full sm:w-auto"
                >
                  Clear
                </button>
              </div>

              <div 
                className="result-container bg-black/10 backdrop-blur-sm border-2 border-black/20 p-4 sm:p-6 mt-4 sm:mt-6 rounded-lg sm:rounded-xl relative" 
                style={{ minHeight: '180px', maxHeight: '220px' }}
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-black border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="text-black font-bold">
                    <div className="mb-3 sm:mb-4 text-lg sm:text-xl font-black tracking-wide uppercase">Result:</div>
                    {error && <div className="text-red-600 mb-3 sm:mb-4 font-black text-base sm:text-lg">{error}</div>}
                    <div className="mb-2 text-base sm:text-lg flex flex-col sm:flex-row sm:items-center">
                      <span className="font-black uppercase tracking-wide">Total Investment:</span> 
                      <span className="text-xl sm:text-2xl font-black sm:ml-2">{total}</span>
                    </div>
                    <div className="mb-2 text-base sm:text-lg flex flex-col sm:flex-row sm:items-center">
                      <span className="font-black uppercase tracking-wide">Wealth Gained:</span> 
                      <span className="text-xl sm:text-2xl font-black sm:ml-2">{wealthGained}</span>
                    </div>
                    <div className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center">
                      <span className="font-black uppercase tracking-wide">Maturity Value:</span> 
                      <span className="text-xl sm:text-2xl font-black sm:ml-2">{maturityValue}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Analysis Section */}
              {(aiAnalysis || isLoadingAnalysis) && (
                <div className="mt-6 bg-black/10 p-6 rounded-xl border-2 border-black/20 shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-black text-black tracking-wide uppercase">Investment Analysis</h3>
                  </div>
                  {isLoadingAnalysis ? (
                    <div className="flex items-center gap-3 text-black">
                      <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
                      <span className="font-bold">Analyzing your investment...</span>
                    </div>
                  ) : (
                    <div className="max-w-none">
                      <p className="text-black text-base sm:text-lg font-bold leading-relaxed whitespace-pre-line">{aiAnalysis}</p>
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

            {/* Decorative Elements */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-20">
              <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;