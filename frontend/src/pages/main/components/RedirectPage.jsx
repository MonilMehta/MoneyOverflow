import React from 'react';
import { Link } from "react-router-dom";

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

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="text-center max-w-2xl mx-auto px-6">
          {/* Main Title */}
          <h1 className="text-8xl font-black tracking-tight text-[#000000] leading-tight mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">MONEY</span>
            <span className="block text-[#ff5722] italic">OVERFLOW</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-700 font-medium mb-12 max-w-lg mx-auto">
            Redirecting you to continue your financial learning journey
          </p>
          
          {/* Status Badge */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold">
              LOADING
            </div>
            <div className="text-3xl">*</div>
          </div>
          
          {/* Loading Animation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#ff5722] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-[#ff5722] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-[#ff5722] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
        
          
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 opacity-30">
        <div className="w-12 h-12 border-2 border-[#ff5722] rounded-full"></div>
      </div>
      <div className="absolute top-40 right-32 opacity-20">
        <div className="w-6 h-6 bg-black rounded-full"></div>
      </div>
      <div className="absolute bottom-32 left-40 opacity-25">
        <div className="w-8 h-8 border-2 border-dotted border-gray-400 rounded"></div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-30">
        <div className="w-10 h-10 border-2 border-[#ff5722] rotate-45"></div>
      </div>
    </div>
  );
}