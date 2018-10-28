import mongoose from 'mongoose';

const Candidate = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  sex: {
    type: String,
    enum: ['none', 'male', 'female'],
    default: 'none',
  },
  birthYear: {
    type: Date,
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
  skills: {
    type: [String],
    default: [],
  },
  level: {
    type: String,
    default: 'none',
  },

  contacts: {
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: v => v ? v : undefined,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: v => v ? v : undefined,
    },
    skype: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: v => v ? v : undefined,
    },
    github: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: v => v ? v : undefined,
    },
  },
});

export default mongoose.model('Candidate', Candidate);
