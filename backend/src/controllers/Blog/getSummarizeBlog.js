import { Blog } from "../../models/blogs.models.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY1);

const summarizeBlog = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Call Gemini API for summarization
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`Summarize the following blog in max 4 lines:\n\n${blog}`);
    const response = await result.response;
    const summary = response.text() || "No summary generated.";

    res.status(200).json({ summary });
  } catch (error) {
    console.error(error.response?.data || error.message); // Add this line
    res.status(500).json({ error: error.message });
  }
};

export { summarizeBlog };