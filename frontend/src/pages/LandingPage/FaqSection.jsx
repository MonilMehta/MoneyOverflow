import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle, colorIndex }) => {
  const cardColors = [
    { bg: "#ff5722", text: "#000000", accent: "#ff7043", button: "#ffffff" },
    { bg: "#e8ddd4", text: "#000000", accent: "#d7c4b0", button: "#000000" },
    { bg: "#000000", text: "#ffffff", accent: "#333333", button: "#ff5722" },
  ];

  const colors = cardColors[colorIndex % cardColors.length];

  return (
    <div 
      className="border-2 rounded-xl overflow-hidden transition-all duration-500 ease-out hover:transform hover:-translate-y-1 hover:shadow-xl relative group"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.accent
      }}
    >
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none transition-opacity duration-300 group-hover:opacity-10"
        style={{
          backgroundImage: `linear-gradient(45deg, currentColor 25%, transparent 25%), 
                           linear-gradient(-45deg, currentColor 25%, transparent 25%)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px'
        }}
      />
      
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 lg:p-8 text-left relative z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 group active:scale-95 transition-transform duration-150"
      >
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-sm md:text-lg lg:text-xl font-bold uppercase tracking-wide flex-1 group-hover:opacity-80 transition-opacity duration-300 leading-tight pr-2">
            {question}
          </h3>
          <div 
            className="flex-shrink-0 p-2 rounded-lg transition-all duration-500 ease-out transform group-hover:scale-110 active:scale-95"
            style={{
              backgroundColor: colors.button,
              color: colors.button === "#ffffff" ? "#000000" : "#ffffff"
            }}
          >
            <div className={`transition-transform duration-500 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </div>
          </div>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-700 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 relative z-10">
          <div 
            className="inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase mb-3 tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.button,
              color: colors.button === "#ffffff" ? "#000000" : "#ffffff"
            }}
          >
            Answer
          </div>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90 transition-opacity duration-300">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    { 
      question: "What is MoneyOverflow?", 
      answer: "MoneyOverflow is a comprehensive financial literacy platform designed to help individuals make smarter financial decisions through interactive learning modules, expert resources, and community support." 
    },
    { 
      question: "Is MoneyOverflow suitable for beginners?", 
      answer: "Absolutely! MoneyOverflow caters to all levels of financial knowledge, from complete beginners to those looking to refine their skills." 
    },
    { 
      question: "How much does it cost to use MoneyOverflow?", 
      answer: "We offer a range of pricing options, including a free tier with basic features. Check our pricing page for more details on our premium plans." 
    },
    { 
      question: "How do I get started with MoneyOverflow?", 
      answer: "Getting started is easy! Simply create your free account, complete our financial assessment quiz, and we'll recommend personalized learning paths based on your goals and current knowledge level." 
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 md:opacity-20 transition-opacity duration-1000"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '15px 15px',
          backgroundPosition: '0 0'
        }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`mb-8 md:mb-12 lg:mb-16 text-center sm:text-left px-2 sm:px-6 md:px-8 lg:px-12 transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none text-black mb-3 md:mb-4">
            <span className={`block italic transition-all duration-800 ease-out ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              FREQUENTLY
            </span>
            <span className={`block text-orange-600 italic transition-all duration-800 ease-out delay-200 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              ASKED QUESTIONS
            </span>
          </h1>
          <p className={`text-sm md:text-lg text-gray-600 max-w-3xl font-medium mb-4 md:mb-6 leading-relaxed transition-all duration-800 ease-out delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Find answers to common questions about MoneyOverflow and how we can help transform your financial future.
          </p>
          <div className={`flex items-center justify-center sm:justify-start gap-3 transition-all duration-800 ease-out delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-black text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              Help Center
            </div>
            <div className="text-xl md:text-3xl font-bold animate-pulse">*</div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="px-2 sm:px-6 md:px-8 lg:px-12 space-y-4 md:space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`transition-all duration-800 ease-out ${
                isLoaded 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${800 + (index * 150)}ms`
              }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                colorIndex={index}
              />
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className={`mt-8 md:mt-12 lg:mt-16 px-2 sm:px-6 md:px-8 lg:px-12 text-center transition-all duration-800 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: `${800 + (faqs.length * 150) + 200}ms`
        }}>
          <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden p-6 md:p-8 lg:p-12 relative group transition-all duration-500 hover:shadow-xl hover:border-orange-300 hover:scale-105">
            {/* Pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none transition-opacity duration-300 group-hover:opacity-10"
              style={{
                backgroundImage: `linear-gradient(45deg, #000000 25%, transparent 25%), 
                                 linear-gradient(-45deg, #000000 25%, transparent 25%)`,
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px'
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-black mb-3 md:mb-4 transition-all duration-300 group-hover:text-orange-600">
                Still Have Questions?
              </h3>
              <p className="text-gray-700 font-bold mb-4 md:mb-6 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Our support team is here to help you succeed on your financial journey.
              </p>
              <div className="bg-orange-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg inline-flex items-center gap-2 md:gap-3 transition-all duration-300 hover:bg-orange-700 hover:scale-105 cursor-pointer active:scale-95 flex-wrap justify-center">
                <Mail className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
                <span className="text-xs md:text-lg font-bold break-all">moneyoverflow01@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;