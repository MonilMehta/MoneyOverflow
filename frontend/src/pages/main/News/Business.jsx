import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsGif from '../../../assets/news1.gif';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

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

const LoadingGif = styled.img`
  display: block;
  margin: 50px auto;
`;

const BusinessNewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState('us'); // Initial country

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
      setTimeout(() => {
        toast.info("Subscribe to our newsletter for daily news!", { toastId: 'news' });
      }, 5000);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
    };
    
    useEffect(() => {
      fetchNews(page, country);
    }, [page, country]);
    
    const countries = ['us', 'ca', 'in', 'eu', 'de', 'au']; // List of countries
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
        <ToastContainer />
        <NewsContainer>
          {loading ? (
            <LoadingGif src={NewsGif} style={{ width: '45%', paddingTop: '0' }} alt="loading gif" />
          ) : (
            <>
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
            </>
          )}
        </NewsContainer>
      </>
              )};

export default BusinessNewsApp;
