import React, { useState } from 'react';

const BillSplitCalculator = () => {
  const [billSubtotal, setBillSubtotal] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [totalBill, setTotalBill] = useState('₹00.00');
  const [billPerPerson, setBillPerPerson] = useState('₹00.00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateBill = () => {
    const subtotal = parseFloat(billSubtotal);
    const tip = parseFloat(tipPercentage);
    const persons = parseInt(numberOfPersons);

    if (isNaN(subtotal) || isNaN(tip) || isNaN(persons) || persons <= 0) {
      setError('Please enter valid values.');
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
      const totalTip = (subtotal * tip) / 100;
      const total = subtotal + totalTip;
      const perPerson = total / persons;

      setTotalBill(`₹${total.toFixed(2)}`);
      setBillPerPerson(`₹${perPerson.toFixed(2)}`);
      setLoading(false);
    }, 1500);
  };

  const clearFields = () => {
    setBillSubtotal('');
    setTipPercentage('');
    setNumberOfPersons('');
    setTotalBill('₹00.00');
    setBillPerPerson('₹00.00');
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
            <span className="block italic">BILL</span>
            <span className="block text-[#ff5722] italic">SPLIT</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
            Calculate how much each person should pay when splitting a bill, including tips.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              Smart Calculator
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div 
          className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl"
          style={{
            backgroundColor: "#ff5722",
            color: "#000000",
            border: "2px solid #ff7043",
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="p-6 relative">
            <h3 className="text-2xl font-black tracking-tight uppercase mb-4 text-center">Split Bill Calculator</h3>
            <p className="text-black/80 mb-6 text-center font-medium">
              Calculate how much each person should pay when splitting a bill, including tips.
            </p>
            
            <div className="page-container">
              <div className="input-container space-y-4">
                <div>
                  <label htmlFor='bill' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Bill Subtotal:</label>
                  <input
                    type="number"
                    value={billSubtotal}
                    id='bill'
                    onChange={(e) => setBillSubtotal(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter Bill Subtotal"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='perce' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">Tip (%):</label>
                  <input
                    type="number"
                    value={tipPercentage}
                    id='perce'
                    onChange={(e) => setTipPercentage(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter Tip Percentage"
                    required
                  />
                </div>
                <div>
                  <label htmlFor='numb' className="block text-black font-black mb-2 tracking-wide uppercase text-sm">No. of Persons:</label>
                  <input
                    type="number"
                    value={numberOfPersons}
                    id='numb'
                    onChange={(e) => setNumberOfPersons(e.target.value)}
                    className="form-input block w-full bg-white/20 backdrop-blur-sm border-2 border-black/20 text-black rounded-xl p-3 focus:ring-2 focus:ring-black/30 focus:border-black/40 placeholder-black/60 font-bold"
                    placeholder="Enter No. of Persons"
                    required
                  />
                </div>
              </div>

              <div className="btn-calculate flex space-x-4 mt-6">
                <button
                  onClick={calculateBill}
                  className="bg-black text-white font-black py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200 tracking-wide uppercase"
                >
                  Calculate →
                </button>
                <button
                  onClick={clearFields}
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
                    <div className="mb-2 text-lg"><span className="font-black uppercase tracking-wide">Total Bill:</span> <span className="text-2xl font-black">{totalBill}</span></div>
                    <div className="text-lg"><span className="font-black uppercase tracking-wide">Bill Per Person:</span> <span className="text-2xl font-black">{billPerPerson}</span></div>
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

export default BillSplitCalculator;