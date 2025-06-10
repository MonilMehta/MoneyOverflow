import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [10000, "Description cannot exceed 10000 characters"]
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    match: [/\.(jpeg|jpg|gif|png)$/, "Please enter a valid image URL"],
  }
}, {
  timestamps: true 
});

export const Blog = mongoose.model('Blog', blogPostSchema);


