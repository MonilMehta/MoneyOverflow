import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, Search, User } from 'lucide-react';

const MainNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
    navigate('/'); // Redirect to home page after logout
  };

  const isActiveLink = (path) => location.pathname === path;

  const navigationLinks = [
    ['Home', '/main'],
    ['FinLearn', '/main/learning'],
    ['FinTest', '/main/games'],
    ['FinStudies', '/main/blogs'],
    ['FinNews', '/main/news'],
    ['FinTools', '/main/tools'],
    ['Premium', '/main/premium'],
    ['FinSimulation', '/main/simulation'],
    ['About', '/main/about']
  ];

  return (
    <>
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
              {navigationLinks.map(([title, path]) => (
                <Link
                  key={path}
                  to={path}
                  className={`${
                    isActiveLink(path)
                      ? 'border-[#ff5722] text-[#ff5722]'
                      : 'border-transparent text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722]'
                  } inline-flex items-center  pt-1 border-b-2 text-lg font-black transition-all duration-200`}
                >
                  {title}
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:text-[#ff5722] focus:outline-none transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-[#ff5722] flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border-2 border-black/10 shadow-xl py-2 z-50">
                      <Link
                        to="/main/account"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#ff5722] hover:text-white transition-colors duration-200"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#ff5722] hover:text-white transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
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
              )}
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
    </>
  );
};

export default MainNavbar;