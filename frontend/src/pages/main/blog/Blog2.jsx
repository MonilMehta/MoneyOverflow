import React, { useState, useEffect } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import { getBlogs } from "../../../apis/blogs.api";
import blogs1 from "../../../assets/blogs1.gif";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedItems, setAnimatedItems] = useState(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // Trigger header animation after a short delay
    setTimeout(() => setHeaderVisible(true), 100);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedItems((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    document.querySelectorAll('.blog-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [blogs]);

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

  // Add animation styles including header animations
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .header-animate {
      opacity: 0;
    }

    .header-animate.visible {
      animation: fadeInUp 0.8s ease forwards;
    }

    .header-fin {
      opacity: 0;
    }

    .header-fin.visible {
      animation: fadeInLeft 0.8s ease forwards;
    }

    .header-studies {
      opacity: 0;
    }

    .header-studies.visible {
      animation: fadeInRight 0.8s ease forwards;
      animation-delay: 0.2s;
    }

    .header-description {
      opacity: 0;
    }

    .header-description.visible {
      animation: fadeInUp 0.8s ease forwards;
      animation-delay: 0.4s;
    }

    .header-stats {
      opacity: 0;
    }

    .header-stats.visible {
      animation: fadeInUp 0.8s ease forwards;
      animation-delay: 0.6s;
    }

    .blog-card {
      opacity: 0;
      transform: translateY(20px);
    }

    .blog-card.animated {
      animation: fadeInUp 0.6s ease forwards, scaleIn 0.6s ease forwards;
    }
  `;

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <style>{animationStyles}</style>
      
      {/* Background elements - hidden on mobile */}
      <div className="hidden sm:block">
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with Animations */}
        <div className="mb-6 sm:mb-10 text-left mt-4 sm:mt-10">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className={`block italic header-fin ${headerVisible ? 'visible' : ''}`}>
              FIN
            </span>
            <span className={`block text-[#ff5722] italic header-studies ${headerVisible ? 'visible' : ''}`}>
              STUDIES
            </span>
          </h2>
          <p className={`mt-2 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-xl font-medium header-description ${headerVisible ? 'visible' : ''}`}>
            Discover real-world success stories and insights from our featured case studies.
          </p>
          <div className={`mt-3 sm:mt-4 flex items-center gap-4 header-stats ${headerVisible ? 'visible' : ''}`}>
            <div className="bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
              Stories {blogs.length}+
            </div>
            <div className="text-xl sm:text-2xl">*</div>
          </div>
        </div>
        
        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogs.map((blog, index) => {
            const colorScheme = selectedColors[index % selectedColors.length];
            const isOrange = colorScheme.bg === "#ff5722";
            const isBeige = colorScheme.bg === "#e8ddd4";
            const isBlack = colorScheme.bg === "#000000";
            
            return (
              <div 
                key={index}
                data-index={index}
                className={`blog-card rounded-[16px] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  animatedItems.has(index.toString()) ? 'animated' : ''
                }`}
                style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  border: `2px solid ${colorScheme.accent}`,
                  fontFamily: 'Arial, sans-serif',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="p-4 sm:p-8 h-full flex flex-col justify-between relative">
                  {/* Main Content */}
                  <div className="z-10">
                    <div className="text-xs font-bold uppercase mb-2 opacity-70">
                      {colorScheme.highlight}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black leading-tight tracking-wide uppercase mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    {isOrange && (
                      <div className="text-2xl sm:text-3xl font-black text-white mb-2">
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
                    <Link
                      to={`/main/blogs/${blog._id}`}
                      className={`w-full bg-transparent border ${
                        isBlack ? 'border-white text-white' : 'border-current text-current'
                      } px-4 py-2 rounded text-sm font-bold hover:bg-opacity-20 hover:bg-current transition-all duration-200 inline-block text-center`}
                    >
                      {isOrange ? 'READ FEATURED →' : isBeige ? 'READ STUDY →' : 'READ MORE →'}
                    </Link>
                  </div>
                  
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;