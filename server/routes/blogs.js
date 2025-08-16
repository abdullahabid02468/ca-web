import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Blog.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.post('/', async (req, res) => {
  try {
    const post = await Blog.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
