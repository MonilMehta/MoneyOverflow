import { Router } from "express";
import { uploadQuest } from "../controllers/Community/uploadQuestion.js";
import { uploadAns } from "../controllers/Community/uploadAnswer.js";
import { getAns } from "../controllers/Community/getAnswer.js";
import { getQuest } from "../controllers/Community/getQuestions.js";

const router = Router();

router.route("/uploadQuest").post(uploadQuest);

router.route("/getQuest").get(getQuest);

router.route("/uploadAns").post(uploadAns);

router.route("/getAns").post(getAns);

export default router