import React from 'react'
import Flow from './Flow'
import Team from './Team'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
const FAQ1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };
  return (
    <>
    <nav className="bg-white border-b-4 border-[#ff5722] shadow-xl fixed top-0 w-full z-50">
        <div className="max-w-full mx-auto px-4 sm:px-8" style={{width: '100vw'}}>
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl sm:text-3xl font-black tracking-tight">
                <span className="text-black">Money</span>
                <span className="text-[#ff5722] italic">Overflow</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:space-x-10">
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex space-x-4">
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#ff5722] hover:text-[#e64a19] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff5722] transition-all duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-[#ff5722] block px-3 py-2 rounded-md text-base font-bold border-l-4 border-[#ff5722] bg-orange-50"
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={closeMobileMenu}
              className="text-gray-600 hover:text-[#ff5722] hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-bold transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/pricing"
              onClick={closeMobileMenu}
              className="text-gray-600 hover:text-[#ff5722] hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-bold transition-all duration-200"
            >
              Pricing
            </Link>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-3 px-3">
                <Link to="/auth" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-2 bg-white text-[#ff5722] border-2 border-[#ff5722] rounded-xl text-sm font-bold hover:bg-[#ff5722] hover:text-white transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/auth" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-2 bg-[#ff5722] text-white rounded-xl text-sm font-bold hover:bg-[#e64a19] transition-all duration-200">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    <Team/>
    <Flow />
    </>
  )
}

export default FAQ1
