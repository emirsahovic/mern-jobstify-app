import express from "express";
import { createProfile, getAllProfiles, getCurrentProfile } from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getCurrentProfile);
router.post('/', protect, createProfile);
router.get('/', getAllProfiles);

export default router;
