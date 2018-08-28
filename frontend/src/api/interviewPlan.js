import axios from 'axios';

export default {
  async save(interviewPlan) {
    let res;
    if (interviewPlan._id) {
      res = await axios.put(`/api/interviewplan/${interviewPlan._id}`, interviewPlan);
    } else {
      res = await axios.post('/api/interviewplan/', interviewPlan);
    }

    return res.data;
  },

  async fetchList() {
    const res = await axios.get('/api/interviewplanList');
    return res.data;
  },

  async get(interviewPlanId) {
    const res = await axios.get(`/api/interviewplan/${interviewPlanId}`);
    return res.data;
  },

  async remove(interviewPlanId) {
    await axios.delete(`/api/interviewplan/${interviewPlanId}`);
  },
};
