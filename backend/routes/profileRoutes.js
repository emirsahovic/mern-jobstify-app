import express from "express";
import { getCurrentProfile } from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getCurrentProfile);

export default router;
