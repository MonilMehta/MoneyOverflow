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
    },
    image:{
        type:String
    },
    VideoUrl:{
        type:String
    }
  });

const learningPathSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    lessons: [lessonSchema],
    index: { 
        type: Number, 
        required: true, 
        unique: true,
    }
  });

export const LearningPath = mongoose.model('LearningPath',learningPathSchema);
