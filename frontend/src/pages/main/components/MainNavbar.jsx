import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DollarSign, Search, User } from 'lucide-react';

const MainNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is logged in
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get current route path

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };

  // Function to check if the link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white border-b-2 border-gray-200 shadow-md fixed top-0 w-full z-50" style={{width:'100vw'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{width:'100vw'}}>
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center" style={{marginLeft:'-100px'}}>
              <DollarSign className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-800">MoneyOverflow</span>
            </div>

            {/* Links */}
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                to="/main"
                className={`${
                  isActiveLink('/main') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                Home
              </Link>
              <Link
                to="/main/learning"
                className={`${
                  isActiveLink('/main/learning') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                FinLearn
              </Link>
              <Link
                to="/main/games"
                className={`${
                  isActiveLink('/main/games') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                FinTest
              </Link>
              <Link
                to="/main/blogs"
                className={`${
                  isActiveLink('/main/blogs') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                CaseStudy
              </Link>
              <Link
                to="/main/news"
                className={`${
                  isActiveLink('/main/news') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                FinNews
              </Link>
              <Link
                to="/main/tools"
                className={`${
                  isActiveLink('/main/tools') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                FinTools
              </Link>
              <Link
                to="/main/premium"
                className={`${
                  isActiveLink('/main/premium') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                Premium
              </Link>
              <Link
                to="/main/simulation"
                className={`${
                  isActiveLink('/main/simulation') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                Simulation
              </Link>
              <Link
                to="/main/about"
                className={`${
                  isActiveLink('/main/about') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-2 pt-1 border-b-2 text-lg font-medium`}
              >
                About
              </Link>
            </div>

            {/* Auth/User Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* User Icon with Dropdown */}
                  <div className="relative" style={{marginRight:'-100px'}}>
                    <button
                      className="flex items-center text-gray-700 focus:outline-none"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <User className="h-6 w-6 text-gray-800" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/main/account"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/auth">
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                      Login
                    </button>
                  </Link>
                  <Link to="/auth">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />

    </>
  );
};

export default MainNavbar;
