import React, { useState } from 'react';

const ContactsFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission logic here
  };

  return (
    <footer className="bg-gray-50 relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-32">
        <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
          <span className="text-green-800 font-bold text-lg">B</span>
        </div>
      </div>
      
      <div className="absolute top-64 left-8">
        <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
          <span className="text-yellow-800 font-bold text-lg">A</span>
        </div>
      </div>

      {/* Curved Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="none">
        <path
          d="M0,200 Q200,100 400,150 T800,120 Q1000,100 1200,150 T1400,200"
          stroke="black"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="445" cy="118" r="4" fill="#ff6b35"/>
        <circle cx="1355" cy="118" r="4" fill="#ff6b35"/>
      </svg>

      {/* Another curved line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="none">
        <path
          d="M0,300 Q300,400 600,350 T1200,380 Q1300,390 1400,350"
          stroke="black"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Asterisk decoration */}
      <div className="absolute left-96 top-96">
        <svg width="32" height="32" viewBox="0 0 32 32" className="text-black">
          <path
            d="M16 4v24M6 16h20M10.5 10.5l11 11M10.5 21.5l11-11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* CONTACTS Header */}
        <div className="text-center mb-20">
          <h1 className="text-8xl font-black tracking-wider text-black">
            C<span className="relative">
              Ø
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-16 bg-black transform rotate-45"></div>
              </div>
            </span>NTACTS
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {/* Social Links */}
          <div className="space-y-6">
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Instagram
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Behance
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Facebook
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Linkedin
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Our work
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                About us
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Insights
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors text-lg">
                Contacts us
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Join our community
              </h3>
              <div className="w-20 h-1 bg-orange-500" style={{
                background: 'repeating-linear-gradient(to right, #ff6b35 0px, #ff6b35 4px, transparent 4px, transparent 8px)'
              }}></div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                GO
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-24 pt-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8 lg:mb-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black transform rotate-45 mr-2"></div>
              <div className="w-8 h-8 bg-orange-500 transform rotate-45 -ml-4"></div>
            </div>
            <span className="text-2xl font-bold text-black ml-2">vestox</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-3 mb-8 lg:mb-0">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm">©</span>
            </div>
            <div>
              <div className="text-black font-semibold">2022 halo lab</div>
              <div className="text-gray-600">© All rights reserved</div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-2 text-right">
            <a href="#" className="block text-gray-700 hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="block text-gray-700 hover:text-black transition-colors">
              Publik Offering Agreement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactsFooter;