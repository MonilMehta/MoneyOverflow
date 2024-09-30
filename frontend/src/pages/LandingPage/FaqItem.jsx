import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg cursor-pointer" onClick={toggleAnswer} style={{width:'100%'}}>
      <div className="px-4 py-5 sm:p-6" style={{width:'100%'}}>
      <div className="mt-1 text-xl text-gray-500 flex " style={{width:'60vw'}}>
        <h3 className="text-3xl leading-6 font-medium text-gray-900" >
          {question}
        </h3>
        <p className="ml-auto" >{isOpen ? '-' : '+'}</p>
        </div>
        {isOpen && (
          <div className="mt-2 text-2xl text-gray-500" style={{width:'60vw'}}>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQItem;