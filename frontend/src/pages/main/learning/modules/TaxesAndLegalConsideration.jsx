import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../../apis/server.api';

const Saving = ({ onNextModule }) => {
  const [submodules, setSubmodules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmodules = async () => {
      const learningPathId = "66faf9d17fde7cf93c2ba6fa";
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
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-300 mx-auto"></div>
          <p className="text-white text-center mt-4 font-medium">Loading submodules...</p>
        </div>
      </div>
    );
  };

  const formatContent = (content, isActive) => {
    const textColor = isActive ? 'text-black' : 'text-white';
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <p key={index} className={`mb-3 ${textColor} leading-relaxed`}>
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
    <div className="min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
             Taxes and Legal Considerations
          </h1>
          <p className="text-lg text-white opacity-80">
           Get familiar with basic tax principles and legal aspects of personal finance.
          </p>
        </div>

        {/* Submodules Grid */}
        <div className="space-y-8">
          {submodules.map((submodule, index) => {
            const isActive = index % 2 === 1; // Alternate cards starting with second one
            const cardBg = isActive ? 'bg-green-300' : 'bg-gray-900';
            const headerBg = isActive ? 'bg-green-300' : 'bg-gray-900';
            const textColor = isActive ? 'text-black' : 'text-white';
            const iconColor = isActive ? 'text-black' : 'text-white';
            const badgeBg = isActive ? 'bg-gray-800' : 'bg-green-300';
            const badgeText = isActive ? 'text-white' : 'text-black';
            
            return (
              <div
                key={index}
                className={`${cardBg} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Card Header */}
                <div className={`${headerBg} px-6 py-4`}>
                  <div className="flex items-center">
                    <div className={`${badgeBg} rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                      <span className={`${badgeText} font-bold text-sm`}>{index + 1}</span>
                    </div>
                    <h2 className={`text-xl font-bold ${iconColor}`}>
                      {submodule.title}
                    </h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">  
                {/* Text Content */}
                  <div className="mb-6">
                    {formatContent(submodule.content, isActive)}
                  </div>

                  {/* Video Section */}
                  <div className={`${isActive ? 'bg-gray-100' : 'bg-gray-800'} rounded-lg p-4`}>
                    <div className="flex items-center mb-3">
                      <div className={`${isActive ? 'bg-gray-800' : 'bg-green-300'} rounded-full w-6 h-6 flex items-center justify-center mr-2`}>
                        <span className={`${isActive ? 'text-white' : 'text-black'} text-xs`}>▶</span>
                      </div>
                      <h3 className={`font-semibold ${textColor}`}>Video Lesson</h3>
                    </div>
                    
                    {submodule.VideoUrl && formatVideoUrl(submodule.VideoUrl) ? (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
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
                      <div className={`${isActive ? 'bg-gray-200' : 'bg-gray-700'} rounded-lg p-8 text-center`}>
                        <div className="text-4xl mb-2">⚠️</div>
                        <p className={`${textColor} opacity-60 mb-2`}>Invalid video URL format</p>
                        <p className={`${textColor} opacity-40 text-xs break-all`}>{submodule.VideoUrl}</p>
                      </div>
                    ) : (
                      <div className={`${isActive ? 'bg-gray-200' : 'bg-gray-700'} rounded-lg p-8 text-center`}>
                        <div className="text-4xl mb-2">📹</div>
                        <p className={`${textColor} opacity-60`}>No video available for this lesson</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="text-center mt-12">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
            onClick={handleNextClick}
          >
            Continue to Next Module →
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2">
            {submodules.map((_, index) => {
              const isActive = index % 2 === 1;
              return (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-300' : 'bg-gray-700'}`}
                ></div>
              );
            })}
          </div>
          <p className="text-white opacity-60 mt-2 text-sm">
            {submodules.length} lessons completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saving;