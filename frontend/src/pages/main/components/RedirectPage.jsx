import React from 'react';

export default function RedirectPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle, #000 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px md:30px md:30px',
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

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#000000] leading-tight mb-6 sm:mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">MONEY</span>
            <span className="block text-[#ff5722] italic">OVERFLOW</span>
          </h1>
           
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-8 sm:mb-12 max-w-sm sm:max-w-lg mx-auto px-2">
            Redirecting you to continue your financial learning journey
          </p>
           
          {/* Status Badge */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold">
              LOADING
            </div>
            <div className="text-2xl sm:text-3xl hidden sm:block">*</div>
          </div>
           
          {/* Loading Animation */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="flex space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ff5722] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ff5722] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ff5722] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
       
      {/* Floating Elements - Desktop Only */}
      <div className="hidden md:block absolute top-20 left-20 opacity-30">
        <div className="w-12 h-12 border-2 border-[#ff5722] rounded-full"></div>
      </div>
      <div className="hidden md:block absolute top-40 right-32 opacity-20">
        <div className="w-6 h-6 bg-black rounded-full"></div>
      </div>
      <div className="hidden lg:block absolute bottom-32 left-40 opacity-25">
        <div className="w-8 h-8 border-2 border-dotted border-gray-400 rounded"></div>
      </div>
      <div className="hidden md:block absolute bottom-20 right-20 opacity-30">
        <div className="w-10 h-10 border-2 border-[#ff5722] rotate-45"></div>
      </div>

      {/* Mobile Floating Elements */}
      <div className="md:hidden absolute top-16 right-8 opacity-25">
        <div className="w-6 h-6 border border-[#ff5722] rounded-full"></div>
      </div>
      <div className="md:hidden absolute bottom-24 left-8 opacity-20">
        <div className="w-4 h-4 bg-[#ff5722] rounded-full"></div>
      </div>
      <div className="md:hidden absolute top-1/3 left-4 opacity-15">
        <div className="w-5 h-5 border border-dotted border-gray-400 rotate-45"></div>
      </div>
    </div>
  );
}