import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinancialBasic = () => {
  const [submodules, setSubmodules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmodules = async () => {
      const learningPathId = "66faae800e014d17ed7a0d8e"; 
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

  return (
    <div>
      <h1>Financial Basics</h1>
      {submodules.map((submodule, index) => (
        <div key={index} className="submodule-section">
          <h2>{submodule.title}</h2>
          <p>{submodule.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FinancialBasic;
