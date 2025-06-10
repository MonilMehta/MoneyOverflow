import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const UserTestimonial = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "John Doe", text: "MoneyOverflow changed my financial life. I've never felt more in control of my finances!" },
    { name: "Jane Smith", text: "The courses are so easy to understand. I finally feel confident about investing." },
    { name: "Mike Johnson", text: "Thanks to MoneyOverflow, I've paid off my debts and started saving for retirement." },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">What Our Users Say</h2>
        <div className="relative bg-indigo-600 rounded-lg shadow-xl p-8">
          <div className="text-white text-center">
            <p className="text-xl italic mb-4">"{testimonials[currentTestimonial].text}"</p>
            <p className="font-semibold">- {testimonials[currentTestimonial].name}</p>
          </div>
          <button onClick={prevTestimonial} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-indigo-600 hover:bg-indigo-100">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={nextTestimonial} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-indigo-600 hover:bg-indigo-100">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
  )
}

export default UserTestimonial
