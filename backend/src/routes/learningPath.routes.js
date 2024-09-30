import { Router } from "express";
import { createLearnPath } from "../controllers/learning/createLearningPath.js";
import { createLesson } from "../controllers/learning/createLesson.js";
import { getLesson } from "../controllers/learning/getLesson.js";

const router = Router();

router.route("/createLearningPath").post(createLearnPath);
router.route("/createLesson").post(createLesson);
router.route("/getLesson").get(getLesson);

export default router