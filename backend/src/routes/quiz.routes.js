import { Router } from "express";
import {uploadQuestion} from "../controllers/Quiz/upload.controller.js"
import {getQuestions} from "../controllers/Quiz/getQuestion.controller.js"
import {check} from "../controllers/Quiz/checkAnswer.controller.js"
import { getRandomQuestions } from "../controllers/Quiz/getRandom.controller.js";

const router = Router();

router.route("/uploadQuestion").post(uploadQuestion);

router.route("/getQuestion").post(getQuestions);

router.route("/checkAnswer").post(check);

router.route("/getRandom").get(getRandomQuestions);

export default router
