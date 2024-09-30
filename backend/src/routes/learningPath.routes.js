import { Router } from "express";
import { createLearnPath } from "../controllers/learning/createLearningPath.js";
import { createLesson } from "../controllers/learning/createLesson.js";
import { getLesson } from "../controllers/learning/getLesson.js";
import { markCourseCompleted } from "../controllers/learning/markCourseCompleted.js";
import { checkUnlock } from "../controllers/learning/checkUnlock.js";

const router = Router();

router.route("/createLearningPath").post(createLearnPath);

router.route("/createLesson").post(createLesson);

router.route("/getLesson").post(getLesson);

router.route("/markComplete").post(markCourseCompleted);

router.route("/checkUnlock").post(checkUnlock);

export default router;
