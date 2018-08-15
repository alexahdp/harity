import axios from 'axios';
import router from '../router';

const state = {};

const actions = {
  async signIn(context, payload) {
    await axios.post('/api/signin', payload);
    router.push('/dashboard');
  },
};

const mutations = {
};

export default {
  namespaced: true,

  state,
  actions,
  mutations,
};
