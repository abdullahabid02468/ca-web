import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const msgs = await Contact.find().sort({ createdAt: -1 });
  res.json(msgs);
});

router.post('/', async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
