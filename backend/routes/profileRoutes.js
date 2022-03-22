import express from "express";
import { createProfile, deleteProfile, getAllProfiles, getCurrentProfile, getProfileByUser } from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getCurrentProfile);
router.post('/', protect, createProfile);
router.get('/', getAllProfiles);
router.get('/user/:userId', getProfileByUser);
router.delete('/', protect, deleteProfile);

export default router;
