import { Router } from "express";
import { uploadBlog } from "../controllers/Blog/uploadBlog.js";
import { getBlogs } from "../controllers/Blog/getBlog.js";
import { getSingleBlog } from "../controllers/Blog/getSingleBlog.js";
import { summarizeBlog } from "../controllers/Blog/getSummarizeBlog.js";
const router = Router();

router.route("/getBlogs").get(getBlogs);
router.route("/uploadBlog").post(uploadBlog);
router.route("/singleBlog").post(getSingleBlog);
router.route("/summarizeBlog").post(summarizeBlog);
export default router