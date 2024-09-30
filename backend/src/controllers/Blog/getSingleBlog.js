import { Blog } from "../../models/blogs.models.js";

const getSingleBlog = async (req, res) => {
  const { id } = req.body;
  if(!id){
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSingleBlog };