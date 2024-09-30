import React, { useState } from 'react';

const BillSplitCalculator = () => {
  const [billSubtotal, setBillSubtotal] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [totalBill, setTotalBill] = useState('₹00.00');
  const [billPerPerson, setBillPerPerson] = useState('₹00.00');

  const calculateBill = () => {
    const subtotal = parseFloat(billSubtotal);
    const tip = parseFloat(tipPercentage);
    const persons = parseInt(numberOfPersons);

    if (isNaN(subtotal) || isNaN(tip) || isNaN(persons) || persons <= 0) {
      alert('Please enter valid values.');
      return;
    }

    const totalTip = (subtotal * tip) / 100;
    const total = subtotal + totalTip;
    const perPerson = total / persons;

    setTotalBill(`₹${total.toFixed(2)}`);
    setBillPerPerson(`₹${perPerson.toFixed(2)}`);
  };

  const clearFields = () => {
    setBillSubtotal('');
    setTipPercentage('');
    setNumberOfPersons('');
    setTotalBill('₹00.00');
    setBillPerPerson('₹00.00');
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="header bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center">Split Bill Calculator</h3>
        <p className="text-gray-600 mb-6 text-center">
          Calculate how much each person should pay when splitting a bill, including tips. Enter the bill subtotal, desired tip percentage, and the number of people to split the bill.
        </p>

        <div className="know-more mb-4">
          <button className="know-more-btn bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Know More
          </button>
          <div className="know-more-content mt-2">
            <h6 className="font-semibold mb-1">Here's how it works:</h6>
            <ol className="list-decimal list-inside mb-2">
              <li><b>Bill Subtotal</b>: Enter the total amount of the bill before the tip.</li>
              <li><b>Tip Percentage</b>: Specify the percentage of the bill you would like to add as a tip.</li>
              <li><b>Number of Persons</b>: Enter the number of people who will be splitting the bill.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="page-container bg-white p-6 shadow-lg rounded-lg mt-5" id="SplitBillCalculator">
        <div className="input-container space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bill Subtotal:</label>
            <input
              type="number"
              value={billSubtotal}
              onChange={(e) => setBillSubtotal(e.target.value)}
              className="form-input block w-full border border-gray-300 rounded p-2"
              placeholder="Enter Bill Subtotal"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tip (%):</label>
            <input
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              className="form-input block w-full border border-gray-300 rounded p-2"
              placeholder="Enter Tip Percentage"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">No. of Persons:</label>
            <input
              type="number"
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(e.target.value)}
              className="form-input block w-full border border-gray-300 rounded p-2"
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

        {/* Result */}
        <div className="result-container bg-gray-100 p-4 mt-6 rounded-lg">
          <div className="text-gray-700 font-semibold">Result:</div>
          <div className="mt-2">
            <div><b>Total Bill:</b> {totalBill}</div>
            <div><b>Bill Per Person:</b> {billPerPerson}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSplitCalculator;
