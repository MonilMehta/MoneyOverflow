import { Router } from "express";
import { uploadBlog } from "../controllers/Blog/uploadBlog.js";
import { getBlogs } from "../controllers/Blog/getBlog.js";
import { getSingleBlog } from "../controllers/Blog/getSingleBlog.js";
const router = Router();

router.route("/getBlogs").get(getBlogs);
router.route("/uploadBlog").post(uploadBlog);
router.route("/singleBlog").post(getSingleBlog);

export default router