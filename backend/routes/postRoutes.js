import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, likePost, unlikePost, updatePost } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.get('/:postId', getPostById);
router.delete('/:postId', protect, deletePost);
router.put('/:postId', protect, updatePost);
router.put('/like/:postId', protect, likePost);
router.put('/unlike/:postId', protect, unlikePost);

export default router;
