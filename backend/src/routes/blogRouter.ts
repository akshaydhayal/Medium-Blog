import {Router} from "express";
import { createBlog, getAllBlogs, getBlog, updateBlog } from "../controllers/blogs.controller";

const router=Router();

router.get("/all",getAllBlogs);
router.get("/:blogId",getBlog);
router.post("/create",createBlog);
router.put("/:blogId",updateBlog);

export default router;