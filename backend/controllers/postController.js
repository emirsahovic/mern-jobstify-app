import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

// @route GET api/posts
// @desc Get all posts
// @access Public
const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
})

export { getAllPosts }
