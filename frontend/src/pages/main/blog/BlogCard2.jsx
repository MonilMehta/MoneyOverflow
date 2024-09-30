import React from 'react';
import './blogcard.css'; // Make sure to create this CSS file

const BlogCard = ({ blog,onOpen }) => {
  const { title, description, imageUrl } = blog;

  return (
    <div className="blog-card2" onClick={() => onOpen(blog)}>
      <img src={imageUrl} alt={title} className="blog-image2" />
      <div className="blog-content2">
        <h2 className="blog-title2">{title}</h2>
        <p className="blog-description2">{description.slice(0, 50)}</p>
      </div>
    </div>
  );
};

export default BlogCard;