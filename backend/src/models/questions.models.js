import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"]
  },
  options: {
    type: [String], 
    required: [true, "Options are required"],
    validate: [arrayLimit, "Exactly four options are required"]
  },
  correctAnswer: {
    type: Number, 
    required: [true, "Correct answer is required"],
    min: 0,
    max: 3
  },
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy" 
  },
  section: {
    type: String,
    required: [true, "Section is required"],
    enum: ["Budgeting", "Saving", "Investing", "Retirement"]
  },
}, {
  timestamps: true 
});

function arrayLimit(val) {
  return val.length === 4;
}

export const MCQ = mongoose.model("MCQ", mcqSchema);
