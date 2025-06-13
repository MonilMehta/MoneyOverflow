import React, { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { getBlogs } from "../../../apis/blogs.api";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [render, setRender] = useState(false);

  // Updated color schemes to match the CompletedLearningPaths design
  const cardColors = [
    {
      bg: "#ff5722",
      text: "#000000",
      accent: "#ff7043",
      buttonBg: "#ffffff",
      buttonText: "#000000"
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
      buttonBg: "#000000",
      buttonText: "#ffffff"
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      buttonBg: "#ff5722",
      buttonText: "#000000"
    },
    {
      bg: "#ffffff",
      text: "#000000",
      accent: "#f5f5f5",
      buttonBg: "#ff5722",
      buttonText: "#ffffff"
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
        setBlogs(data.slice(0, 2));
        setRender(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="bg-[#f6f6f6] mb-12 p-8 rounded-lg font-sans relative overflow-hidden">
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

      {render && (
        <div className="relative z-10">
          <div className="mb-10 text-left">
            <h2 className="text-6xl font-black tracking-tight text-[#000000] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="block">LATEST</span>
              <span className="block text-[#ff5722] italic">FIN STUDIES</span>
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-xl font-medium">
              Dive into powerful case studies and lessons learned.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                Studies 7+
              </div>
              <div className="text-2xl">*</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {blogs.map((blog, index) => {
              const colorScheme = cardColors[index % cardColors.length];
              const isOrange = colorScheme.bg === "#ff5722";
              const isBeige = colorScheme.bg === "#e8ddd4";
              const isBlack = colorScheme.bg === "#000000";
              
              return (
                <div
                  key={blog._id}
                  className="rounded-[16px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl h-80"
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between relative">
                    {/* Title */}
                    <div className="z-10">
                      <h3 className="text-2xl font-black leading-tight tracking-wide uppercase mb-2">
                        {blog.title}
                      </h3>
                    </div>

                    {/* Excerpt */}
                    <div className="z-10 flex-1 flex items-center">
                      {blog.excerpt && (
                        <p className="text-base opacity-90 leading-snug">
                          {blog.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Date and Button */}
                    <div className="z-10 flex items-center justify-between">
                      <div className="flex items-center text-sm opacity-70">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="font-medium">
                          {blog.createdAt.split("T")[0]}
                        </span>
                      </div>
                      
                      <Link
                        to={`/main/blogs/${blog._id}`}
                        className="px-4 py-2 rounded text-sm font-bold transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: colorScheme.buttonBg,
                          color: colorScheme.buttonText,
                          border: `1px solid ${colorScheme.accent}`
                        }}
                      >
                        READ MORE →
                      </Link>
                    </div>

                    {/* Decorative Elements */}
                    {isOrange && (
                      <div className="absolute bottom-4 right-4 opacity-20">
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
              );
            })}
          </div>

          <div className="flex justify-end mt-12">
            <Link 
              to='/main/blogs' 
              className="bg-[#ff5722] hover:bg-[#ff7043] text-white px-8 py-4 rounded-full shadow-lg inline-flex items-center transition-colors duration-200 font-bold text-lg"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              VIEW ALL POSTS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;