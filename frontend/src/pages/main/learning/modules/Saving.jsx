import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Savings = ({ onNextModule }) => {
  const [submodules, setSubmodules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmodules = async () => {
      const learningPathId = "66faa07b1e549319649a8efa";
      const submodulesData = [];

      try {
        for (let order = 1; order <= 4; order++) {
          const response = await axios.post('http://localhost:8000/api/learning/getLesson', {
            learningPathId,
            order,
          });
          submodulesData.push(response.data);
        }
        setSubmodules(submodulesData);
      } catch (error) {
        console.error("Error fetching submodules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmodules();
  }, []);

  if (loading) {
    return <p>Loading submodules...</p>;
  }

  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="submodule-paragraph">{paragraph}</p>
    ));
  };

  const handleNextClick = () => {
    if (onNextModule && typeof onNextModule === 'function') {
      onNextModule();
    } else {
      console.error("onNextModule is not a function or is not provided");
    }
  };

  // Function to validate and convert YouTube URLs to embed format
  const formatVideoUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div className="financial-basic-page" style={{
        width: '100%',
    }}>
      <h1>Savings</h1>
      {submodules.map((submodule, index) => (
        <div key={index} className="submodule-section">
          <h2 className="submodule-title">{submodule.title}</h2>
          <div className="submodule-content">
            {formatContent(submodule.content)}
          </div>
          {submodule.VideoUrl && formatVideoUrl(submodule.VideoUrl) ? (
            <iframe
              width="560"
              height="315"
              src={formatVideoUrl(submodule.VideoUrl)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No valid video available.</p>
          )}
        </div>
      ))}
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

// Add styles to make the page look decent and responsive
const styles = `
  .financial-basic-page {
    font-size: 14px;
    max-width: 1100px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  .submodule-section {
    margin-bottom: 20px;
  }
  .submodule-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .submodule-content {
    font-size: 14px;
    line-height: 1.6;
    color: #333;
  }
  .submodule-paragraph {
    margin-bottom: 12px;
  }
  .next-button {
    display: block;
    margin: 20px auto 0;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .next-button:hover {
    background-color: #1e40af;
  }
`;

export default ({ onNextModule }) => (
  <>
    <style>{styles}</style>
    <Savings onNextModule={onNextModule} />
  </>
);
