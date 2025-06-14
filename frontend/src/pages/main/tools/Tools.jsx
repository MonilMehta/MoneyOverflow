import React, { useState, useEffect } from "react";
import SIPCalculator from "./components/SIPCalculator";
import SWPCalculator from "./components/SWPCalculator";
import FDCalculator from "./components/FDCalculator";
import SavingsGoalCalculator from "./components/SavingsGoalCalculator";
import EMICalculator from "./components/EMICalculator";
import BillSplitCalculator from "./components/BillSplitCalculator";
import blogs1 from "../../../assets/blogs1.gif";


const Tools = () => {
  const [showGif, setShowGif] = useState(true);
  const [bgColor, setBgColor] = useState("bg-[#ffffff]");
  const [headerVisible, setHeaderVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());

  // Define the calculators array
  const calculators = [
    {
      component: <SIPCalculator />,
      title: "SIP Calculator"
    },
    {
      component: <SWPCalculator />,
      title: "SWP Calculator"
    },
    {
      component: <FDCalculator />,
      title: "FD Calculator"
    },
    {
      component: <SavingsGoalCalculator />,
      title: "Savings Goal"
    },
    {
      component: <EMICalculator />,
      title: "EMI Calculator"
    },
    {
      component: <BillSplitCalculator />,
      title: "Bill Split"
    }
  ];

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedCards((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    document.querySelectorAll('.tool-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
      setBgColor("bg-[#ffffff]");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Animation styles
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .header-animate {
      opacity: 0;
    }

    .header-animate.visible {
      animation: fadeInUp 0.8s ease forwards;
    }

    .tool-card {
      opacity: 0;
      transform: translateY(20px);
    }

    .tool-card.animated {
      animation: fadeInUp 0.6s ease forwards, scaleIn 0.6s ease forwards;
    }
  `;

  return (
    <div className="p-4 sm:p-6 min-h-screen flex items-center justify-center bg-[#ffffff] font-sans relative overflow-hidden">
      <style>{animationStyles}</style>

      {/* Background elements - hidden on mobile */}
      <div className="hidden sm:block">
        {/* ... existing background patterns ... */}
      </div>
      
      <div className="relative z-10 w-full max-w-none px-4 sm:px-8">
        {/* Header Section with Animations */}
        <div className="mb-6 sm:mb-10 text-left">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#000000] leading-tight mb-4" 
              style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className={`inline italic ${headerVisible ? 'animate-[fadeInLeft_0.8s_ease_forwards]' : 'opacity-0'}`}>
              FIN
            </span>
            <span className={`inline text-[#f5f5f5] italic ${headerVisible ? 'animate-[fadeInRight_0.8s_ease_forwards_0.2s]' : 'opacity-0'}`} 
                  style={{ textShadow: '2px 2px 0px #000000' }}>
              TOOLS
            </span>
          </h2>
          <p className={`text-base sm:text-lg text-gray-700 font-medium text-left ${
            headerVisible ? 'animate-[fadeInUp_0.8s_ease_forwards_0.4s]' : 'opacity-0'
          }`}>
            Comprehensive suite of financial calculators to help you make informed investment decisions.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-none">
          {calculators.map((calculator, index) => (
            <div
              key={index}
              data-index={index}
              className={`tool-card bg-[#f5f5f5] rounded-2xl p-4 sm:p-6 border-2 border-black/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden min-h-[400px] ${
                animatedCards.has(index.toString()) ? 'animated' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
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
              {calculator.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;