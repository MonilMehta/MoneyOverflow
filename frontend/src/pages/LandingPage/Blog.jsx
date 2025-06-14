import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';

const BlogContainer = styled.div`
  background-color: #f6f6f6;
  min-height: 100vh;
  padding: 60px 0;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow-hidden;
`;

// Background Pattern Component
const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, #000 1px, transparent 1px);
    background-size: 30px 30px;
    background-position: 0 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0;
  position: relative;
  z-index: 10;
  padding: 0 40px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 50px;
  text-align: left;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.isVisible ? '0ms' : '0ms'};
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  line-height: 0.9;
  color: #000000;
  margin-bottom: 16px;
  
  .title-line-1 {
    display: block;
    font-style: italic;
  }
  
  .title-line-2 {
    display: block;
    color: #ff5722;
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  max-width: 600px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatsBadge = styled.div`
  background-color: #000000;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const Asterisk = styled.div`
  font-size: 2rem;
  color: #000000;
  font-weight: bold;
`;

const BlogGrid = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const cardColors = [
  { bg: "#ff5722", text: "#000000", accent: "#ff7043", button: "#ffffff" },
  { bg: "#e8ddd4", text: "#000000", accent: "#d7c4b0", button: "#000000" },
  { bg: "#000000", text: "#ffffff", accent: "#333333", button: "#ff5722" },
  { bg: "#ffffff", text: "#000000", accent: "#f5f5f5", button: "#000000" },
];

const BlogCard = styled.div`
  background-color: ${props => cardColors[props.colorIndex % cardColors.length].bg};
  color: ${props => cardColors[props.colorIndex % cardColors.length].text};
  border: 2px solid ${props => cardColors[props.colorIndex % cardColors.length].accent};
  border-radius: 16px;
  padding: 32px;
  height: 550px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  /* Animation properties */
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.isVisible ? `${props.animationDelay}ms` : '0ms'};
  
  &:hover {
    transform: ${props => props.isVisible ? 'translateY(-8px)' : 'translateY(30px)'};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, currentColor 25%, transparent 25%), 
                      linear-gradient(-45deg, currentColor 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 5px;
    opacity: 0.05;
    pointer-events: none;
    border-radius: 16px;
  }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  z-index: 2;
  position: relative;
`;

const AuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid currentColor;
  opacity: 0.9;
`;

const AuthorInfo = styled.div`
  margin-left: 12px;
`;

const AuthorName = styled.p`
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  opacity: 0.9;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

const BlogTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
  z-index: 2;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BlogDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.9;
  flex-grow: 1;
  z-index: 2;
  position: relative;
  margin-bottom: 32px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const TagsAndAction = styled.div`
  z-index: 2;
  position: relative;
`;

const CategoryTag = styled.div`
  display: inline-block;
  background-color: ${props => cardColors[props.colorIndex % cardColors.length].button};
  color: ${props => {
    const buttonBg = cardColors[props.colorIndex % cardColors.length].button;
    return buttonBg === "#ffffff" ? "#000000" : "#ffffff";
  }};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
`;

const ReadMoreText = styled.div`
  color: ${props => cardColors[props.colorIndex % cardColors.length].button};
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
  letter-spacing: 1px;
  text-align: center;
`;

const Blog = () => {
  const [blogs, setBlogs] = useState();
  const [render, setRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Mock data for demonstration
  const mockBlogs = [
    {
      _id: "1",
      title: "The Future of Fintech",
      description: "Exploring emerging technologies that are reshaping the financial landscape and creating new opportunities for innovation in the digital economy."
    },
    {
      _id: "2", 
      title: "Investment Strategies for 2024",
      description: "Comprehensive guide to modern investment approaches, risk management, and portfolio diversification strategies for the current market environment."
    },
    {
      _id: "3",
      title: "Digital Banking Revolution",
      description: "How digital-first banking is transforming customer experiences and operational efficiency in the financial services industry."
    }
  ];

  useEffect(() => {
    // Using mock data for demonstration
    setBlogs(mockBlogs.slice(0, 3));
    setRender(true);
    
    // Uncomment this for real API call
    // const fetchBlogs = async () => {
    //   try {
    //     const response = await fetch(getBlogs);
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     setBlogs(data.slice(0, 3));
    //     setRender(true);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchBlogs();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when section goes out of view
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before the section comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [render]);

  return (
    <>
      {render && (
        <BlogContainer ref={sectionRef}>
          <BackgroundPattern />
          <ContentWrapper>
            <HeaderSection isVisible={isVisible}>
              <MainTitle>
                <span className="title-line-1">LATEST</span>
                <span className="title-line-2 italic">FIN STORIES</span>
              </MainTitle>
              <Subtitle>
                Discover insights, tips, and expert perspectives from our editorial team.
              </Subtitle>
              <StatsContainer>
                <StatsBadge>Fresh Content</StatsBadge>
                <Asterisk>*</Asterisk>
              </StatsContainer>
            </HeaderSection>

            <BlogGrid>
              {blogs && blogs.map((blog, index) => {
                // Reverse the order so latest (index 0) appears on the left
                const displayIndex = blogs.length - 1 - index;
                return (
                  <BlogCard 
                    key={blog._id} 
                    colorIndex={displayIndex}
                    isVisible={isVisible}
                    animationDelay={index * 200}
                  >
                    <div>
                      <BlogTitle>{blog.title}</BlogTitle>
                      <BlogDescription>
                        {blog.description.substring(0, 150)}...
                      </BlogDescription>
                    </div>
                    
                    <TagsAndAction>
                      <CategoryTag colorIndex={displayIndex}>
                        FIN STUDY
                      </CategoryTag>
                      <ReadMoreText colorIndex={displayIndex}>
                        Sign Up To Read Full Story →
                      </ReadMoreText>
                    </TagsAndAction>
                  </BlogCard>
                );
              })}
            </BlogGrid>
          </ContentWrapper>
        </BlogContainer>
      )}
    </>
  );
};

export default Blog;