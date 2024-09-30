import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} MoneyOverflow. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" className="text-sm hover:text-gray-400">Privacy Policy</a>
            <a href="#terms" className="text-sm hover:text-gray-400">Terms of Service</a>
            <a href="#contact" className="text-sm hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;