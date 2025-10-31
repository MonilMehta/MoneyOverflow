import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { singleBlog, summarizeBlog } from '../../../apis/blogs.api';

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState(null);
  const [blogSummary, setBlogSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Same color schemes as FinLEARN component
  const selectedColors = [
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
      highlight: "Featured Story"
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
      highlight: "Deep Dive"
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      highlight: "Case Study"
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
      highlight: "Insights"
    }
  ];

  // Generate a consistent color scheme based on the blog ID
  const getColorScheme = (blogId) => {
    if (!blogId) return selectedColors[0];
    const hash = blogId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return selectedColors[hash % selectedColors.length];
  };

  const fetchSummary = async () => {
    setSummaryLoading(true);
    try {
      console.log('Sending request with id:', blogDetails._id); // Debug log
      const response = await axios.post(summarizeBlog, { 
        id: blogDetails._id  // Use the _id from blogDetails
      });
      setBlogSummary(response.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      console.error('Error details:', err.response?.data); // Debug log
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(singleBlog, { id });
        setBlogDetails(response.data);
      } catch (err) {
        setError('Error fetching blog details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#f6f6f6] min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0'
            }}
          />
        </div>
        <div className="text-6xl font-black text-[#ff5722] italic" style={{ fontFamily: 'Arial, sans-serif' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f6f6f6] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-black text-[#ff5722] italic mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
            ERROR
          </div>
          <p className="text-lg text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!blogDetails) {
    return (
      <div className="bg-[#f6f6f6] min-h-screen flex items-center justify-center">
        <div className="text-6xl font-black text-[#000000] italic" style={{ fontFamily: 'Arial, sans-serif' }}>
          No Blog Found
        </div>
      </div>
    );
  }

  const colorScheme = getColorScheme(blogDetails._id);
  const isOrange = colorScheme.bg === "#ff5722";
  const isBeige = colorScheme.bg === "#e8ddd4";
  const isBlack = colorScheme.bg === "#000000";
  const isWhite = colorScheme.bg === "#ffffff";

  return (
    <div className="bg-[#f6f6f6] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">Blog</span>
            <span className="block text-[#ff5722] italic">DETAILS</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
              {colorScheme.highlight}
            </div>
            <div className="text-2xl">*</div>
          </div>
        </div>

        {/* Blog Content Card */}
        <div className="max-w-none mx-auto">
                      <div
            className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl relative"
            style={{
              backgroundColor: colorScheme.bg,
              color: colorScheme.text,
              border: `2px solid ${colorScheme.accent}`,
              fontFamily: 'Arial, sans-serif'
            }}
          >
            {/* Go Back Button */}
            <div className="absolute top-6 left-6 z-20">
              <button
                onClick={() => navigate(-1)}
                className="bg-black bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 rounded-full p-3 flex items-center justify-center backdrop-blur-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="p-8 md:p-12 relative">
              {/* Blog Title Section */}
              <div className="mb-8 mt-8">
                <div className={`text-xs font-bold uppercase mb-4 opacity-70 ${isWhite ? 'text-black' : ''}`}>
                  {colorScheme.highlight}
                </div>
                <h1 className={`text-4xl md:text-5xl font-black leading-tight tracking-wide uppercase mb-6 ${isWhite ? 'text-black' : ''}`}>
                  {blogDetails.title}
                </h1>
                
                {isOrange && (
                  <div className="text-3xl font-black text-white mb-4">
                    READ & LEARN
                  </div>
                )}
              </div>

              {/* Blog Description */}
              {blogDetails.description && (
                <div className="mb-10">
                  {isBeige && (
                    <div className="text-xl font-bold text-black mb-6">
                      {blogDetails.description}
                    </div>
                  )}
                  {isBlack && (
                    <div className="mb-6">
                      <div className="bg-orange-500 text-black px-4 py-2 rounded text-sm font-bold mb-4 inline-block">
                        FEATURED CONTENT
                      </div>
                      <p className="text-white text-lg font-medium leading-relaxed">
                        {blogDetails.description}
                      </p>
                    </div>
                  )}
                  {!isBeige && !isBlack && (
                    <div className="mb-6">
                      <p className={`text-lg leading-relaxed opacity-90 font-medium ${isWhite ? 'text-black' : ''}`}>
                        {blogDetails.description}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Divider */}
              {blogDetails.description && blogDetails.content && (
                <div className="w-full h-px bg-current opacity-20 mb-10"></div>
              )}

              {/* Blog Content */}
              {blogDetails.content && (
                <div className="space-y-6">
                  {blogDetails.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p
                        key={index}
                        className={`text-base md:text-lg leading-relaxed opacity-90 text-justify ${isWhite ? 'text-black' : ''}`}
                      >
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              )}

              {/* AI Summary Card */}
              <div className="mt-12 mb-8">
                <div className="w-full h-px bg-current opacity-20 mb-10"></div>
                <div className="rounded-[16px] p-8 relative" style={{
                  backgroundColor: '#1a1a1a',
                  border: `2px solid ${colorScheme.accent}`,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 87, 34, 0.1)'
                }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#ff5722] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                      AI SUMMARY
                    </div>
                    {!blogSummary && !summaryLoading && (
                      <button
                        onClick={fetchSummary}
                        className="flex items-center gap-2 bg-[#ff5722] hover:bg-[#ff7043] transition-colors duration-200 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md"
                      >
                        <span>Generate Summary</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 6V18M6 12H18" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {summaryLoading && (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff5722]"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">Generating summary...</span>
                    </div>
                  )}

                  {blogSummary && (
                    <div className="text-gray-200 text-base md:text-lg leading-relaxed font-normal space-y-4">
                      {blogSummary.summary.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p key={index} className="text-justify" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  )}

                  {!blogSummary && !summaryLoading && (
                    <div className="text-base text-gray-400 font-normal">
                      Click the "Generate Summary" button to get an AI-powered summary of this blog post.
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Section */}
              <div className="mt-12 flex justify-between items-center">
                {isBeige && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-sm font-medium ml-2">
                      Share Article
                    </div>
                  </div>
                )}
                
                {!isBeige && (
                  <button 
                    onClick={() => navigate(-1)}
                    className="bg-transparent border border-current px-6 py-3 rounded text-sm font-bold hover:bg-opacity-20 hover:bg-current transition-all duration-200"
                  >
                    BACK TO BLOGS →
                  </button>
                )}
              </div>

              {/* Decorative Elements */}
              {isOrange && (
                <div className="absolute bottom-6 right-6 opacity-20">
                  <div className="w-12 h-12 border-4 border-white rounded-full"></div>
                </div>
              )}
              
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
      </div>
    </div>
  );
}