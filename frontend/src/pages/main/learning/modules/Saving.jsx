import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../../apis/server.api';

const Saving = ({ onNextModule }) => {
  const [submodules, setSubmodules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmodules = async () => {
      const learningPathId = "66faa07b1e549319649a8efa";
      const submodulesData = [];

      try {
        for (let order = 1; order <= 4; order++) {
          const response = await axios.post(`${API}/learning/getLesson`, {
            learningPathId,
            order,
          });
          submodulesData.push(response.data);
        }
        setSubmodules(submodulesData);
      } catch (error) {
        console.error("Error fetching submodules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmodules();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center p-4 relative overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #ff5722 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0'
            }}
          />
        </div>
        
        <div className="bg-white rounded-xl md:rounded-[24px] shadow-2xl p-6 md:p-12 border-4 border-[#ff5722] relative overflow-hidden w-full max-w-md md:max-w-lg">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl md:rounded-[24px] opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                backgroundSize: '12px 12px',
                backgroundPosition: '0 0, 0 6px'
              }}
            />
          </div>
          
          <div className="relative z-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-[#ff5722] border-t-transparent mx-auto mb-4 md:mb-6"></div>
            <p className="text-black text-lg md:text-xl font-black uppercase tracking-wide">Loading Learning Modules...</p>
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 md:w-3 md:h-3 bg-[#ff5722] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatContent = (content, isActive) => {
    const textColor = isActive ? 'text-white' : 'text-black';
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <p key={index} className={`mb-4 ${textColor} leading-relaxed font-bold`}>
          {paragraph}
        </p>
      )
    ));
  };

  const handleNextClick = () => {
    if (onNextModule && typeof onNextModule === 'function') {
      onNextModule();
    } else {
      console.error("onNextModule is not a function or is not provided");
    }
  };

  // Function to validate and convert YouTube URLs to embed format
  const formatVideoUrl = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&origin=${window.location.origin}`;
      }
    }
    
    // If it's already an embed URL, use it as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    console.warn('Invalid YouTube URL format:', url);
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-6 md:py-12 px-4 md:px-6 relative overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #ff5722 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0'
          }}
        />
      </div>
      
      {/* Vertical Lines - Hidden on mobile */}
      <div className="fixed inset-0 opacity-5 pointer-events-none hidden md:block">
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-[#ff5722]"
            style={{ left: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 relative">
          <div className="bg-white rounded-xl md:rounded-[24px] shadow-2xl p-6 md:p-12 border-4 border-[#ff5722] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl md:rounded-[24px] opacity-5">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                  backgroundSize: '15px 15px',
                  backgroundPosition: '0 0, 0 7.5px'
                }}
              />
            </div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-black text-black mb-4 md:mb-6 leading-tight tracking-tight">
                <span className="block text-[#ff5722] italic">SAVING</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                Learn smart saving techniques to build an emergency fund and prepare for future goals.
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 opacity-20">
              <div className="w-6 md:w-8 h-6 md:h-8 border-4 border-[#ff5722] rounded-full"></div>
            </div>
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 opacity-20">
              <div className="w-4 md:w-6 h-4 md:h-6 bg-[#ff5722] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Submodules Grid */}
        <div className="space-y-6 md:space-y-12">
          {submodules.map((submodule, index) => {
            const isActive = index % 2 === 1; // Alternate cards starting with second one
            const cardBg = isActive ? 'bg-[#ff5722]' : 'bg-white';
            const textColor = isActive ? 'text-white' : 'text-black';
            const badgeBg = isActive ? 'bg-white' : 'bg-[#ff5722]';
            const badgeText = isActive ? 'text-[#ff5722]' : 'text-white';
            const videoBg = isActive ? 'bg-white bg-opacity-20' : 'bg-gray-50';
            const videoIconBg = isActive ? 'bg-white' : 'bg-[#ff5722]';
            const videoIconText = isActive ? 'text-[#ff5722]' : 'text-white';
            
            return (
              <div
                key={index}
                className={`${cardBg} rounded-xl md:rounded-[24px] shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-4 ${isActive ? 'border-white border-opacity-30' : 'border-[#ff5722]'} relative`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl md:rounded-[24px] opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                      backgroundSize: '12px 12px',
                      backgroundPosition: '0 0, 0 6px'
                    }}
                  />
                </div>

                {/* Card Header */}
                <div className="px-4 md:px-8 py-4 md:py-6 border-b-2 border-current border-opacity-20 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`${badgeBg} rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 border-2 ${isActive ? 'border-white' : 'border-[#ff5722]'}`}>
                        <span className={`${badgeText} font-black text-base md:text-lg`}>{index + 1}</span>
                      </div>
                      <h2 className={`text-lg md:text-2xl font-black ${textColor} uppercase tracking-wide`}>
                        {submodule.title}
                      </h2>
                    </div>
                    
                    {/* Decorative Element */}
                    <div className={`w-4 h-4 md:w-6 md:h-6 ${isActive ? 'border-white' : 'border-[#ff5722]'} border-2 rounded-full opacity-30`}></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 md:p-8 relative z-10">  
                  {/* Text Content */}
                  <div className="mb-6 md:mb-8">
                    {isActive ? (
                      <div className="bg-white rounded-[16px] p-4 md:p-6 border-2 border-white border-opacity-30 relative overflow-hidden">
                        {/* Background Pattern for white content area */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                          <div 
                            className="w-full h-full"
                            style={{
                              backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                              backgroundSize: '8px 8px',
                              backgroundPosition: '0 0, 0 4px'
                            }}
                          />
                        </div>
                        <div className="relative z-10">
                          {submodule.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="mb-3 md:mb-4 text-black leading-relaxed font-bold text-sm md:text-base">
                                {paragraph}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-black rounded-[16px] p-4 md:p-6 border-2 border-black border-opacity-30 relative overflow-hidden">
                        {/* Background Pattern for black content area */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                          <div 
                            className="w-full h-full"
                            style={{
                              backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                              backgroundSize: '8px 8px',
                              backgroundPosition: '0 0, 0 4px'
                            }}
                          />
                        </div>
                        <div className="relative z-10">
                          {submodule.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="mb-3 md:mb-4 text-white leading-relaxed font-bold text-sm md:text-base">
                                {paragraph}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Section */}
                  <div className={`${videoBg} rounded-[16px] p-4 md:p-6 border-2 ${isActive ? 'border-white border-opacity-30' : 'border-gray-200'} relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 0 4px'
                        }}
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className={`${videoIconBg} rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mr-3 border-2 ${isActive ? 'border-white' : 'border-[#ff5722]'}`}>
                          <span className={`${videoIconText} text-xs md:text-sm font-black`}>▶</span>
                        </div>
                        <h3 className={`font-black text-base md:text-lg uppercase tracking-wide ${textColor}`}>Video Lesson</h3>
                      </div>
                      
                      {submodule.VideoUrl && formatVideoUrl(submodule.VideoUrl) ? (
                        <div className="relative w-full rounded-[12px] overflow-hidden border-2 border-current border-opacity-20" style={{ paddingBottom: '56.25%', height: 0 }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            width="560"
                            height="315"
                            src={formatVideoUrl(submodule.VideoUrl)}
                            title={`${submodule.title} - Video Lesson`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : submodule.VideoUrl ? (
                        <div className={`${isActive ? 'bg-white bg-opacity-20' : 'bg-gray-100'} rounded-[12px] p-6 md:p-8 text-center border-2 border-current border-opacity-20`}>
                          <div className="text-3xl md:text-5xl mb-2 md:mb-4">⚠️</div>
                          <p className={`${textColor} font-black text-base md:text-lg mb-2`}>Invalid video URL format</p>
                          <p className={`${textColor} opacity-80 text-xs md:text-sm break-all font-bold`}>{submodule.VideoUrl}</p>
                        </div>
                      ) : (
                        <div className={`${isActive ? 'bg-white bg-opacity-20' : 'bg-gray-100'} rounded-[12px] p-6 md:p-8 text-center border-2 border-current border-opacity-20`}>
                          <div className="text-3xl md:text-5xl mb-2 md:mb-4">📹</div>
                          <p className={`${textColor} font-black text-base md:text-lg`}>No video available for this lesson</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                  <div className={`w-3 h-3 md:w-4 md:h-4 ${isActive ? 'border-white' : 'border-[#ff5722]'} border-2 rounded-full`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="text-center mt-8 md:mt-16">
          <div className="bg-white rounded-xl md:rounded-[24px] shadow-2xl p-4 md:p-8 border-4 border-[#ff5722] inline-block relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl md:rounded-[24px] opacity-5">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                  backgroundSize: '10px 10px',
                  backgroundPosition: '0 0, 0 5px'
                }}
              />
            </div>
            
            <button
              className="bg-[#ff5722] hover:bg-[#e64a19] text-white font-black py-4 px-6 md:py-6 md:px-12 rounded-[16px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#ff5722] focus:ring-opacity-50 text-base md:text-xl uppercase tracking-wide border-2 border-[#e64a19] relative z-10"
              onClick={handleNextClick}
            >
              Continue to Next Module →
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="bg-white rounded-xl md:rounded-[24px] shadow-2xl p-4 md:p-6 border-4 border-[#ff5722] inline-block relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl md:rounded-[24px] opacity-5">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px'
                }}
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-2 md:mb-3">
                {submodules.map((_, index) => {
                  const isActive = index % 2 === 1;
                  return (
                    <div
                      key={index}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#ff5722] border-[#ff5722]' 
                          : 'bg-white border-[#ff5722]'
                      }`}
                    ></div>
                  );
                })}
              </div>
              <p className="text-black font-black text-base md:text-lg uppercase tracking-wide">
                {submodules.length} Lessons Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saving;