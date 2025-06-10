import { LearningPath } from "../../models/lesson.models.js";

const createLesson = async(req,resp)=>{
    const { learningPathId, title, content, order, image} = req.body;
    try {
        const learningPath = await LearningPath.findById(learningPathId);
        if (!learningPath) {
            return resp.status(404).json({ message: 'Learning path not found' });
        }
        const newLesson = {
            title,
            content,
            order,
            image
        };
        learningPath.lessons.push(newLesson);
        await learningPath.save();

        resp.status(201).json(newLesson);
    } catch (error) {
        resp.status(500).json({ message: 'Server error', error });
    }
}

export {createLesson};