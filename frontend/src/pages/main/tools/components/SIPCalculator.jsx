import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import tools2 from "../../../../assets/tools2.gif";
import tools3 from "../../../../assets/tools3.gif";

const SIPCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [years, setYears] = useState('');
  const [returnRate, setReturnRate] = useState('');
  const [total, setTotal] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [currency, setCurrency] = useState('₹');
  const [mode, setMode] = useState('SIP');
  const [animation, setAnimation] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  const calculateResult = () => {
    let amount = parseInt(investment.replace(/,/g, '')) || 0;
    let duration = parseInt(years) || 0;
    let rate = parseInt(returnRate) || 0;

    if (amount <= 0 || duration <= 0 || rate <= 0) {
      setError('Please enter valid values for all fields.'); 
      setTotal(0);
      setWealthGained(0);
      setMaturityValue(0); 
      setLoading(true); 
      setTimeout(() => {
        setLoading(false);
        setError(''); 
      }, 1500);
      return;
    }

    setLoading(true);
    setError('');
    setTotal(0);
    setWealthGained(0);
    setMaturityValue(0);

    setTimeout(() => {
      let wealthGained = 0;
      let totalInvested = 0;

      if (mode === 'SIP') {
        wealthGained = Math.round(
          ((Math.pow(1 + (Math.pow(1 + rate / 100, 1 / 12) - 1), duration * 12) - 1) /
            (Math.pow(1 + rate / 100, 1 / 12) - 1)) *
            amount
        );
        totalInvested = amount * 12 * duration;
      } else {
        wealthGained = Math.round(Math.pow(1 + rate / 100, duration) * amount);
        totalInvested = amount;
      }

      const maturity = wealthGained - totalInvested;
      setTotal(totalInvested.toLocaleString());
      setWealthGained(wealthGained.toLocaleString());
      setMaturityValue(maturity.toLocaleString());
      setLoading(false); 
      setAnimation(true); 
      setTimeout(() => setAnimation(false), 500); 
    }, 1500); 
  };

  const clearAll = () => {
    setInvestment('');
    setYears('');
    setReturnRate('');
    setTotal(0);
    setWealthGained(0);
    setMaturityValue(0);
    setError('');
    setLoading(false);
  };

  const currencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white pt-6 px-4">
        <h3 className="text-2xl font-semibold text-center mb-4">Mutual Fund Investment Calculator</h3>
        <p className="text-gray-600 text-center mb-6">
          The Mutual Fund Investment Calculator helps you estimate the potential returns of your investments, whether through Systematic Investment Plans (SIP) or LumpSum investments.
        </p>

        <div className="flex items-center mb-6 space-x-6 justify-center">
          <div className="flex items-center">
            <input
              type="radio"
              value="SIP"
              id="SIP"
              checked={mode === 'SIP'}
              onChange={() => setMode('SIP')}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <label htmlFor='SIP' className="text-gray-700 ml-2">SIP</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="LumpSum"
              id="LumpSum"
              checked={mode === 'LumpSum'}
              onChange={() => setMode('LumpSum')}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <label htmlFor='LumpSum' className="text-gray-700 ml-2">LumpSum</label>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <label className="text-gray-700 mr-2">Currency</label>
          <select
            className="form-select block w-32 rounded-lg border border-blue-400 p-2"
            onChange={currencyChange}
            value={currency}
          >
            <option value="₹">₹ INR</option>
            <option value="$">$ USD</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor='investment' className="block text-gray-700 font-semibold mb-1">Monthly Investment</label>
          <input
            className="form-input block w-full border border-blue-400 rounded-xl p-2"
            type="number"
            value={investment}
            id='investment'
            onChange={(e) => setInvestment(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='years' className="block text-gray-700 font-semibold mb-1">Time Period (years)</label>
          <input
            className="form-input block w-full border border-blue-400 rounded-xl p-2"
            type="number"
            value={years}
            id='years'
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='return' className="block text-gray-700 font-semibold mb-1">Expected Return Rate (p.a.)</label>
          <input
            className="form-input block w-full border border-blue-400 rounded-xl p-2"
            type="number"
            value={returnRate}
            id='return'
            onChange={(e) => setReturnRate(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={calculateResult}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Calculate
          </button>
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Clear
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4" style={{ minHeight: '200px', maxHeight: '200px' }}>
          {loading ? (
            <img src={error ? tools3 : tools2} alt="Loading" className="mx-auto h-40" />
          ) : (
            <>
              {error ? (
                <div className="text-red-600 text-center">{error}</div>
              ) : (
                <motion.div 
                  className={`transition-transform duration-300 ${animation ? 'scale-105' : 'scale-100'}`}
                >
                  <h4 className="font-semibold mb-2">Result:</h4>
                  <div className="mb-2"> <b>Total Investment:</b> {currency} {total}</div>
                  <div className="mb-2"> <b>Wealth Gained:</b> {currency} {wealthGained}</div>
                  <div> <b>Maturity Value:</b> {currency} {maturityValue}</div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
