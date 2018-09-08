import axios from 'axios';

export default {

  async save(interviewPlan) {
    let res;

    if (interviewPlan._id) {
      res = await axios.put(`/api/interviewPlan/${interviewPlan._id}`, interviewPlan);
    } else {
      res = await axios.post('/api/interviewPlan', interviewPlan);
    }

    return res.data;
  },

  async fetch() {
    const res = await axios.get('/api/interviewplanList');
    return res.data;
  },

  async getInterviewPlan(interviewPlanId) {
    const res = await axios.get(`/api/interviewPlan/${interviewPlanId}`);
    return res.data;
  }
};
