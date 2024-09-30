import { LearningPath } from "../../models/lesson.models.js";

const getLesson = async (req, resp) => {
    const { learningPathId } = req.body;
    
    try {
        // Validate if learningPathId is provided
        if (!learningPathId) {
            return resp.status(400).json({ message: 'Learning path ID is required' });
        }

        // Find the learning path by ID
        const learningPath = await LearningPath.findById(learningPathId);

        // Check if learning path exists
        if (!learningPath) {
            return resp.status(404).json({ message: 'Learning path not found' });
        }

        // Retrieve all lessons from the learning path
        const lessons = learningPath.lessons;

        // If no lessons exist
        if (!lessons || lessons.length === 0) {
            return resp.status(404).json({ message: 'No lessons found for this learning path' });
        }

        // Return all lessons as JSON
        resp.json(lessons);
        
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Server error' });
    }
};

export { getLesson };


