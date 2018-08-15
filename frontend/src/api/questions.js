import axios from 'axios';

export default {
  async fetch() {
    const res = await axios.get('/api/questions');
    return res.data;
  },

  async fetchTags() {
    const res = await axios.get('/api/questionTags');
    return res.data;
  },

  async save(question) {
    let res;
    if (question._id) {
      res = await axios.put(`/api/question/${question._id}`, question);
    } else {
      res = await axios.post('/api/question', question);
    }
    return res.data;
  },

  async remove(questionId) {
    await axios.delete(`/api/question/${questionId}`);
  },
};
