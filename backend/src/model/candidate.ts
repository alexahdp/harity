import mongoose from 'mongoose';

const Candidate = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthYear: {
    type: Number,
  },
  description: {

  },
});

export default mongoose.model('Candidate', Candidate);
