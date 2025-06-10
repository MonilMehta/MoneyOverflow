import { LearningPath } from "../../models/lesson.models.js";

// POST to get lessons from a specific learning path by order
const getLesson = async (req, res) => {
    const { learningPathId, order } = req.body;
  
    try {
        // Validate the input
        if (!learningPathId || order === undefined) {
            return res.status(400).json({ message: 'Learning path ID and order are required' });
        }

        // Find the learning path
        const learningPath = await LearningPath.findById(learningPathId);
        if (!learningPath) {
            return res.status(404).json({ message: 'Learning path not found' });
        }

        // Check if lessons array exists
        if (!learningPath.lessons || learningPath.lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this learning path' });
        }

        // Find the lesson by order
        const lesson = learningPath.lessons.find(lesson => lesson.order === parseInt(order));
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Send the lesson back as the response
        res.json(lesson);
    } catch (error) {
        console.error(`Error fetching lesson from learning path: ${error.message}`, error);
        res.status(500).json({ message: 'Server error' });
    }
}

export {getLesson}
