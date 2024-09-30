import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import BlogCard from './BlogCard';
import BlogDetail from './BlogDetail';
import './Blog.css';
import BlogCard2 from './BlogCard2';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog/getBlogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleOpenBlog = (blog) => {
    const relatedBlogs = blogs
      .filter((b) => b._id !== blog._id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setSelectedBlog(blog);
    setRelatedBlogs(relatedBlogs);
  };

  const currentBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Box display="flex" padding={2} marginTop={8}>
      <Box flex={1} marginRight={2} style={{ marginTop: '90px' }}>
        <h1 className='blog-heading'>Blogs</h1>
        {selectedBlog ? (
          <BlogDetail blog={selectedBlog} relatedBlogs={relatedBlogs} />
        ) : (
          currentBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onOpen={handleOpenBlog} />
          ))
        )}

        {!selectedBlog && (
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button
              variant="contained"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Typography variant="body1" sx={{ margin: '0 10px' }}>
              Page {currentPage} of {Math.ceil(blogs.length / blogsPerPage)}
            </Typography>
            <Button
              variant="contained"
              disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
      <Box flex={0.3} marginLeft={2}>
        <h2 className='blog-heading'>Most Popular</h2>
        {blogs.slice(5, 9).map((blog) => (
          <BlogCard2 key={blog._id} blog={blog} onOpen={handleOpenBlog} />
        ))}
      </Box>
    </Box>
  );
};

export default BlogPage;