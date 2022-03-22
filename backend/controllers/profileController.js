import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';

// @desc    Get current users profile
// @method  POST /api/profile/me
// @access  Private
const getCurrentProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

    if (!profile) {
        res.status(404);
        throw new Error('There is no profile for this user');
    }

    res.status(200).json(profile);
})

export { getCurrentProfile }
