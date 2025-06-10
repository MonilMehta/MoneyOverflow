import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    questionId:mongoose.Schema.Types.ObjectId,
    bodyA:{
       type: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const Answer=new mongoose.model('answers',answerSchema);

