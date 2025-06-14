import React, { useState, useEffect, useRef } from "react";
import { Coins } from "lucide-react";
import { Button } from "./Button";
import CompletedLearningPaths from "./CompletedLearning";
import Blogs from "./Blogs";
import Forum from "./Forum";
import Calendar from "./Calendar"; // Custom calendar component
import "./home.css";
import { currentUser } from "../../../apis/user.api";
import Newsletter from "./Newsletter";
import axios from "axios";
import Insta from "./Insta";
import { Link } from "react-router-dom";

const Home = () => {
  const xpBooster = 1.5;
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [points, setPoints] = useState();
  const [course, setCourse] = useState();
  
  // Animation state for FIN TEST section
  const [isFinTestVisible, setIsFinTestVisible] = useState(false);
  const finTestRef = useRef(null);

  // Updated card color schemes matching the finance idle style
  const cardColors = [
  {
    "bg": "#ff5722",
    "text": "#000000",
    "accent": "#ff7043",
    "highlight": "Quiz Time",
    "subtitle": "Boost your savings IQ & earn +50 points"
  },
  {
    "bg": "#e8ddd4",
    "text": "#000000",
    "accent": "#d7c4b0",
    "highlight": "Test your future planning skills",
    "subtitle": "Test your future planning skills"
  },
  {
    "bg": "#000000",
    "text": "#ffffff",
    "accent": "#333333",
    "highlight": "Invest Smart",
    "subtitle": "Sharpen your portfolio-building know-how"
  },
  {
    "bg": "#ffffff",
    "text": "#000000",
    "accent": "#e0e0e0",
    "highlight": "Master Your Money",
    "subtitle": "Learn effective budgeting strategies"
  }
]

  const cardData = [
    {
      title: "Savings",
      completed: 0,
      total: 20,
      progress: 0,
    },
    {
      title: "Retirement",
      completed: 0,
      total: 20,
      progress: 0,
    },
    {
      title: "Investing",
      completed: 0,
      total: 20,
      progress: 0,
    },
    {
      title: "Budgeting",
      completed: 0,
      total: 20,
      progress: 0,
    }
  ];

  // Intersection Observer for FIN TEST section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset animation state first
            setIsFinTestVisible(false);
            // Small delay to ensure reset, then trigger animation
            setTimeout(() => {
              setIsFinTestVisible(true);
            }, 50);
          } else {
            // Reset when component leaves viewport
            setIsFinTestVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '50px 0px -50px 0px' // Start animation slightly before/after entering viewport
      }
    );

    if (finTestRef.current) {
      observer.observe(finTestRef.current);
    }

    return () => {
      if (finTestRef.current) {
        observer.unobserve(finTestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // let userId = document.cookie.split("userId=")[1]?.split(";")[0];
    // if (userId != undefined) {
    //   setUser(document.cookie.split("userId=")[1]?.split(";")[0]);
    // }
    const fetchData = async () => {
      let accessToken = await document.cookie
        .split("accessToken=")[1]
        ?.split(";")[0];
      const res = await axios.get(currentUser, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res?.data?.data);
      setUser(res?.data?.data?.username);
      setName(res?.data?.data?.fullName);
      setPoints(res?.data?.data?.points);
      setCourse(res?.data?.data?.highestCompletedIndex);
    };
    fetchData();
  });

  return (
    <>
      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[75%_25%] gap-6 p-6 bg-[#f6f6f6] relative font-sans">
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
        
        {/* Main Content (Left Side) */}
        <main className="space-y-12 relative z-10">
          <CompletedLearningPaths course={course} />
        </main>
        
        {/* Sidebar with Quiz Categories (Right Side) */}
        <aside className="space-y-6 sticky top-6 relative z-10 h-fit">
         
          {/* Quiz Categories Cards with Animation */}
          <div ref={finTestRef}>
            {/* Header with staggered fade-in */}
            <h2 
              className={`text-3xl font-black italic text-[#000000] mb-6 tracking-tight transition-all duration-1000 ease-out ${
                isFinTestVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              FIN TEST
            </h2>
            
            {/* Cards with staggered animations */}
            <div className="space-y-5">
              {cardData.map((card, index) => {
                const colors = cardColors[index];
                const isOrange = colors.bg === "#ff5722";
                const isBeige = colors.bg === "#e8ddd4";
                const isBlack = colors.bg === "#000000";
                const isWhite = colors.bg === "#ffffff";
                
                return (
                  <div
                    key={index}
                    className={`rounded-[16px] overflow-hidden shadow-lg transition-all duration-1000 ease-out hover:-translate-y-2 hover:shadow-xl relative ${
                      isFinTestVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      border: `2px solid ${colors.accent}`,
                      fontFamily: 'Arial, sans-serif',
                      height: '220px',
                      transitionDelay: `${400 + index * 150}ms`
                    }}
                  >
                    <div className="p-6 h-full flex flex-col justify-between relative">
                      {/* Main Content */}
                      <div 
                        className={`z-10 transition-all duration-800 ease-out ${
                          isFinTestVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                        }`}
                        style={{ transitionDelay: `${600 + index * 150}ms` }}
                      >
                        <h3 className="text-xl font-black leading-tight tracking-wide uppercase mb-2">
                          {card.title}
                        </h3>
                        {isOrange && (
                          <div className="text-2xl font-black text-white mb-2">
                            {colors.highlight}
                          </div>
                        )}
                      </div>
                      
                      {/* Middle Content */}
                      <div 
                        className={`z-10 flex-1 flex items-center transition-all duration-800 ease-out ${
                          isFinTestVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}
                        style={{ transitionDelay: `${800 + index * 150}ms` }}
                      >
                        {isBeige && (
                          <div className="text-lg font-bold text-black">
                            {colors.highlight}
                          </div>
                        )}
                        {isBlack && (
                          <div className="text-center">
                            <div className="bg-orange-500 text-black px-3 py-1 rounded text-xs font-bold mb-2">
                              {colors.highlight}
                            </div>
                            <div className="text-white text-sm font-medium">
                              {colors.subtitle}
                            </div>
                          </div>
                        )}
                        {isWhite && (
                          <div className="text-center">
                            <div className="bg-black text-white px-3 py-1 rounded text-xs font-bold mb-2">
                              {colors.highlight}
                            </div>
                            <div className="text-black text-sm font-medium">
                              {colors.subtitle}
                            </div>
                            <div className="absolute top-4 right-4 opacity-20">
                              <div className="w-8 h-8 border-2 border-black rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Bottom Content - Start Test Button */}
                      <div 
                        className={`z-10 transition-all duration-800 ease-out ${
                          isFinTestVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${1000 + index * 150}ms` }}
                      >
                        {isOrange && (
                          <div className="text-xs font-medium text-black opacity-80 mb-2">
                            {colors.subtitle}
                          </div>
                        )}
                        <Link 
                          to={`/main/games`}
                          className="block w-full text-center bg-transparent border-2 border-current px-4 py-2 rounded text-sm font-bold hover:bg-current hover:text-white transition-all duration-300 transform hover:scale-105"
                          style={{
                            borderColor: isBlack ? '#ff5722' : 'currentColor',
                            color: isBlack ? '#ff5722' : 'currentColor'
                          }}
                        >
                          START TEST →
                        </Link>
                      </div>
                      
                      {/* Decorative Elements */}
                      {isOrange && (
                        <div 
                          className={`absolute top-4 right-4 opacity-20 transition-all duration-1000 ease-out ${
                            isFinTestVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-0'
                          }`}
                          style={{ transitionDelay: `${1200 + index * 150}ms` }}
                        >
                          <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                        </div>
                      )}
                      
                      {isBeige && (
                        <div 
                          className={`absolute bottom-4 right-4 opacity-30 transition-all duration-1000 ease-out ${
                            isFinTestVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-0'
                          }`}
                          style={{ transitionDelay: `${1200 + index * 150}ms` }}
                        >
                          <div className="flex -space-x-1">
                            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Progress indicator */}
                      <div 
                        className={`absolute top-2 left-2 z-10 transition-all duration-800 ease-out ${
                          isFinTestVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                        style={{ transitionDelay: `${600 + index * 150}ms` }}
                      >
                        <div className="text-xs font-bold opacity-60">
                          {card.completed}/{card.total}
                        </div>
                      </div>
                      
                      {/* Background Pattern with fade-in */}
                      <div 
                        className={`absolute top-0 left-0 w-full h-full pointer-events-none rounded-[16px] opacity-5 transition-opacity duration-1500 ease-out ${
                          isFinTestVisible ? 'opacity-5' : 'opacity-0'
                        }`}
                        style={{ transitionDelay: `${1400 + index * 150}ms` }}
                      >
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                            backgroundSize: '8px 8px',
                            backgroundPosition: '0 0, 0 4px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </aside>
      </div>

      {/* Full Width Content After Grid */}
      <div className="p-6 bg-[#f6f6f6] relative font-sans">
        <Insta />
        <Blogs />
        <Forum />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;