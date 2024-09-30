import { Router } from "express";
import { uploadBlog } from "../controllers/Blog/uploadBlog.js";
import { getBlogs } from "../controllers/Blog/getBlog.js";
const router = Router();

router.route("/getBlogs").get(getBlogs);
router.route("/uploadBlog").post(uploadBlog);

export default router