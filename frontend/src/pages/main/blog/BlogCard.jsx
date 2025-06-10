import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import image from './image.jpg'; // Import the local image

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '20px auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
}));

const BlogImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

const BlogCard = ({ blog, onOpen }) => {
  if (!blog) {
    return <Typography color="error">Blog not found.</Typography>; 
  }

  // Use the image from the backend if it exists, otherwise use the local image
  const blogImage = blog?.imageUrl || image; // Use optional chaining to avoid accessing imageUrl of null

  return (
    <StyledCard onClick={() => onOpen(blog)}> 
      <BlogImage src={blogImage} alt={blog.title} /> {/* Use the determined image here */}
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.excerpt || blog.description.slice(0, 100) + '...'} 
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default BlogCard;
