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
        position,
        website,
        location,
        bio,
        skills,
        facebook,
        github,
        linkedin
    } = req.body;

    if (!position || !skills) {
        res.status(400);
        throw new Error('Please provide your position and skills');
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (position) profileFields.position = position;
    if (website) profileFields.website = normalizeUrl(website);
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (skills) {
        profileFields.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
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
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort'];
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|eq)\b/g, match => `$${match}`);
    query = Profile.find(JSON.parse(queryStr)).populate('user', ['name', 'email']);

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    const profiles = await query;
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

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
const addExperience = asyncHandler(async (req, res, next) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    if (!title || !company || !from) {
        res.status(400);
        throw new Error('Please provide title, company and from date');
    }

    const exp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(exp);
    await profile.save();

    res.status(200).json(profile);
})

// @route DELETE api/profile/experience/:expId
// @desc Delete profile experience
// @access Private
const deleteExperience = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId);
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.status(200).json(profile);
})

// @route PUT api/profile/education
// @desc Add profile education
// @access Private
const addEducation = asyncHandler(async (req, res, next) => {
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    if (!school || !degree || !fieldofstudy || !from) {
        res.status(400);
        throw new Error('Please provide school, degree, fieldofstudy and from date');
    }

    const edu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(edu);
    await profile.save();

    res.status(200).json(profile);
})

// @route DELETE api/profile/education/:eduId
// @desc Delete profile education
// @access Private
const deleteEducation = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.eduId);
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.status(200).json(profile);
})

export {
    getCurrentProfile,
    createProfile,
    getAllProfiles,
    getProfileByUser,
    deleteProfile,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation
}
