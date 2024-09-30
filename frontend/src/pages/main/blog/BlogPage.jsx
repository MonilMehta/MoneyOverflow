import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'; // Import Material-UI components
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
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(37, 99, 235, 0.5)', // Blue shadow color
          transition: 'box-shadow 0.3s ease', // Smooth transition for hover effect
          '&:hover': {
            boxShadow: '0px 8px 16px rgba(37, 99, 235, 0.7)', // Increased blue shadow on hover
          },
        }}
      >
        {blogDetails.imageUrl && (
          <CardMedia
            component="img"
            image={blogDetails.imageUrl}
            alt={blogDetails.title}
            sx={{
              width: { xs: '100%', md: '40%' },
              height: { xs: '200px', md: 'auto' },
              objectFit: 'cover',
            }} 
          />
        )}
        <CardContent sx={{ flex: '1', padding: '24px' }}> {/* Increased padding for better spacing */}
          <Typography variant="h5" component="div" className="text-center font-bold mb-2">
            {blogDetails.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="text-center mb-4">
            Published on: {new Date(blogDetails.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="text.primary" className="text-justify mb-4">
            {blogDetails.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
