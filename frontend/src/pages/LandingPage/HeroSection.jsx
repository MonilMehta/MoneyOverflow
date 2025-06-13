import React, { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const hero = document.getElementById('hero');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Subtle parallax effect
      const x = (clientX / innerWidth) * 2;
      const y = (clientY / innerHeight) * 2;
      
      const decorativeElements = document.querySelectorAll('.decorative-element');
      decorativeElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="hero"
      className="relative flex items-center justify-center text-black min-h-screen mt-4"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical lines */}
        <line x1="16.67" y1="0" x2="16.67" y2="100" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="33.33" y1="0" x2="33.33" y2="100" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="66.67" y1="0" x2="66.67" y2="100" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="83.33" y1="0" x2="83.33" y2="100" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        
        {/* Horizontal lines */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#000" strokeWidth="0.1" opacity="0.15" strokeDasharray="0.5 0.5" />
      </svg>

      {/* Exact SVG from the image */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, transform: 'translateX(5%)' }}
        viewBox="200 0 1915 1108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1914 305.5L1914.19 322.819L1899.09 314.322L1914 305.5ZM328.378 19.429L329.789 18.92L328.378 19.429ZM277.684 21.901L279.138 22.2703L277.684 21.901ZM548.894 486.409L547.43 486.082L548.894 486.409ZM581.865 338.759L583.328 339.086L581.865 338.759ZM1737.6 519.889L1689.06 213.129L1692.02 212.66L1740.56 519.42L1737.6 519.889ZM496.609 490.142L326.967 19.9381L329.789 18.92L499.431 489.123L496.609 490.142ZM279.138 22.2703L3.45381 1107.37L0.546187 1106.63L276.23 21.5316L279.138 22.2703ZM1787.12 527.793L1906.07 316.528L1908.68 317.999L1789.73 529.265L1787.12 527.793ZM583.328 339.086L550.358 486.736L547.43 486.082L580.401 338.432L583.328 339.086ZM1664.33 191.999H1612V188.999H1664.33V191.999ZM607.77 316.5H677V319.5H607.77V316.5ZM326.967 19.9381C318.589 -3.28397 285.217 -1.65667 279.138 22.2703L276.23 21.5316C283.037 -5.26168 320.408 -7.08385 329.789 18.92L326.967 19.9381ZM499.431 489.123C507.938 512.701 541.968 510.545 547.43 486.082L550.358 486.736C544.241 514.129 506.135 516.543 496.609 490.142L499.431 489.123ZM580.401 338.432C583.263 325.614 594.637 316.5 607.77 316.5V319.5C596.042 319.5 585.884 327.639 583.328 339.086L580.401 338.432ZM1689.06 213.129C1687.14 200.96 1676.65 191.999 1664.33 191.999V188.999C1678.12 188.999 1689.87 199.034 1692.02 212.66L1689.06 213.129ZM1740.56 519.42C1744.27 542.865 1775.47 548.476 1787.12 527.793L1789.73 529.265C1776.69 552.426 1741.75 546.142 1737.6 519.889L1740.56 519.42Z"
          fill="#000000"
          strokeWidth="2"
          stroke="#000000"
        />
      </svg>

      {/* Orange dots positioned like in the image */}
      <div
        className="absolute decorative-element"
        style={{
          top: '8%',
          right: '12%',
          width: '10px',
          height: '10px',
          backgroundColor: '#ff6b35',
          borderRadius: '50%',
          zIndex: 3,
        }}
      />
      
      <div
        className="absolute decorative-element"
        style={{
          bottom: '25%',
          left: '15%',
          width: '10px',
          height: '10px',
          backgroundColor: '#ff6b35',
          borderRadius: '50%',
          zIndex: 3,
        }}
      />

      {/* Asterisk elements replacing A and B */}
      <div
        className="absolute decorative-element"
        style={{
          top: '25%',
          left: '15%',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000',
  
          zIndex: 2,
        }}
      >
        ✱
      </div>

      <div
        className="absolute decorative-element"
        style={{
          bottom: '30%',
          left: '12%',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000',
          
          zIndex: 2,
        }}
      >
        ✱
      </div>

      {/* Asterisk */}
      <div
        className="absolute decorative-element"
        style={{
          top: '30%',
          right: '15%',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000',
   
          zIndex: 2,
        }}
      >
        ✱
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8" style={{ marginLeft: '5%' }}>
        {/* Main heading - positioned higher */}
        <div className="mb-6 text-center">
          <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tight leading-none mb-2 italic">
            MONEY
          </h1>
          <div className="flex items-center justify-center gap-4 mb-2 italic">
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold text-[#ff5722] tracking-tight leading-none">
              <span className="relative">
                Ø
              </span>VERFLOW
            </h1>
          </div>
        </div>

        {/* Description - positioned lower with more spacing */}
        <div className="max-w-4xl mx-auto mt-12">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-relaxed text-gray-800 text-center">
           Your journey to financial literacy starts here. Explore our resources, tools, and community to master the art of managing money effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;