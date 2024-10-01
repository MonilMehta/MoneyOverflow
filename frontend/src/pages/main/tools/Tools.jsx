import React, { useState, useEffect } from "react";
import SIPCalculator from "./components/SIPCalculator";
import SWPCalculator from "./components/SWPCalculator";
import FDCalculator from "./components/FDCalculator";
import SavingsGoalCalculator from "./components/SavingsGoalCalculator";
import EMICalculator from "./components/EMICalculator";
import BillSplitCalculator from "./components/BillSplitCalculator";
import tools1 from "../../../assets/tools1.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Tools = () => {
  const [showGif, setShowGif] = useState(true);
  const [bgColor, setBgColor] = useState("bg-white");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
      setBgColor("bg-gradient-to-r from-blue-500 to-blue-800");
      setTimeout(() => {
        toast.info("Check out simulation for real time experience !", {toastId: 'tools'})
      }, 4000)
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className={`p-6 min-h-screen flex items-center justify-center ${bgColor}`}>
      <ToastContainer/>
      {showGif ? (
        <img src={tools1} alt="Loading" className="w-[50%] h-auto" /> // Display GIF
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border-4 border-gradient-to-r from-indigo-400 to-indigo-600 transition-colors duration-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-pink-600 shadow-lg p-4">
            <SIPCalculator />
          </div>
          <div className="bg-white rounded-lg border-4 border-gradient-to-r from-indigo-400 to-indigo-600 transition-colors duration-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-pink-600 shadow-lg p-4">
            <SWPCalculator />
          </div>
          <div className="bg-white rounded-lg border-4 border-gradient-to-r from-indigo-400 to-indigo-600 transition-colors duration-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-pink-600 shadow-lg p-4">
            <FDCalculator />
          </div>
          <div className="bg-white rounded-lg border-4 border-gradient-to-r from-indigo-400 to-indigo-600 transition-colors duration-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-pink-600 shadow-lg p-4">
            <SavingsGoalCalculator />
          </div>
          <div className="bg-white rounded-lg border-4 border-gradient-to-r from-indigo-400 to-indigo-600 transition-colors duration-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-pink-600 shadow-lg p-4">
            <EMICalculator />
          </div>
          <div className="bg-white rounded-lg border-4 border-gradient-to-r from-indigo-400 to-indigo-600 transition-colors duration-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-pink-600 shadow-lg p-4">
            <BillSplitCalculator />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
