import { MCQ } from "../../models/questions.models.js";

const uploadQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, section, difficultyLevel } = req.body;

    // Create a new MCQ
    const newMCQ = new MCQ({
      question,
      options,
      correctAnswer,
      section,
      difficultyLevel,
    });

    await newMCQ.save();
    res.status(201).json({ message: "Question uploaded successfully", mcq: newMCQ });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export {uploadQuestion}
