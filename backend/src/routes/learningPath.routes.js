import { Router } from "express";
import { createLearnPath } from "../controllers/learning/createLearningPath.js";
import { createLesson } from "../controllers/learning/createLesson.js";
import { getLesson } from "../controllers/learning/getLesson.js";

const router = Router();

// POST route to create a learning path
router.route("/createLearningPath").post(createLearnPath);

// POST route to add lessons to a learning path
router.route("/createLesson").post(createLesson);

// GET route to get a lesson from a learning path by ID and order
router.route("/getLesson").post(getLesson);

export default router;
