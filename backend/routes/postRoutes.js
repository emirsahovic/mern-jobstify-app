import express from "express";
import { getAllPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);

export default router;
