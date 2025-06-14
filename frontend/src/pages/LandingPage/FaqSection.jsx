import React, { useState } from 'react';
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
      className="border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg relative"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.accent
      }}
    >
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, currentColor 25%, transparent 25%), 
                           linear-gradient(-45deg, currentColor 25%, transparent 25%)`,
          backgroundSize: '10px 10px',
          backgroundPosition: '0 0, 0 5px'
        }}
      />
      
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 text-left relative z-10 focus:outline-none group"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide pr-4 group-hover:opacity-80 transition-opacity">
            {question}
          </h3>
          <div 
            className="flex-shrink-0 p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: colors.button,
              color: colors.button === "#ffffff" ? "#000000" : "#ffffff"
            }}
          >
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 relative z-10">
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-wider"
            style={{
              backgroundColor: colors.button,
              color: colors.button === "#ffffff" ? "#000000" : "#ffffff"
            }}
          >
            Answer
          </div>
          <p className="text-base md:text-lg leading-relaxed opacity-90">
            {answer}
          </p>
        </div>
      </div>
    </div>
   );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4 md:px-8 relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0'
        }}
      />
      
      <div className="relative z-10 w-full mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-left px-6 md:px-12">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-black mb-4">
            <span className="block italic">FREQUENTLY</span>
            <span className="block text-orange-600 italic">ASKED QUESTIONS</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl font-medium mb-4">
            Find answers to common questions about MoneyOverflow and how we can help transform your financial future.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
              Help Center
            </div>
            <div className="text-3xl font-bold">*</div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="px-6 md:px-12 space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              colorIndex={index}
            />
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="mt-16 px-6 md:px-12 text-center">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(45deg, #000000 25%, transparent 25%), 
                                 linear-gradient(-45deg, #000000 25%, transparent 25%)`,
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px'
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-black mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-700 font-bold mb-6 max-w-xl mx-auto">
                Our support team is here to help you succeed on your financial journey.
              </p>
              <div className="bg-orange-600 text-white px-6 py-4 rounded-lg inline-flex items-center gap-3">
                <Mail className="h-6 w-6" />
                <span className="text-lg font-bold">moneyoverflow01@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;