import api from '../api/questions';

const localState = {
  currentQuestion: {
    labels: [],
    text: '',
  },
  questionList: [],
  tagList: [],
};


const getters = {
  currentQuestion: () => localState.currentQuestion,
  questionList: () => localState.questionList,
  tagList: () => localState.tagList,
};


const actions = {
  async fetchQuestions(context) {
    const questions = await api.fetch();
    context.commit('onFetchQuestions', { questions });
  },

  async fetchTags(context) {
    const tags = await api.fetchTags();
    context.commit('onFetchTags', { tags });
  },

  async removeQuestion(context, questionId) {
    await api.remove(questionId);
    context.commit('onRemoveQuestion', { questionId });
  },

  async saveQuestion(context, question) {
    const savedQuestion = await api.save(question);
    if (question._id) {
      context.commit('onUpdateQuestion', { question: savedQuestion });
    } else {
      context.commit('onAddQuestion', { question: savedQuestion });
    }
    context.commit('unsetCurrent');
  },

  async editQuestion(context, questionId) {
    const editQuestion = this.getters['questions/questionList'].find(question => question._id === questionId);
    if (!editQuestion) {
      throw new Error('Question not exists');
    }
    context.commit('setQurrentQuestion', { question: editQuestion });
  },

  async unsetCurrent(context) {
    context.commit('unsetCurrent');
  },
};


const mutations = {
  onFetchQuestions(state, payload) {
    state.questionList = payload.questions;
  },

  onFetchTags(state, payload) {
    state.tagList = payload.tags.map(tag => ({ text: tag }));
  },

  onAddQuestion(state, payload) {
    state.questionList.push(payload.question);
  },

  onRemoveQuestion(state, payload) {
    const questionIndex = state.questionList
      .findIndex(question => question._id === payload.questionId);

    if (questionIndex >= 0) {
      state.questionList.splice(questionIndex, 1);
    }
  },

  onUpdateQuestion(state, payload) {
    const questionToUpdate = state.questionList
      .find(question => question._id === payload.question._id);

    Object.assign(questionToUpdate, payload.question);
  },

  setQurrentQuestion(state, payload) {
    state.currentQuestion = payload.question;
  },

  unsetCurrent(state) {
    state.currentQuestion = {
      text: '',
      labels: [],
    };
  },
};

export default {
  namespaced: true,

  state: localState,
  getters,
  actions,
  mutations,
};
