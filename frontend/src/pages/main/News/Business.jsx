import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsGif from '../../../assets/news1.gif';


const NewsContainer = styled.div`
  background-color: #f6f6f6;
  min-height: 100vh;
  padding: 20px;
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

const VerticalLines = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  
  ${Array.from({ length: 10 }, (_, i) => `
    &::${i === 0 ? 'before' : 'after'}:nth-child(${i + 1}) {
      content: '';
      position: absolute;
      height: 100%;
      border-left: 1px dotted black;
      left: ${i * 10}%;
    }
  `).join('')}
`;

const HorizontalLines = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  
  ${Array.from({ length: 8 }, (_, i) => `
    &::${i === 0 ? 'before' : 'after'}:nth-child(${i + 1}) {
      content: '';
      position: absolute;
      width: 100%;
      border-top: 1px dotted black;
      top: ${i * 12.5}%;
    }
  `).join('')}
`;

const NewsTickerContainer = styled.div`
  background-color: #ff5722;
  color: #ffffff;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 16px;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.3);
`;

const NewsTicker = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ticker 300s linear infinite;
  text-transform: uppercase;
  letter-spacing: 2px;

  @keyframes ticker {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
  text-align: left;
  position: relative;
  z-index: 10;
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  position: relative;
  z-index: 10;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

const cardColors = [
  { bg: "#ff5722", text: "#000000", accent: "#ff7043", button: "#ffffff" },
  { bg: "#e8ddd4", text: "#000000", accent: "#d7c4b0", button: "#000000" },
  { bg: "#000000", text: "#ffffff", accent: "#333333", button: "#ff5722" },
  { bg: "#ffffff", text: "#000000", accent: "#f5f5f5", button: "#000000" },
];

const NewsCard = styled.div`
  background-color: ${props => cardColors[props.colorIndex % cardColors.length].bg};
  color: ${props => cardColors[props.colorIndex % cardColors.length].text};
  border: 2px solid ${props => cardColors[props.colorIndex % cardColors.length].accent};
  border-radius: 16px;
  padding: 24px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
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

const NewsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  z-index: 2;
  position: relative;
`;

const NewsDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.9;
  flex-grow: 1;
  z-index: 2;
  position: relative;
  margin-bottom: 24px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;

const LearnMoreButton = styled.button`
  background-color: ${props => cardColors[props.colorIndex % cardColors.length].button};
  color: ${props => {
    const buttonBg = cardColors[props.colorIndex % cardColors.length].button;
    return buttonBg === "#ffffff" ? "#000000" : "#ffffff";
  }};
  border: 2px solid ${props => cardColors[props.colorIndex % cardColors.length].button};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;
  cursor: pointer;
  
  &:hover {
    background-color: transparent;
    color: ${props => cardColors[props.colorIndex % cardColors.length].button};
  }
`;

const LoadMoreButton = styled.button`
  background-color: #ff5722;
  color: #ffffff;
  border: 2px solid #ff5722;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 16px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  letter-spacing: 1px;

  &:hover {
    background-color: transparent;
    color: #ff5722;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 87, 34, 0.3);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  position: relative;
  z-index: 10;
`;

const LoadingGif = styled.img`
  width: 200px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const BusinessNewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState('us');

  const fetchNews = async (page, country) => {
    let API_KEY = process.env.REACT_APP_API_KEY;

    if (!API_KEY) {
      API_KEY = "738f992c50624b6473adcfc351095f59";
    }

    const API_URL = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=${country}&apikey=${API_KEY}&page=${page}`;
    try {
      const response = await axios.get(API_URL);
      setArticles(prevArticles => [...prevArticles, ...response.data.articles]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews(page, country);
  }, [page, country]);
  
  const countries = ['us', 'ca', 'in', 'eu', 'de', 'au'];
  const loadMoreArticles = () => {
    setPage(prevPage => prevPage + 1);
    setCountry(prevCountry => {
      const currentIndex = countries.indexOf(prevCountry);
      const nextIndex = (currentIndex + 1) % countries.length;
      return countries[nextIndex];
    });
  };
  
  return (
    <>

      <NewsContainer>
        <BackgroundPattern />
        <VerticalLines />
        <HorizontalLines />
        
          <>
            <NewsTickerContainer>
              <NewsTicker>
                {articles.map((article, index) => (
                  <span key={index}>{article.title} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</span>
                ))}
              </NewsTicker>
            </NewsTickerContainer>

            <HeaderSection>
              <MainTitle>
                <span className="title-line-1">FIN</span>
                <span className="title-line-2">NEWS</span>
              </MainTitle>
              <Subtitle>
                Stay updated with the latest business news and market insights from around the globe.
              </Subtitle>
              <StatsContainer>
                <StatsBadge>Live Updates</StatsBadge>
                <Asterisk>*</Asterisk>
              </StatsContainer>
            </HeaderSection>

            <NewsGrid>
              {articles.map((article, index) => (
                <NewsCard 
                  key={index} 
                  colorIndex={index}
                  onClick={() => window.open(article.url, '_blank')}
                >
                  <div>
                    <NewsTitle>{article.title}</NewsTitle>
                    <NewsDescription>
                      {article.description}
                    </NewsDescription>
                  </div>
                  
                  <LearnMoreButton colorIndex={index}>
                    Read More →
                  </LearnMoreButton>
                </NewsCard>
              ))}
            </NewsGrid>
            
            <LoadMoreButton onClick={loadMoreArticles}>
              Load More News
            </LoadMoreButton>
          </>
        
      </NewsContainer>
    </>
  );
};

export default BusinessNewsApp;