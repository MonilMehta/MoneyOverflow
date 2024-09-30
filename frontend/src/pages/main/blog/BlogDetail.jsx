import React from 'react';
import { Link } from 'react-router-dom';
import './Detail.css';
import BlogCard from './BlogCard';

const BlogDetail = ({ blog, relatedBlogs }) => {
  if (!blog) {
    return <div className="error">Blog not found</div>;
  }

  return (
    <div className="blog-detail">
      <div className="blog-header">
        <h1 className="blog-title1" style={{ fontSize: '3rem', textAlign: 'center' }}>{blog.title}</h1>
        <img src={blog.imageUrl} alt={blog.title} className="blog-image1" style={{ width: '100%', height: 'auto' }} />
        <div className="blog-description1" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <p className="blog-subtitle" style={{ flex: 1, marginRight: '10px' }}>{blog.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;