import { LearningPath } from "../../models/lesson.models.js";

const getLesson = async(req,resp)=>{
    const { learningPathId, order } = req.body;
    try {
        if (!learningPathId || order === undefined) {
            return resp.status(400).json({ message: 'Learning path ID and order are required' });
        }

        const learningPath = await LearningPath.findById(learningPathId);
        if (!learningPath) {
            return resp.status(404).json({ message: 'Learning path not found' });
        }

        const lesson = learningPath.lessons.find(lesson => lesson.order === parseInt(order));
        if (!lesson) {
            return resp.status(404).json({ message: 'Lesson not found' });
        }

        resp.json(lesson);
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Server error' });
    }
}

export {getLesson}

