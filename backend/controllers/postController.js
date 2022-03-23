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

// @route POST api/posts
// @desc Create a post
// @access Private
const createPost = asyncHandler(async (req, res, next) => {
    const { title, text } = req.body;

    if (!title || !text) {
        res.status(400);
        throw new Error('Please provide title and text');
    }

    const user = await User.findById(req.user.id).select('-password');

    const post = await Post.create({
        title,
        text,
        name: user.name,
        user: req.user.id
    })

    res.status(201).json(post);
})

// @route GET api/posts/:postId
// @desc Get post by id
// @access Public
const getPostById = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.status(200).json(post);
})

export { getAllPosts, createPost, getPostById }
