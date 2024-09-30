import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content:{ 
        type: String, 
        required: true 
    },
    order: { 
        type: Number,
        required: true
    }
  });

const learningPathSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }, // e.g., "Savings"
    lessons: [lessonSchema], // Array of lessons
  });

export const LearningPath = mongoose.model('LearningPath',learningPathSchema);
