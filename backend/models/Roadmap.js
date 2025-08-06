import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeText: String,
  interests: [String],
  roadmapText: String,
}, { timestamps: true });

export default mongoose.model('Roadmap', roadmapSchema);
