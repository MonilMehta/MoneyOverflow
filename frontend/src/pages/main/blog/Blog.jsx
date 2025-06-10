import React, { useEffect, useState, useRef } from 'react';
import BlogCard from './BlogCard'; 
import { Typography, Box, Button, styled } from '@mui/material';
import image from './image.jpg';
import { getBlogs } from "../../../apis/blogs.api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedBlog, setSelectedBlog] = useState(null); 
  const blogDetailRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State for button visibility
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const blogsPerPage = 5; // Number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(getBlogs); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs(); 
  }, []);

  const handleOpen = (blog) => {
    setSelectedBlog(blog); 
    if (blogDetailRef.current) {
      blogDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderDescription = (description) => {
    const paragraphs = description.split('\n').filter(paragraph => paragraph.trim() !== '');
    return paragraphs.map((paragraph, index) => (
      <Typography key={index} paragraph>
        {paragraph.trim()}
      </Typography>
    ));
  };

  // Scroll to Top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show button if scrolled more than 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) return <Typography>Loading...</Typography>; 
  if (error) return <Typography color="error">{error}</Typography>; 

  // Calculate indices for pagination
  const indexOfLastBlog = currentPage * blogsPerPage; 
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage; 
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog); 

  const totalPages = Math.ceil(blogs.length / blogsPerPage); // Total number of pages

  const BlogImage = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  });

  // Use the image from the backend if it exists, otherwise use the local image
  const blogImage = selectedBlog?.imageUrl || image; // Use optional chaining to avoid accessing imageUrl of null

  return (
    <Box display="flex" justifyContent="space-between" padding={2} className="bg-gradient-to-r from-blue-500 to-blue-600">
      {/* Blog Cards Section */}
      <Box flex={1} marginRight={2}>
        {currentBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onOpen={handleOpen} /> 
        ))}

        {/* Pagination Section */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button 
            variant="contained" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)} 
            sx={{ marginRight: 1 }}
          >
            Previous
          </Button>
          <Typography variant="body1" sx={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button 
            variant="contained" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)} 
            sx={{ marginLeft: 1 }}
          >
            Next
          </Button>
        </Box>

        {/* Blog details section */}
        {selectedBlog && (
          <div ref={blogDetailRef} style={{ marginTop: '40px', padding: '20px', backgroundColor: '#2563eb', borderRadius: '8px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '20px' }}>
              {selectedBlog.title}
            </Typography>
            <BlogImage src={blogImage} alt={selectedBlog.title} /> {/* Use the determined image here */}
            {renderDescription(selectedBlog.description)}
          </div>
        )}
      </Box>

      {/* Most Popular Blogs Section */}
      <Box width="300px" padding={2} borderLeft="1px solid #2563eb">
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Most Popular Blogs
        </Typography>
        {blogs.slice(0, 3).map((blog) => (
          <BlogCard key={blog._id} blog={blog} onOpen={handleOpen} />
        ))}
      </Box>

      {/* Scroll to Top Button */}
      {isVisible && (
        <Button 
          variant="contained" 
          sx={{ position: 'fixed', bottom: 30, right: 30, borderRadius: '50%' }} 
          onClick={scrollToTop}
        >
          ↑
        </Button>
      )}
    </Box>
  );
};

export default Blog;
