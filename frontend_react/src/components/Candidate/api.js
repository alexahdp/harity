import axios from 'axios';

export default {
  async save(candidate) {
    let result;
    if (candidate._id) {
      result = await axios.put(`/api/candidate/${candidate._id}`, candidate);
    } else {
      result = await axios.post('/api/candidate', candidate);
    }

    return result.data;
  },

  async fetchList() {
    return [
      {
        _id: 'sdfdsd',
        email: 'alex@gmail.com',
        firstName: 'alex',
        lastName: 'pezikov',
        birthYear: 1989,
        level: 'senior',
        description: 'first in list',
      }
    ];

    const result = await axios.get('/api/candidates');
    return result.data;
  },

  async fetch(candidateId) {
    const result = await axios.get(`/api/candidate/${candidateId}`);
    return result.data;
  },

  async remove(candidateId) {
    await axios.delete(`/api/candidate/${candidateId}`);
  }
}
