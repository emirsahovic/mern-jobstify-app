import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';
import normalizeUrl from 'normalize-url';

// @desc    Get current users profile
// @method  GET /api/profile/me
// @access  Private
const getCurrentProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

    if (!profile) {
        res.status(404);
        throw new Error('There is no profile for this user');
    }

    res.status(200).json(profile);
})

// @desc    Create profile
// @method  POST /api/profile
// @access  Private
const createProfile = asyncHandler(async (req, res, next) => {
    const {
        website,
        location,
        bio,
        skills,
        facebook,
        github,
        linkedin
    } = req.body;

    if (!skills) {
        res.status(400);
        throw new Error('Please provide your skills');
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) profileFields.website = normalizeUrl(website);
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (facebook) profileFields.social.facebook = normalizeUrl(facebook);
    if (github) profileFields.social.github = normalizeUrl(github);
    if (linkedin) profileFields.social.linkedin = normalizeUrl(linkedin);

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
        return res.status(200).json(profile);
    }

    profile = await Profile.create(profileFields);
    res.status(201).json(profile);
})

// @desc    Get all profiles
// @method  GET /api/profile
// @access  Public
const getAllProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find().populate('user', ['name', 'email']);

    res.status(200).json(profiles);
})

// @desc    Get profile by user id
// @method  GET /api/profile/user/:userId
// @access  Public
const getProfileByUser = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);

    if (!profile) {
        res.status(404);
        throw new Error('There is no profile for this user');
    }

    res.status(200).json(profile);
})

// @route DELETE api/profile
// @desc Delete profile and user
// @access Private
const deleteProfile = asyncHandler(async (req, res, next) => {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.status(200).json({ msg: 'User deleted' });
})

export { getCurrentProfile, createProfile, getAllProfiles, getProfileByUser, deleteProfile }
