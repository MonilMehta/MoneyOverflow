import React, { useState } from 'react';
import tools2 from "../../../../assets/tools2.gif";
import tools3 from "../../../../assets/tools3.gif";

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
    <div className="container mx-auto">
      <div className="header bg-white p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">Split Bill Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          Calculate how much each person should pay when splitting a bill, including tips.
        </p>
        <div className="page-container bg-white">
          <div className="input-container space-y-4">
            <div>
              <label htmlFor='bill' className="block text-gray-700 font-semibold mb-1">Bill Subtotal:</label>
              <input
                type="number"
                value={billSubtotal}
                id='bill'
                onChange={(e) => setBillSubtotal(e.target.value)}
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                placeholder="Enter Bill Subtotal"
                required
              />
            </div>
            <div>
              <label htmlFor='perce' className="block text-gray-700 font-semibold mb-1">Tip (%):</label>
              <input
                type="number"
                value={tipPercentage}
                id='perce'
                onChange={(e) => setTipPercentage(e.target.value)}
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                placeholder="Enter Tip Percentage"
                required
              />
            </div>
            <div>
              <label htmlFor='numb' className="block text-gray-700 font-semibold mb-1">No. of Persons:</label>
              <input
                type="number"
                value={numberOfPersons}
                id='numb'
                onChange={(e) => setNumberOfPersons(e.target.value)}
                className="form-input block w-full border border-blue-500 rounded-xl p-2"
                placeholder="Enter No. of Persons"
                required
              />
            </div>
          </div>

          <div className="btn-calculate flex space-x-4 mt-6">
            <button
              onClick={calculateBill}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            <button
              onClick={clearFields}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>

          <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg" style={{ minHeight: '200px', maxHeight: '200px' }}>
            {loading ? (
              <img src={error ? tools3 : tools2} alt="Loading" className="mx-auto h-40" />
            ) : (
              <div className="text-gray-700 font-semibold">
                <div className="mb-2">Result:</div>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <div><b>Total Bill:</b> {totalBill}</div>
                <div><b>Bill Per Person:</b> {billPerPerson}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSplitCalculator;
