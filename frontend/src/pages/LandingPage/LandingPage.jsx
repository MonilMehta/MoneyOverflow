import React, { useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQSection from './FaqSection';
import UserTestimonial from './UserTestimonial';
import Blog from './Blog';
import Features from './Features';
import HeroSection from './HeroSection';
import './landing.css';
import Footer from './Footer';
import RotationLogo from './RotationLogo';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white border-b-4 border-[#ff5722] shadow-xl fixed top-0 w-full z-50">
        <div className="max-w-full mx-auto px-8" style={{width: '100vw'}}>
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-black tracking-tight">
                <span className="text-black">Money</span>
                <span className="text-[#ff5722] italic">Overflow</span>
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex sm:space-x-10">
              <Link
                to="/"
                className="border-[#ff5722] text-[#ff5722] inline-flex items-center px-4 pt-1 border-b-2 text-lg font-black transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/About"
                className="border-transparent text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722] inline-flex items-center px-4 pt-1 border-b-2 text-lg font-black transition-all duration-200"
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="border-transparent text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722] inline-flex items-center px-4 pt-1 border-b-2 text-lg font-black transition-all duration-200"
              >
                Pricing
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <Link to="/auth">
                <button className="px-4 py-2 bg-white text-[#ff5722] border-2 border-[#ff5722] rounded-xl text-sm font-bold hover:bg-[#ff5722] hover:text-white transition-all duration-200">
                  Login
                </button>
              </Link>
              <Link to="/auth">
                <button className="px-4 py-2 bg-[#ff5722] text-white rounded-xl text-sm font-bold hover:bg-[#e64a19] transition-all duration-200">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Pattern */}
      <div className="h-16 bg-white border-b-4 border-[#ff5722] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%)',
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 5px'
            }}
          />
        </div>
      </div>

      {/* <RotationLogo/> */}
      {/* Hero Section */}
      <HeroSection />
      
      {/* Feature Boxes */}
      <Features />
      
      {/* Blog Section */}
      <Blog />
             
      {/* User Testimonial Carousel */}
      <UserTestimonial />
      
      {/* FAQ Section */}
      <FAQSection />
      
  
    </div>
  );
};

export default LandingPage;