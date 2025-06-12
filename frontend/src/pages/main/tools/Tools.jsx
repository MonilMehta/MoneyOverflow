import React, { useState, useEffect } from "react";
import SIPCalculator from "./components/SIPCalculator";
import SWPCalculator from "./components/SWPCalculator";
import FDCalculator from "./components/FDCalculator";
import SavingsGoalCalculator from "./components/SavingsGoalCalculator";
import EMICalculator from "./components/EMICalculator";
import BillSplitCalculator from "./components/BillSplitCalculator";
import blogs1 from "../../../assets/blogs1.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tools = () => {
  const [showGif, setShowGif] = useState(true);
  const [bgColor, setBgColor] = useState("bg-[#ffffff]");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
      setBgColor("bg-[#ffffff]");
      setTimeout(() => {
        toast.info("Check out simulation for real time experience !", {toastId: 'tools'})
      }, 4000)
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-[#ffffff] font-sans relative overflow-hidden">
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: '#f5f5f5',
          color: '#000000',
          border: '2px solid #e0e0e0',
          fontWeight: 'bold'
        }}
      />
      
      
        <div className="relative z-10 w-full max-w-none px-8">
          {/* Header Section */}
          <div className="mb-10 text-left">
            <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="inline italic">FIN</span><span className="inline text-[#f5f5f5] italic" style={{ textShadow: '2px 2px 0px #000000' }}>TOOLS</span>
            </h2>
            <p className="text-lg text-gray-700 font-medium text-left">
              Comprehensive suite of financial calculators to help you make informed investment decisions.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-none">
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px'
                  }}
                />
              </div>
              <SIPCalculator />
            </div>
            
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px'
                  }}
                />
              </div>
              <SWPCalculator />
            </div>
            
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px'
                  }}
                />
              </div>
              <SavingsGoalCalculator />
            </div>
            
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px'
                  }}
                />
              </div>
              <FDCalculator />
            </div>
            
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px'
                  }}
                />
              </div>
              <EMICalculator />
            </div>
            
            <div className="bg-[#f5f5f5] rounded-2xl p-6 border-2 border-black/10 transition-transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px'
                  }}
                />
              </div>
              <BillSplitCalculator />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-6 right-6 opacity-20">
            <div className="w-16 h-16 border-4 border-black rounded-full"></div>
          </div>
          <div className="absolute top-1/4 left-6 opacity-10">
            <div className="w-8 h-8 border-2 border-black rotate-45"></div>
          </div>
        </div>
    </div>
  );
};

export default Tools;