import React, { useState, useEffect } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import { getBlogs } from "../../../apis/blogs.api";
import blogs1 from "../../../assets/blogs1.gif";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Card color schemes matching the FinLEARN design
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
      highlight: "Trending Now"
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      highlight: "Case Study"
    },
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
      highlight: "Success Story"
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
      highlight: "Expert Insights"
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
      highlight: "Learn More"
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(getBlogs);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  
  return (
        <>
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

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Section */}
            <div className="mb-10 text-left mt-10">
              <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="block italic">FIN</span>
                <span className="block text-[#ff5722] italic">STUDIES</span>
              </h2>
              <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
                Discover real-world success stories and insights from our featured case studies.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                  Stories {blogs.length}+
                </div>
                <div className="text-2xl">*</div>
              </div>
            </div>
            
            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 gap-6" style={{
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
}}>
              {blogs.map((blog, index) => {
                const colorScheme = selectedColors[index % selectedColors.length];
                const isOrange = colorScheme.bg === "#ff5722";
                const isBeige = colorScheme.bg === "#e8ddd4";
                const isBlack = colorScheme.bg === "#000000";
                
                return (
                  <div 
                    key={index} 
                    className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl" 
                    style={{
                      backgroundColor: colorScheme.bg,
                      color: colorScheme.text,
                      border: `2px solid ${colorScheme.accent}`,
                      fontFamily: 'Arial, sans-serif',
                      height: '400px'
                    }}
                  >
                    <div className="p-8 h-full flex flex-col justify-between relative">
                      {/* Main Content */}
                      <div className="z-10">
                        <div className="text-xs font-bold uppercase mb-2 opacity-70">
                          {colorScheme.highlight}
                        </div>
                        <h3 className="text-xl font-black leading-tight tracking-wide uppercase mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                        {isOrange && (
                          <div className="text-3xl font-black text-white mb-2">
                            READ NOW
                          </div>
                        )}
                      </div>
                      
                      {/* Middle Content */}
                      <div className="z-10 flex-1 flex items-center">
                        {isBeige && (
                          <div className="text-sm font-medium text-black opacity-80">
                            Explore insights and learnings from this case study
                          </div>
                        )}
                        {isBlack && (
                          <div className="text-center">
                            <div className="bg-orange-500 text-black px-3 py-1 rounded text-sm font-bold mb-2">
                              FEATURED
                            </div>
                            <div className="text-white text-sm font-medium">
                              Deep dive into real-world applications
                            </div>
                          </div>
                        )}
                        {!isBeige && !isBlack && !isOrange && (
                          <div className="text-sm opacity-90 leading-snug">
                            Discover actionable insights from this case study
                          </div>
                        )}
                      </div>
                      
                      {/* Bottom Content */}
                      <div className="z-10">
                        {isOrange && (
                          <div className="text-sm font-medium text-black opacity-80">
                            Success stories & insights
                          </div>
                        )}
                        {isBeige && (
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                              <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white"></div>
                              <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="text-xs font-medium">
                              Read Study
                            </div>
                          </div>
                        )}
                        {(isBlack || (!isOrange && !isBeige)) && (
                          <Link
                            to={`/main/blogs/${blog._id}`}
                            className="bg-transparent border border-current px-4 py-2 rounded text-sm font-bold hover:bg-opacity-20 hover:bg-current transition-all duration-200 inline-block"
                          >
                            READ MORE →
                          </Link>
                        )}
                      </div>
                      
                      {/* Decorative Elements */}
                      {isOrange && (
                        <div className="absolute bottom-4 right-4 opacity-20">
                          <div className="w-8 h-8 border-2 border-white rounded-full"></div>
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
                      
                      {/* Hover Arrow for non-button cards */}
                      {(isOrange || isBeige) && (
                        <Link
                          to={`/main/blogs/${blog._id}`}
                          className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

export default BlogPosts;