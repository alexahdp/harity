import mongoose from 'mongoose';

const Candidate = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    default: '',
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: null,
  },
  birthYear: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contacts: {
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    skype: {
      type: String,
      unique: true,
      trim: true,
    },
    github: {
      type: String,
      unique: true,
      trim: true,
    },
    level: {
      type: Number,
    },
    experienceTags: [String],
  },
});

export default mongoose.model('Candidate', Candidate);
