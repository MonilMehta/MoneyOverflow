import {Blog} from "../../models/blogs.models.js";

const uploadBlog = async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;
  
      const newBlog = new Blog({
        title,
        description,
        imageUrl
      });
  
      await newBlog.save();
      res.status(201).json({ message: "Blog uploaded successfully", newBlog });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
export {uploadBlog}