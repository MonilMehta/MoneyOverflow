import { MCQ } from "../../models/questions.models.js";

const getQuestions = async (req, res) => {
  try {
    const { section, difficulty } = req.body;

    if (!section) {
      return res.status(400).json({ message: "Section is required" });
    }

    if (!difficulty) {
      return res.status(400).json({ message: "Difficulty level is required" });
    }

    const questions = await MCQ.find({ section, difficultyLevel: difficulty });

    if (questions.length === 0) {
      return res.status(404).json({ message: `No questions found for section: ${section} with difficulty: ${difficulty}` });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getQuestions };

