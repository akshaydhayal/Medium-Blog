import {Router} from "express";
import { createBlog, getAllBlogs, getBlog, updateBlog } from "../controllers/blogs.controller";
import { authUser } from "../middleware/authUser";

const router=Router();

router.get("/all",getAllBlogs);
router.get("/:blogId",getBlog);
router.post("/create",authUser,createBlog);
router.put("/:blogId",authUser,updateBlog);

export default router;