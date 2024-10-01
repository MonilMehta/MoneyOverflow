import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WealthBuilding = () => {
  const [submodules, setSubmodules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmodules = async () => {
      const learningPathId = "66fafd517fde7cf93c2ba72e";
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

  return (
    <div className="financial-basic-page" style={{
        width: '100%',
    }}>
      <h1>Wealth Building</h1>
      {submodules.map((submodule, index) => (
        <div key={index} className="submodule-section">
          <h2 className="submodule-title">{submodule.title}</h2>
          <div className="submodule-content">
            {formatContent(submodule.content)}
          </div>
          <img src={submodule.image} alt=" " />
          <iframe 
              width="560" 
              height="315" 
              src={submodule.VideoUrl}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
        </div>
      ))}
    </div>
  );
};

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
`;

export default () => (
  <>
    <style>{styles}</style>
    <WealthBuilding />
  </>
);
