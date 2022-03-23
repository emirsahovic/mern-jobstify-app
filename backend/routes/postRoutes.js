import express from "express";
import { createPost, deletePost, getAllPosts, getPostById } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.get('/:postId', getPostById);
router.delete('/:postId', protect, deletePost);

export default router;
