import mongoose from 'mongoose';

const InterviewPlan = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  questions: [{
    text: {
      type: String,
      required: true,
    },
    questionId: mongoose.Schema.ObjectId,
    labels: [String],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('InterviewPlan', InterviewPlan);
