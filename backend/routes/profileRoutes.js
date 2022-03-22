import express from "express";
import {
    addExperience,
    createProfile,
    deleteExperience,
    deleteProfile,
    getAllProfiles,
    getCurrentProfile,
    getProfileByUser,
    addEducation
} from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getCurrentProfile);
router.post('/', protect, createProfile);
router.get('/', getAllProfiles);
router.get('/user/:userId', getProfileByUser);
router.delete('/', protect, deleteProfile);
router.put('/experience', protect, addExperience);
router.delete('/experience/:expId', protect, deleteExperience);
router.put('/education', protect, addEducation);

export default router;
