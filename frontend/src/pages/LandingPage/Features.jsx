import React from 'react';
import { BarChart, BookOpen, Users } from 'lucide-react';

const Features = () => {
  // Updated color schemes to match the modern design
  const cardColors = [
    {
      bg: "#ff5722",
      text: "#ffffff",
      accent: "#ff7043",
      iconBg: "#ffffff",
      iconColor: "#ff5722"
    },
    {
      bg: "#e8ddd4",
      text: "#000000",
      accent: "#d7c4b0",
      iconBg: "#000000",
      iconColor: "#ffffff"
    },
    {
      bg: "#000000",
      text: "#ffffff",
      accent: "#333333",
      iconBg: "#ff5722",
      iconColor: "#ffffff"
    }
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Learn and grow with peers",
      icon: Users
    },
    {
      title: "Comprehensive Curriculum", 
      description: "Complete learning pathways",
      icon: BookOpen
    },
    {
      title: "Community Support",
      description: "Connect with like-minded learners",
      icon: BarChart
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden" id='section'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0'
          }}
        />
      </div>

      {/* Vertical Lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-dotted border-black"
            style={{ left: `${i * 12.5}%` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {features.map((feature, index) => {
          const colorScheme = cardColors[index % cardColors.length];
          const Icon = feature.icon;
          const marginTop = index === 0 ? '0vh' : index === 1 ? '10vh' : '20vh';
          
          return (
            <div
              key={index}
              className="relative overflow-hidden shadow-xl rounded-[20px] transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
              style={{
                height: '75vh',
                marginTop: marginTop,
                backgroundColor: colorScheme.bg,
                color: colorScheme.text,
                border: `3px solid ${colorScheme.accent}`,
                fontFamily: 'Arial, sans-serif'
              }}
            >
              {/* Content Container */}
              <div className="px-6 py-8 sm:px-8 sm:py-12 relative z-10 flex flex-col justify-center items-center h-full text-center">
                {/* Icon */}
                <div 
                  className="flex-shrink-0 rounded-full p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg transition-transform hover:scale-110"
                  style={{
                    backgroundColor: colorScheme.iconBg,
                    border: `2px solid ${colorScheme.accent}`
                  }}
                >
                  <Icon 
                    className="h-12 w-12 sm:h-16 sm:w-16" 
                    style={{ color: colorScheme.iconColor }}
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-center items-center max-w-full">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4 leading-tight uppercase break-words hyphens-auto">
                    {feature.title}
                  </h3>
                  <p className="text-lg sm:text-xl font-medium opacity-90 leading-relaxed break-words">
                    {feature.description}
                  </p>
                  
                  {/* Decorative Element */}
                  <div className="mt-4 sm:mt-6 flex justify-center">
                    <div 
                      className="w-16 h-1 rounded-full"
                      style={{ backgroundColor: colorScheme.iconBg }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <div 
                  className="w-8 h-8 border-2 rounded-full"
                  style={{ borderColor: colorScheme.text }}
                />
              </div>
              
            

              {/* Background Pattern Overlay */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[20px] opacity-5">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%)',
                    backgroundSize: '15px 15px',
                    backgroundPosition: '0 0, 0 7.5px'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;