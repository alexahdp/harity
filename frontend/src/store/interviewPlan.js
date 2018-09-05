import api from '../api/interviewPlan';
import router from '../router';

const localState = {
  interviewPlan: {
    _id: null,
    title: '',
    questions: [],
  },

  // список планов
  list: [],
};


const getters = {
  interviewPlan: () => localState.interviewPlan,
  list: () => localState.list,
};


const actions = {
  async fetchList(context) {
    const interviewPlans = await api.fetchList();
    context.commit('setInterviewPlanList', interviewPlans);
  },

  async save(context, payload) {
    const questionListMap = payload.questionList.reduce((o, question) => {
      o[question._id] = { // eslint-disable-line no-param-reassign
        ...question,
        labels: question.labels.map(label => label.text),
      };
      return o;
    }, {});

    const interviewPlan = {
      _id: payload.interviewPlan._id,
      title: payload.interviewPlan.title,
      questions: payload.interviewPlan.questions.map(questionId => questionListMap[questionId]),
    };

    const savedInterviewPlan = await api.save(interviewPlan);

    savedInterviewPlan.questionsId = savedInterviewPlan.questions.map(q => q._id);

    context.commit('save', savedInterviewPlan);
    router.replace(`/interviewPlan/${savedInterviewPlan._id}`);
  },

  async edit(context, payload) {
    router.push(`/interviewPlan/${payload._id}`);
  },

  async remove(context, payload) {
    await api.remove(payload._id);
    context.commit('remove', payload._id);
  },

  async get(context, payload) {
    if (localState.interviewPlan && localState.interviewPlan._id === payload._id) {
      return;
    }

    const interviewPlan = await api.get(payload._id);
    interviewPlan.questionsId = interviewPlan.questions.map(q => q._id);
    context.commit('setCurrentInterviewPlan', interviewPlan);
  },

  create(context) {
    context.commit('setCurrentInterviewPlan', {
      _id: null,
      title: '',
      questions: [],
    });
  },

  async preview(context, payload) {
    const interviewPlan = localState.list.find(plan => plan._id === payload._id);
    context.commit('setCurrentInterviewPlan', interviewPlan);
    router.push(`/interviewPlanPreview/${payload._id}`);
  },
};


const mutations = {
  save(state, interviewPlan) {
    state.interviewPlan = interviewPlan;
  },

  setInterviewPlanList(state, interviewPlanList) {
    state.list = interviewPlanList;
  },

  setCurrentInterviewPlan(state, interviewPlan) {
    state.interviewPlan = interviewPlan;
  },

  remove(state, interviewPlanId) {
    const i = state.list.findIndex(interviewPlan => (interviewPlan._id === interviewPlanId));
    state.list.splice(i, 1);
  },
};


export default {
  namespaced: true,

  state: localState,
  getters,
  actions,
  mutations,
};
