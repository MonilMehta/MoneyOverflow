import { Quest } from "../../models/community_q.models.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY1);

const aiAnswer = async (req, res) => {
  const { questionId } = req.body;
  if (!questionId) {
    return res.status(400).json({ message: "questionId is required" });
  }
  try {
    // Find the question document containing the question
    const qDoc = await Quest.findOne({ 'quest._id': questionId });
    if (!qDoc) {
      return res.status(404).json({ message: "No questions found" });
    }
    // Find the specific question in the quest array
    const question = qDoc.quest.find(q1 => q1._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
  // Call Gemini API for summarized answer generation (max 3 lines)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(`Answer the following question in a summarized form, maximum 3 lines:\n\n${question.title}\n${question.bodyQ}`);
  const response = await result.response;
  const answer = response.text() || "No answer generated.";
  res.status(200).json({ answer });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};

export { aiAnswer };
