import { healthCheckController } from "../controllers/HealthCheck.js";
import { Router } from "express";

const router = Router();

router.route("/health").get(healthCheckController);

export default router;