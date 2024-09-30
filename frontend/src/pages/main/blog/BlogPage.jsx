import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { singleBlog } from '../../../apis/blogs.api';

export default function BlogPage() {
  const { id } = useParams(); 
  const [blogDetails, setBlogDetails] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(singleBlog, { id });
        console.log(response.data);
        setBlogDetails(response.data);
      } catch (err) {
        setError('Error fetching blog details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!blogDetails) {
    return <div className="text-center">No blog details found</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-4 text-center">{blogDetails.title}</h1>
      {blogDetails.imageUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={blogDetails.imageUrl}
            alt={blogDetails.title}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      )}
      <p className="text-gray-600 mb-6 text-center">
        Published on: {new Date(blogDetails.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg leading-relaxed text-justify max-w-4xl mx-auto">
        {blogDetails.description}
      </div>
    </div>
  );
}
