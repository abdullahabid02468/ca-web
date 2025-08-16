import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import blogs from './routes/blogs.js';
import jobs from './routes/jobs.js';
import contacts from './routes/contacts.js';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/caweb';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error', err));

app.use('/api/blogs', blogs);
app.use('/api/jobs', jobs);
app.use('/api/contacts', contacts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
