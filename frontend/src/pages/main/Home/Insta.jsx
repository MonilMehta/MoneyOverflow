import React from 'react';

// JSON Data
const shortsData = [
  { id: 1, title: 'Short 1', url: 'https://www.youtube.com/shorts/kpdNZmtMRB4' },
  { id: 2, title: 'Short 2', url: 'https://www.youtube.com/shorts/gqJLd94QjHQ' },
  { id: 3, title: 'Short 3', url: 'https://www.youtube.com/shorts/6Fjs9ZU1f1w' },
  { id: 4, title: 'Short 4', url: 'https://www.youtube.com/shorts/Oj-UpJ2STC0' },
  { id: 5, title: 'Short 5', url: 'https://www.youtube.com/shorts/A1MkGsIY-NQ' },
  { id: 6, title: 'Short 6', url: 'https://www.youtube.com/shorts/0GxSnWSp3VM' },
  { id: 7, title: 'Short 7', url: 'https://www.youtube.com/shorts/ekCqTvvMl3s' },
  { id: 8, title: 'Short 8', url: 'https://www.youtube.com/shorts/UIBaghaRxaA' },
  { id: 9, title: 'Short 9', url: 'https://www.youtube.com/shorts/yPlPACCTXv0' },
  { id: 10, title: 'Short 10', url: 'https://www.youtube.com/shorts/R4psUPXzLSs' },
  { id: 11, title: 'Short 11', url: 'https://www.youtube.com/shorts/0OB0yGijXE4' },
  { id: 12, title: 'Short 12', url: 'https://www.youtube.com/shorts/n5pyBTNzxp4' },
  { id: 13, title: 'Short 13', url: 'https://www.youtube.com/shorts/V9jWzbsQCuk' },
  { id: 14, title: 'Short 14', url: 'https://www.youtube.com/shorts/NqWJXk700FA' },
  { id: 15, title: 'Short 15', url: 'https://www.youtube.com/shorts/tgeNZq-E-BE' },
  { id: 16, title: 'Short 16', url: 'https://www.youtube.com/shorts/67GaoYVtCOI' }
];

const YouTubeShortsCarousel = () => {
  const selectedColors = [
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
    },
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
    }
  ];

  return (
    <div className="bg-[#f6f6f6] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden w-full">
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

      <div className="max-w-[90vw] mx-auto relative z-10">
        <div className="mb-10 text-left">
          <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block">QUICK</span>
            <span className="block text-[#ff5722] italic">FINS</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
            Watch short financial education videos and tips.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              Videos 16+
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-8 pb-6">
          {shortsData.map((short, index) => {
            const colorScheme = selectedColors[index % selectedColors.length];
            
            return (
              <div 
                key={short.id}
                className="flex-none w-96 rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  border: `2px solid ${colorScheme.accent}`,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                <div className="p-4 relative">
                  {/* Video iframe */}
                  <div className="mb-4">
                    <iframe
                      width="100%"
                      height="280"
                      src={short.url.replace('/shorts/', '/embed/')}
                      title={short.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex flex-col justify-between h-32 relative z-10">
                    {/* Title */}
                    
                    
                  
                    
                  
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                          backgroundSize: '10px 10px',
                          backgroundPosition: '0 0, 0 5px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YouTubeShortsCarousel;