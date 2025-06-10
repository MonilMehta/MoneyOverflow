import { LearningPath } from "../../models/lesson.models.js";

const createLearnPath = async(req,resp)=>{
    const { name } = req.body;
    try {
        const newLearningPath = new LearningPath({ name });
        await newLearningPath.save();
        resp.status(201).json(newLearningPath);
    } catch (error) {
        resp.status(500).json({ message: 'Server error', error });
    }
}

export {createLearnPath};