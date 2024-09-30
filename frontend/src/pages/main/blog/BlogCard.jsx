import React from 'react';
import './blogcard.css'; // Make sure to create this CSS file

const BlogCard = ({ blog, onOpen }) => {
  const { title, description, imageUrl } = blog;

  return (
    <div className="blog-card" onClick={() => onOpen(blog)}>
      <img src={imageUrl} alt={title} className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">{title}</h2>
        <p className="blog-description">{description.slice(0, 50)}</p>
      </div>
    </div>
  );
};

export default BlogCard;
