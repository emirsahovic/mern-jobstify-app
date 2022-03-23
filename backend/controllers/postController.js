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

// @route DELETE api/posts/:postId
// @desc Delete a post
// @access Private
const deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You are not authorized for this action');
    }

    await post.remove();

    res.status(200).json({ msg: 'Post deleted' });
})

// @route PUT api/posts/:postId
// @desc Update a post
// @access Private
const updatePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You are not authorized for this action');
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });

    res.status(200).json(updatedPost);
})

// @route PUT api/posts/like/:postId
// @desc Like a post
// @access Private
const likePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        res.status(400);
        throw new Error('Post already liked');
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
})

// @route PUT api/posts/unlike/:postId
// @desc Unlike a post
// @access Private
const unlikePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        res.status(400);
        throw new Error('Post has not yet been liked');
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
})

// @route POST api/posts/comment/:postId
// @desc Comment on a post
// @access Private
const addComment = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.postId);

    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Please provide text');
    }

    const comment = {
        text,
        name: user.name,
        user: req.user.id
    };

    post.comments.unshift(comment);
    await post.save();

    res.json(post.comments);
})

// @route DELETE api/posts/comment/:postId/:commentId
// @desc Delete comment
// @access Private
const deleteComment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.find(comment => comment.id === req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error('Comment does not exist');
    }

    if (comment.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You are not authorized for this action');
    }

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
})

export {
    getAllPosts,
    createPost,
    getPostById,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment
}
