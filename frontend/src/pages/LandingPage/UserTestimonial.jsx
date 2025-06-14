import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UserTestimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const testimonials = [
    { name: "Vivrant Mercant", text: "MoneyOverflow changed my financial life. I've never felt more in control of my finances!" },
    { name: "Rakesh Singh", text: "The courses are so easy to understand. I finally feel confident about investing." },
    { name: "Rahul Mehra", text: "Thanks to MoneyOverflow, I've paid off my debts and started saving for retirement." },
  ];

  const cardColors = [
    { bg: "#ff5722", text: "#000000", accent: "#ff7043", button: "#ffffff" },
    { bg: "#e8ddd4", text: "#000000", accent: "#d7c4b0", button: "#000000" },
    { bg: "#000000", text: "#ffffff", accent: "#333333", button: "#ff5722" },
  ];

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation every time component comes into view
        if (entry.isIntersecting) {
          setIsVisible(false); // Reset first
          setTimeout(() => setIsVisible(true), 50); // Then animate in
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of component is visible
        rootMargin: '-50px 0px' // Add some margin for better timing
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Handle manual navigation
  const handleManualNavigation = (direction) => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    if (direction === 'next') {
      nextTestimonial();
    } else {
      prevTestimonial();
    }
    
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  // Handle indicator click
  const handleIndicatorClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentTestimonial(index);
    
    // Resume auto-play after 8 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  return (
    <div 
      ref={componentRef}
      className={`bg-gray-100 min-h-screen py-16 px-4 md:px-8 relative overflow-hidden font-sans transition-all duration-[1800ms] ease-out ${
        isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-8'
      }`}
    >
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
        <div 
          className={`mb-16 text-left px-6 md:px-12 transition-all duration-[2000ms] ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}
          style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
        >
          <h1 className="text-6xl md:text-7xl font-black leading-none text-black mb-4">
            <span className="block italic">WHAT OUR</span>
            <span className="block text-orange-600 italic">USERS SAY</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl font-medium mb-4">
            Real stories from people who transformed their financial future with MoneyOverflow.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
              Verified Reviews
            </div>
            <div className="text-3xl font-bold">*</div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div 
          className={`relative px-6 md:px-12 transition-all duration-[1800ms] ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-16 scale-95'
          }`}
          style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}
        >
          <div 
            className="border-2 rounded-2xl p-8 md:p-12 h-80 md:h-96 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl w-full"
            style={{
              backgroundColor: cardColors[currentTestimonial].bg,
              color: cardColors[currentTestimonial].text,
              borderColor: cardColors[currentTestimonial].accent,
              backgroundImage: `linear-gradient(45deg, currentColor 25%, transparent 25%), 
                               linear-gradient(-45deg, currentColor 25%, transparent 25%)`,
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 5px',
              backgroundBlendMode: 'overlay'
            }}
          >
            {/* Subtle pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
              style={{
                backgroundImage: `linear-gradient(45deg, currentColor 25%, transparent 25%), 
                                 linear-gradient(-45deg, currentColor 25%, transparent 25%)`,
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px'
              }}
            />
            
            <div className="relative z-10">
              {/* Category Tag */}
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 tracking-wider"
                style={{
                  backgroundColor: cardColors[currentTestimonial].button,
                  color: cardColors[currentTestimonial].button === "#ffffff" ? "#000000" : "#ffffff"
                }}
              >
                USER STORY
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-2xl md:text-3xl font-bold leading-tight mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
            </div>
            
            <div className="relative z-10">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-md font-bold uppercase tracking-wider">
                    — {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-md font-bold uppercase tracking-wide mt-1">
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial Indicators */}
          <div 
            className={`flex justify-center mt-8 gap-2 transition-all duration-[1500ms] ease-out ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '0.9s' : '0s' }}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-orange-600 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTestimonial;