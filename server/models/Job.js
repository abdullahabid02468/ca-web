import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Job', JobSchema);
