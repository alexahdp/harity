import axios from 'axios';

const interviewPlans = [
  {
    _id: 'dcsf3',
    title: 'Test plan',
    createdAt: '2018-09-01',
  }
];

export default {
  async save(interviewPlan) {
    let res;
    if ( ! interviewPlan._id) {
      interviewPlan._id = Math.round(Math.random() * 100000);
      interviewPlans.push(interviewPlan);
    } else {
      interviewPlans.forEach(_ => {
        if (_._id === interviewPlan._id) {
          Object.assign(_, interviewPlan);
        }
      })
    }

    return interviewPlan;
    // if (interviewPlan._id) {
    //   res = await axios.put(`/api/interviewPlan/${interviewPlan._id}`, interviewPlan);
    // } else {
    //   res = await axios.post('/api/interviewPlan', interviewPlan);
    // }

    return res.data;
  },

  async fetch() {
    return interviewPlans;
  }
};
