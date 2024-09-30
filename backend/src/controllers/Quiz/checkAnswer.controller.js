import { MCQ } from "../../models/questions.models.js";
import { User } from "../../models/user.models.js";

const check = async (req, res) => {
  try {
    const { questionId, selectedAnswer, userId } = req.body; 

    const question = await MCQ.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    if (isCorrect) {
      const user = await User.findById(userId);
      
      if (user) {
        user.points += 1; 
        await user.save();
      }
    }
    res.status(200).json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      points: isCorrect ? (await User.findById(userId)).points : undefined,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { check };
