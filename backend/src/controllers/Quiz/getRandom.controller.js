import { MCQ } from "../../models/questions.models.js";

const getRandomQuestions = async (req, res) => {
  try {
    const randomQuestions = await MCQ.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getRandomQuestions };
