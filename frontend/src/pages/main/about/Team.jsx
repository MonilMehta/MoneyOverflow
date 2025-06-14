import React, { useEffect, useRef } from 'react';
import { BookOpen, Users, TrendingUp, Award, MessageCircle, Mail, BarChart3, DollarSign, Target, Heart } from 'lucide-react';

const Team = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in-element');
    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const features = [
    {
      title: "Learning Modules",
      description: "Explore easy-to-follow lessons on budgeting, investing, loans, credit scores, taxes, and more",
      highlight: "LEARN NOW",
      subtitle: "Master financial concepts step by step",
      icon: BookOpen
    },
    {
      title: "Quiz Section", 
      description: "Test and reinforce your knowledge through engaging quizzes designed for all levels",
      highlight: "TEST SKILLS",
      subtitle: "Challenge yourself with interactive quizzes",
      icon: Award
    },
    {
      title: "Case Studies",
      description: "Learn from real-world financial situations and understand practical applications",
      highlight: "EXPLORE CASES",
      subtitle: "Real scenarios, real solutions",
      icon: BarChart3
    },
    {
      title: "Finance News",
      description: "Stay informed with the latest financial news and trends curated in one place",
      highlight: "STAY UPDATED",
      subtitle: "Latest market insights daily",
      icon: TrendingUp
    },
    {
      title: "Trade Simulation",
      description: "Visualize and understand trading with interactive simulations and market patterns",
      highlight: "START TRADING",
      subtitle: "Practice without risk",
      icon: DollarSign
    },
    {
      title: "Community Forum",
      description: "Ask questions, share insights, and get expert advice from professionals and peers",
      highlight: "JOIN COMMUNITY",
      subtitle: "Connect with fellow learners",
      icon: MessageCircle
    }
  ];

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

  const stats = [
    { number: "50+", label: "Active Users" },
    { number: "10+", label: "Learning Modules" },
    { number: "24/7", label: "Support" },
    { number: "90%", label: "Success Rate" }
  ];

  return (
    <div className="bg-[#f6f6f6] font-sans relative overflow-hidden">
      {/* CSS Styles for animations */}
      <style jsx>{`
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fade-in-element.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-element.delay-100 {
          transition-delay: 0.1s;
        }
        
        .fade-in-element.delay-200 {
          transition-delay: 0.2s;
        }
        
        .fade-in-element.delay-300 {
          transition-delay: 0.3s;
        }
        
        .fade-in-element.delay-400 {
          transition-delay: 0.4s;
        }
        
        .fade-in-element.delay-500 {
          transition-delay: 0.5s;
        }
        
        .fade-in-element.delay-600 {
          transition-delay: 0.6s;
        }
        
        .fade-in-left {
          transform: translateX(-30px) translateY(0);
        }
        
        .fade-in-right {
          transform: translateX(30px) translateY(0);
        }
        
        .fade-in-up {
          transform: translateY(50px);
        }
        
        .fade-in-scale {
          transform: scale(0.9) translateY(20px);
        }
        
        .fade-in-element.animate-in.fade-in-left,
        .fade-in-element.animate-in.fade-in-right,
        .fade-in-element.animate-in.fade-in-up,
        .fade-in-element.animate-in.fade-in-scale {
          transform: translateX(0) translateY(0) scale(1);
        }
      `}</style>

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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="fade-in-element fade-in-scale text-6xl sm:text-8xl font-black tracking-tight text-[#000000] leading-tight mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="block italic">MONEY</span>
            <span className="block text-[#ff5722] italic">OVERFLOW</span>
          </h1>
          <p className="fade-in-element fade-in-up delay-200 text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Democratizing financial literacy by making financial education engaging, easy to understand, and accessible to all.
          </p>
          <div className="fade-in-element fade-in-up delay-400 mt-8 flex justify-center items-center gap-6 flex-wrap">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black text-white px-6 py-3 rounded-full text-lg font-bold transform hover:scale-105 transition-transform">
                {stat.number} <span className="text-orange-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section - Full Width */}
      <section className="py-16 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-none mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-in-element fade-in-left px-4 lg:px-12">
                <h2 className="text-5xl font-black tracking-tight text-[#000000] mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                  OUR <span className="text-[#ff5722]">STORY</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    In today's fast-paced world, financial decisions play a crucial role in shaping one's future — yet many people still lack the basic financial literacy needed to make informed choices.
                  </p>
                  <p>
                    <strong>MoneyOverflow</strong> was born from a simple idea — <em>to make financial knowledge accessible, practical, and engaging</em> — created by a team of finance professionals, educators, and tech enthusiasts who believe that <em>financial freedom starts with education</em>.
                  </p>
                  <p>
                    We noticed a significant gap: while financial products are easily available, understanding them isn't. MoneyOverflow aims to bridge that gap and empower everyday individuals with the tools they need.
                  </p>
                </div>
              </div>
              <div className="fade-in-element fade-in-right delay-300 px-4 lg:px-12">
                <div className="bg-black text-white p-8 rounded-[20px] shadow-xl">
                  <div className="flex items-center mb-6">
                    <Heart className="h-12 w-12 text-orange-500 mr-4" />
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    To democratize financial literacy by making financial education engaging, easy to understand, and accessible to all. Everyone deserves the confidence to make smart financial choices.
                  </p>
                  <div className="mt-6 bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold inline-block">
                    EMPOWERING FUTURES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="fade-in-element fade-in-up text-5xl font-black tracking-tight text-[#000000] mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              WHAT WE <span className="text-[#ff5722]">OFFER</span>
            </h2>
            <p className="fade-in-element fade-in-up delay-200 text-xl text-gray-700 max-w-3xl mx-auto">
              Interactive and educational features designed to make learning about money effective and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colorScheme = selectedColors[index % selectedColors.length];
              const isOrange = colorScheme.bg === "#ff5722";
              const isBeige = colorScheme.bg === "#e8ddd4";
              const isBlack = colorScheme.bg === "#000000";
              const Icon = feature.icon;
              const delayClass = `delay-${Math.min((index + 1) * 100, 600)}`;
              
              return (
                <div 
                  key={index} 
                  className={`fade-in-element fade-in-scale ${delayClass} rounded-[16px] overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:scale-105 cursor-pointer group`} 
                  style={{
                    backgroundColor: colorScheme.bg,
                    color: colorScheme.text,
                    border: `2px solid ${colorScheme.accent}`,
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <div className="p-6 h-96 flex flex-col justify-between relative">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${isBlack ? 'bg-orange-500' : isOrange ? 'bg-white' : 'bg-black'} transition-transform group-hover:scale-110 group-hover:rotate-12`}>
                        <Icon className={`h-8 w-8 ${isBlack ? 'text-black' : isOrange ? 'text-orange-500' : 'text-white'}`} />
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="text-center flex-1">
                      <h3 className="text-2xl font-black leading-tight tracking-wide uppercase mb-3">
                        {feature.title}
                      </h3>
                      
                      {isOrange && (
                        <div className="text-2xl font-black text-white mb-3">
                          {feature.highlight}
                        </div>
                      )}
                      
                      <p className={`text-base leading-snug mb-4 ${isBlack ? 'text-gray-300' : 'text-current'}`}>
                        {feature.description}
                      </p>
                      
                      <p className="text-sm opacity-80 italic">
                        {feature.subtitle}
                      </p>
                    </div>
                    
                    {/* Bottom Content */}
                    <div className="mt-4">
                      {isBeige && (
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white animate-pulse"></div>
                            <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white animate-pulse" style={{animationDelay: '1s'}}></div>
                          </div>
                          <div className="text-sm font-bold">
                            {feature.highlight}
                          </div>
                        </div>
                      )}
                      
                      {isBlack && (
                        <div className="text-center mb-3">
                          <div className="bg-orange-500 text-black px-3 py-1 rounded text-sm font-bold inline-block">
                            {feature.highlight}
                          </div>
                        </div>
                      )}
                      
                      <button className="w-full bg-transparent border border-current px-4 py-2 rounded text-sm font-bold hover:bg-current hover:text-white transition-colors">
                        EXPLORE NOW →
                      </button>
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
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="fade-in-element fade-in-up text-5xl font-black tracking-tight text-[#000000] text-center mb-12" style={{ fontFamily: 'Arial, sans-serif' }}>
            WHY <span className="text-[#ff5722]">CHOOSE US?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "User-Centric Design", desc: "Learn at your pace and comfort with intuitive interface" },
              { title: "Practical Learning", desc: "Real-life scenarios and case-based education, not just theory" },
              { title: "Expert Insights", desc: "Direct access to professionals and verified financial advice" },
              { title: "Always Updated", desc: "Fresh content based on latest market trends and news" },
              { title: "Inclusive Community", desc: "A safe space to learn, share, and grow together" },
              { title: "Proven Results", desc: "95% of users report improved financial confidence" }
            ].map((item, index) => (
              <div key={index} className={`fade-in-element fade-in-up delay-${Math.min((index + 1) * 100, 600)} bg-white p-6 rounded-[16px] shadow-lg border-2 border-gray-100 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-black">{item.title}</h3>
                </div>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-element fade-in-scale bg-black text-white p-12 rounded-[20px] shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-black mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
              JOIN OUR <span className="text-orange-500">MISSION</span>
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              We're building a financially literate future — one user at a time. Whether you're a student, professional, homemaker, or retiree, MoneyOverflow is your partner in financial growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-400 transition-colors hover:scale-105 transform">
                START YOUR JOURNEY
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-colors">
                NEWSLETTER SIGNUP
              </button>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Mail className="h-6 w-6 text-orange-500 mr-2" />
              <span className="text-gray-300">Weekly tips delivered to your inbox</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;