const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Create a new post
router.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get single post by id
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update a post by id
router.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete a post by id
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.remove();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
