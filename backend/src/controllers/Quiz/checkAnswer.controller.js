import { MCQ } from "../../models/questions.models.js";
import { User } from "../../models/user.models.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY1);

const check = async (req, res) => {
  try {
    const { questionId, selectedAnswer, userId } = req.body; 

    const question = await MCQ.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = question.correctAnswer === selectedAnswer;
    let explanation = null;

    try {
      // Call Gemini API for explanation
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Question: ${question.question}\nOptions: ${question.options.join(", ")}\nUser's answer: ${selectedAnswer}\nCorrect answer: ${question.correctAnswer}\n\n${
        isCorrect 
          ? `Explain why option ${question.correctAnswer + 1} is correct and briefly describe the concept behind it. When referring to option numbers in your explanation, add 1 to the number (e.g., use "option 1" for index 0). Keep the explanation under 3 lines, be encouraging, and make it easy to understand.`
          : `Explain why option ${question.correctAnswer + 1} is correct and why option ${selectedAnswer + 1} is incorrect. When referring to option numbers in your explanation, add 1 to the number (e.g., use "option 1" for index 0). Keep the explanation under 3 lines and make it easy to understand.`
      }`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      explanation = response.text();
    } catch (error) {
      console.error("Error generating explanation:", error);
      explanation = isCorrect ? 
        "Great job! The answer is correct." : 
        "An error occurred while generating the explanation.";
    }

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
      explanation,
      points: isCorrect ? (await User.findById(userId)).points : undefined,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { check };
