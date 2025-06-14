import React from 'react';
import { BookOpen, TrendingUp, Target, CheckCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import displayRazorPay from './razorpay';
import { useState, useEffect } from 'react';

const FinancialLiteracyPlans = () => {
   const [isVisible, setIsVisible] = useState(false);
    const [cardsVisible, setCardsVisible] = useState([false, false, false]);

  const plans = [
    {
      title: "Basic Learner",
      price: "Free",
      description: "Start your financial literacy journey",
      features: [
        "Access to foundational modules",
        "Basic budgeting tools",
        "Community forum access",
        "Weekly financial tips"
      ],
      icon: BookOpen
    },
    {
      title: "Smart Saver",
      price: 3000, // Price in INR (Rupees)
      description: "Enhance your financial knowledge",
      features: [
        "All Basic Learner features",
        "Advanced saving strategies",
        "Personalized learning path",
        "Monthly webinars with experts",
        "Investment basics course"
      ],
      icon: TrendingUp
    },
    {
      title: "Financial Master",
      price: 6000, // Price in INR (Rupees)
      description: "Comprehensive financial empowerment",
      features: [
        "All Smart Saver features",
        "AI-powered financial advisor",
        "Advanced investment simulations",
        "Retirement planning tools",
        "1-on-1 coaching sessions"
      ],
      icon: Target
    }
  ];

  const selectedColors = [
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
    }
  ];

  const handlePayment = (plan) => {
    if (plan.price === "Free") {
      navigate('/main');
    } else {
      displayRazorPay(plan.price);
    }
  };
    
    useEffect(() => {
      // Trigger animations on mount
      const timer1 = setTimeout(() => setIsVisible(true), 200);
      
      // Stagger card animations
      const timer2 = setTimeout(() => {
        setCardsVisible([true, false, false]);
      }, 600);
      
      const timer3 = setTimeout(() => {
        setCardsVisible([true, true, false]);
      }, 900);
      
      const timer4 = setTimeout(() => {
        setCardsVisible([true, true, true]);
      }, 1200);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }, []);
    
    const navigate = useNavigate();

  return (
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Dotted Grid Background */}
     <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0',
              animation: 'drift 20s ease-in-out infinite alternate'
            }}
          />
        </div>
      
      {/* Background Lines */}
       <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute h-full border-l border-dotted border-black transition-all duration-1000 ease-in-out"
              style={{ 
                left: `${i * 10}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'fadeInUp 2s ease-out forwards'
              }} 
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute w-full border-t border-dotted border-black transition-all duration-1000 ease-in-out"
              style={{ 
                top: `${i * 12.5}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'fadeInLeft 2s ease-out forwards'
              }} 
            />
          ))}
        </div>

      <div className="max-w-full mx-auto relative z-10">
                <div className="mb-10 text-left px-4 sm:px-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-[#000000] leading-tight mb-4 transition-all duration-1500 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="block">Empower Your</span>
              <span className="block text-[#ff5722] italic">Financial Future</span>
            </h1>
            <p className={`text-lg sm:text-xl text-gray-700 font-medium transition-all duration-1500 ease-out transform delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Choose the plan that fits your journey to financial literacy
            </p>
          </div>

        {/* Changed from grid-cols-1 to grid-cols-3 and adjusted gap */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8">
            {plans.map((plan, index) => {
              const colorScheme = selectedColors[index % selectedColors.length];
              const isOrange = colorScheme.bg === "#ff5722";
              const isBeige = colorScheme.bg === "#e8ddd4";
              const isBlack = colorScheme.bg === "#000000";
            return (
              <div 
                  key={index}
                  className={`rounded-[20px] overflow-hidden shadow-lg transition-all duration-1000 ease-out transform hover:-translate-y-4 hover:shadow-2xl hover:scale-105 w-full ${
                    cardsVisible[index] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif',
                    transitionDelay: `${index * 0.2}s`
                  }}
                >
                <div className="p-6 min-h-[500px] flex flex-col justify-between relative">
                    <div className="z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl font-black tracking-wide uppercase transition-all duration-500 group-hover:transform group-hover:scale-105">
                          {plan.title}
                        </h2>
                        <plan.icon className={`h-8 w-8 ${isBlack ? 'text-white' : 'text-black'} transition-all duration-700 group-hover:transform group-hover:rotate-12 group-hover:scale-110`} />
                      </div>
                      <p className={`text-2xl sm:text-3xl font-bold mb-4 ${isBlack ? 'text-white' : 'text-black'} transition-all duration-500 group-hover:transform group-hover:scale-105`}>
                        {plan.price === "Free" ? plan.price : `₹${plan.price}`}
                      </p>
                      <p className={`mb-6 ${isBlack ? 'text-white/80' : 'text-black/80'} transition-all duration-500`}>
                        {plan.description}
                      </p>
                    </div>

                     <div className="z-10 flex-1">
                                        <ul className="space-y-2">
                                          {plan.features.map((feature, idx) => (
                                            <li 
                                              key={idx} 
                                              className="flex items-center transition-all duration-500 hover:transform hover:translate-x-2"
                                              style={{ animationDelay: `${idx * 0.1}s` }}
                                            >
                                              <CheckCircle className={`h-5 w-5 mr-2 ${isBlack ? 'text-white' : 'text-black'} transition-all duration-500 hover:scale-110`} />
                                              <span className={`${isBlack ? 'text-white/80' : 'text-black/80'} text-sm sm:text-base`}>{feature}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                  <div className="z-10 mt-6">
                    <button 
                      onClick={() => handlePayment(plan)}
                     className={`w-full ${
                          isBlack ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
                        } py-3 rounded-xl font-bold transition-all duration-700 ease-out hover:transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95`}
                      >
                      Start Learning
                    </button>
                  </div>

                  {/* Background Pattern */}
                  {/* Animated Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 transition-all duration-1000 group-hover:opacity-10">
                      <div 
                        className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
                        style={{
                          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                          backgroundSize: '10px 10px',
                          backgroundPosition: '0 0, 0 5px'
                        }}
                      />
                    </div>
                </div>
              </div>
            );
          })}
        </div>

       <div className={`mt-12 text-center transition-all duration-1500 ease-out transform delay-1000 ${
                   isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                 }`}>
                   <div className="flex items-center justify-center gap-2 hover:transform hover:scale-105 transition-all duration-500">
                     <Users className="h-5 w-5 text-gray-700 transition-all duration-500 hover:text-[#ff5722]" />
                     <span className="font-semibold text-gray-700 transition-all duration-500 hover:text-[#ff5722]">10,000+ active learners</span>
                   </div>
                 </div>
      </div>
       <style jsx>{`
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
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes drift {
          from {
            transform: translateX(0px);
          }
          to {
            transform: translateX(10px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FinancialLiteracyPlans;
