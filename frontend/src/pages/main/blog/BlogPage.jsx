import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'; // Import Material-UI components
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
      {/* Blog Title */}
      <Typography
        variant="h3"
        component="h1"
        className="font-bold text-center mb-6"
        sx={{
          fontSize: '2.5rem',
          color: '#2563EB', // Blue color for title
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {blogDetails.title}
      </Typography>

      {/* Blog Image */}
      {blogDetails.imageUrl && (
        <CardMedia
          component="img"
          image={blogDetails.imageUrl}
          alt={blogDetails.title}
          sx={{
            width: '100%',
            maxHeight: '500px', // Limiting the height of the image
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '30px',
          }}
        />
      )}

      {/* Blog Content */}
      <Card
        sx={{
          padding: '24px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '0.875rem',
            }}
          >
            Published on: {new Date(blogDetails.createdAt).toLocaleDateString()}
          </Typography>

          {/* Blog Description */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography
              variant="body1"
              color="text.primary"
              className="text-justify mb-4"
              sx={{ fontSize: '1.2rem', lineHeight: '1.6' }}
            >
              {blogDetails.description}
            </Typography>
          </Box>

          {/* Blog Content Split into Paragraphs */}
          {blogDetails.content &&
            blogDetails.content.split('\n').map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                color="text.primary"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '16px' }}
              >
                {paragraph}
              </Typography>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
