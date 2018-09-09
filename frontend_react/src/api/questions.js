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
    const questionClone = {
      ...question,
      labels: question.labels.map(label => label),
    };

    if ( ! question._id) {
      questionClone._id = Math.round(Math.random() * 100000);
      return questionClone;
    }

    let res;
    if (question._id) {
      res = await axios.put(`/api/question/${questionClone._id}`, questionClone);
    } else {
      res = await axios.post('/api/question', questionClone);
    }

    const savedQuestion = res.data;
    savedQuestion.labels = savedQuestion.labels.map(label => ({ text: label }));
    return savedQuestion;
  },

  async remove(questionId) {
    await axios.delete(`/api/question/${questionId}`);
  },
};
