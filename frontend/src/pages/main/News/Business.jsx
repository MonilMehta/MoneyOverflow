import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const NewsTickerContainer = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  position: relative;
`;

const NewsTicker = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ticker 300s linear infinite;

  @keyframes ticker {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
`;

const NewsCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const NewsContent = styled.div`
  padding: 15px;
`;

const NewsTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const NewsDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin: 20px auto;
  display: block;

  &:hover {
    background-color: #0056b3;
  }
`;

const countries = ['us', 'ca', 'gb', 'au', 'in']; // List of country codes

const BusinessNewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countryIndex, setCountryIndex] = useState(0);

  const fetchNews = async (page, country) => {
    const API_KEY = process.env.REACT_APP_API_KEY; // Use REACT_APP_ prefix
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
    fetchNews(page, countries[countryIndex]);
  }, [page, countryIndex]);

  const loadMoreArticles = () => {
    setPage(prevPage => prevPage + 1);
    setCountryIndex(prevIndex => (prevIndex + 1) % countries.length);
  };

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  return (
    <NewsContainer>
      <NewsTickerContainer>
        <NewsTicker>
          {articles.map((article, index) => (
            <span key={index}>{article.title} &nbsp;&nbsp;&nbsp;</span>
          ))}
        </NewsTicker>
      </NewsTickerContainer>
      <h1>Latest News</h1>
      <NewsGrid>
        {articles.map((article, index) => (
          <NewsCard key={index} onClick={() => window.open(article.url, '_blank')}>
            <NewsImage src={article.image} alt={article.title} />
            <NewsContent>
              <NewsTitle>{article.title}</NewsTitle>
              <NewsDescription>{article.description}</NewsDescription>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
      <LoadMoreButton onClick={loadMoreArticles}>Load More</LoadMoreButton>
    </NewsContainer>
  );
};

export default BusinessNewsApp;