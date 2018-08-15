import mongoose from 'mongoose';
import conf from '../config/appconf.ts';

const Question = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  labels: [{
    type: String,
    enum: ['frontend', 'backend', 'js', 'node', 'react', 'html'],
    trim: true,
    index: true,
  }],
  complexity: {
    type: Number,
  }
});

Question.statics.getTagList = function() {
  return conf.questionTags;
};

export default mongoose.model('Question', Question);
