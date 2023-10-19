import express from "express";
import { addNewBlog, deleteBlog, getAllBlog, updateNewBlog } from "../controllers/blog-controller";

const router = express.Router();

router.get("/getallblog", getAllBlog);
router.post("/addblog", addNewBlog);
router.put("/updateblog/:id", updateNewBlog);
router.delete("/deleteblog/:id", deleteBlog);

export default router;