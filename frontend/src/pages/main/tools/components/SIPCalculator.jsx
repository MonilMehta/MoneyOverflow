import React, { useState } from 'react';

const SIPCalculator = () => {
  const [investment, setInvestment] = useState('');
  const [years, setYears] = useState('');
  const [returnRate, setReturnRate] = useState('');
  const [total, setTotal] = useState('');
  const [wealthGained, setWealthGained] = useState('');
  const [maturityValue, setMaturityValue] = useState('');
  const [currency, setCurrency] = useState('Rs');
  const [mode, setMode] = useState('SIP');

  const calculateResult = () => {
    let amount = parseInt(investment.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive investment amount.');
      return;
    }
    let duration = parseInt(years);
    if (isNaN(duration) || duration <= 0) {
      alert('Please enter a valid positive number of years.');
      return;
    }
    let rate = parseInt(returnRate);
    if (isNaN(rate) || rate <= 0) {
      alert('Please enter a valid positive return rate.');
      return;
    }

    let wealthGained = 0;
    let totalInvested = 0;
    if (mode === 'SIP') {
      wealthGained = Math.round(
        ((Math.pow(1 + (Math.pow(1 + rate / 100, 1 / 12) - 1), duration * 12) -
          1) /
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
  };

  const clearAll = () => {
    setInvestment('');
    setYears('');
    setReturnRate('');
    setTotal('');
    setWealthGained('');
    setMaturityValue('');
  };

  const currencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Mutual Fund Investment Calculator</h3>
        <p className="text-gray-600 mb-6">
          The Mutual Fund Investment Calculator helps you estimate the potential returns of your investments, whether through Systematic Investment Plans (SIP) or LumpSum investments.
        </p>

        {/* Radio buttons and currency selector */}
        <div className="flex items-center mb-6 space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              value="SIP"
              checked={mode === 'SIP'}
              onChange={() => setMode('SIP')}
              className="mr-2"
            />
            <label className="text-gray-700">SIP</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="LumpSum"
              checked={mode === 'LumpSum'}
              onChange={() => setMode('LumpSum')}
              className="mr-2"
            />
            <label className="text-gray-700">LumpSum</label>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Currency</label>
            <select
              className="form-select block w-32 rounded border border-gray-300 p-2"
              onChange={currencyChange}
              value={currency}
            >
              <option value="Rs">&#8377; INR</option>
              <option value="$">&#128176; USD</option>
            </select>
          </div>
        </div>

        {/* Input fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Monthly Investment</label>
          <input
            className="form-input block w-full border border-gray-300 rounded p-2"
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Time Period (years)</label>
          <input
            className="form-input block w-full border border-gray-300 rounded p-2"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Expected Return Rate (p.a.)</label>
          <input
            className="form-input block w-full border border-gray-300 rounded p-2"
            type="number"
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={calculateResult}
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

        {/* Results */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Result:</h4>
          <div className="mb-2">Monthly Investment for {mode} - {currency} {investment}</div>
          <div className="mb-2">Number of Years: {years} Years</div>
          <div className="mb-2">Expected Rate of Return: {returnRate}%</div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="mb-2">Total Investment: {currency} {total}</div>
          <div className="mb-2">Wealth Gained: {currency} {wealthGained}</div>
          <div>Maturity Value: {currency} {maturityValue}</div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
