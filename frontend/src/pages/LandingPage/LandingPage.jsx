import React,{ useEffect } from 'react';
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
const LandingPage = () => {

  useEffect(() => {
    setTimeout(() => {
      toast.dark("Don't forget to visit the about page!", {toastId: 'landing'})
    }, 2000)
  })
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ToastContainer/>
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <DollarSign className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">MoneyOverflow</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link to="/main/news" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Trends
                </Link>
                <Link to="/main/tools" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Tools
                </Link>
                <Link to="/main/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
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
          </div>
        </div>
      </nav>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
