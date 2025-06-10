import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import RotationLogo from './RotationLogo';
const HeroSection = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const hero = document.getElementById('hero');
      const spotlight = document.getElementById('spotlight');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate the position of the background gradient
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      hero.style.backgroundPosition = `${x}% ${y}%`;

      // Spotlight effect on the heading
      spotlight.style.transform = `translate(${clientX - innerWidth / 2}px, ${clientY - innerHeight / 2}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="hero"
      className="hero-section relative flex items-center justify-center text-white text-center"
      style={{
        background: `radial-gradient(circle, rgba(30,64,175,1) 0%, rgba(79,70,229,1) 100%)`,
        backgroundSize: '200% 200%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-position 0.05s ease',
      }}
    >
      {/* Spotlight on the heading */}
      <div
        id="spotlight"
        className="absolute w-[300px] h-[300px] bg-white opacity-20 rounded-full"
        style={{
          pointerEvents: 'none',
          filter: 'blur(100px)',
        }}
      />
      {/* <RotationLogo/> */}
      <div className="relative z-10">
        {/* Hero Text with spotlight */}
        <h1 className="text-6xl font-bold relative z-10">
          Welcome to <span className="text-indigo-300">MoneyOverflow</span>
        </h1>
        <p className="mt-4 text-lg z-10">
          Your journey to <span className="text-indigo-300">financial literacy</span> starts here.
        </p>

        {/* Layered images for depth */}
        <div className="mt-5 relative max-w-md mx-auto sm:flex sm:justify-center md:mt-8 z-10">
          <div className="rounded-md shadow">
            <Link
              to="/main"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#section"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default HeroSection;
